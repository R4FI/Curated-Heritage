/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AddProductModal from "@/components/admin/AddProductModal";
import {
  FileDown,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
  Loader2,
} from "lucide-react";
import { adminProductService, Product } from "@/services/adminProductService";
import toast from "react-hot-toast";

const Inventory = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 20;

  // Load products from API
  useEffect(() => {
    loadProducts();
  }, [currentPage, activeFilter, searchQuery]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        limit: itemsPerPage,
        sortBy: "createdAt",
        sortOrder: "desc",
      };

      // Apply filters
      if (activeFilter === "low-stock") {
        params.inStock = true;
        // We'll filter low stock on client side since API doesn't have this exact filter
      } else if (activeFilter === "out-of-stock") {
        params.inStock = false;
      } else if (activeFilter === "new-arrivals") {
        params.sortBy = "createdAt";
        params.sortOrder = "desc";
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      const response = await adminProductService.getProducts(params);

      let filteredProducts = response.data.products;

      // Client-side filter for low stock
      if (activeFilter === "low-stock") {
        filteredProducts = filteredProducts.filter((p) => p.isLowStock);
      }

      setProducts(filteredProducts);
      setTotalPages(response.data.pagination.totalPages);
      setTotalItems(response.data.pagination.totalItems);
    } catch (error: any) {
      console.error("Failed to load products:", error);
      toast.error(error.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await adminProductService.deleteProduct(id);
      toast.success("Product deleted successfully");
      loadProducts();
    } catch (error: any) {
      console.error("Failed to delete product:", error);
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  const handleProductAdded = () => {
    setIsAddProductOpen(false);
    loadProducts();
    toast.success("Product added successfully");
  };

  const getStockBadge = (product: Product) => {
    if (product.stock === 0) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container text-on-error-container text-xs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
          Out of Stock
        </span>
      );
    } else if (product.isLowStock) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff4e5] text-[#b35900] text-xs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff9900]"></span>
          Low Stock ({product.stock})
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#46645c]"></span>
          In Stock ({product.stock})
        </span>
      );
    }
  };

  const displayPrice = (price: number) => {
    return (price / 100).toFixed(2);
  };

  return (
    <>
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onProductAdded={handleProductAdded}
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
        <div className="bg-surface-container-low rounded-2xl p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-outline ml-2">
              Quick Filters:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setActiveFilter("all");
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeFilter === "all"
                    ? "bg-primary text-white"
                    : "bg-secondary-fixed text-on-secondary-container hover:bg-secondary-fixed-dim"
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => {
                  setActiveFilter("low-stock");
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeFilter === "low-stock"
                    ? "bg-primary text-white"
                    : "bg-secondary-fixed text-on-secondary-container hover:bg-secondary-fixed-dim"
                }`}
              >
                Low Stock
              </button>
              <button
                onClick={() => {
                  setActiveFilter("out-of-stock");
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeFilter === "out-of-stock"
                    ? "bg-primary text-white"
                    : "bg-secondary-fixed text-on-secondary-container hover:bg-secondary-fixed-dim"
                }`}
              >
                Out of Stock
              </button>
              <button
                onClick={() => {
                  setActiveFilter("new-arrivals");
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeFilter === "new-arrivals"
                    ? "bg-primary text-on-primary"
                    : "bg-secondary-fixed text-on-secondary-container hover:bg-secondary-fixed-dim"
                }`}
              >
                New Arrivals
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex-1 md:max-w-md ml-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Table Container */}
        <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-outline text-lg font-medium">
                No products found
              </p>
              <p className="text-outline text-sm mt-2">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <>
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
                      <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-outline">
                        Status
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
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.name}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "/placeholder.svg";
                                }}
                              />
                            </div>
                            <div>
                              <p className="font-bold text-on-surface group-hover:text-primary transition-colors">
                                {product.name}
                              </p>
                              {product.badge && (
                                <p className="text-xs text-outline italic">
                                  {product.badge}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-on-surface-variant font-medium">
                          {product.category || "Uncategorized"}
                        </td>
                        <td className="px-6 py-5 text-sm font-mono text-outline">
                          {product.sku}
                        </td>
                        <td className="px-6 py-5">{getStockBadge(product)}</td>
                        <td className="px-6 py-5 font-bold text-primary">
                          ৳ {displayPrice(product.price)}
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              product.status === "active"
                                ? "bg-secondary-container text-on-secondary-container"
                                : product.status === "draft"
                                  ? "bg-surface-container-high text-outline"
                                  : "bg-error-container text-on-error-container"
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button
                            className="p-2 text-outline hover:text-primary transition-colors"
                            onClick={() => {
                              // TODO: Implement edit functionality
                              toast("Edit functionality coming soon");
                            }}
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 text-outline hover:text-error transition-colors"
                            onClick={() =>
                              handleDeleteProduct(product.id, product.name)
                            }
                          >
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
                  Showing {products.length} of {totalItems} products
                </span>
                <div className="flex items-center gap-2">
                  <button
                    className="p-1 rounded-lg hover:bg-white text-outline disabled:opacity-30"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold ${
                          currentPage === pageNum
                            ? "bg-primary text-white"
                            : "hover:bg-white text-outline"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    className="p-1 rounded-lg hover:bg-white text-outline disabled:opacity-30"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
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
