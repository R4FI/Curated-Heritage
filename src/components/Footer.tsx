import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-surface-container-low">
    <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
        <div>
          <h3 className="font-heading text-headline-sm text-primary mb-3">Heritage Store</h3>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed uppercase tracking-wide">
            Defining the premium digital marketplace for Bangladesh. Quality vetted, heritage approved.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-title-sm text-on-surface mb-4 uppercase tracking-wider">Discover</h4>
          <ul className="space-y-3 font-body text-body-md">
            <li><Link to="/about" className="text-on-surface-variant hover:text-primary transition-colors underline underline-offset-2">ABOUT US</Link></li>
            <li><Link to="/shop" className="text-on-surface-variant hover:text-primary transition-colors underline underline-offset-2">FASHION LOOKBOOK</Link></li>
            <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors underline underline-offset-2">HERITAGE JOURNAL</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-title-sm text-on-surface mb-4 uppercase tracking-wider">Policy</h4>
          <ul className="space-y-3 font-body text-body-md">
            <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors underline underline-offset-2">SHIPPING POLICY</a></li>
            <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors underline underline-offset-2">STRIPE PAYMENT</a></li>
            <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors underline underline-offset-2">TERMS OF SERVICE</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-title-sm text-on-surface mb-4 uppercase tracking-wider">Newsletter</h4>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="email@heritage.com"
              className="bg-surface-container-high rounded-md px-4 py-2.5 font-body text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button className="gradient-primary text-primary-foreground font-heading text-label-lg px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity uppercase tracking-wider">
              Join the Circle
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-6 text-center font-body text-label-md text-on-surface-variant uppercase tracking-widest">
        © 2024 Heritage Store Bangladesh. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
