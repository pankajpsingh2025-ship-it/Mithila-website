#!/usr/bin/env python3
"""
Backend API tests for Mithila.Foods
Tests all endpoints with realistic Nepali data
"""
import requests
import sys
import os

# Get backend URL from frontend/.env
BACKEND_URL = "https://4e5a3da3-a1b3-4da3-8d48-04f6cb03fcf4.preview.emergentagent.com/api"

def test_root():
    """Test GET /api/ health check"""
    print("\n=== Testing GET /api/ ===")
    try:
        resp = requests.get(f"{BACKEND_URL}/", timeout=10)
        print(f"Status: {resp.status_code}")
        data = resp.json()
        print(f"Response: {data}")
        
        if resp.status_code == 200 and data.get("message") == "Mithila.Foods API":
            print("✅ PASS: Root endpoint working")
            return True
        else:
            print(f"❌ FAIL: Expected message 'Mithila.Foods API', got {data}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_catalog():
    """Test GET /api/catalog returns 4 products with exact prices"""
    print("\n=== Testing GET /api/catalog ===")
    try:
        resp = requests.get(f"{BACKEND_URL}/catalog", timeout=10)
        print(f"Status: {resp.status_code}")
        data = resp.json()
        print(f"Response: {data}")
        
        expected = {
            "gift-large": {"name": "Gift Box — Large", "price": 1199},
            "gift-small": {"name": "Gift Box — Small", "price": 699},
            "family-1kg": {"name": "Family Pack — 1kg", "price": 999},
            "regular-500": {"name": "Regular Pack — 500gm", "price": 499},
        }
        
        if resp.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {resp.status_code}")
            return False
        
        # Check all 4 products exist with correct prices
        failures = []
        for prod_id, prod_data in expected.items():
            if prod_id not in data:
                failures.append(f"Missing product: {prod_id}")
            elif data[prod_id].get("price") != prod_data["price"]:
                failures.append(f"{prod_id}: expected price {prod_data['price']}, got {data[prod_id].get('price')}")
        
        if failures:
            print(f"❌ FAIL: {', '.join(failures)}")
            return False
        
        print("✅ PASS: Catalog returns 4 products with correct prices")
        return True
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_order_cod_valley():
    """Test COD order inside valley: delivery_fee=0, status=confirmed, payment_status=cod_pending"""
    print("\n=== Testing POST /api/orders - COD inside valley ===")
    try:
        payload = {
            "items": [
                {"id": "gift-large", "qty": 2},
                {"id": "regular-500", "qty": 1}
            ],
            "customer": {
                "name": "Ramesh Sharma",
                "phone": "9841234567",
                "address": "Thamel, Kathmandu"
            },
            "zone": "valley",
            "payment_method": "cod",
            "note": "Please deliver in the morning"
        }
        
        resp = requests.post(f"{BACKEND_URL}/orders", json=payload, timeout=10)
        print(f"Status: {resp.status_code}")
        data = resp.json()
        print(f"Response: {data}")
        
        if resp.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {resp.status_code}")
            return False, None
        
        # Verify calculations: 2*1199 + 1*499 = 2897
        expected_subtotal = 2 * 1199 + 1 * 499
        expected_delivery = 0
        expected_total = expected_subtotal + expected_delivery
        
        failures = []
        if data.get("subtotal") != expected_subtotal:
            failures.append(f"subtotal: expected {expected_subtotal}, got {data.get('subtotal')}")
        if data.get("delivery_fee") != expected_delivery:
            failures.append(f"delivery_fee: expected {expected_delivery}, got {data.get('delivery_fee')}")
        if data.get("total") != expected_total:
            failures.append(f"total: expected {expected_total}, got {data.get('total')}")
        if data.get("status") != "confirmed":
            failures.append(f"status: expected 'confirmed', got {data.get('status')}")
        if data.get("payment_status") != "cod_pending":
            failures.append(f"payment_status: expected 'cod_pending', got {data.get('payment_status')}")
        if not data.get("id", "").startswith("MF-"):
            failures.append(f"order id should start with 'MF-', got {data.get('id')}")
        
        if failures:
            print(f"❌ FAIL: {', '.join(failures)}")
            return False, None
        
        print("✅ PASS: COD valley order correct")
        return True, data.get("id")
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False, None


def test_order_outside_valley():
    """Test order outside valley: delivery_fee=150, total=subtotal+150"""
    print("\n=== Testing POST /api/orders - Outside valley ===")
    try:
        payload = {
            "items": [
                {"id": "family-1kg", "qty": 3}
            ],
            "customer": {
                "name": "Sita Thapa",
                "phone": "9856789012",
                "address": "Pokhara-15, Lakeside"
            },
            "zone": "outside",
            "payment_method": "cod",
            "note": ""
        }
        
        resp = requests.post(f"{BACKEND_URL}/orders", json=payload, timeout=10)
        print(f"Status: {resp.status_code}")
        data = resp.json()
        print(f"Response: {data}")
        
        if resp.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {resp.status_code}")
            return False
        
        # Verify: 3*999 = 2997, delivery=150, total=3147
        expected_subtotal = 3 * 999
        expected_delivery = 150
        expected_total = expected_subtotal + expected_delivery
        
        failures = []
        if data.get("subtotal") != expected_subtotal:
            failures.append(f"subtotal: expected {expected_subtotal}, got {data.get('subtotal')}")
        if data.get("delivery_fee") != expected_delivery:
            failures.append(f"delivery_fee: expected {expected_delivery}, got {data.get('delivery_fee')}")
        if data.get("total") != expected_total:
            failures.append(f"total: expected {expected_total}, got {data.get('total')}")
        
        if failures:
            print(f"❌ FAIL: {', '.join(failures)}")
            return False
        
        print("✅ PASS: Outside valley delivery fee correct")
        return True
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_order_bank_transfer():
    """Test bank_transfer: status=pending, payment_status=awaiting_bank_transfer"""
    print("\n=== Testing POST /api/orders - Bank transfer ===")
    try:
        payload = {
            "items": [
                {"id": "gift-small", "qty": 1}
            ],
            "customer": {
                "name": "Krishna Adhikari",
                "phone": "9801234567",
                "address": "Bhaktapur Durbar Square"
            },
            "zone": "valley",
            "payment_method": "bank_transfer",
            "note": "Will send bank receipt"
        }
        
        resp = requests.post(f"{BACKEND_URL}/orders", json=payload, timeout=10)
        print(f"Status: {resp.status_code}")
        data = resp.json()
        print(f"Response: {data}")
        
        if resp.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {resp.status_code}")
            return False
        
        failures = []
        if data.get("status") != "pending":
            failures.append(f"status: expected 'pending', got {data.get('status')}")
        if data.get("payment_status") != "awaiting_bank_transfer":
            failures.append(f"payment_status: expected 'awaiting_bank_transfer', got {data.get('payment_status')}")
        
        if failures:
            print(f"❌ FAIL: {', '.join(failures)}")
            return False
        
        print("✅ PASS: Bank transfer status correct")
        return True
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_order_esewa():
    """Test esewa: status=pending, payment_status=awaiting_gateway (no keys configured)"""
    print("\n=== Testing POST /api/orders - eSewa (no keys) ===")
    try:
        payload = {
            "items": [
                {"id": "regular-500", "qty": 2}
            ],
            "customer": {
                "name": "Binod Chaudhary",
                "phone": "9849123456",
                "address": "Lalitpur, Jawalakhel"
            },
            "zone": "valley",
            "payment_method": "esewa",
            "note": ""
        }
        
        resp = requests.post(f"{BACKEND_URL}/orders", json=payload, timeout=10)
        print(f"Status: {resp.status_code}")
        data = resp.json()
        print(f"Response: {data}")
        
        if resp.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {resp.status_code}")
            return False
        
        failures = []
        if data.get("status") != "pending":
            failures.append(f"status: expected 'pending', got {data.get('status')}")
        if data.get("payment_status") != "awaiting_gateway":
            failures.append(f"payment_status: expected 'awaiting_gateway', got {data.get('payment_status')}")
        
        if failures:
            print(f"❌ FAIL: {', '.join(failures)}")
            return False
        
        print("✅ PASS: eSewa awaiting_gateway correct (expected behavior)")
        return True
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_order_khalti():
    """Test khalti: status=pending, payment_status=awaiting_gateway (no keys configured)"""
    print("\n=== Testing POST /api/orders - Khalti (no keys) ===")
    try:
        payload = {
            "items": [
                {"id": "gift-large", "qty": 1},
                {"id": "gift-small", "qty": 1}
            ],
            "customer": {
                "name": "Anjali Rai",
                "phone": "9812345678",
                "address": "Boudha, Kathmandu"
            },
            "zone": "valley",
            "payment_method": "khalti",
            "note": "Gift wrapping please"
        }
        
        resp = requests.post(f"{BACKEND_URL}/orders", json=payload, timeout=10)
        print(f"Status: {resp.status_code}")
        data = resp.json()
        print(f"Response: {data}")
        
        if resp.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {resp.status_code}")
            return False
        
        failures = []
        if data.get("status") != "pending":
            failures.append(f"status: expected 'pending', got {data.get('status')}")
        if data.get("payment_status") != "awaiting_gateway":
            failures.append(f"payment_status: expected 'awaiting_gateway', got {data.get('payment_status')}")
        
        if failures:
            print(f"❌ FAIL: {', '.join(failures)}")
            return False
        
        print("✅ PASS: Khalti awaiting_gateway correct (expected behavior)")
        return True
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_order_empty_cart():
    """Test empty items list -> HTTP 400"""
    print("\n=== Testing POST /api/orders - Empty cart ===")
    try:
        payload = {
            "items": [],
            "customer": {
                "name": "Test User",
                "phone": "9801111111",
                "address": "Test Address"
            },
            "zone": "valley",
            "payment_method": "cod",
            "note": ""
        }
        
        resp = requests.post(f"{BACKEND_URL}/orders", json=payload, timeout=10)
        print(f"Status: {resp.status_code}")
        
        if resp.status_code == 400:
            print("✅ PASS: Empty cart returns 400")
            return True
        else:
            print(f"❌ FAIL: Expected 400, got {resp.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_order_unknown_product():
    """Test unknown product id -> HTTP 400"""
    print("\n=== Testing POST /api/orders - Unknown product ===")
    try:
        payload = {
            "items": [
                {"id": "nonexistent-product", "qty": 1}
            ],
            "customer": {
                "name": "Test User",
                "phone": "9801111111",
                "address": "Test Address"
            },
            "zone": "valley",
            "payment_method": "cod",
            "note": ""
        }
        
        resp = requests.post(f"{BACKEND_URL}/orders", json=payload, timeout=10)
        print(f"Status: {resp.status_code}")
        
        if resp.status_code == 400:
            print("✅ PASS: Unknown product returns 400")
            return True
        else:
            print(f"❌ FAIL: Expected 400, got {resp.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_get_order(order_id):
    """Test GET /api/orders/{id} returns the created order"""
    print(f"\n=== Testing GET /api/orders/{order_id} ===")
    try:
        resp = requests.get(f"{BACKEND_URL}/orders/{order_id}", timeout=10)
        print(f"Status: {resp.status_code}")
        data = resp.json()
        print(f"Response: {data}")
        
        if resp.status_code == 200 and data.get("id") == order_id:
            print("✅ PASS: Order retrieval working")
            return True
        else:
            print(f"❌ FAIL: Expected order with id {order_id}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_get_order_404():
    """Test GET /api/orders/{id} with unknown id -> HTTP 404"""
    print("\n=== Testing GET /api/orders/{unknown_id} - 404 ===")
    try:
        resp = requests.get(f"{BACKEND_URL}/orders/MF-UNKNOWN", timeout=10)
        print(f"Status: {resp.status_code}")
        
        if resp.status_code == 404:
            print("✅ PASS: Unknown order returns 404")
            return True
        else:
            print(f"❌ FAIL: Expected 404, got {resp.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_status_endpoints():
    """Test POST /api/status and GET /api/status"""
    print("\n=== Testing POST /api/status ===")
    try:
        payload = {"client_name": "Mithila Foods Test Client"}
        resp = requests.post(f"{BACKEND_URL}/status", json=payload, timeout=10)
        print(f"Status: {resp.status_code}")
        data = resp.json()
        print(f"Response: {data}")
        
        if resp.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {resp.status_code}")
            return False
        
        # Verify UUID id and timestamp
        if not data.get("id"):
            print("❌ FAIL: Missing id field")
            return False
        if not data.get("timestamp"):
            print("❌ FAIL: Missing timestamp field")
            return False
        
        created_id = data.get("id")
        
        print("\n=== Testing GET /api/status ===")
        resp = requests.get(f"{BACKEND_URL}/status", timeout=10)
        print(f"Status: {resp.status_code}")
        data = resp.json()
        print(f"Response: {data}")
        
        if resp.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {resp.status_code}")
            return False
        
        # Verify created entry is in the list
        found = any(item.get("id") == created_id for item in data)
        if not found:
            print(f"❌ FAIL: Created status check {created_id} not found in list")
            return False
        
        print("✅ PASS: Status endpoints working")
        return True
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def main():
    print("=" * 80)
    print("MITHILA.FOODS BACKEND API TESTS")
    print("=" * 80)
    print(f"Backend URL: {BACKEND_URL}")
    
    results = {}
    
    # Test 1: Root endpoint
    results["root"] = test_root()
    
    # Test 2: Catalog
    results["catalog"] = test_catalog()
    
    # Test 3: Order creation - COD valley
    cod_result, order_id = test_order_cod_valley()
    results["order_cod_valley"] = cod_result
    
    # Test 4: Order creation - Outside valley
    results["order_outside_valley"] = test_order_outside_valley()
    
    # Test 5: Order creation - Bank transfer
    results["order_bank_transfer"] = test_order_bank_transfer()
    
    # Test 6: Order creation - eSewa
    results["order_esewa"] = test_order_esewa()
    
    # Test 7: Order creation - Khalti
    results["order_khalti"] = test_order_khalti()
    
    # Test 8: Order creation - Empty cart
    results["order_empty_cart"] = test_order_empty_cart()
    
    # Test 9: Order creation - Unknown product
    results["order_unknown_product"] = test_order_unknown_product()
    
    # Test 10: Get order (if we have an order_id from COD test)
    if order_id:
        results["get_order"] = test_get_order(order_id)
    
    # Test 11: Get order 404
    results["get_order_404"] = test_get_order_404()
    
    # Test 12: Status endpoints
    results["status_endpoints"] = test_status_endpoints()
    
    # Summary
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    print("=" * 80)
    
    return 0 if passed == total else 1


if __name__ == "__main__":
    sys.exit(main())
