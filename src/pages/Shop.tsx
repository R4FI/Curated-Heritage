import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories, materials } from "@/data/products";
import {
  Search,
  Star,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
  Layers,
  DollarSign,
} from "lucide-react";

const ITEMS_PER_PAGE = 6;

// Map URL filter params to product categories
const filterToCategoryMap: Record<string, string[]> = {
  fashion: ["Men's Fashion", "Women's Fashion"],
  lifestyle: ["Home & Lifestyle"],
  gadgets: ["Gadgets"],
  offers: [], // Special case - could filter by products with originalPrice
};

const Shop = () => {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("filter");

  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(50000);
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);

  // Apply filter from URL parameter
  useEffect(() => {
    if (filterParam && filterToCategoryMap[filterParam]) {
      setActiveCategories(filterToCategoryMap[filterParam]);
      setPage(1);
    }
  }, [filterParam]);

  const toggleCategory = (cat: string) => {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
    setPage(1);
  };

  const clearFilters = () => {
    setActiveCategories([]);
    setPriceRange(50000);
    setMinRating(0);
    setSearchQuery("");
    setPage(1);
  };

  const filtered = products.filter((p) => {
    // Handle "offers" filter - products with discounts
    if (filterParam === "offers" && !p.originalPrice) return false;

    if (activeCategories.length > 0 && !activeCategories.includes(p.category))
      return false;
    if (p.price > priceRange) return false;
    if (minRating > 0 && p.rating < minRating) return false;
    if (
      searchQuery &&
      !p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  // Sort
  if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const filterSidebar = (
    <div className="space-y-8">
      <div>
        <h3 className="font-heading text-headline-sm text-on-surface mb-1">
          Filters
        </h3>
        <p className="font-body text-label-md text-on-surface-variant">
          Refine your selection
        </p>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-primary" />
          <h4 className="font-heading text-title-sm text-on-surface">
            Categories
          </h4>
        </div>
        <div className="space-y-2.5">
          {categories
            .filter((c) => c !== "All")
            .map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={activeCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 rounded accent-primary"
                />
                <span
                  className={`font-body text-body-md transition-colors ${activeCategories.includes(cat) ? "text-on-surface font-medium" : "text-on-surface-variant group-hover:text-on-surface"}`}
                >
                  {cat}
                </span>
              </label>
            ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-4 h-4 text-primary" />
          <h4 className="font-heading text-title-sm text-on-surface">
            Price Range
          </h4>
        </div>
        <input
          type="range"
          min={0}
          max={50000}
          step={500}
          value={priceRange}
          onChange={(e) => {
            setPriceRange(Number(e.target.value));
            setPage(1);
          }}
          className="w-full accent-primary"
        />
        <div className="flex justify-between font-body text-label-md text-on-surface-variant mt-1">
          <span>৳0</span>
          <span>৳{priceRange.toLocaleString()}</span>
        </div>
      </div>

      {/* Ratings */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-primary" />
          <h4 className="font-heading text-title-sm text-on-surface">
            Ratings
          </h4>
        </div>
        <div className="space-y-2.5">
          {[4, 3].map((r) => (
            <label key={r} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={minRating === r}
                onChange={() => {
                  setMinRating(r);
                  setPage(1);
                }}
                className="w-4 h-4 accent-primary"
              />
              <span className="font-body text-body-md text-on-surface-variant flex items-center gap-1">
                {r}+ <Star className="w-3.5 h-3.5 text-primary fill-primary" />{" "}
                stars
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h4 className="font-heading text-title-sm text-on-surface">
            Materials
          </h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {materials.map((m) => (
            <span
              key={m}
              className="font-body text-label-md px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="font-heading text-label-lg text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider"
      >
        Clear All
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="pt-24 md:pt-28 pb-12 md:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-60 flex-shrink-0">
              {filterSidebar}
            </aside>

            {/* Main content */}
            <div className="flex-1">
              {/* Search + Sort bar */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <div className="flex items-center bg-surface-container-high rounded-md px-4 py-2.5 gap-2 flex-1">
                  <Search className="w-4 h-4 text-on-surface-variant" />
                  <input
                    type="text"
                    placeholder="Search curated products..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setPage(1);
                    }}
                    className="bg-transparent font-body text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none flex-1"
                  />
                </div>
                <div className="flex items-center gap-3">
                  {/* Mobile filter toggle */}
                  <button
                    onClick={() => setMobileFilters(true)}
                    className="lg:hidden flex items-center gap-2 font-heading text-label-lg text-on-surface px-4 py-2.5 rounded-md bg-surface-container-high"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-label-md text-on-surface-variant whitespace-nowrap">
                      Sort By:
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-surface-container-high rounded-md px-3 py-2.5 font-body text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="newest">Newest Arrivals</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {paged.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showAddToCart
                  />
                ))}
              </div>

              {paged.length === 0 && (
                <p className="text-center font-body text-body-lg text-on-surface-variant py-20">
                  No products found. Try adjusting your filters.
                </p>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high hover:bg-surface-container transition-colors disabled:opacity-30"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-full font-heading text-title-sm flex items-center justify-center transition-colors ${
                          p === page
                            ? "gradient-primary text-primary-foreground"
                            : "bg-surface-container-high text-on-surface hover:bg-surface-container"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high hover:bg-surface-container transition-colors disabled:opacity-30"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      {mobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-on-surface/30"
            onClick={() => setMobileFilters(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-surface-container-lowest p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-headline-sm text-on-surface">
                Filters
              </h3>
              <button onClick={() => setMobileFilters(false)}>
                <X className="w-5 h-5 text-on-surface" />
              </button>
            </div>
            {filterSidebar}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Shop;
