import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  TrendingUp,
  Package,
  UserPlus,
  Calendar,
  Download,
  ArrowRight,
} from "lucide-react";

const Dashboard = () => {
  return (
    <AdminLayout>
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold tracking-tight text-primary">
            Executive Dashboard
          </h2>
          <p className="text-on-surface-variant font-body mt-1">
            Real-time overview of your store's performance.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary-container text-on-secondary-container rounded-xl font-medium transition-opacity active:opacity-70">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary rounded-xl font-bold shadow-sm transition-all hover:opacity-90 active:scale-95">
            <Download className="w-5 h-5" />
            Export Data
          </button>
        </div>
      </header>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Total Revenue */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-b-4 border-primary">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary-container rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <span className="text-primary text-xs font-bold px-2 py-1 bg-primary-fixed rounded-full">
              +12.5%
            </span>
          </div>
          <h3 className="text-on-surface-variant text-sm font-medium uppercase tracking-wider mb-1">
            Total Revenue
          </h3>
          <p className="text-3xl font-heading font-bold text-on-surface">
            ৳ 1,248,500
          </p>
          <p className="text-xs text-on-surface-variant mt-2 font-body">
            vs ৳ 1,109,000 last month
          </p>
        </div>

        {/* Orders */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-b-4 border-secondary">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-surface-container-high rounded-lg">
              <Package className="w-6 h-6 text-secondary" />
            </div>
            <span className="text-primary text-xs font-bold px-2 py-1 bg-primary-fixed rounded-full">
              +8.2%
            </span>
          </div>
          <h3 className="text-on-surface-variant text-sm font-medium uppercase tracking-wider mb-1">
            Total Orders
          </h3>
          <p className="text-3xl font-heading font-bold text-on-surface">
            3,842
          </p>
          <p className="text-xs text-on-surface-variant mt-2 font-body">
            320 pending fulfillment
          </p>
        </div>

        {/* New Customers */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-b-4 border-tertiary">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-tertiary-fixed rounded-lg">
              <UserPlus className="w-6 h-6 text-tertiary" />
            </div>
            <span className="text-tertiary text-xs font-bold px-2 py-1 bg-tertiary-fixed-dim rounded-full">
              +18.4%
            </span>
          </div>
          <h3 className="text-on-surface-variant text-sm font-medium uppercase tracking-wider mb-1">
            New Customers
          </h3>
          <p className="text-3xl font-heading font-bold text-on-surface">856</p>
          <p className="text-xs text-on-surface-variant mt-2 font-body">
            Active in the last 7 days
          </p>
        </div>
      </div>

      {/* Middle Content: Trends & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Sales Trends Chart */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-heading font-bold text-on-surface">
              Sales Analytics
            </h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs font-medium text-primary">
                <span className="w-3 h-3 bg-primary rounded-full"></span> This
                Year
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-slate-300">
                <span className="w-3 h-3 bg-slate-300 rounded-full"></span> Last
                Year
              </span>
            </div>
          </div>
          {/* Mock Bar Chart */}
          <div className="flex items-end justify-between h-64 gap-3">
            {[40, 55, 75, 60, 85, 95, 70].map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-surface-container-low rounded-t-lg relative group"
              >
                <div
                  className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all group-hover:opacity-80"
                  style={{ height: `${height}%` }}
                ></div>
                <div
                  className="absolute bottom-0 w-full bg-slate-200 rounded-t-lg -z-10"
                  style={{ height: `${height - 15}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 px-2 text-xs font-medium text-on-surface-variant font-body">
            {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"].map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-surface-container-low p-8 rounded-xl flex flex-col">
          <h3 className="text-xl font-heading font-bold text-primary mb-6">
            Top Categories
          </h3>
          <div className="space-y-6 flex-grow">
            {[
              { name: "Luxury Fashion", percentage: 42 },
              { name: "Heritage Home", percentage: 28 },
              { name: "Artisan Gadgets", percentage: 18 },
              { name: "Gourmet Bangladesh", percentage: 12 },
            ].map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-on-surface">{category.name}</span>
                  <span className="text-primary">{category.percentage}%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 text-primary font-bold text-sm flex items-center gap-2 hover:underline">
            View Category Report
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-surface-container">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-heading font-bold text-on-surface">
              Recent Orders
            </h3>
            <button className="text-primary text-sm font-bold px-4 py-2 border border-primary rounded-lg hover:bg-primary hover:text-on-primary transition-all">
              View All Orders
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-widest font-label">
                <th className="px-8 py-4 font-semibold">Order ID</th>
                <th className="px-8 py-4 font-semibold">Customer</th>
                <th className="px-8 py-4 font-semibold">Product</th>
                <th className="px-8 py-4 font-semibold">Date</th>
                <th className="px-8 py-4 font-semibold">Amount</th>
                <th className="px-8 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {[
                {
                  id: "#HT-29402",
                  customer: "Rahman Ali",
                  initials: "RA",
                  product: "Silk Panjabi Gold Edition",
                  date: "Oct 24, 2024",
                  amount: "৳ 12,500",
                  status: "Delivered",
                  statusColor: "bg-primary-fixed text-on-primary-fixed-variant",
                },
                {
                  id: "#HT-29403",
                  customer: "Mariam Sultana",
                  initials: "MS",
                  product: "Artisan Clay Tea Set",
                  date: "Oct 24, 2024",
                  amount: "৳ 4,200",
                  status: "Processing",
                  statusColor:
                    "bg-secondary-fixed text-on-secondary-fixed-variant",
                },
                {
                  id: "#HT-29404",
                  customer: "Tanvir Kabir",
                  initials: "TK",
                  product: "Leather Messenger Bag",
                  date: "Oct 23, 2024",
                  amount: "৳ 8,800",
                  status: "Cancelled",
                  statusColor: "bg-error-container text-on-error-container",
                },
                {
                  id: "#HT-29405",
                  customer: "Nusrat Jahan",
                  initials: "NH",
                  product: "Handwoven Jamdani Saree",
                  date: "Oct 23, 2024",
                  amount: "৳ 45,000",
                  status: "Shipped",
                  statusColor: "bg-primary-fixed text-on-primary-fixed-variant",
                },
              ].map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-surface-bright transition-colors"
                >
                  <td className="px-8 py-4 font-medium text-primary">
                    {order.id}
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-xs font-bold text-on-secondary-fixed">
                        {order.initials}
                      </div>
                      <span className="text-sm">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm text-on-surface-variant">
                    {order.product}
                  </td>
                  <td className="px-8 py-4 text-sm text-on-surface-variant">
                    {order.date}
                  </td>
                  <td className="px-8 py-4 font-semibold text-on-surface">
                    {order.amount}
                  </td>
                  <td className="px-8 py-4">
                    <span
                      className={`px-3 py-1 ${order.statusColor} text-[10px] font-bold uppercase rounded-full`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
