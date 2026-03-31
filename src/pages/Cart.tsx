import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface CartItem {
  product: typeof products[0];
  qty: number;
}

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([
    { product: products[0], qty: 1 },
    { product: products[2], qty: 2 },
  ]);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const shipping = subtotal > 2000 ? 0 : 120;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="pt-24 md:pt-28 pb-12 md:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-body text-label-lg text-on-surface-variant hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1 className="font-heading text-headline-lg md:text-display-md text-on-surface mb-8 md:mb-12">Your Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-12 h-12 text-on-surface-variant mx-auto mb-4" />
              <p className="font-body text-body-lg text-on-surface-variant mb-6">Your cart is empty.</p>
              <Link
                to="/shop"
                className="inline-flex gradient-primary text-primary-foreground font-heading text-title-sm px-8 py-3.5 rounded-md"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
              {/* Items */}
              <div className="lg:col-span-2 space-y-6">
                {items.map(({ product, qty }) => (
                  <div
                    key={product.id}
                    className="flex gap-4 md:gap-6 bg-surface-container-lowest rounded-md p-4 md:p-6"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      width={120}
                      height={120}
                      className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-title-sm text-on-surface">{product.name}</h3>
                      <p className="font-body text-label-md text-on-surface-variant mt-1">{product.category}</p>
                      <p className="font-heading text-title-sm text-primary mt-2">
                        ৳{product.price.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-surface-container-high rounded-md">
                          <button
                            onClick={() => updateQty(product.id, -1)}
                            className="p-2 hover:bg-surface-container transition-colors rounded-l-md"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 font-heading text-label-lg">{qty}</span>
                          <button
                            onClick={() => updateQty(product.id, 1)}
                            className="p-2 hover:bg-surface-container transition-colors rounded-r-md"
                            aria-label="Increase"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => remove(product.id)}
                          className="p-2 text-on-surface-variant hover:text-tertiary transition-colors"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-surface-container-lowest rounded-md p-6 md:p-8 h-fit lg:sticky lg:top-28">
                <h2 className="font-heading text-headline-sm text-on-surface mb-6">Order Summary</h2>
                <div className="space-y-4 font-body text-body-md">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Subtotal</span>
                    <span className="text-on-surface">৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Shipping</span>
                    <span className="text-on-surface">{shipping === 0 ? "Free" : `৳${shipping}`}</span>
                  </div>
                  <div className="h-px bg-surface-container-high my-2" />
                  <div className="flex justify-between font-heading text-title-lg">
                    <span className="text-on-surface">Total</span>
                    <span className="text-primary">৳{total.toLocaleString()}</span>
                  </div>
                </div>
                <Link to="/checkout" className="w-full mt-8 gradient-primary text-primary-foreground font-heading text-title-sm px-8 py-3.5 rounded-md hover:opacity-90 transition-opacity text-center block">
                  Checkout
                </Link>
                {shipping > 0 && (
                  <p className="font-body text-label-md text-on-surface-variant text-center mt-3">
                    Free shipping on orders over ৳2,000
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
