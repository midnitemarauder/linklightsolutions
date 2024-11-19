import { Mail, Phone, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your network infrastructure? Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className={`bg-gray-50 p-8 rounded-xl transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <form className="space-y-6">
              <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-300 hover:shadow-md"
                  placeholder="Your name"
                />
              </div>
              <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-300 hover:shadow-md"
                  placeholder="your@email.com"
                />
              </div>
              <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-300 hover:shadow-md"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:bg-blue-700 hover:scale-105 hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {[
              { icon: <Mail className="h-6 w-6 text-blue-600 mt-1" />, title: "Email Us", content: "contact@linklight.solutions" },
              { icon: <Phone className="h-6 w-6 text-blue-600 mt-1" />, title: "Call Us", content: "+1 (403) 596-6368" },
              { icon: <MapPin className="h-6 w-6 text-blue-600 mt-1" />, title: "Find Us", content: "Central Alberta, Canada" }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4 transform transition-all duration-300 hover:translate-x-2">
                <div className="animate-float">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
