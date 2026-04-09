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
} from "lucide-react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal = ({ isOpen, onClose }: AddProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#005344");
  const [onlineStore, setOnlineStore] = useState(true);
  const [pointOfSale, setPointOfSale] = useState(false);

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
                >
                  Discard
                </button>
                <button className="px-8 py-2.5 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl font-bold shadow-lg active:scale-95 transition-all duration-200">
                  Save Product
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
                        className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary transition-all text-on-surface placeholder:text-outline/50"
                        placeholder="e.g. Hand-Woven Silk Jamdani Saree"
                        type="text"
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
                        className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary transition-all text-on-surface"
                        placeholder="HB-JAM-001"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-on-surface-variant mb-2">
                        Description
                      </label>
                      <div className="rounded-xl border border-outline-variant/20 overflow-hidden">
                        <div className="bg-surface-container-low px-4 py-2 flex gap-4 border-b border-outline-variant/20">
                          <button className="text-on-surface-variant hover:text-primary">
                            <Bold className="w-4 h-4" />
                          </button>
                          <button className="text-on-surface-variant hover:text-primary">
                            <Italic className="w-4 h-4" />
                          </button>
                          <button className="text-on-surface-variant hover:text-primary">
                            <List className="w-4 h-4" />
                          </button>
                          <button className="text-on-surface-variant hover:text-primary">
                            <LinkIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          className="w-full bg-surface-container-lowest border-none px-4 py-3 focus:ring-0 text-on-surface"
                          placeholder="Describe the craftsmanship and story behind this piece..."
                          rows={6}
                        ></textarea>
                      </div>
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
                    <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                      <Plus className="w-4 h-4" /> Add New Variant
                    </button>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-on-surface-variant mb-3">
                        Sizes
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {["S", "M", "L", "XL"].map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                              selectedSize === size
                                ? "border border-primary bg-primary text-on-primary"
                                : "border border-outline-variant/50 hover:bg-secondary-container hover:border-primary"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-on-surface-variant mb-3">
                        Colors
                      </label>
                      <div className="flex gap-4">
                        <div className="group relative">
                          <div
                            className={`w-10 h-10 rounded-full cursor-pointer ${
                              selectedColor === "#005344"
                                ? "ring-2 ring-offset-2 ring-primary"
                                : "ring-2 ring-offset-2 ring-transparent hover:ring-outline-variant/30"
                            }`}
                            style={{ backgroundColor: "#005344" }}
                            onClick={() => setSelectedColor("#005344")}
                          ></div>
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-primary text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Veridian
                          </span>
                        </div>
                        <div
                          className={`w-10 h-10 rounded-full cursor-pointer ${
                            selectedColor === "#763527"
                              ? "ring-2 ring-offset-2 ring-primary"
                              : "ring-2 ring-offset-2 ring-transparent hover:ring-outline-variant/30"
                          }`}
                          style={{ backgroundColor: "#763527" }}
                          onClick={() => setSelectedColor("#763527")}
                        ></div>
                        <div
                          className={`w-10 h-10 rounded-full border border-outline-variant cursor-pointer ${
                            selectedColor === "#ffffff"
                              ? "ring-2 ring-offset-2 ring-primary"
                              : "ring-2 ring-offset-2 ring-transparent hover:ring-outline-variant/30"
                          }`}
                          style={{ backgroundColor: "#ffffff" }}
                          onClick={() => setSelectedColor("#ffffff")}
                        ></div>
                        <button className="w-10 h-10 rounded-full border-2 border-dashed border-outline-variant/30 flex items-center justify-center text-outline hover:text-primary hover:border-primary transition-all">
                          <Palette className="w-5 h-5" />
                        </button>
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
                        Price (BDT)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary">
                          ৳
                        </span>
                        <input
                          className="w-full bg-surface-container-high border-none rounded-xl pl-10 pr-4 py-3 focus:ring-1 focus:ring-primary font-heading font-bold text-lg"
                          placeholder="0.00"
                          type="number"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">
                        Compare Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-outline">
                          ৳
                        </span>
                        <input
                          className="w-full bg-surface-container-low border-none rounded-xl pl-10 pr-4 py-3 focus:ring-0 font-medium text-outline"
                          placeholder="0.00"
                          type="number"
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
                          className="w-24 bg-surface-container-high border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary text-center font-bold"
                          type="number"
                          defaultValue="1"
                        />
                        <span className="text-xs text-outline font-medium">
                          Units in Warehouse A
                        </span>
                      </div>
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
