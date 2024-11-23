import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Installations from './components/Installations';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Installations />
      <Contact />
      
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Link Light Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;