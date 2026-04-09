import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AddProductModal from "@/components/admin/AddProductModal";
import {
  FileDown,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  sku: string;
  stock: number;
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
  price: number;
  image: string;
}

const Inventory = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const products: Product[] = [
    {
      id: "1",
      name: "Heritage Brass Burner",
      subtitle: "Limited Edition",
      category: "Home Decor",
      sku: "HB-2024-BR01",
      stock: 42,
      stockStatus: "in-stock",
      price: 4500,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDLeLGsFeL-HWWgc4hwT3Yw_jnc_VSOmyemH7EGaroiPb1vdBFOnn_9K4wdsWHjDzma4AKbN9-VWPW3vZmta_QHralWDGf051-iY7lXTcIqjNi_-OYtcKURrNdcYplGyXzODU-KU8qy-di0mljggTThpaXgs9bNd1eUe1GYTWB4EL0NzC5D2KbxcFU7958VpmpkQuadn_UfgZT8tw1pkSWVDCSoUIcSYAW6ctASpszqkEFLeGD-WdairR-0ZBTCRgMfUyxKqE5WzjMy",
    },
    {
      id: "2",
      name: "Indigo Silk Scarf",
      subtitle: "Organic Dye",
      category: "Apparel",
      sku: "AP-SLK-IND08",
      stock: 5,
      stockStatus: "low-stock",
      price: 2250,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDincL7ReWvd697irHdd1nRdESiBgKP29y48AFZhMVqM-bUf7N4bITx8vr0BBSFAPVxnQrHKxecPsVaGvbSTMkNakRFFmceN4gAIfCBg5WYcc7oidsdXeBrHcQQKGiAlibEuvUUyh9o0D8PGzJObTop9uq2oUkGfKLjmnPtWzXqx6G2oe8juoSD1NscBwdQB5bWjLVc3zPZ7mU2dbafOpJLO82xKePPGRs_q-A8PsPuBhIJFnSGFsb8ewMPjnzeaFRiqjQ-Lvc6Jm_z",
    },
    {
      id: "3",
      name: "Ceramic Tea Set",
      subtitle: "Set of 4",
      category: "Tableware",
      sku: "TW-CER-TS92",
      stock: 0,
      stockStatus: "out-of-stock",
      price: 8900,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB-yVYJEzBiun3HAtw-1_4rLbDiu9CwiKNMpy0t0k-Iiv7YCIDrGLZv-owLiB_sRgzKh9sZNVVUg0w1iewUvNGEvNeJh29Vg9Q_ox9WFwDHlH2YNRuqK36Uv4M7zsCJaehXwqz5rDePBg3mgKKv0eVtTxL1DH9H1NIxUcvCImyssXdfdcHcSL2hLCW_pQoCtp_5zpHrYbBcEqsperAWkdzribuWxYqs1EpNk8P4lB9yttlAeXQhFSlvoeR_SRYJMYBi_O-5SpaHi6hj",
    },
    {
      id: "4",
      name: "Jute Area Rug",
      subtitle: "Large (5x8)",
      category: "Home Decor",
      sku: "HD-JUT-RG58",
      stock: 18,
      stockStatus: "in-stock",
      price: 12500,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD-bjxj6zD7Pwcp921TD2KpAvasBY6aPRW1jqOAeqygLqbSI0hAEnBnFpWKjWzt8oezzLe7p9dvaP2HLIafvv9rOoxz3slw9IrYfSsAiB01kuWqkQ69SMmpH0OLX-FnzDXdDUAGPlQg1HvmOffspyDbhNJ52X2dq8IHDlnWRtIQwvrGs81S7bl1CoKXhV8xlvLHlXyEI1WmkZiArdE0tLbeS7dLtcWSu86OPnayJxpU3Iqa6kSpELGeDc3-jIJ7-I622i8-LjeYS_1g",
    },
  ];

  const getStockBadge = (product: Product) => {
    if (product.stockStatus === "in-stock") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#46645c]"></span>
          In Stock ({product.stock})
        </span>
      );
    } else if (product.stockStatus === "low-stock") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff4e5] text-[#b35900] text-xs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff9900]"></span>
          Low Stock ({product.stock})
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container text-on-error-container text-xs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
          Out of Stock
        </span>
      );
    }
  };

  return (
    <>
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
      />
      <AdminLayout>
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-black text-primary tracking-tight font-heading">
              Inventory Management
            </h2>
            <p className="text-on-surface-variant font-body mt-1">
              Manage and track your premium Heritage collection items.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface hover:bg-surface-container-low transition-all font-medium text-sm">
              <FileDown className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="text-white flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary hover:opacity-90 transition-all font-bold text-sm shadow-md shadow-primary/10"
            >
              <Plus className="w-5 h-5 text-white" />
              Add Product
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-surface-container-low rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-outline ml-2">
            Quick Filters:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeFilter === "all"
                  ? "bg-primary text-white"
                  : "bg-secondary-fixed text-on-secondary-container hover:bg-secondary-fixed-dim"
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setActiveFilter("low-stock")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeFilter === "low-stock"
                  ? "bg-primary text-white"
                  : "bg-secondary-fixed text-on-secondary-container hover:bg-secondary-fixed-dim"
              }`}
            >
              Low Stock
            </button>
            <button
              onClick={() => setActiveFilter("out-of-stock")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeFilter === "out-of-stock"
                  ? "bg-primary text-white"
                  : "bg-secondary-fixed text-on-secondary-container hover:bg-secondary-fixed-dim"
              }`}
            >
              Out of Stock
            </button>
            <button
              onClick={() => setActiveFilter("new-arrivals")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeFilter === "new-arrivals"
                  ? "bg-primary text-on-primary"
                  : "bg-secondary-fixed text-on-secondary-container hover:bg-secondary-fixed-dim"
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* Inventory Table Container */}
        <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high/50">
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-outline">
                    Product Name
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-outline">
                    Category
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-outline">
                    SKU
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-outline">
                    Stock Level
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-outline">
                    Price (BDT)
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-outline text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-surface-bright transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-surface-container overflow-hidden flex-shrink-0">
                          <img
                            className="w-full h-full object-cover"
                            src={product.image}
                            alt={product.name}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface group-hover:text-primary transition-colors">
                            {product.name}
                          </p>
                          <p className="text-xs text-outline italic">
                            {product.subtitle}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-on-surface-variant font-medium">
                      {product.category}
                    </td>
                    <td className="px-6 py-5 text-sm font-mono text-outline">
                      {product.sku}
                    </td>
                    <td className="px-6 py-5">{getStockBadge(product)}</td>
                    <td className="px-6 py-5 font-bold text-primary">
                      ৳ {product.price.toLocaleString()}.00
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 text-outline hover:text-primary transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-outline hover:text-error transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-surface-container-low/50 flex items-center justify-between">
            <span className="text-xs font-medium text-outline">
              Showing 4 of 128 products
            </span>
            <div className="flex items-center gap-2">
              <button
                className="p-1 rounded-lg hover:bg-white text-outline disabled:opacity-30"
                disabled
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold">
                1
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-white text-outline text-xs font-bold">
                2
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-white text-outline text-xs font-bold">
                3
              </button>
              <button className="p-1 rounded-lg hover:bg-white text-outline">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info / Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
              Total Inventory Value
            </p>
            <p className="text-2xl font-black text-primary">৳ 2,840,500.00</p>
            <p className="text-xs text-on-surface-variant mt-1">
              +12% from last month
            </p>
          </div>
          <div className="bg-secondary-container/30 rounded-3xl p-6 border border-secondary-container/50">
            <p className="text-xs font-bold uppercase tracking-widest text-on-secondary-container mb-2">
              Low Stock Alerts
            </p>
            <p className="text-2xl font-black text-on-secondary-container">
              14 Items
            </p>
            <p className="text-xs text-on-surface-variant mt-1">
              Requires immediate restock
            </p>
          </div>
          <div className="bg-surface-container-high rounded-3xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-outline mb-2">
              Warehouse Capacity
            </p>
            <div className="w-full bg-surface-container rounded-full h-2 mb-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: "72%" }}
              ></div>
            </div>
            <p className="text-xs text-on-surface-variant">
              72% Occupied (Level A &amp; B)
            </p>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Inventory;
