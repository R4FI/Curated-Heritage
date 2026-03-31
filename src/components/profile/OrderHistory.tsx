import { Package, Truck, Clock } from "lucide-react";

const OrderHistory = () => {
  const orders = [
    {
      id: "#HB-92841",
      date: "Oct 24, 2023",
      status: "Delivered",
      total: 12450,
      icon: Package,
    },
    {
      id: "#HB-91023",
      date: "Oct 20, 2023",
      status: "Shipped",
      total: 4800,
      icon: Truck,
    },
    {
      id: "#HB-88219",
      date: "Oct 18, 2023",
      status: "Processing",
      total: 8200,
      icon: Clock,
    },
    {
      id: "#HB-85402",
      date: "Sept 28, 2023",
      status: "Delivered",
      total: 22100,
      icon: Package,
    },
  ];

  return (
    <div className="bg-surface-container-low rounded-lg p-6 md:p-8">
      <h1 className="font-heading text-headline-lg text-on-surface mb-2">
        Order History
      </h1>
      <p className="font-body text-body-md text-on-surface-variant mb-8">
        Track and manage your curated heritage pieces.
      </p>
      <div className="space-y-4">
        {orders.map((order) => {
          const Icon = order.icon;
          const statusColor =
            order.status === "Delivered"
              ? "bg-primary/10 text-primary"
              : order.status === "Shipped"
                ? "bg-tertiary/10 text-tertiary"
                : "bg-on-surface-variant/10 text-on-surface-variant";

          return (
            <div
              key={order.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-lg bg-surface hover:bg-surface-container transition-colors"
            >
              <div className="w-12 h-12 rounded-md bg-surface-container-high flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-on-surface-variant" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading text-title-md text-on-surface mb-1">
                  Order {order.id}
                </p>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Placed on {order.date}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-body text-label-sm text-on-surface-variant uppercase mb-1">
                    Status
                  </p>
                  <span
                    className={`inline-block font-body text-label-md px-3 py-1 rounded-full ${statusColor}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-body text-label-sm text-on-surface-variant uppercase mb-1">
                    Total
                  </p>
                  <p className="font-heading text-title-md text-on-surface">
                    ৳{order.total.toLocaleString()}
                  </p>
                </div>
                <button className="font-heading text-label-lg px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistory;
