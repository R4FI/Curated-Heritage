import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Star, Minus, Plus, ShoppingBag, ArrowLeft, Truck } from "lucide-react";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const isFashionItem =
    product?.category === "Men's Fashion" ||
    product?.category === "Women's Fashion";
  const sizes = ["S", "M", "L", "XL"];

  if (!product) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="font-body text-body-lg text-on-surface-variant">
          Product not found.
        </p>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="pt-24 md:pt-28 pb-12 md:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-body text-label-lg text-on-surface-variant hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {/* Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-surface-container-lowest">
              <img
                src={product.image}
                alt={product.name}
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center space-y-6">
              {product.badge && (
                <span
                  className={`self-start font-body text-label-md px-3 py-1 rounded-full ${
                    product.badge === "Sale"
                      ? "bg-tertiary text-tertiary-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {product.badge}
                </span>
              )}
              <h1 className="font-heading text-headline-lg md:text-display-md text-on-surface">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-primary fill-primary"
                          : "text-outline-variant"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-body text-label-md text-on-surface-variant">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-headline-sm text-primary">
                  ৳{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="font-body text-body-lg text-on-surface-variant line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                {product.description}
              </p>

              {/* Size Selection for Fashion Items */}
              {isFashionItem && (
                <div className="space-y-3">
                  <h3 className="font-heading text-title-sm text-on-surface">
                    Select Size
                  </h3>
                  <div className="flex gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-md font-heading text-label-lg transition-all ${
                          selectedSize === size
                            ? "bg-primary text-primary-foreground"
                            : "bg-surface-container-high text-on-surface hover:bg-surface-container"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty + Add to Cart */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center bg-surface-container-high rounded-md">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-3 hover:bg-surface-container transition-colors rounded-l-md"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 font-heading text-title-sm">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-3 hover:bg-surface-container transition-colors rounded-r-md"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  className="flex-1 gradient-primary text-primary-foreground font-heading text-title-sm px-8 py-3.5 rounded-md hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
                  disabled={isFashionItem && !selectedSize}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>

              {isFashionItem && !selectedSize && (
                <p className="text-tertiary font-body text-label-md">
                  Please select a size
                </p>
              )}

              {/* Shipping Information Card */}
              <div className="bg-surface-container-low rounded-lg p-6 space-y-4 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <h3 className="font-heading text-title-md text-on-surface">
                    Delivery Information
                  </h3>
                </div>

                <div className="overflow-hidden rounded-md border border-outline-variant">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-surface-container-high">
                        <th className="text-left font-heading text-title-sm text-on-surface px-4 py-3">
                          Location
                        </th>
                        <th className="text-left font-heading text-title-sm text-on-surface px-4 py-3">
                          Time
                        </th>
                        <th className="text-left font-heading text-title-sm text-on-surface px-4 py-3">
                          Charge
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-surface">
                      <tr className="border-t border-outline-variant">
                        <td className="font-body text-body-md text-on-surface px-4 py-3">
                          Inside Dhaka
                        </td>
                        <td className="font-body text-body-md text-on-surface-variant px-4 py-3">
                          1-2 days
                        </td>
                        <td className="font-body text-body-md text-on-surface px-4 py-3">
                          60 TK
                        </td>
                      </tr>
                      <tr className="border-t border-outline-variant">
                        <td className="font-body text-body-md text-on-surface px-4 py-3">
                          Dhaka Sub Area
                        </td>
                        <td className="font-body text-body-md text-on-surface-variant px-4 py-3">
                          1-2 days
                        </td>
                        <td className="font-body text-body-md text-on-surface px-4 py-3">
                          100 TK
                        </td>
                      </tr>
                      <tr className="border-t border-outline-variant">
                        <td className="font-body text-body-md text-on-surface px-4 py-3">
                          Outside Dhaka
                        </td>
                        <td className="font-body text-body-md text-on-surface-variant px-4 py-3">
                          2-4 days
                        </td>
                        <td className="font-body text-body-md text-on-surface px-4 py-3">
                          120 TK
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Product Details */}
              <div className="pt-4 space-y-3 border-t border-outline-variant">
                <div className="flex justify-between font-body text-body-md">
                  <span className="text-on-surface-variant">Category</span>
                  <span className="text-on-surface">{product.category}</span>
                </div>
                {product.material && (
                  <div className="flex justify-between font-body text-body-md">
                    <span className="text-on-surface-variant">Material</span>
                    <span className="text-on-surface">{product.material}</span>
                  </div>
                )}
                <div className="flex justify-between font-body text-body-md">
                  <span className="text-on-surface-variant">Returns</span>
                  <span className="text-on-surface">
                    14-day hassle-free returns
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          <section className="mt-16 md:mt-24 bg-surface-container-low rounded-lg p-6 md:p-12">
            <h2 className="font-heading text-headline-sm text-on-surface mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
