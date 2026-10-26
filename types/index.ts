export interface ProductItem {
  name: string;
  quantity: string;
  description: string;
  image?: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface OfferPackage {
  id: string;
  badge?: string;
  popular?: boolean;
  title: string;
  arabicTitle?: string;
  tagline: string;
  arabicTagline?: string;
  resolution: string;
  cameraCount: number;
  hasAudio: boolean;
  price: {
    hardwareOnly: number;
    withInstallation: number;
    currency: string;
    originalPrice?: number;
  };
  mainImage: string;
  gallery: string[];
  features: string[];
  specs?: SpecItem[];
  itemsIncluded: ProductItem[];
  installationIncluded?: string[];
  faqs?: FaqItem[];
  idealFor: string;
}

export interface HomeService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  features: string[];
  tag: string;
}

export interface OrderData {
  packId: string;
  packTitle: string;
  clientName: string;
  phone: string;
  city: string;
  address?: string;
  includeInstallation: boolean;
  notes?: string;
  priceLabel?: string;
  pageUrl?: string;
}
