import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonalInfo from "@/components/profile/PersonalInfo";
import OrderHistory from "@/components/profile/OrderHistory";
import Wishlist from "@/components/profile/Wishlist";
import PaymentMethods from "@/components/profile/PaymentMethods";
import Settings from "@/components/profile/Settings";
import {
  User,
  Package,
  Heart,
  CreditCard,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("info");

  // Mock user data
  const user = {
    name: "Anika Rahman",
    email: "anika.rahman@heritage.com",
    memberSince: "2021",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anika",
    totalOrders: 24,
    savedItems: 12,
  };

  const sidebarItems = [
    { id: "info", label: "Personal Info", icon: User },
    { id: "orders", label: "Order History", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

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
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading text-title-sm text-on-surface">
                      Welcome back
                    </p>
                    <p className="font-body text-label-sm text-on-surface-variant">
                      Premium Member
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
              <button className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-tertiary transition-colors">
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
