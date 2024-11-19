import { Network, Server, Shield, Cloud, Settings, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Services() {
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

  const services = [
    {
      icon: <Network className="h-8 w-8 text-blue-600" />,
      title: "Network Design & Implementation",
      description: "Custom network solutions designed to meet your specific business requirements."
    },
    {
      icon: <Server className="h-8 w-8 text-blue-600" />,
      title: "Infrastructure Management",
      description: "24/7 monitoring and management of your critical network infrastructure."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Security Solutions",
      description: "Comprehensive security measures to protect your network from threats."
    },
    {
      icon: <Cloud className="h-8 w-8 text-blue-600" />,
      title: "Cloud Integration",
      description: "Seamless integration of cloud services with your existing infrastructure."
    },
    {
      icon: <Settings className="h-8 w-8 text-blue-600" />,
      title: "Network Optimization",
      description: "Performance tuning and optimization for maximum efficiency."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Consulting Services",
      description: "Expert guidance on network strategy and technology decisions."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive network solutions to power your business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group"
            >
              <div className="group-hover:animate-float">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}