import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Star, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="font-body text-body-lg text-on-surface-variant">Product not found.</p>
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
                <button className="flex-1 gradient-primary text-primary-foreground font-heading text-title-sm px-8 py-3.5 rounded-md hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>

              {/* Specs */}
              <div className="pt-6 space-y-3">
                <div className="flex justify-between font-body text-body-md">
                  <span className="text-on-surface-variant">Category</span>
                  <span className="text-on-surface">{product.category}</span>
                </div>
                <div className="flex justify-between font-body text-body-md">
                  <span className="text-on-surface-variant">Shipping</span>
                  <span className="text-on-surface">Free shipping on orders over ৳2,000</span>
                </div>
                <div className="flex justify-between font-body text-body-md">
                  <span className="text-on-surface-variant">Returns</span>
                  <span className="text-on-surface">14-day hassle-free returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          <section className="mt-16 md:mt-24 bg-surface-container-low rounded-lg p-6 md:p-12">
            <h2 className="font-heading text-headline-sm text-on-surface mb-8">You May Also Like</h2>
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
