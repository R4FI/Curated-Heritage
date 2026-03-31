import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard = ({ product, showAddToCart = false }: ProductCardProps) => (
  <div className="group bg-surface-container-lowest rounded-md overflow-hidden">
    <Link to={`/product/${product.id}`} className="block relative">
      <div className="aspect-square overflow-hidden rounded-md">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={640}
          height={640}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      {/* Wishlist */}
      <button
        onClick={(e) => { e.preventDefault(); }}
        className="absolute top-3 right-3 w-8 h-8 bg-surface-container-lowest/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-surface-container-lowest transition-colors"
        aria-label="Add to wishlist"
      >
        <Heart className="w-4 h-4 text-primary" />
      </button>
      {/* Badge */}
      {product.badge && (
        <span
          className={`absolute top-3 left-3 font-body text-label-md px-3 py-1 rounded-md ${
            product.badge === "Sale"
              ? "bg-tertiary text-tertiary-foreground"
              : product.badge === "Limited" || product.badge === "Limited Edition"
              ? "bg-tertiary text-tertiary-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          {product.badge}
        </span>
      )}
    </Link>
    <div className="p-4 space-y-1.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-heading text-title-sm text-on-surface leading-snug">{product.name}</h3>
          <p className="font-body text-label-md text-on-surface-variant mt-0.5">{product.category}</p>
        </div>
        {product.rating && (
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <span className="font-body text-label-md text-on-surface">{product.rating}</span>
            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="font-heading text-title-sm text-on-surface">৳{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="font-body text-label-md text-on-surface-variant line-through">
              ৳{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        {showAddToCart && (
          <button className="font-heading text-label-lg px-4 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  </div>
);

export default ProductCard;
