import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  FileDown,
  Filter,
  MoreVertical,
  TrendingUp,
  Clock,
  BarChart3,
  CheckCircle,
  Package,
  Truck,
  DollarSign,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  initials: string;
  date: string;
  amount: number;
  paymentStatus: "paid" | "pending";
  orderStatus: "processing" | "shipped" | "delivered";
}

const Orders = () => {
  const [activeTab, setActiveTab] = useState("all");

  const orders: Order[] = [
    {
      id: "#ORD-2024-0892",
      customerName: "Rahat Ahmed",
      customerEmail: "rahat.a@example.com",
      initials: "RA",
      date: "Oct 24, 2024",
      amount: 12450,
      paymentStatus: "paid",
      orderStatus: "processing",
    },
    {
      id: "#ORD-2024-0891",
      customerName: "Nusrat Khan",
      customerEmail: "n.khan@heritage.com",
      initials: "NK",
      date: "Oct 24, 2024",
      amount: 4200,
      paymentStatus: "pending",
      orderStatus: "shipped",
    },
    {
      id: "#ORD-2024-0890",
      customerName: "Mahir Hassan",
      customerEmail: "mahir.h@outlook.com",
      initials: "MH",
      date: "Oct 23, 2024",
      amount: 28900,
      paymentStatus: "paid",
      orderStatus: "delivered",
    },
    {
      id: "#ORD-2024-0889",
      customerName: "Samia Faruque",
      customerEmail: "samia.f@gmail.com",
      initials: "SF",
      date: "Oct 23, 2024",
      amount: 9800,
      paymentStatus: "paid",
      orderStatus: "delivered",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      processing: {
        color: "text-tertiary",
        bgColor: "bg-tertiary",
        label: "Processing",
      },
      shipped: {
        color: "text-primary",
        bgColor: "bg-primary",
        label: "Shipped",
      },
      delivered: {
        color: "text-on-secondary-container/60",
        bgColor: "bg-on-secondary-container/60",
        label: "Delivered",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];

    return (
      <span
        className={`flex items-center gap-1.5 text-xs font-semibold ${config.color}`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${config.bgColor} ${status === "processing" ? "animate-pulse" : ""}`}
        ></span>
        {config.label}
      </span>
    );
  };

  return (
    <AdminLayout>
      {/* Dashboard Greeting */}
      <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold font-heading text-primary tracking-tight leading-none mb-2">
            Order Management
          </h2>
          <p className="text-outline font-body text-sm max-w-lg">
            Manage your premium inventory fulfillments and track historical
            customer data across all channels.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-outline-variant/30 text-outline text-sm font-semibold hover:bg-surface-container-low transition-colors inline-flex items-center gap-2">
            <FileDown className="w-4 h-4" />
            Export CSV
          </button>
          <div className="flex p-1 bg-surface-container-high rounded-xl">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === "all"
                  ? "bg-white text-primary shadow-sm"
                  : "text-outline hover:text-primary"
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === "pending"
                  ? "bg-white text-primary shadow-sm"
                  : "text-outline hover:text-primary"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === "completed"
                  ? "bg-white text-primary shadow-sm"
                  : "text-outline hover:text-primary"
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm group hover:bg-primary transition-colors duration-500 cursor-default">
          <p className="text-xs font-bold uppercase tracking-widest text-outline group-hover:text-primary-container mb-1 transition-colors">
            Total Revenue
          </p>
          <h3 className="text-2xl font-black font-heading text-primary group-hover:text-white transition-colors">
            ৳ 842,500
          </h3>
          <div className="mt-4 flex items-center gap-1 text-primary-container font-bold text-xs group-hover:text-white/80 transition-colors">
            <TrendingUp className="w-4 h-4" />
            <span>12.5% vs last month</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm group hover:bg-primary transition-colors duration-500 cursor-default">
          <p className="text-xs font-bold uppercase tracking-widest text-outline group-hover:text-primary-container mb-1 transition-colors">
            Active Orders
          </p>
          <h3 className="text-2xl font-black font-heading text-primary group-hover:text-white transition-colors">
            148
          </h3>
          <div className="mt-4 flex items-center gap-1 text-tertiary font-bold text-xs group-hover:text-white/80 transition-colors">
            <Clock className="w-4 h-4" />
            <span>24 requiring action</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm group hover:bg-primary transition-colors duration-500 cursor-default">
          <p className="text-xs font-bold uppercase tracking-widest text-outline group-hover:text-primary-container mb-1 transition-colors">
            Average Order Value
          </p>
          <h3 className="text-2xl font-black font-heading text-primary group-hover:text-white transition-colors">
            ৳ 5,680
          </h3>
          <div className="mt-4 flex items-center gap-1 text-primary-container font-bold text-xs group-hover:text-white/80 transition-colors">
            <BarChart3 className="w-4 h-4" />
            <span>+4% this week</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm group hover:bg-primary transition-colors duration-500 cursor-default">
          <p className="text-xs font-bold uppercase tracking-widest text-outline group-hover:text-primary-container mb-1 transition-colors">
            Fulfillment Rate
          </p>
          <h3 className="text-2xl font-black font-heading text-primary group-hover:text-white transition-colors">
            98.2%
          </h3>
          <div className="mt-4 flex items-center gap-1 text-primary-container font-bold text-xs group-hover:text-white/80 transition-colors">
            <CheckCircle className="w-4 h-4" />
            <span>Target achieved</span>
          </div>
        </div>
      </section>

      {/* Orders Table Section */}
      <section className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-surface-container-high flex justify-between items-center bg-white">
          <h3 className="font-heading font-bold text-lg text-primary">
            Recent Orders
          </h3>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-surface-container-low rounded-lg text-outline transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-surface-container-low rounded-lg text-outline transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/30">
                <th className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-outline-variant">
                  Order ID
                </th>
                <th className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-outline-variant">
                  Customer Name
                </th>
                <th className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-outline-variant">
                  Date
                </th>
                <th className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-outline-variant">
                  Total Amount
                </th>
                <th className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-outline-variant">
                  Payment
                </th>
                <th className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-outline-variant">
                  Status
                </th>
                <th className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-outline-variant">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="group hover:bg-surface-container-low/20 transition-colors"
                >
                  <td className="px-8 py-5 text-sm font-bold text-primary font-heading">
                    {order.id}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-primary">
                        {order.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-on-surface">
                          {order.customerName}
                        </p>
                        <p className="text-xs text-outline">
                          {order.customerEmail}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-outline">
                    {order.date}
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-on-surface">
                    ৳ {order.amount.toLocaleString()}
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter ${
                        order.paymentStatus === "paid"
                          ? "bg-primary/10 text-primary"
                          : "bg-surface-container-high text-outline"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    {getStatusBadge(order.orderStatus)}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-surface-container-highest text-primary text-[11px] font-bold rounded-lg hover:bg-primary hover:text-white transition-all">
                        View Details
                      </button>
                      <button className="p-1.5 text-outline hover:text-primary transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-4 border-t border-surface-container-high flex justify-between items-center bg-white/50">
          <p className="text-xs text-outline font-label">
            Showing <span className="font-bold text-primary">1-10</span> of 482
            orders
          </p>
          <div className="flex gap-2">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant/30 text-outline hover:bg-surface-container-low disabled:opacity-30"
              disabled
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant/30 text-outline hover:bg-surface-container-low text-xs font-bold">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant/30 text-outline hover:bg-surface-container-low text-xs font-bold">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant/30 text-outline hover:bg-surface-container-low">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Secondary Insights Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {/* Top Categories */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-heading font-bold text-lg text-primary">
              Sales by Category
            </h3>
            <button className="text-xs font-bold text-primary-container hover:underline">
              Full Analytics
            </button>
          </div>
          <div className="space-y-6">
            {[
              { name: "Premium Leather Goods", amount: 420000, width: 75 },
              { name: "Heritage Handloom", amount: 280000, width: 50 },
              { name: "Artisanal Decor", amount: 142500, width: 35 },
            ].map((category) => (
              <div key={category.name}>
                <div className="flex justify-between text-xs font-bold text-on-surface mb-2">
                  <span>{category.name}</span>
                  <span>৳ {category.amount.toLocaleString()}</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${category.width}%`,
                      opacity: category.width / 100,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-surface-container-low p-8 rounded-2xl">
          <h3 className="font-heading font-bold text-lg text-primary mb-8">
            System Alerts
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center">
                <Package className="w-4 h-4 text-tertiary" />
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">
                  Low Stock Alert
                </p>
                <p className="text-[11px] text-outline mt-0.5">
                  Muslin Scarf - Navy Blue (5 units remaining)
                </p>
                <p className="text-[10px] text-outline-variant mt-1">
                  2 mins ago
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                <Truck className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">
                  Shipment Delivered
                </p>
                <p className="text-[11px] text-outline mt-0.5">
                  Order #ORD-2024-0885 was confirmed by courier
                </p>
                <p className="text-[10px] text-outline-variant mt-1">
                  1 hour ago
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">
                  New Refund Request
                </p>
                <p className="text-[11px] text-outline mt-0.5">
                  Order #ORD-2024-0752 (৳ 2,500)
                </p>
                <p className="text-[10px] text-outline-variant mt-1">
                  4 hours ago
                </p>
              </div>
            </div>
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border border-outline-variant/30 text-outline text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
            Clear Notifications
          </button>
        </div>
      </section>
    </AdminLayout>
  );
};

export default Orders;
