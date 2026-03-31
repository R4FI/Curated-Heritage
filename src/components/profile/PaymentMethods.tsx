import { Edit, CheckCircle, Plus, Wallet, Trash2, Shield } from "lucide-react";

const PaymentMethods = () => {
  const paymentCards = [
    {
      id: 1,
      type: "VISA",
      last4: "4242",
      holder: "ZAHID HOSSAIN",
      expiry: "09/26",
      isPrimary: true,
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8819",
      holder: "ZAHID HOSSAIN",
      expiry: "12/25",
      isPrimary: false,
    },
  ];

  const digitalWallets = [
    {
      id: 1,
      name: "bKash Personal",
      number: "+880 17** *** *88",
      isActive: true,
    },
    {
      id: 2,
      name: "Nagad Wallet",
      number: null,
      isActive: false,
    },
  ];

  return (
    <div className="bg-surface-container-low rounded-lg p-6 md:p-8">
      <h1 className="font-heading text-headline-lg text-on-surface mb-2">
        Payment Methods
      </h1>
      <p className="font-body text-body-md text-on-surface-variant mb-8">
        Manage your secure payment options and default billing details.
      </p>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {paymentCards.map((card) => (
          <div
            key={card.id}
            className={`relative p-6 rounded-lg overflow-hidden transition-all ${
              card.isPrimary
                ? "bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary"
                : "bg-surface-container-low"
            }`}
          >
            {/* Glassmorphism Background Logo */}
            <div className="absolute -right-8 -bottom-8 opacity-5">
              {card.type === "VISA" ? (
                <div className="text-[120px] font-black italic text-primary">
                  VISA
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="w-32 h-32 rounded-full bg-tertiary"></div>
                  <div className="w-32 h-32 rounded-full bg-secondary-fixed-dim -ml-16"></div>
                </div>
              )}
            </div>

            {/* Card Header with Actions */}
            <div className="relative flex justify-between items-start mb-8">
              <div className="flex flex-col gap-3">
                {card.isPrimary && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-foreground fill-primary stroke-primary stroke-2" />
                    <span className="font-heading font-bold text-primary tracking-widest uppercase text-xs">
                      Primary
                    </span>
                  </div>
                )}
                {/* Card Logo */}
                <div className="flex items-center gap-2">
                  {card.type === "VISA" ? (
                    <div className="h-8 px-4 bg-primary rounded flex items-center justify-center">
                      <span className="font-heading font-black italic text-primary-foreground text-xl tracking-tight">
                        VISA
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center h-8">
                      <div className="w-8 h-8 rounded-full bg-tertiary"></div>
                      <div className="w-8 h-8 rounded-full bg-secondary-fixed-dim -ml-3"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                  aria-label="Edit card"
                >
                  <Edit className="w-4 h-4" />
                </button>
                {!card.isPrimary && (
                  <button
                    className="p-2.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                    aria-label="Set as primary"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Card Number */}
            <div className="relative mb-4">
              <p
                className={`font-heading text-lg tracking-[0.2em] font-medium ${
                  card.isPrimary ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                •••• •••• •••• {card.last4}
              </p>
            </div>

            {/* Card Details */}
            <div className="relative flex justify-between items-end">
              <div>
                <p className="text-on-surface-variant text-[10px] uppercase tracking-tight mb-1">
                  Card Holder
                </p>
                <p
                  className={`font-heading font-bold text-sm ${
                    card.isPrimary ? "text-primary" : "text-on-surface"
                  }`}
                >
                  {card.holder}
                </p>
              </div>
              <div className="text-right">
                <p className="text-on-surface-variant text-[10px] uppercase tracking-tight mb-1">
                  Expires
                </p>
                <p
                  className={`font-heading font-bold text-sm ${
                    card.isPrimary ? "text-primary" : "text-on-surface"
                  }`}
                >
                  {card.expiry}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <button className="border-2 border-dashed border-outline-variant rounded-lg flex flex-col items-center justify-center p-6 hover:bg-surface-container-low hover:border-primary transition-all group min-h-[200px]">
          <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-primary" />
          </div>
          <p className="font-heading font-bold text-primary mb-1">
            Add New Card
          </p>
          <p className="text-on-surface-variant text-sm text-center">
            Visa, Mastercard, or AMEX
          </p>
        </button>
      </div>

      {/* Digital Wallets */}
      <div className="mb-8">
        <h3 className="font-heading text-title-lg font-bold text-primary mb-4">
          Digital Wallets
        </h3>
        <div className="space-y-3">
          {digitalWallets.map((wallet) => (
            <div
              key={wallet.id}
              className="bg-surface-container-lowest p-5 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading font-bold text-primary text-body-md">
                    {wallet.name}
                  </p>
                  <p className="text-on-surface-variant text-sm">
                    {wallet.number || "Not linked"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {wallet.isActive ? (
                  <>
                    <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold">
                      ACTIVE
                    </span>
                    <button className="text-on-surface-variant hover:text-tertiary transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <button className="text-primary font-bold text-sm hover:underline underline-offset-2">
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-primary/5 rounded-lg p-6 flex gap-4 items-start">
        <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-heading font-bold text-primary mb-2">
            Secure Transactions
          </h4>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Your payment information is stored securely using industry-standard
            encryption. Heritage Boutique does not have direct access to your
            full card details. All transactions are processed through our
            PCI-DSS compliant payment gateway partners.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
