#!/usr/bin/env python3
"""
Auth API tests for Mithila.Foods - Emergent Google OAuth
Tests all auth endpoints with seeded test data
"""
import requests
import sys
import os
from datetime import datetime, timezone, timedelta
from pymongo import MongoClient

# Get backend URL from frontend/.env
BACKEND_URL = "https://4e5a3da3-a1b3-4da3-8d48-04f6cb03fcf4.preview.emergentagent.com/api"
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "mithila_foods"

# Test data tracking for cleanup
test_user_ids = []
test_session_tokens = []
test_order_ids = []

def get_db():
    """Get MongoDB database connection"""
    client = MongoClient(MONGO_URL)
    return client[DB_NAME]

def seed_test_user_and_session():
    """Seed a test user and valid session into MongoDB"""
    db = get_db()
    ts = int(datetime.now(timezone.utc).timestamp() * 1000)
    
    user_id = f"user_test{ts}"
    email = f"test.auth.{ts}@example.com"
    session_token = f"test_session_{ts}"
    
    # Insert user
    db.users.insert_one({
        "user_id": user_id,
        "email": email,
        "name": "Auth Tester",
        "picture": "",
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    
    # Insert valid session (expires in 7 days)
    db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    
    test_user_ids.append(user_id)
    test_session_tokens.append(session_token)
    
    print(f"✓ Seeded test user: {user_id}")
    print(f"✓ Seeded test session: {session_token}")
    
    return user_id, session_token

def seed_expired_session():
    """Seed a test user with an expired session"""
    db = get_db()
    ts = int(datetime.now(timezone.utc).timestamp() * 1000)
    
    user_id = f"user_test{ts}_expired"
    email = f"test.auth.{ts}.expired@example.com"
    session_token = f"test_session_{ts}_expired"
    
    # Insert user
    db.users.insert_one({
        "user_id": user_id,
        "email": email,
        "name": "Expired Session Tester",
        "picture": "",
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    
    # Insert expired session (expired 1 day ago)
    db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    
    test_user_ids.append(user_id)
    test_session_tokens.append(session_token)
    
    print(f"✓ Seeded expired session: {session_token}")
    
    return user_id, session_token

def cleanup_test_data():
    """Clean up all seeded test data"""
    db = get_db()
    
    print("\n=== Cleaning up test data ===")
    
    # Delete test users
    if test_user_ids:
        result = db.users.delete_many({"user_id": {"$in": test_user_ids}})
        print(f"✓ Deleted {result.deleted_count} test users")
    
    # Delete test sessions
    if test_session_tokens:
        result = db.user_sessions.delete_many({"session_token": {"$in": test_session_tokens}})
        print(f"✓ Deleted {result.deleted_count} test sessions")
    
    # Delete test orders
    if test_order_ids:
        result = db.orders.delete_many({"id": {"$in": test_order_ids}})
        print(f"✓ Deleted {result.deleted_count} test orders")
    
    # Also clean up by pattern (in case some were missed)
    result = db.users.delete_many({"email": {"$regex": "^test\\.auth\\."}})
    print(f"✓ Deleted {result.deleted_count} users matching test.auth.% pattern")
    
    result = db.user_sessions.delete_many({"session_token": {"$regex": "^test_session_"}})
    print(f"✓ Deleted {result.deleted_count} sessions matching test_session_% pattern")
    
    result = db.orders.delete_many({"user_id": {"$regex": "^user_test"}})
    print(f"✓ Deleted {result.deleted_count} orders for test users")

def test_1_auth_session_no_session_id():
    """Test 1: POST /api/auth/session with NO session_id -> HTTP 400"""
    print("\n=== Test 1: POST /api/auth/session with NO session_id ===")
    try:
        # Test with empty body
        resp = requests.post(f"{BACKEND_URL}/auth/session", json={}, timeout=10)
        print(f"Status: {resp.status_code}")
        print(f"Response: {resp.text}")
        
        if resp.status_code == 400:
            data = resp.json()
            if "Missing session_id" in data.get("detail", ""):
                print("✅ PASS: Returns 400 with 'Missing session_id'")
                return True
            else:
                print(f"❌ FAIL: Expected 'Missing session_id' in detail, got {data.get('detail')}")
                return False
        else:
            print(f"❌ FAIL: Expected 400, got {resp.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False

def test_2_auth_session_invalid_session_id():
    """Test 2: POST /api/auth/session with invalid session_id -> HTTP 401"""
    print("\n=== Test 2: POST /api/auth/session with invalid session_id ===")
    try:
        # Test with random/invalid session_id
        resp = requests.post(
            f"{BACKEND_URL}/auth/session",
            json={"session_id": "invalid_random_session_12345"},
            timeout=15
        )
        print(f"Status: {resp.status_code}")
        print(f"Response: {resp.text}")
        
        if resp.status_code == 401:
            print("✅ PASS: Returns 401 for invalid session_id (expected behavior)")
            return True
        else:
            print(f"❌ FAIL: Expected 401, got {resp.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False

def test_3_auth_me_no_auth():
    """Test 3: GET /api/auth/me with NO auth -> HTTP 401"""
    print("\n=== Test 3: GET /api/auth/me with NO auth ===")
    try:
        resp = requests.get(f"{BACKEND_URL}/auth/me", timeout=10)
        print(f"Status: {resp.status_code}")
        print(f"Response: {resp.text}")
        
        if resp.status_code == 401:
            print("✅ PASS: Returns 401 without auth")
            return True
        else:
            print(f"❌ FAIL: Expected 401, got {resp.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False

def test_4_auth_me_valid_token(user_id, session_token):
    """Test 4: GET /api/auth/me with valid Bearer token -> HTTP 200"""
    print("\n=== Test 4: GET /api/auth/me with valid Bearer token ===")
    try:
        headers = {"Authorization": f"Bearer {session_token}"}
        resp = requests.get(f"{BACKEND_URL}/auth/me", headers=headers, timeout=10)
        print(f"Status: {resp.status_code}")
        data = resp.json()
        print(f"Response: {data}")
        
        if resp.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {resp.status_code}")
            return False
        
        failures = []
        
        # Check required fields
        if data.get("user_id") != user_id:
            failures.append(f"user_id: expected {user_id}, got {data.get('user_id')}")
        if not data.get("email"):
            failures.append("email: missing")
        if "name" not in data:
            failures.append("name: missing")
        if "picture" not in data:
            failures.append("picture: missing")
        
        # Check that _id is NOT present
        if "_id" in data:
            failures.append("_id: should not be present in response")
        
        if failures:
            print(f"❌ FAIL: {', '.join(failures)}")
            return False
        
        print("✅ PASS: Returns user data without _id field")
        return True
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False

def test_5_auth_me_expired_session(expired_session_token):
    """Test 5: GET /api/auth/me with expired session -> HTTP 401"""
    print("\n=== Test 5: GET /api/auth/me with expired session ===")
    try:
        headers = {"Authorization": f"Bearer {expired_session_token}"}
        resp = requests.get(f"{BACKEND_URL}/auth/me", headers=headers, timeout=10)
        print(f"Status: {resp.status_code}")
        print(f"Response: {resp.text}")
        
        if resp.status_code == 401:
            print("✅ PASS: Returns 401 for expired session")
            return True
        else:
            print(f"❌ FAIL: Expected 401, got {resp.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False

def test_6_order_with_auth(user_id, session_token):
    """Test 6: POST /api/orders WITH valid Bearer token -> includes user_id"""
    print("\n=== Test 6: POST /api/orders WITH valid Bearer token ===")
    try:
        payload = {
            "items": [
                {"id": "gift-small", "qty": 1}
            ],
            "customer": {
                "name": "Authenticated User",
                "phone": "9841234567",
                "address": "Kathmandu"
            },
            "zone": "valley",
            "payment_method": "cod",
            "note": "Test order with auth"
        }
        
        headers = {"Authorization": f"Bearer {session_token}"}
        resp = requests.post(f"{BACKEND_URL}/orders", json=payload, headers=headers, timeout=10)
        print(f"Status: {resp.status_code}")
        data = resp.json()
        print(f"Response: {data}")
        
        if resp.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {resp.status_code}")
            return False, None
        
        # Track order for cleanup
        order_id = data.get("id")
        if order_id:
            test_order_ids.append(order_id)
        
        # Check user_id is set
        if data.get("user_id") != user_id:
            print(f"❌ FAIL: Expected user_id={user_id}, got {data.get('user_id')}")
            return False, order_id
        
        print(f"✅ PASS: Order created with user_id={user_id}")
        return True, order_id
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False, None

def test_7_order_without_auth():
    """Test 7: POST /api/orders WITHOUT auth -> user_id is null"""
    print("\n=== Test 7: POST /api/orders WITHOUT auth (guest) ===")
    try:
        payload = {
            "items": [
                {"id": "regular-500", "qty": 1}
            ],
            "customer": {
                "name": "Guest User",
                "phone": "9856789012",
                "address": "Pokhara"
            },
            "zone": "outside",
            "payment_method": "cod",
            "note": "Guest order"
        }
        
        resp = requests.post(f"{BACKEND_URL}/orders", json=payload, timeout=10)
        print(f"Status: {resp.status_code}")
        data = resp.json()
        print(f"Response: {data}")
        
        if resp.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {resp.status_code}")
            return False
        
        # Track order for cleanup
        order_id = data.get("id")
        if order_id:
            test_order_ids.append(order_id)
        
        # Check user_id is null
        if data.get("user_id") is not None:
            print(f"❌ FAIL: Expected user_id=null, got {data.get('user_id')}")
            return False
        
        print("✅ PASS: Guest order created with user_id=null")
        return True
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False

def test_8_my_orders_without_auth():
    """Test 8: GET /api/my/orders WITHOUT auth -> HTTP 401"""
    print("\n=== Test 8: GET /api/my/orders WITHOUT auth ===")
    try:
        resp = requests.get(f"{BACKEND_URL}/my/orders", timeout=10)
        print(f"Status: {resp.status_code}")
        print(f"Response: {resp.text}")
        
        if resp.status_code == 401:
            print("✅ PASS: Returns 401 without auth")
            return True
        else:
            print(f"❌ FAIL: Expected 401, got {resp.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False

def test_9_my_orders_with_auth(user_id, session_token):
    """Test 9: GET /api/my/orders WITH valid Bearer token -> returns only user's orders"""
    print("\n=== Test 9: GET /api/my/orders WITH valid Bearer token ===")
    try:
        # First create another order for this user
        payload = {
            "items": [
                {"id": "family-1kg", "qty": 2}
            ],
            "customer": {
                "name": "Authenticated User 2",
                "phone": "9841234567",
                "address": "Lalitpur"
            },
            "zone": "valley",
            "payment_method": "bank_transfer",
            "note": "Second test order"
        }
        
        headers = {"Authorization": f"Bearer {session_token}"}
        resp = requests.post(f"{BACKEND_URL}/orders", json=payload, headers=headers, timeout=10)
        
        if resp.status_code == 200:
            order_id = resp.json().get("id")
            if order_id:
                test_order_ids.append(order_id)
            print(f"✓ Created second order: {order_id}")
        
        # Now get user's orders
        resp = requests.get(f"{BACKEND_URL}/my/orders", headers=headers, timeout=10)
        print(f"Status: {resp.status_code}")
        data = resp.json()
        print(f"Response: {data}")
        
        if resp.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {resp.status_code}")
            return False
        
        if not isinstance(data, list):
            print(f"❌ FAIL: Expected list, got {type(data)}")
            return False
        
        # Check that all orders belong to this user
        failures = []
        for order in data:
            if order.get("user_id") != user_id:
                failures.append(f"Order {order.get('id')} has user_id={order.get('user_id')}, expected {user_id}")
            
            # Check required fields
            if not order.get("id"):
                failures.append(f"Order missing id field")
            if "items" not in order:
                failures.append(f"Order {order.get('id')} missing items field")
            if "customer" not in order:
                failures.append(f"Order {order.get('id')} missing customer field")
        
        if failures:
            print(f"❌ FAIL: {', '.join(failures)}")
            return False
        
        print(f"✅ PASS: Returns {len(data)} orders for user {user_id}, all with correct user_id")
        return True
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False

def test_10_auth_logout(session_token):
    """Test 10: POST /api/auth/logout -> deletes session"""
    print("\n=== Test 10: POST /api/auth/logout ===")
    try:
        headers = {"Authorization": f"Bearer {session_token}"}
        
        # Logout
        resp = requests.post(f"{BACKEND_URL}/auth/logout", headers=headers, timeout=10)
        print(f"Logout Status: {resp.status_code}")
        data = resp.json()
        print(f"Logout Response: {data}")
        
        if resp.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {resp.status_code}")
            return False
        
        if data.get("ok") != True:
            print(f"❌ FAIL: Expected {{\"ok\": true}}, got {data}")
            return False
        
        # Verify session is deleted by trying to use it
        print("\n✓ Verifying session is deleted...")
        resp = requests.get(f"{BACKEND_URL}/auth/me", headers=headers, timeout=10)
        print(f"Auth/me after logout Status: {resp.status_code}")
        
        if resp.status_code == 401:
            print("✅ PASS: Logout successful, session deleted")
            return True
        else:
            print(f"❌ FAIL: Expected 401 after logout, got {resp.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False

def main():
    print("=" * 80)
    print("MITHILA.FOODS AUTH API TESTS (Emergent Google OAuth)")
    print("=" * 80)
    print(f"Backend URL: {BACKEND_URL}")
    print(f"MongoDB: {MONGO_URL}/{DB_NAME}")
    
    results = {}
    
    try:
        # Test 1: POST /api/auth/session with NO session_id
        results["1_auth_session_no_session_id"] = test_1_auth_session_no_session_id()
        
        # Test 2: POST /api/auth/session with invalid session_id
        results["2_auth_session_invalid_session_id"] = test_2_auth_session_invalid_session_id()
        
        # Test 3: GET /api/auth/me with NO auth
        results["3_auth_me_no_auth"] = test_3_auth_me_no_auth()
        
        # Seed test user and session for remaining tests
        print("\n=== Seeding test data ===")
        user_id, session_token = seed_test_user_and_session()
        
        # Test 4: GET /api/auth/me with valid token
        results["4_auth_me_valid_token"] = test_4_auth_me_valid_token(user_id, session_token)
        
        # Seed expired session for test 5
        expired_user_id, expired_session_token = seed_expired_session()
        
        # Test 5: GET /api/auth/me with expired session
        results["5_auth_me_expired_session"] = test_5_auth_me_expired_session(expired_session_token)
        
        # Test 6: POST /api/orders WITH auth
        test_6_result, order_id = test_6_order_with_auth(user_id, session_token)
        results["6_order_with_auth"] = test_6_result
        
        # Test 7: POST /api/orders WITHOUT auth
        results["7_order_without_auth"] = test_7_order_without_auth()
        
        # Test 8: GET /api/my/orders WITHOUT auth
        results["8_my_orders_without_auth"] = test_8_my_orders_without_auth()
        
        # Test 9: GET /api/my/orders WITH auth
        results["9_my_orders_with_auth"] = test_9_my_orders_with_auth(user_id, session_token)
        
        # Test 10: POST /api/auth/logout
        results["10_auth_logout"] = test_10_auth_logout(session_token)
        
    finally:
        # Always cleanup test data
        cleanup_test_data()
    
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
