import { Link } from "react-router-dom";
import { ShoppingCart, X, Tag } from "lucide-react";
import { products } from "@/data/products";

const Wishlist = () => {
  const wishlistItems = products.slice(0, 6);

  return (
    <>
      <div className="bg-surface-container-low rounded-lg p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-heading text-headline-lg text-on-surface mb-2">
              My Wishlist
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">
              You have {wishlistItems.length} items saved for later curation.
            </p>
          </div>
          <button className="flex items-center gap-2 font-heading text-label-lg px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            <ShoppingCart className="w-4 h-4" />
            Move All to Cart
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-surface rounded-lg overflow-hidden group"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface/90 backdrop-blur-sm flex items-center justify-center hover:bg-surface transition-colors">
                  <X className="w-4 h-4 text-on-surface" />
                </button>
              </div>
              <div className="p-4">
                <p className="font-body text-label-sm text-on-surface-variant uppercase mb-1">
                  {item.category}
                </p>
                <Link
                  to={`/product/${item.id}`}
                  className="font-heading text-body-lg text-on-surface hover:text-primary transition-colors line-clamp-1 mb-2"
                >
                  {item.name}
                </Link>
                <p className="font-heading text-title-md text-primary mb-3">
                  ৳{item.price.toLocaleString()}
                </p>
                <button className="w-full flex items-center justify-center gap-2 font-heading text-label-md px-4 py-2.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                  <ShoppingCart className="w-4 h-4" />
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-surface-container-low rounded-lg p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-4">
            <Tag className="w-6 h-6 text-on-surface-variant" />
          </div>
          <h3 className="font-heading text-title-lg text-on-surface mb-2">
            Curating something special?
          </h3>
          <p className="font-body text-body-md text-on-surface-variant mb-4">
            Explore our new editorial arrivals to find pieces that complement
            your current selection.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-heading text-label-lg px-6 py-3 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            View New Collections
          </Link>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
