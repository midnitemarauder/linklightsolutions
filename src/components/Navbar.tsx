import { Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { scrollToSection } from '../lib/scroll';

const NAV_ITEMS = [
  { label: 'Services', href: 'services' },
  { label: 'About', href: 'about' },
  { label: 'Solutions', href: 'solutions' }
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsOpen(false);
  };
  
  const navigateToDashboard = () => {
    navigate('/hr-dashboard');
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Logo />
          
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleNavClick(href)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                  scrolled
                    ? 'text-gray-300 hover:text-white hover:bg-white/10'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white transition-all duration-300 transform hover:scale-105 text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25"
            >
              Contact Us
            </button>
            <button
              onClick={navigateToDashboard}
              className="ml-2 px-3 py-2 rounded-lg bg-gray-700 text-white transition-all duration-300 hover:bg-gray-600 flex items-center"
              aria-label="HR Dashboard"
            >
              <User className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">HR</span>
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`transform transition-all duration-300 md:hidden ${
          isOpen
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute right-0 top-20 w-64 p-4 bg-gray-900/95 backdrop-blur-lg shadow-xl rounded-l-2xl border border-white/10">
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleNavClick(href)}
                className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className="mt-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg transition-all duration-200 text-center hover:shadow-lg hover:shadow-blue-500/25"
            >
              Contact Us
            </button>
            <button
              onClick={navigateToDashboard}
              className="mt-2 px-4 py-3 bg-gray-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center hover:bg-gray-600"
            >
              <User className="h-4 w-4 mr-2" />
              <span>HR Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
