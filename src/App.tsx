import { useSmoothScroll } from "./lib/smoothScroll";
import { Nav } from "./components/sections/Nav";
import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { Philosophy } from "./components/sections/Philosophy";
import { Process } from "./components/sections/Process";
import { Careers } from "./components/sections/Careers";
import { CTA } from "./components/sections/CTA";
import { Footer } from "./components/sections/Footer";
import { ContactModal } from "./components/ContactModal";
import { WhatsAppButton } from "./components/WhatsAppButton";

function App() {
  useSmoothScroll();

  return (
    <div id="top">
      <Nav />
      <Hero />
      <main>
        <Services />
        <Philosophy />
        <Process />
        <Careers />
        <CTA />
      </main>
      <Footer />
      <ContactModal />
      <WhatsAppButton />
    </div>
  );
}

export default App;
