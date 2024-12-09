import Navbar from '../components/Navbar';
import Hero3 from '../components/Hero3';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <Navbar />
      <main>
        <Hero3 />
        <Services />
        <About />
        <Contact />
      </main>
    </div>
  );
}