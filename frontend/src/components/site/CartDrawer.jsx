import React from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";

export const CartDrawer = () => {
  const { items, open, setOpen, setQty, removeItem, subtotal, count } = useCart();
  const navigate = useNavigate();

  const goCheckout = () => {
    setOpen(false);
    navigate("/checkout");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-creamlight border-l border-maroon/10 flex flex-col p-0"
        data-testid="cart-drawer"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-maroon/10">
          <SheetTitle className="font-heading text-2xl text-maroon flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Your Cart {count > 0 && <span className="text-golddeep">({count})</span>}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 && (
            <p className="text-ink/60 text-sm mt-10 text-center" data-testid="cart-empty">
              Your cart is empty. Add some khajuri to get started.
            </p>
          )}
          {items.map((it) => (
            <div key={it.id} className="flex gap-4 rounded-2xl bg-paper p-3 ring-1 ring-maroon/10" data-testid={`cart-item-${it.id}`}>
              <img src={it.img} alt={it.name} className="h-20 w-20 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex justify-between gap-2">
                  <h4 className="font-heading text-maroon leading-tight">{it.name}</h4>
                  <button onClick={() => removeItem(it.id)} className="text-ink/40 hover:text-destructive" data-testid={`cart-remove-${it.id}`}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-golddeep font-medium mt-0.5">NPR {it.price}</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-maroon/20">
                    <button onClick={() => setQty(it.id, it.qty - 1)} className="p-1.5 text-maroon" data-testid={`cart-dec-${it.id}`}><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-8 text-center text-sm" data-testid={`cart-qty-${it.id}`}>{it.qty}</span>
                    <button onClick={() => setQty(it.id, it.qty + 1)} className="p-1.5 text-maroon" data-testid={`cart-inc-${it.id}`}><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <span className="ml-auto text-sm font-medium text-ink/70">NPR {it.price * it.qty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="border-t border-maroon/10 px-6 py-5 bg-cream/60">
            <div className="flex justify-between text-sm text-ink/70">
              <span>Subtotal</span>
              <span className="font-medium" data-testid="cart-subtotal">NPR {subtotal}</span>
            </div>
            <p className="mt-1 text-xs text-ink/50">Delivery calculated at checkout (free inside the Valley).</p>
            <button
              onClick={goCheckout}
              className="mt-4 w-full rounded-full bg-heritage py-3.5 text-sm font-medium text-paper transition-colors hover:bg-maroon"
              data-testid="cart-checkout-btn"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
