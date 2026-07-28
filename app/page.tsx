import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import Pricing from "@/components/Pricing/Pricing";
import Reviews from "@/components/Reviews/Reviews";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Nav from "@/components/Nav/Nav";
import styles from "./page.module.css";
import { getAllPageData } from "@/../sanity/lib/queries";

export default async function Home() {
  // Получаем все данные из Sanity.
  // Если Sanity ещё не настроен, возвращаются пустые массивы/null —
  // компоненты автоматически используют встроенные данные.
  let sanityData = {
    heroSlides: [] as Awaited<ReturnType<typeof getAllPageData>>['heroSlides'],
    services: [] as Awaited<ReturnType<typeof getAllPageData>>['services'],
    pricingGroups: [] as Awaited<ReturnType<typeof getAllPageData>>['pricingGroups'],
    reviews: [] as Awaited<ReturnType<typeof getAllPageData>>['reviews'],
    contactSection: null as Awaited<ReturnType<typeof getAllPageData>>['contactSection'],
    siteSettings: null as Awaited<ReturnType<typeof getAllPageData>>['siteSettings'],
  };

  try {
    sanityData = await getAllPageData();
  } catch {
    // Sanity не настроен — компоненты используют встроенные данные
  }

  const { heroSlides, services, pricingGroups, reviews, contactSection, siteSettings } = sanityData;

  return (
    <>
      <Nav siteName={siteSettings?.siteName} />
      <main>
        <Hero slides={heroSlides.length ? heroSlides : undefined} />
        <About />
        <Services services={services.length ? services : undefined} />
        <Pricing groups={pricingGroups.length ? pricingGroups : undefined} />
        <Reviews reviews={reviews.length ? reviews : undefined} />
        <div id="contact" className={styles.contactScreen}>
          <Contact contactData={contactSection ?? undefined} siteSettings={siteSettings ?? undefined} />
          <Footer siteSettings={siteSettings ?? undefined} />
        </div>
      </main>
    </>
  );
}
