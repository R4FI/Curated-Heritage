/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  X,
  Info,
  Image as ImageIcon,
  Layers,
  Tag,
  DollarSign,
  Globe,
  HelpCircle,
  Plus,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Lightbulb,
  Palette,
  Loader2,
} from "lucide-react";
import {
  adminProductService,
  CreateProductRequest,
} from "@/services/adminProductService";
import toast from "react-hot-toast";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded?: () => void;
}

const AddProductModal = ({
  isOpen,
  onClose,
  onProductAdded,
}: AddProductModalProps) => {
  const [loading, setLoading] = useState(false);
  const [onlineStore, setOnlineStore] = useState(true);
  const [pointOfSale, setPointOfSale] = useState(false);

  // Variants state
  const [sizes, setSizes] = useState<string[]>(["S", "M", "L", "XL"]);
  const [colors, setColors] = useState<Array<{ name: string; hex: string }>>([
    { name: "Veridian", hex: "#005344" },
    { name: "Brown", hex: "#763527" },
    { name: "White", hex: "#ffffff" },
  ]);
  const [newSize, setNewSize] = useState("");
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#000000");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    cost: "",
    originalPrice: "",
    category: "",
    material: "",
    stock: "0",
    lowStockThreshold: "10",
    badge: "",
    status: "active" as "active" | "inactive" | "draft",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Variant handlers
  const handleAddSize = () => {
    if (newSize.trim() && !sizes.includes(newSize.trim())) {
      setSizes([...sizes, newSize.trim()]);
      setNewSize("");
    }
  };

  const handleRemoveSize = (size: string) => {
    setSizes(sizes.filter((s) => s !== size));
  };

  const handleAddColor = () => {
    if (
      newColorName.trim() &&
      !colors.find((c) => c.name === newColorName.trim())
    ) {
      setColors([...colors, { name: newColorName.trim(), hex: newColorHex }]);
      setNewColorName("");
      setNewColorHex("#000000");
    }
  };

  const handleRemoveColor = (colorName: string) => {
    setColors(colors.filter((c) => c.name !== colorName));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (!formData.sku.trim()) {
      toast.error("SKU is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Valid price is required");
      return;
    }
    if (!formData.cost || parseFloat(formData.cost) <= 0) {
      toast.error("Valid cost price is required");
      return;
    }

    setLoading(true);
    try {
      // Convert prices from BDT to cents (multiply by 100)
      const productData: CreateProductRequest = {
        name: formData.name.trim(),
        sku: formData.sku.trim(),
        description: formData.description.trim(),
        price: Math.round(parseFloat(formData.price) * 100),
        cost: Math.round(parseFloat(formData.cost) * 100),
        originalPrice: formData.originalPrice
          ? Math.round(parseFloat(formData.originalPrice) * 100)
          : undefined,
        category: formData.category.trim() || undefined,
        material: formData.material.trim() || undefined,
        stock: parseInt(formData.stock) || 0,
        lowStockThreshold: parseInt(formData.lowStockThreshold) || 10,
        badge: formData.badge.trim() || undefined,
        status: formData.status,
        images: [], // TODO: Implement image upload
        variants:
          sizes.length > 0 || colors.length > 0
            ? {
                sizes: sizes.length > 0 ? sizes : undefined,
                colors:
                  colors.length > 0 ? colors.map((c) => c.name) : undefined,
              }
            : undefined,
      };

      await adminProductService.createProduct(productData);
      toast.success("Product created successfully!");

      // Reset form
      setFormData({
        name: "",
        sku: "",
        description: "",
        price: "",
        cost: "",
        originalPrice: "",
        category: "",
        material: "",
        stock: "0",
        lowStockThreshold: "10",
        badge: "",
        status: "active",
      });

      // Reset variants
      setSizes(["S", "M", "L", "XL"]);
      setColors([
        { name: "Veridian", hex: "#005344" },
        { name: "Brown", hex: "#763527" },
        { name: "White", hex: "#ffffff" },
      ]);

      if (onProductAdded) {
        onProductAdded();
      }
      onClose();
    } catch (error: any) {
      console.error("Failed to create product:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create product";
      if (Array.isArray(errorMessage)) {
        errorMessage.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-surface border-b border-outline-variant/20 px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm text-outline font-medium">
                  Create new curated item
                </span>
                <h2 className="text-2xl font-heading font-extrabold tracking-tight text-primary">
                  Product Details
                </h2>
              </div>
              <div className="flex gap-3 items-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl text-secondary font-semibold hover:bg-secondary-container/50 transition-colors active:scale-95 duration-200"
                  disabled={loading}
                >
                  Discard
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-8 py-2.5 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl font-bold shadow-lg active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Saving..." : "Save Product"}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-surface-container-low rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Left Column: Main Content */}
              <div className="col-span-12 lg:col-span-8 space-y-8">
                {/* Section: Basic Information */}
                <section className="bg-surface-container-lowest rounded-xl p-8 space-y-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-bold text-lg">
                      Basic Information
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                        Product Title
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary transition-all text-on-surface placeholder:text-outline/50"
                        placeholder="e.g. Hand-Woven Silk Jamdani Saree"
                        type="text"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-on-surface-variant mb-2 flex items-center gap-2">
                        SKU
                        <HelpCircle
                          className="w-4 h-4 text-outline cursor-help"
                          title="Stock Keeping Unit: A unique identifier for your product."
                        />
                      </label>
                      <input
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary transition-all text-on-surface"
                        placeholder="HB-JAM-001"
                        type="text"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                        Description
                      </label>
                      <div className="rounded-xl border border-outline-variant/20 overflow-hidden">
                        <div className="bg-surface-container-low px-4 py-2 flex gap-4 border-b border-outline-variant/20">
                          <button
                            type="button"
                            className="text-on-surface-variant hover:text-primary"
                          >
                            <Bold className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="text-on-surface-variant hover:text-primary"
                          >
                            <Italic className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="text-on-surface-variant hover:text-primary"
                          >
                            <List className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="text-on-surface-variant hover:text-primary"
                          >
                            <LinkIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-lowest border-none px-4 py-3 focus:ring-0 text-on-surface"
                          placeholder="Describe the craftsmanship and story behind this piece..."
                          rows={6}
                          required
                        ></textarea>
                      </div>
                    </div>

                    {/* Additional Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                          Category
                        </label>
                        <input
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary transition-all text-on-surface"
                          placeholder="e.g. Men's Fashion"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                          Material
                        </label>
                        <input
                          name="material"
                          value={formData.material}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary transition-all text-on-surface"
                          placeholder="e.g. 100% Linen"
                          type="text"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                        Badge (Optional)
                      </label>
                      <input
                        name="badge"
                        value={formData.badge}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary transition-all text-on-surface"
                        placeholder="e.g. New Arrival, Sale"
                        type="text"
                      />
                    </div>
                  </div>
                </section>

                {/* Section: Media */}
                <section className="bg-surface-container-lowest rounded-xl p-8 space-y-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-bold text-lg">
                      Product Media
                    </h3>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-2 aspect-square rounded-xl bg-surface-container-low border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center gap-2 hover:bg-surface-container transition-colors cursor-pointer group">
                      <ImageIcon className="w-8 h-8 text-primary scale-125 group-hover:scale-150 transition-transform" />
                      <p className="text-xs font-bold text-primary uppercase tracking-wider">
                        Primary Image
                      </p>
                      <p className="text-[10px] text-outline">
                        Min: 1200x1200px
                      </p>
                    </div>
                    <div className="col-span-1 aspect-square rounded-xl bg-surface-container-low border-2 border-dashed border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer group">
                      <Plus className="w-6 h-6 text-outline group-hover:text-primary" />
                    </div>
                    <div className="col-span-1 aspect-square rounded-xl bg-surface-container-low border-2 border-dashed border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer group">
                      <Plus className="w-6 h-6 text-outline group-hover:text-primary" />
                    </div>
                  </div>
                  <p className="text-[11px] text-outline italic">
                    Upload up to 10 high-resolution lifestyle photos. Draggable
                    ordering enabled.
                  </p>
                </section>

                {/* Section: Variants */}
                <section className="bg-surface-container-lowest rounded-xl p-8 space-y-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Layers className="w-5 h-5 text-primary" />
                      <h3 className="font-heading font-bold text-lg">
                        Product Variants
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {/* Sizes */}
                    <div>
                      <label className="block text-sm font-semibold text-on-surface-variant mb-3">
                        Sizes
                      </label>
                      <div className="flex flex-wrap gap-3 mb-3">
                        {sizes.map((size) => (
                          <div
                            key={size}
                            className="group relative px-5 py-2 rounded-full text-sm font-medium border border-primary bg-primary/10 text-primary flex items-center gap-2"
                          >
                            {size}
                            <button
                              type="button"
                              onClick={() => handleRemoveSize(size)}
                              className="hover:text-error transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newSize}
                          onChange={(e) => setNewSize(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), handleAddSize())
                          }
                          placeholder="Add size (e.g., XS, XXL)"
                          className="flex-1 bg-surface-container-high border-none rounded-xl px-4 py-2 focus:ring-1 focus:ring-primary text-sm"
                        />
                        <button
                          type="button"
                          onClick={handleAddSize}
                          className="px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Colors */}
                    <div>
                      <label className="block text-sm font-semibold text-on-surface-variant mb-3">
                        Colors
                      </label>
                      <div className="flex flex-wrap gap-4 mb-4">
                        {colors.map((color) => (
                          <div key={color.name} className="group relative">
                            <div
                              className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-offset-2 ring-primary relative"
                              style={{ backgroundColor: color.hex }}
                            >
                              <button
                                type="button"
                                onClick={() => handleRemoveColor(color.name)}
                                className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-outline whitespace-nowrap">
                              {color.name}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-surface-container-low rounded-xl p-4 space-y-3 mt-8">
                        <p className="text-xs font-semibold text-outline uppercase tracking-wider">
                          Add New Color
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newColorName}
                            onChange={(e) => setNewColorName(e.target.value)}
                            placeholder="Color name"
                            className="flex-1 bg-surface-container-high border-none rounded-xl px-4 py-2 focus:ring-1 focus:ring-primary text-sm"
                          />
                          <div className="relative">
                            <input
                              type="color"
                              value={newColorHex}
                              onChange={(e) => setNewColorHex(e.target.value)}
                              className="w-12 h-10 rounded-xl cursor-pointer border-2 border-outline-variant/30"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleAddColor}
                            className="px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-1"
                          >
                            <Plus className="w-4 h-4" />
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column: Sidebar Options */}
              <div className="col-span-12 lg:col-span-4 space-y-8">
                {/* Section: Categories */}
                <section className="bg-surface-container-low rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-bold text-base">
                      Categories
                    </h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Fashion", checked: true },
                      { label: "Home & Lifestyle", checked: false },
                      { label: "Gadgets", checked: false },
                      { label: "Artisanal", checked: true },
                    ].map((category) => (
                      <label
                        key={category.label}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-lowest transition-colors cursor-pointer group"
                      >
                        <input
                          defaultChecked={category.checked}
                          className="w-5 h-5 rounded text-primary focus:ring-primary bg-background border-outline-variant/30"
                          type="checkbox"
                        />
                        <span className="text-sm font-medium text-on-surface group-hover:text-primary">
                          {category.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className="bg-primary/5 p-3 rounded-lg flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-[#2e4c44] font-medium leading-relaxed">
                      Selecting 'Artisanal' adds a "Handcrafted" badge to the
                      product listing page.
                    </p>
                  </div>
                </section>

                {/* Section: Pricing & Inventory */}
                <section className="bg-surface-container-lowest rounded-xl p-6 space-y-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-bold text-base">
                      Pricing & Stock
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">
                        Price (BDT) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary">
                          ৳
                        </span>
                        <input
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-high border-none rounded-xl pl-10 pr-4 py-3 focus:ring-1 focus:ring-primary font-heading font-bold text-lg"
                          placeholder="0.00"
                          type="number"
                          step="0.01"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">
                        Cost Price (BDT) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-outline">
                          ৳
                        </span>
                        <input
                          name="cost"
                          value={formData.cost}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-high border-none rounded-xl pl-10 pr-4 py-3 focus:ring-1 focus:ring-primary font-medium"
                          placeholder="0.00"
                          type="number"
                          step="0.01"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">
                        Compare Price (Optional)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-outline">
                          ৳
                        </span>
                        <input
                          name="originalPrice"
                          value={formData.originalPrice}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-low border-none rounded-xl pl-10 pr-4 py-3 focus:ring-0 font-medium text-outline"
                          placeholder="0.00"
                          type="number"
                          step="0.01"
                          min="0"
                        />
                      </div>
                    </div>
                    <hr className="border-outline-variant/10" />
                    <div>
                      <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">
                        Inventory Quantity
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          name="stock"
                          value={formData.stock}
                          onChange={handleInputChange}
                          className="w-24 bg-surface-container-high border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary text-center font-bold"
                          type="number"
                          min="0"
                        />
                        <span className="text-xs text-outline font-medium">
                          Units in Warehouse
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">
                        Low Stock Threshold
                      </label>
                      <input
                        name="lowStockThreshold"
                        value={formData.lowStockThreshold}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary text-center font-bold"
                        type="number"
                        min="1"
                      />
                    </div>
                  </div>
                </section>

                {/* Section: Visibility */}
                <section className="bg-[#005344] rounded-xl p-6 text-white space-y-4">
                  <h3 className="font-heading font-bold text-base flex items-center gap-2">
                    <Globe className="w-5 h-5 text-on-primary-container" />
                    Visibility
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Online Store</span>
                      <button
                        onClick={() => setOnlineStore(!onlineStore)}
                        className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${
                          onlineStore ? "bg-primary-container" : "bg-white/20"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                            onlineStore ? "right-1" : "left-1 opacity-50"
                          }`}
                        ></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium opacity-60">
                        Point of Sale
                      </span>
                      <button
                        onClick={() => setPointOfSale(!pointOfSale)}
                        className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${
                          pointOfSale ? "bg-primary-container" : "bg-white/20"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                            pointOfSale ? "right-1" : "left-1 opacity-50"
                          }`}
                        ></div>
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 flex justify-center">
              <p className="text-xs text-outline text-center max-w-sm">
                Changes are automatically saved as a draft. Click 'Save Product'
                to publish to the heritage storefront.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
