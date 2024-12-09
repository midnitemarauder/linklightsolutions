import { scrollToSection } from '../../lib/scroll';

export default function HeroActions() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-16">
      <button 
        onClick={() => scrollToSection('contact')}
        className="group relative px-8 py-3 rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-0.5"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient" />
        <span className="relative text-white font-medium flex items-center">
          Get Started
          <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
        </span>
      </button>
      
      <button 
        onClick={() => scrollToSection('services')}
        className="px-8 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-0.5 border border-white/20"
      >
        <span className="font-medium flex items-center">
          Learn More
          <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
        </span>
      </button>
    </div>
  );
}