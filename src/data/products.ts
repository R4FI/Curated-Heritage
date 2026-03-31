import overshirtImg from "@/assets/product-overshirt.jpg";
import satchelImg from "@/assets/product-satchel.jpg";
import ceramicVaseImg from "@/assets/product-ceramic-vase.jpg";
import mechanicalWatchImg from "@/assets/product-mechanical-watch.jpg";
import jamdaniImg from "@/assets/product-jamdani.jpg";
import linenShirtImg from "@/assets/product-linen-shirt.jpg";
import juteBasketImg from "@/assets/product-jute-basket.jpg";
import brassLampImg from "@/assets/product-brass-lamp.jpg";
import weekenderImg from "@/assets/product-weekender.jpg";
import headphonesImg from "@/assets/product-headphones.jpg";
import bagImg from "@/assets/product-bag.jpg";
import watchImg from "@/assets/product-watch.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  description: string;
  badge?: string;
  rating: number;
  reviews: number;
  material?: string;
}

export const categories = [
  "All",
  "Men's Fashion",
  "Women's Fashion",
  "Home & Lifestyle",
  "Gadgets",
  "Accessories",
];

export const materials = [
  "Organic Cotton",
  "Hand-loomed Silk",
  "Jute Fiber",
  "Brass",
  "Leather",
  "Ceramic",
];

export const products: Product[] = [
  {
    id: "1",
    name: "Heritage Linen Over-shirt",
    price: 4500,
    category: "Men's Fashion",
    image: overshirtImg,
    description: "Premium linen over-shirt with heritage stitching. A layering essential for the modern Bangladeshi gentleman.",
    rating: 4.7,
    reviews: 89,
    material: "Organic Cotton",
  },
  {
    id: "2",
    name: "Artisan Leather Satchel",
    price: 8200,
    originalPrice: 9800,
    category: "Accessories",
    image: satchelImg,
    description: "Full-grain leather satchel with brass hardware. Handcrafted by artisan leatherworkers.",
    badge: "Limited",
    rating: 4.9,
    reviews: 56,
    material: "Leather",
  },
  {
    id: "3",
    name: "Sculptural Ceramic Vase",
    price: 3100,
    originalPrice: 4200,
    category: "Home & Lifestyle",
    image: ceramicVaseImg,
    description: "Hand-glazed ceramic vase set in terracotta and sage. Each piece is a unique work of art.",
    badge: "Sale",
    rating: 4.8,
    reviews: 42,
    material: "Ceramic",
  },
  {
    id: "4",
    name: "Precision Timepiece v.2",
    price: 12500,
    category: "Gadgets",
    image: mechanicalWatchImg,
    description: "Japanese automatic movement with sapphire crystal and silver mesh band. Modern minimalism meets mechanical heritage.",
    rating: 4.9,
    reviews: 31,
  },
  {
    id: "5",
    name: "Hand-Embroidered Silk Jamdani Set",
    price: 18500,
    category: "Women's Fashion",
    image: jamdaniImg,
    description: "Exquisite hand-embroidered Jamdani silk set featuring traditional Bangladeshi motifs. A premium heritage piece.",
    badge: "Premium Heritage",
    rating: 4.9,
    reviews: 124,
    material: "Hand-loomed Silk",
  },
  {
    id: "6",
    name: "Organic Indigo Linen Summer Shirt",
    price: 4200,
    category: "Men's Fashion",
    image: linenShirtImg,
    description: "Naturally dyed indigo linen shirt, perfect for warm Bangladeshi summers. Breathable and refined.",
    badge: "Eco-Friendly",
    rating: 4.7,
    reviews: 67,
    material: "Organic Cotton",
  },
  {
    id: "7",
    name: "Master Craft Jute Storage Basket",
    price: 2850,
    category: "Home & Lifestyle",
    image: juteBasketImg,
    description: "Handwoven jute storage basket with natural striping. Sustainably crafted by master weavers.",
    badge: "Limited Edition",
    rating: 5.0,
    reviews: 38,
    material: "Jute Fiber",
  },
  {
    id: "8",
    name: "Hand-Chiseled Brass Night Lamp",
    price: 9900,
    category: "Home & Lifestyle",
    image: brassLampImg,
    description: "Intricate hand-chiseled brass lamp with Moroccan-inspired cutout patterns. Creates a warm ambient glow.",
    rating: 4.8,
    reviews: 73,
    material: "Brass",
  },
  {
    id: "9",
    name: "Heritage Grain Leather Weekender",
    price: 24500,
    category: "Accessories",
    image: weekenderImg,
    description: "Full-grain leather weekender bag with brass detailing. Ages beautifully with a rich patina.",
    rating: 4.9,
    reviews: 29,
    material: "Leather",
  },
  {
    id: "10",
    name: "Modernist Mechanical Timepiece",
    price: 32000,
    category: "Gadgets",
    image: watchImg,
    description: "Swiss automatic movement with exhibition caseback. A statement piece for the discerning collector.",
    rating: 4.6,
    reviews: 18,
  },
  {
    id: "11",
    name: "Noir Studio Headphones",
    price: 4500,
    originalPrice: 5200,
    category: "Gadgets",
    image: headphonesImg,
    description: "Premium wireless over-ear headphones with active noise cancellation and studio-quality sound.",
    badge: "Sale",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "12",
    name: "Heritage Crossbody Bag",
    price: 6800,
    category: "Accessories",
    image: bagImg,
    description: "Full-grain leather crossbody bag with brass hardware. Designed to age beautifully.",
    rating: 4.7,
    reviews: 56,
    material: "Leather",
  },
];
