import Navbar from "@/components/site/navbar";
import Hero from "@/components/site/hero";
import TopBar from "@/components/site/topbar";
import BrandHighlights from "@/components/site/brand-highlights";
import Products from "@/components/site/products";
import ManufacturingProcess from "@/components/site/manufacturing-process";
import About from "@/components/site/about";
import QualityCommitment from "@/components/site/quality";
import Testimonials from "@/components/site/testimonials";
import CallToAction from "@/components/site/cta";
import Contact from "@/components/site/contact";
import Footer from "@/components/site/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BrandHighlights />
        <Products />
        <About />
        <ManufacturingProcess />
        <QualityCommitment />
        <Testimonials />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
