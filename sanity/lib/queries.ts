import { sanityClient } from './client';

// ─── GROQ-запросы ────────────────────────────────────────────────────────────

const heroSlidesQuery = `
  *[_type == "heroSlide"] | order(order asc) {
    _id, order, label, heading, subtitle, bodyItems, background,
    primaryButton, secondaryButton,
    desktopImage { asset->{ url } },
    mobileImage  { asset->{ url } }
  }
`;

const servicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id, order, title, description, tag,
    icon { asset->{ url } }
  }
`;

const pricingGroupsQuery = `
  *[_type == "pricingGroup"] | order(order asc) {
    _id, order, title,
    cards[] {
      title, price, priceSubtitle, note,
      isPopular, isBest, period, features, whatsappMessage
    }
  }
`;

const reviewsQuery = `
  *[_type == "review"] | order(order asc) {
    _id, name, meta, rating, text,
    photo { asset->{ url } }
  }
`;

const contactSectionQuery = `
  *[_type == "contactSection"][0] {
    heading, description,
    whatsappNumber, phone, telegramHandle,
    instagramHandle, facebookPage, studioAddress, studioMapLink
  }
`;

const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    siteName, seoTitle, seoDescription,
    whatsappNumber, phone, telegramHandle,
    instagramHandle, facebookPage, youtubeChannel,
    studioAddress, studioMapLink
  }
`;

// ─── Типы ────────────────────────────────────────────────────────────────────

export type HeroSlide = {
  _id: string;
  order: number;
  label?: string;
  heading?: string;
  subtitle?: string;
  bodyItems?: Array<{ title: string; description?: string }>;
  background?: 'white' | 'light' | 'dark';
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  desktopImage?: { asset: { url: string } };
  mobileImage?: { asset: { url: string } };
};

export type Service = {
  _id: string;
  order: number;
  title: string;
  description?: string;
  tag?: string;
  icon?: { asset: { url: string } };
};

export type PricingCardData = {
  title: string;
  price: number;
  priceSubtitle?: string;
  note?: string;
  isPopular?: boolean;
  isBest?: boolean;
  period?: string;
  features?: string[];
  whatsappMessage?: string;
};

export type PricingGroup = {
  _id: string;
  order: number;
  title: string;
  cards: PricingCardData[];
};

export type Review = {
  _id: string;
  name: string;
  meta?: string;
  rating: number;
  text: string;
  photo?: { asset: { url: string } };
};

export type ContactSectionData = {
  heading?: string;
  description?: string;
  whatsappNumber?: string;
  phone?: string;
  telegramHandle?: string;
  instagramHandle?: string;
  facebookPage?: string;
  studioAddress?: string;
  studioMapLink?: string;
};

export type SiteSettings = {
  siteName?: string;
  seoTitle?: string;
  seoDescription?: string;
  whatsappNumber?: string;
  phone?: string;
  telegramHandle?: string;
  instagramHandle?: string;
  facebookPage?: string;
  youtubeChannel?: string;
  studioAddress?: string;
  studioMapLink?: string;
};

// ─── Функции получения данных ─────────────────────────────────────────────────

export async function getHeroSlides(): Promise<HeroSlide[]> {
  return sanityClient.fetch(heroSlidesQuery);
}

export async function getServices(): Promise<Service[]> {
  return sanityClient.fetch(servicesQuery);
}

export async function getPricingGroups(): Promise<PricingGroup[]> {
  return sanityClient.fetch(pricingGroupsQuery);
}

export async function getReviews(): Promise<Review[]> {
  return sanityClient.fetch(reviewsQuery);
}

export async function getContactSection(): Promise<ContactSectionData | null> {
  return sanityClient.fetch(contactSectionQuery);
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(siteSettingsQuery);
}

// ─── Все данные для страницы одним запросом ───────────────────────────────────

export async function getAllPageData() {
  const [heroSlides, services, pricingGroups, reviews, contactSection, siteSettings] =
    await Promise.all([
      getHeroSlides(),
      getServices(),
      getPricingGroups(),
      getReviews(),
      getContactSection(),
      getSiteSettings(),
    ]);

  return { heroSlides, services, pricingGroups, reviews, contactSection, siteSettings };
}
