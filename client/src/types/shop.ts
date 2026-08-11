export type ProductCategory = 
  | "All"
  | "Apparel"
  | "Accessories"
  | "Pins & Badges"
  | "Drinkware"
  | "Stationery";

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number; // in KSh (KES)
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  images: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  inStock: boolean;
  stockCount: number;
  badge?: "Popular" | "New" | "Limited" | "Sale";
  specs?: Record<string, string>;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
}

export type FulfillmentMethod = "pickup" | "courier";
export type PaymentMethod = "mpesa" | "card" | "delivery";

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  fulfillmentMethod: FulfillmentMethod;
  deliveryAddress?: string;
  city?: string;
  pickupLocation?: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  promoCode?: string;
}

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  customer: CheckoutFormData;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
}
