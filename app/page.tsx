import DisclaimerGate from "@/components/DisclaimerGate";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { About, Approach, CallToAction, Contact, PracticeAreas, PracticeMarquee, Values } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <DisclaimerGate />
      <Header />
      <main className="flex-1">
        <Hero />
        <Values />
        <PracticeMarquee />
        <About />
        <PracticeAreas />
        <Approach />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
