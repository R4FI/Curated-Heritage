import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { ArrowRight, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import catMensFashion from "@/assets/cat-mens-fashion.jpg";
import catWomensFashion from "@/assets/cat-womens-fashion.jpg";
import catHomeLifestyle from "@/assets/cat-home-lifestyle.jpg";
import catGadgets from "@/assets/cat-gadgets.jpg";
import editorialModel from "@/assets/editorial-model.jpg";

const Index = () => {
  const newArrivals = products.slice(0, 4);
  const [carouselIdx, setCarouselIdx] = useState(0);

  const prev = () => setCarouselIdx((i) => Math.max(0, i - 1));
  const next = () => setCarouselIdx((i) => Math.min(newArrivals.length - 1, i + 1));

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      {/* Hero */}
      <section className="pt-16 md:pt-20">
        <div className="relative overflow-hidden">
          <img
            src={heroBanner}
            alt="Curated heritage lifestyle collection"
            width={1920}
            height={700}
            className="w-full h-[55vh] md:h-[75vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-lg space-y-5 animate-fade-in">
                <p className="font-body text-label-lg text-primary-foreground/70 uppercase tracking-widest">Established 2024</p>
                <h1 className="font-heading text-display-md md:text-display-lg text-primary-foreground leading-tight">
                  Elevate Your
                  <br />
                  <em className="italic">Lifestyle</em>
                </h1>
                <p className="font-body text-body-lg text-primary-foreground/80 max-w-md">
                  A curated collection of timeless essentials and modern innovations, designed for the discerning Bangladeshi consumer.
                </p>
                <div className="flex gap-3">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-heading text-title-sm px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
                  >
                    Explore Collection
                  </Link>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 bg-on-surface text-surface font-heading text-title-sm px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
                  >
                    View Lookbook
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Categories */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-heading text-headline-lg md:text-display-md text-on-surface mb-8 md:mb-12">
            <span className="italic">Heritage</span> Categories
          </h2>

          {/* Category Grid – matching reference layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {/* Men's Fashion */}
            <Link to="/shop?filter=fashion" className="relative rounded-md overflow-hidden aspect-[4/5] group">
              <img src={catMensFashion} alt="Men's Fashion" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={640} height={640} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="font-heading text-title-sm md:text-title-lg text-primary-foreground uppercase">Men's Fashion</h3>
                <p className="font-body text-label-md text-primary-foreground/70 uppercase tracking-wider">Tailored Classics</p>
              </div>
            </Link>

            {/* Women's Fashion */}
            <Link to="/shop?filter=fashion" className="relative rounded-md overflow-hidden aspect-[4/5] group">
              <img src={catWomensFashion} alt="Women's Fashion" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={640} height={640} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="font-heading text-title-sm md:text-title-lg text-primary-foreground uppercase">Women's Fashion</h3>
                <p className="font-body text-label-md text-primary-foreground/70 uppercase tracking-wider">Ethereal Style</p>
              </div>
            </Link>

            {/* Offers */}
            <div className="bg-primary rounded-md flex flex-col items-center justify-center p-6 md:p-8 text-center aspect-[4/5] md:aspect-auto">
              <Tag className="w-10 h-10 text-primary-foreground mb-4" />
              <h3 className="font-heading text-title-lg text-primary-foreground uppercase mb-2">Offers</h3>
              <p className="font-body text-label-md text-primary-foreground/70 mb-4">Up to 50% off on selected items!</p>
              <Link
                to="/shop?filter=offers"
                className="font-heading text-label-lg px-5 py-2 rounded-md bg-surface text-primary hover:bg-surface-bright transition-colors"
              >
                Shop Deals
              </Link>
            </div>

            {/* Gadgets & Electronics */}
            <Link to="/shop?filter=gadgets" className="relative rounded-md overflow-hidden aspect-[2/1] md:aspect-[2/1] group col-span-1">
              <img src={catGadgets} alt="Gadgets & Electronics" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={640} height={640} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="font-heading text-title-sm md:text-title-lg text-primary-foreground uppercase">Gadgets & Electronics</h3>
              </div>
            </Link>

            {/* Home & Lifestyle */}
            <Link to="/shop?filter=lifestyle" className="relative rounded-md overflow-hidden aspect-[2/1] md:aspect-[2/1] group col-span-1">
              <img src={catHomeLifestyle} alt="Home & Lifestyle" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={640} height={640} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="font-heading text-title-sm md:text-title-lg text-primary-foreground uppercase">Home & Lifestyle</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-heading text-headline-lg md:text-display-md text-on-surface italic">New Arrivals</h2>
              <p className="font-body text-body-md text-on-surface-variant mt-1">The latest additions to our curated heritage.</p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high hover:bg-surface-container transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 text-on-surface" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high hover:bg-surface-container transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 text-on-surface" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Editor's Choice / Trending Section */}
      <section className="bg-surface-container-low py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <img
                src={editorialModel}
                alt="Trending Heritage Style 2024"
                loading="lazy"
                width={512}
                height={768}
                className="w-full max-w-sm mx-auto md:mx-0 aspect-[3/4] object-cover rounded-lg"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <p className="font-body text-label-lg text-primary uppercase tracking-widest">Editor's Choice</p>
              <h2 className="font-heading text-headline-lg md:text-display-md text-on-surface leading-tight">
                Trending Heritage
                <br />
                Style 2024
              </h2>
              <p className="font-body text-body-lg text-on-surface-variant leading-relaxed max-w-md">
                This season, we explore the intersection of functional minimalism and Bangladeshi artisan textures. Our trending collection represents the soul of contemporary living.
              </p>
              <div className="flex gap-10">
                <div>
                  <p className="font-heading text-display-md text-primary">150+</p>
                  <p className="font-body text-label-md text-on-surface-variant">Artisan Partners</p>
                </div>
                <div>
                  <p className="font-heading text-display-md text-primary">12k+</p>
                  <p className="font-body text-label-md text-on-surface-variant">Happy Residents</p>
                </div>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 font-heading text-title-sm text-primary hover:underline underline-offset-4"
              >
                Explore Trending <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
