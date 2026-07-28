import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About"; 
import Services from "@/components/Services/Services";
import Pricing from "@/components/Pricing/Pricing";
import Reviews from "@/components/Reviews/Reviews";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Nav from "@/components/Nav/Nav";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Pricing />
        <Reviews />
        <div id="contact" className={styles.contactScreen}>
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
