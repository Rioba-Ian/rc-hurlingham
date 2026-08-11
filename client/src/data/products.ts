import { Product } from "@/types/shop";

/**
 * Centralized Local Merchandise Image URLs.
 * Simply paste/update local or external image URLs here.
 * Future plans will pull these directly from Strapi CMS.
 */
export const MERCHANDISE_IMAGES = {
  hoodie: [
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80"
  ],
  polo: [
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80"
  ],
  pin: [
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=80"
  ],
  tote: [
    "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=1000&q=80"
  ],
  flask: [
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=1000&q=80"
  ],
  cap: [
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=1000&q=80"
  ],
  journal: [
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1000&q=80"
  ]
};

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    slug: "hurlingham-heavyweight-hoodie",
    name: "Rotaract Hurlingham Heavyweight Premium Hoodie",
    category: "Apparel",
    price: 3200,
    originalPrice: 3800,
    rating: 4.9,
    reviewCount: 42,
    badge: "Popular",
    description: "Ultra-soft 350gsm fleece hoodie with embroidered Rotaract Club of Hurlingham emblem on the left chest and bold 'Create Hope in the World' back print. Built for maximum comfort during evening fellowships and cool weather projects.",
    features: [
      "80% Premium Ring-Spun Cotton, 20% Polyester",
      "Custom embroidered crest on left chest",
      "Kangaroo pocket with reinforced double-stitching",
      "Pre-shrunk fabric for long-lasting fit",
      "Unisex classic relaxed silhouette"
    ],
    images: MERCHANDISE_IMAGES.hoodie,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Cranberry Red", hex: "#a11c43" },
      { name: "Navy Blue", hex: "#1d2a44" },
      { name: "Charcoal Grey", hex: "#333333" }
    ],
    inStock: true,
    stockCount: 24,
    specs: {
      "Material": "350 GSM Heavyweight Fleece",
      "Fit": "Unisex Regular",
      "Care": "Machine wash cold, tumble dry low"
    }
  },
  {
    id: "prod-2",
    slug: "signature-rotary-fellow-polo",
    name: "Signature Fellow Piqué Polo Shirt",
    category: "Apparel",
    price: 2200,
    rating: 4.8,
    reviewCount: 31,
    badge: "New",
    description: "Breathable piqué cotton polo engineered for club meetings, district conferences, and official Rotaract representations. Features crisp ribbed collar, contrasting button placket, and subtle embroidered gear emblem.",
    features: [
      "100% Combed Cotton Piqué",
      "Moisture-wicking breathable weave",
      "High-density Rotary gear logo embroidery",
      "Side vents for comfortable movement"
    ],
    images: MERCHANDISE_IMAGES.polo,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy Blue", hex: "#1d2a44" },
      { name: "Pure White", hex: "#ffffff" },
      { name: "Cranberry", hex: "#a11c43" }
    ],
    inStock: true,
    stockCount: 18,
    specs: {
      "Material": "100% Piqué Cotton",
      "Weight": "220 GSM",
      "Style": "Smart Casual"
    }
  },
  {
    id: "prod-3",
    slug: "rotary-fellowship-metal-lapel-pin",
    name: "Rotaract Hurlingham Gold & Enamel Lapel Pin",
    category: "Pins & Badges",
    price: 650,
    originalPrice: 800,
    rating: 5.0,
    reviewCount: 58,
    badge: "Popular",
    description: "Precision-crafted die-struck brass lapel pin finished with rich hard enamel and 24K gold plating. Features a secure butterfly clutch backend for jackets, suits, and lanyards.",
    features: [
      "Jewelry-grade 24K gold plating",
      "Scratch-resistant polished hard enamel",
      "Secure dual butterfly clutch backing",
      "Comes in a velvet presentation gift box"
    ],
    images: MERCHANDISE_IMAGES.pin,
    inStock: true,
    stockCount: 50,
    specs: {
      "Size": "25mm diameter",
      "Material": "Brass with Gold Plating",
      "Packaging": "Velvet Gift Box"
    }
  },
  {
    id: "prod-4",
    slug: "eco-friendly-canvas-tote",
    name: "Service Above Self Heavy Duty Canvas Tote Bag",
    category: "Accessories",
    price: 1200,
    rating: 4.7,
    reviewCount: 19,
    description: "Spacious 12oz heavy organic cotton canvas tote printed with our signature club artwork. Perfect for carrying laptop, notebooks, and community outreach materials.",
    features: [
      "100% Unbleached Heavyweight Cotton Canvas",
      "Reinforced cross-stitched handles for heavy loads",
      "Inner zippered pocket for phone and keys",
      "Eco-friendly eco-ink screen printing"
    ],
    images: MERCHANDISE_IMAGES.tote,
    colors: [
      { name: "Natural Cream", hex: "#f5f2eb" },
      { name: "Midnight Black", hex: "#1c1c1c" }
    ],
    inStock: true,
    stockCount: 30,
    specs: {
      "Dimensions": "38cm x 42cm x 10cm",
      "Material": "12oz Organic Cotton",
      "Capacity": "16 Liters"
    }
  },
  {
    id: "prod-5",
    slug: "insulated-stainless-flask-750ml",
    name: "Hurlingham Matte Stainless Flask (750ml)",
    category: "Drinkware",
    price: 1850,
    originalPrice: 2100,
    rating: 4.9,
    reviewCount: 27,
    badge: "Sale",
    description: "Double-wall vacuum insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. Features laser-engraved Rotaract Hurlingham logo.",
    features: [
      "18/8 Food-grade Stainless Steel",
      "BPA-free leakproof bamboo cap",
      "Sweat-free powder coating texture",
      "Keeps ice cold for 24h, hot for 12h"
    ],
    images: MERCHANDISE_IMAGES.flask,
    colors: [
      { name: "Matte Black", hex: "#1c1c1c" },
      { name: "Cranberry Red", hex: "#a11c43" },
      { name: "Brushed Steel", hex: "#d1d5db" }
    ],
    inStock: true,
    stockCount: 15,
    specs: {
      "Volume": "750 ml",
      "Insulation": "Double-Wall Vacuum",
      "BPA Free": "Yes"
    }
  },
  {
    id: "prod-6",
    slug: "embroidered-rotaract-cap",
    name: "Embroidered Club Twill Baseball Cap",
    category: "Apparel",
    price: 1400,
    rating: 4.6,
    reviewCount: 14,
    description: "Unstructured 6-panel dad cap made from 100% washed cotton twill with high-density 3D embroidery on front and adjustable brass buckle closure.",
    features: [
      "100% Washed Cotton Twill",
      "3D Raised Embroidery front crest",
      "Adjustable antique brass strap back closure",
      "Curved visor with 6 embroidered eyelets"
    ],
    images: MERCHANDISE_IMAGES.cap,
    colors: [
      { name: "Deep Navy", hex: "#1d2a44" },
      { name: "Vintage Black", hex: "#262626" }
    ],
    inStock: true,
    stockCount: 20,
    specs: {
      "Size": "One Size Fits All (Adjustable)",
      "Material": "Washed Cotton Twill"
    }
  },
  {
    id: "prod-7",
    slug: "rotary-executive-journal-pen-set",
    name: "Executive Leatherette Journal & Engraved Pen Gift Set",
    category: "Stationery",
    price: 1950,
    rating: 4.9,
    reviewCount: 36,
    badge: "Limited",
    description: "Hardcover A5 faux-leather notebook with debossed Rotaract seal, ribbon bookmark, elastic closure band, and a weighted refillable ballpoint pen.",
    features: [
      "192 pages of 100gsm acid-free ivory paper",
      "Debossed Rotaract Club seal on cover",
      "Includes premium metal ballpoint pen with black ink",
      "Expandable back inner pocket for cards and notes"
    ],
    images: MERCHANDISE_IMAGES.journal,
    colors: [
      { name: "Cranberry Red", hex: "#a11c43" },
      { name: "Classic Navy", hex: "#1d2a44" },
      { name: "Tan Brown", hex: "#8b5a2b" }
    ],
    inStock: true,
    stockCount: 12,
    specs: {
      "Paper Size": "A5 (148 x 210 mm)",
      "Paper Weight": "100 GSM Ivory",
      "Included": "Journal + Metal Pen"
    }
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string, limit = 3): Product[] {
  return PRODUCTS.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
