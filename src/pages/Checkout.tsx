import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { Lock, CreditCard, HelpCircle, Package } from "lucide-react";
import { useState } from "react";

const checkoutItems = [
  { product: products[0], qty: 1, variant: "Olive Green / Large" },
  { product: products[3], qty: 1, variant: "Limited Edition / Silver Mesh" },
];

const Checkout = () => {
  const [promoCode, setPromoCode] = useState("");

  const subtotal = checkoutItems.reduce((s, item) => s + item.product.price * item.qty, 0);
  const shipping = 150;
  const vat = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + vat;

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="pt-24 md:pt-28 pb-12 md:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-heading text-headline-lg md:text-display-md text-on-surface mb-2">
            <em>Secure Checkout</em>
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant mb-10">
            Review your order and complete the transaction.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Shipping Address */}
              <div className="bg-surface-container-lowest rounded-md p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    <h2 className="font-heading text-title-lg text-on-surface">Shipping Address</h2>
                  </div>
                  <button className="font-body text-label-lg text-primary hover:underline">Change</button>
                </div>
                <div className="bg-surface-container-low rounded-md p-5">
                  <p className="font-heading text-title-sm text-on-surface mb-2">Arif Rahman</p>
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                    House 42, Road 7, Block D<br />
                    Banani Residential Area<br />
                    Dhaka 1213, Bangladesh
                  </p>
                  <p className="font-body text-body-md text-on-surface-variant mt-3">+880 1711-223344</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-surface-container-lowest rounded-md p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-5 h-5 text-primary" />
                  <h2 className="font-heading text-title-lg text-on-surface">Order Summary</h2>
                </div>
                <div className="space-y-5">
                  {checkoutItems.map(({ product, qty, variant }) => (
                    <div key={product.id} className="flex gap-4 items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        width={80}
                        height={80}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-title-sm text-on-surface">{product.name}</h3>
                        <p className="font-body text-label-md text-on-surface-variant">{variant}</p>
                        <p className="font-heading text-title-sm text-primary mt-1">৳{product.price.toLocaleString()}</p>
                      </div>
                      <span className="font-body text-label-md text-on-surface-variant">Qty: {qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Code */}
              <div className="bg-surface-container-lowest rounded-md p-6 md:p-8">
                <h2 className="font-heading text-title-lg text-on-surface mb-4">Promo Code</h2>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-surface-container-high rounded-md px-4 py-2.5 font-body text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button className="font-heading text-label-lg px-6 py-2.5 rounded-md bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity">
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column – Payment */}
            <div className="space-y-0">
              {/* Payment Header */}
              <div className="gradient-primary rounded-t-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-title-lg text-primary-foreground">Stripe Payment</h2>
                    <p className="font-body text-label-md text-primary-foreground/70">Guaranteed Safe & Secure</p>
                  </div>
                  <span className="font-heading text-label-lg bg-on-surface text-surface px-3 py-1 rounded-md">
                    Stripe
                  </span>
                </div>
              </div>

              {/* Payment Body */}
              <div className="bg-surface-container-lowest rounded-b-md p-6 md:p-8 space-y-6">
                {/* Summary Lines */}
                <div className="space-y-3 font-body text-body-md">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Subtotal</span>
                    <span className="text-on-surface">৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Shipping</span>
                    <span className="text-on-surface">৳{shipping}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">VAT (5%)</span>
                    <span className="text-on-surface">৳{vat.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-surface-container-high my-1" />
                  <div className="flex justify-between font-heading text-title-lg">
                    <span className="text-on-surface">Total Payable</span>
                    <span className="text-on-surface">৳{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Card Fields (Mock) */}
                <div className="space-y-4">
                  <div>
                    <label className="font-body text-label-md text-on-surface-variant uppercase tracking-wider mb-2 block">Card Information</label>
                    <div className="bg-surface-container-high rounded-md px-4 py-3 flex items-center justify-between">
                      <span className="font-body text-body-md text-on-surface-variant">1234 5678 9101 1121</span>
                      <CreditCard className="w-5 h-5 text-on-surface-variant" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="bg-surface-container-high rounded-md px-4 py-3">
                        <span className="font-body text-body-md text-on-surface-variant">MM / YY</span>
                      </div>
                      <div className="bg-surface-container-high rounded-md px-4 py-3 flex items-center justify-between">
                        <span className="font-body text-body-md text-on-surface-variant">CVC</span>
                        <HelpCircle className="w-4 h-4 text-on-surface-variant" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-label-md text-on-surface-variant uppercase tracking-wider mb-2 block">Cardholder Name</label>
                    <div className="bg-surface-container-high rounded-md px-4 py-3">
                      <span className="font-body text-body-md text-on-surface-variant">Full Name on Card</span>
                    </div>
                  </div>
                </div>

                {/* Pay Button */}
                <button className="w-full gradient-primary text-primary-foreground font-heading text-title-sm px-8 py-4 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Pay ৳{total.toLocaleString()}
                </button>

                <p className="font-body text-label-md text-on-surface-variant text-center leading-relaxed">
                  Your payment details are encrypted using industry-standard SSL technology.
                  Heritage Store does not store your full card details.
                </p>

                <p className="font-body text-label-md text-on-surface-variant text-center uppercase tracking-wider">
                  Powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
