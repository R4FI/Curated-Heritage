/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonalInfo from "@/components/profile/PersonalInfo";
import OrderHistory from "@/components/profile/OrderHistory";
import Wishlist from "@/components/profile/Wishlist";
import PaymentMethods from "@/components/profile/PaymentMethods";
import Settings from "@/components/profile/Settings";
import { profileService } from "@/services/profileService";
import { authStorage } from "@/lib/secureStorage";
import toast from "react-hot-toast";
import {
  User,
  Package,
  Heart,
  CreditCard,
  Settings as SettingsIcon,
  LogOut,
  Loader2,
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      // Check if user is authenticated (has token)
      const isAuth = authStorage.isAuthenticated();

      if (!isAuth) {
        toast.error("Please login to view your profile");
        navigate("/login");
        return;
      }

      // Get user from storage first (fast display)
      const storedUser = authStorage.getUser();
      if (storedUser) {
        setUser(storedUser);
        setIsLoading(false);
      }

      // Try to fetch fresh data from API (optional - don't fail if API is down)
      try {
        const response = await profileService.getProfile();
        setUser(response.data);
        authStorage.setUser(response.data);
      } catch (error: any) {
        console.error("Error fetching profile:", error);

        // If we have stored user data, just use that and don't redirect
        if (storedUser) {
          console.log("Using cached user data, API call failed");
        } else {
          // Only redirect if we have NO user data at all
          toast.error("Failed to load profile. Please login again");
          authStorage.clearTokens();
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      authStorage.clearTokens();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const sidebarItems = [
    { id: "info", label: "Personal Info", icon: User },
    { id: "orders", label: "Order History", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <main className="pt-24 md:pt-28 pb-12 md:pb-20">
          <div className="container mx-auto px-4 lg:px-8 flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-on-surface-variant font-body">
                Loading profile...
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <main className="pt-24 md:pt-28 pb-12 md:pb-20">
          <div className="container mx-auto px-4 lg:px-8 flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <p className="text-on-surface-variant font-body mb-4">
                Please login to view your profile
              </p>
              <button
                onClick={() => navigate("/login")}
                className="gradient-primary text-primary-foreground px-6 py-3 rounded-md font-heading font-semibold"
              >
                Go to Login
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="pt-24 md:pt-28 pb-12 md:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}
            <aside className="space-y-6">
              {/* User Welcome */}
              <div className="bg-surface-container-low rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-heading text-title-sm text-on-surface">
                      Welcome back
                    </p>
                    <p className="font-body text-label-sm text-on-surface-variant">
                      {user.membershipTier || "Member"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="bg-surface-container-low rounded-lg p-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                        activeTab === item.id
                          ? "bg-primary/10 text-primary"
                          : "text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-body text-body-md">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-tertiary transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-body text-body-md">Logout</span>
              </button>
            </aside>

            {/* Main Content */}
            <div className="space-y-6">
              {activeTab === "info" && (
                <PersonalInfo user={user} onNavigate={setActiveTab} />
              )}
              {activeTab === "orders" && <OrderHistory />}
              {activeTab === "wishlist" && <Wishlist />}
              {activeTab === "payment" && <PaymentMethods />}
              {activeTab === "settings" && <Settings />}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
