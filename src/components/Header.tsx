import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";

const navLinks = [
  { label: "OFFERS", path: "/shop?filter=offers" },
  { label: "FASHION", path: "/shop?filter=fashion" },
  { label: "LIFESTYLE", path: "/shop?filter=lifestyle" },
  { label: "GADGETS", path: "/shop?filter=gadgets" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="font-heading text-title-lg md:text-headline-sm text-on-surface tracking-tight font-bold"
          >
            Heritage Store
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-heading text-label-lg tracking-wide transition-colors hover:text-primary ${
                  location.search.includes(link.label.toLowerCase())
                    ? "text-primary border-b-2 border-primary pb-0.5"
                    : "text-on-surface"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search bar - desktop */}
            <div className="hidden md:flex items-center bg-surface-container-high rounded-full px-4 py-2 gap-2">
              <Search className="w-4 h-4 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search heritage..."
                className="bg-transparent font-body text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none w-36"
              />
            </div>
            {/* Mobile search toggle */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-surface-container-low transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-on-surface" />
            </button>
            <Link
              to="/cart"
              className="p-2 rounded-md hover:bg-surface-container-low transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-on-surface" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 gradient-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center font-body">
                2
              </span>
            </Link>
            <Link
              to="/profile"
              className="hidden md:flex p-2 rounded-md hover:bg-surface-container-low transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5 text-on-surface" />
            </Link>
            <button
              className="md:hidden p-2 rounded-md hover:bg-surface-container-low transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <div className="flex items-center bg-surface-container-high rounded-full px-4 py-2.5 gap-2">
              <Search className="w-4 h-4 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search heritage..."
                className="bg-transparent font-body text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none flex-1"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-container-lowest shadow-ambient">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="font-heading text-title-sm py-2 text-on-surface hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="font-heading text-title-sm py-2 text-on-surface hover:text-primary transition-colors"
            >
              OUR STORY
            </Link>
            <Link
              to="/profile"
              onClick={() => setMobileOpen(false)}
              className="font-heading text-title-sm py-2 text-on-surface hover:text-primary transition-colors"
            >
              MY ACCOUNT
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
