import { useEffect, useRef, useState } from 'react';
import { Network, Shield, Users, Award, Building2, Globe2 } from 'lucide-react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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

  const stats = [
    { label: 'Years Combined Experience', value: '20+' },
    { label: 'Installed Rooms', value: '1000s' },
    { label: 'Global Locations Installed', value: '100s' }
  ];

  const tabs = [
    {
      icon: Building2,
      title: 'Our Company',
      content: 'Link Light Solutions is a premier network infrastructure company specializing in cutting-edge solutions for the hospitality industry. With over two decades of combined expertise, we\'ve established ourselves as industry leaders in network design and implementation across the Americas and beyond.'
    },
    {
      icon: Award,
      title: 'Our Mission',
      content: 'We strive to revolutionize hospitality networking by delivering state-of-the-art infrastructure solutions that enhance guest experiences and streamline operations. Our commitment to excellence drives us to continuously innovate and exceed industry standards.'
    },
    {
      icon: Globe2,
      title: 'Our Vision',
      content: 'To be the global leader in hospitality network solutions, setting new benchmarks for reliability, innovation, and customer satisfaction. We envision a future where seamless connectivity enhances every aspect of the hospitality experience worldwide.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gray-900 relative overflow-hidden" ref={sectionRef}>
      {/* Background Grid */}
      <div className="absolute inset-0 grid-background opacity-20"></div>
      
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Transforming Network Infrastructure
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Pioneering the future of hospitality networking with over two decades of combined expertise
            </p>
          </div>

          {/* Image and Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Server Room Illustration */}
            <div className="relative rounded-xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000"
                alt="Network Infrastructure"
                className="w-full h-full object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center transform transition-all duration-500 hover:scale-105"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs Section */}
          <div className="grid md:grid-cols-3 gap-8">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`group cursor-pointer bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 transition-all duration-500 hover:bg-white/10 ${
                  activeTab === index ? 'ring-2 ring-blue-500/50' : ''
                }`}
                onClick={() => setActiveTab(index)}
              >
                <tab.icon className="h-8 w-8 text-blue-400 mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-xl font-semibold text-white mb-4">{tab.title}</h3>
                <p className="text-gray-400 leading-relaxed">{tab.content}</p>
              </div>
            ))}
          </div>

          {/* Values Section */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Network,
                title: 'Innovation',
                description: 'Constantly pushing boundaries with cutting-edge network solutions'
              },
              {
                icon: Shield,
                title: 'Reliability',
                description: 'Delivering robust and secure infrastructure you can depend on'
              },
              {
                icon: Users,
                title: 'Partnership',
                description: 'Building lasting relationships through exceptional service'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="relative p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <value.icon className="h-8 w-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}