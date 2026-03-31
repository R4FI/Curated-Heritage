import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const About = () => (
  <div className="min-h-screen bg-surface">
    <Header />
    <main className="pt-24 md:pt-28 pb-12 md:pb-20">
      {/* Hero */}
      <section className="container mx-auto px-4 lg:px-8 py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="font-body text-label-lg text-on-surface-variant uppercase tracking-widest">Our Story</p>
          <h1 className="font-heading text-display-md md:text-display-lg text-on-surface">
            Crafting a Better
            <br />
            Way to Shop
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
            CURATED was born from a simple belief: Bangladeshi consumers deserve access to premium, vetted products without the noise. We partner directly with artisans and quality-first brands to bring you a collection that's worth your trust.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-container-low py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "Quality First",
                desc: "Every product is inspected and vetted before it reaches your hands. We reject more than we accept.",
              },
              {
                title: "Ethical Sourcing",
                desc: "We build direct relationships with makers who share our values of fair labor and sustainable practice.",
              },
              {
                title: "Timeless Design",
                desc: "We curate pieces that transcend trends. Buy less, but buy better — and keep it for years.",
              },
            ].map((val) => (
              <div key={val.title} className="bg-surface-container-lowest rounded-lg p-8 md:p-10">
                <h3 className="font-heading text-headline-sm text-on-surface mb-4">{val.title}</h3>
                <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-headline-lg text-on-surface mb-4">Start Your Journey</h2>
          <p className="font-body text-body-lg text-on-surface-variant mb-8 max-w-md mx-auto">
            Explore our curated collection and discover the difference quality makes.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-heading text-title-sm px-8 py-3.5 rounded-md hover:opacity-90 transition-opacity"
          >
            Explore Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
