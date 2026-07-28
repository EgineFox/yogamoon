import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import { getSiteSettings } from '@/../sanity/lib/queries';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const fallbackMetadata: Metadata = {
  title: 'Yogamoon | Ирина Лындина | Йога в Раанане',
  description:
    'Индивидуальные и групповые занятия йогой в Раанане (Израиль). Хатха-йога, йога-нидра, йогатерапия ОДА, онлайн-клуб. Мягко, безопасно, осознанно.',
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSiteSettings();

    return {
      title: settings?.seoTitle ?? fallbackMetadata.title,
      description: settings?.seoDescription ?? fallbackMetadata.description,
    };
  } catch {
    return fallbackMetadata;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
