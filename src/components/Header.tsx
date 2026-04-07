/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { authStorage } from "@/lib/secureStorage";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";

const navLinks = [
  { label: "OFFERS", path: "/shop?filter=offers" },
  { label: "FASHION", path: "/shop?filter=fashion" },
  { label: "LIFESTYLE", path: "/shop?filter=lifestyle" },
  { label: "GADGETS", path: "/shop?filter=gadgets" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authStorage.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        const userData = authStorage.getUser();
        setUser(userData);
      }
    };
    checkAuth();
  }, [location]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

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

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated && (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-container-low transition-colors"
                    aria-label="Account"
                    title={user?.name}
                  >
                    <User className="w-5 h-5 text-on-surface" />
                    <span className="font-body text-label-md text-on-surface max-w-[100px] truncate">
                      {user?.name?.split(" ")[0]}
                    </span>
                  </Link>
                  {/* <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-surface-container-high hover:bg-error/10 hover:text-error transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-body text-label-md">Logout</span>
                  </button> */}
                </>
              )}
            </div>

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

            <div className="border-t border-surface-container-high pt-4 mt-2">
              {isAuthenticated && (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-title-sm py-3 px-2 text-on-surface hover:text-primary hover:bg-surface-container-low transition-colors flex items-center gap-3 rounded-md"
                  >
                    <User className="w-5 h-5" />
                    MY ACCOUNT
                  </Link>
                  {/* <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="font-heading text-title-sm py-3 px-2 text-tertiary hover:text-error hover:bg-surface-container-low transition-colors flex items-center gap-3 text-left rounded-md"
                  >
                    <LogOut className="w-5 h-5" />
                    LOGOUT
                  </button> */}
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
