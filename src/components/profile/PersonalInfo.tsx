import { Link } from "react-router-dom";
import {
  Edit,
  Package,
  Heart,
  Truck,
  Download,
  ShoppingCart,
  MessageSquare,
  Tag,
} from "lucide-react";

interface PersonalInfoProps {
  user: {
    name: string;
    email: string;
    memberSince: string;
    avatar: string;
    totalOrders: number;
    savedItems: number;
  };
  onNavigate: (tab: string) => void;
}

const PersonalInfo = ({ user, onNavigate }: PersonalInfoProps) => {
  const recentActivity = [
    {
      id: 1,
      type: "delivered",
      title: "Order Delivered: Artisanal Tea Set",
      date: "March 14, 2024 • 2:30 PM",
      orderId: "#8920",
      icon: ShoppingCart,
    },
    {
      id: 2,
      type: "review",
      title: "Review Submitted: Heritage Rug",
      date: "March 10, 2024 • 11:15 AM",
      rating: 5,
      icon: MessageSquare,
    },
    {
      id: 3,
      type: "points",
      title: "Points Earned: +250 Credits",
      date: "March 08, 2024 • 9:00 AM",
      icon: Tag,
    },
  ];

  return (
    <>
      {/* Profile Header Card */}
      <div className="bg-surface-container-low rounded-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-lg bg-surface-container-high"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="font-heading text-headline-md text-on-surface mb-1">
                  {user.name}
                </h1>
                <p className="font-body text-body-md text-on-surface-variant mb-3">
                  {user.email}
                </p>
                <span className="inline-block font-body text-label-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                  MEMBER SINCE {user.memberSince}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 font-heading text-label-lg px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
                <button className="flex items-center gap-2 font-heading text-label-lg px-4 py-2 rounded-md bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors">
                  Account Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-surface-container-low rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-md bg-surface-container-high flex items-center justify-center">
              <Package className="w-5 h-5 text-on-surface" />
            </div>
          </div>
          <p className="font-heading text-display-sm text-on-surface mb-1">
            {user.totalOrders}
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">
            Total Orders
          </p>
        </div>
        <div className="bg-surface-container-low rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-md bg-surface-container-high flex items-center justify-center">
              <Heart className="w-5 h-5 text-on-surface" />
            </div>
          </div>
          <p className="font-heading text-display-sm text-on-surface mb-1">
            {user.savedItems}
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">
            Saved Items
          </p>
        </div>
        <div className="bg-primary rounded-lg p-6 text-primary-foreground">
          <div className="flex items-center gap-2 mb-3">
            <Truck className="w-5 h-5" />
            <span className="font-body text-label-sm uppercase tracking-wider">
              IN TRANSIT
            </span>
          </div>
          <p className="font-body text-label-sm mb-1 opacity-90">
            Latest Order Status
          </p>
          <p className="font-heading text-title-lg mb-3">Order #88219</p>
          <button className="inline-flex items-center gap-2 font-heading text-label-md hover:underline underline-offset-2">
            Track Package
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface-container-low rounded-lg p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-headline-sm text-on-surface">
            Recent Activity
          </h2>
          <button
            onClick={() => onNavigate("orders")}
            className="font-body text-label-md text-primary hover:underline underline-offset-2"
          >
            View History
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-surface hover:bg-surface-container transition-colors"
              >
                <div className="w-10 h-10 rounded-md bg-surface-container-high flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-on-surface-variant" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-body-md text-on-surface mb-1">
                    {activity.title}
                  </p>
                  <p className="font-body text-label-sm text-on-surface-variant">
                    {activity.date}
                  </p>
                </div>
                {activity.orderId && (
                  <span className="font-body text-label-md text-on-surface-variant">
                    {activity.orderId}
                  </span>
                )}
                {activity.rating && (
                  <div className="flex gap-0.5">
                    {Array.from({ length: activity.rating }).map((_, i) => (
                      <span key={i} className="text-primary">
                        ★
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Curated Banner */}
      <div className="relative bg-gradient-to-r from-primary to-primary/80 rounded-lg overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_50%)]" />
        </div>
        <div className="relative p-8 md:p-12">
          <p className="font-body text-label-md text-primary-foreground/80 uppercase tracking-widest mb-2">
            CURATED FOR YOU
          </p>
          <h3 className="font-heading text-headline-lg md:text-display-sm text-primary-foreground mb-4">
            Heritage Home
            <br />
            Lighting Collection
          </h3>
          <Link
            to="/shop?filter=lifestyle"
            className="inline-flex items-center gap-2 font-heading text-label-lg px-6 py-3 rounded-md bg-surface text-primary hover:bg-surface-bright transition-colors"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
