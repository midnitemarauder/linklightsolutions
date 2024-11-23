import { Linkedin, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function LinkedInFeed() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const linkedInUsername = 'jvasquezyyc';

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
    <section className="py-16 bg-gray-50" ref={sectionRef}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center justify-center space-x-3 mb-8">
            <div className="bg-[#0A66C2] p-2 rounded-lg">
              <Linkedin className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Connect With Us</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-600 mb-6">
              Stay updated with our latest projects and network infrastructure insights
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={`https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=${linkedInUsername}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-[#0A66C2] text-white px-6 py-2.5 rounded-lg transition-all duration-300 hover:bg-[#004182] group w-full sm:w-auto"
              >
                <Linkedin className="h-5 w-5" />
                <span>Follow on LinkedIn</span>
              </a>
              
              <a 
                href="https://linkedin.com/company/linklightsolutions/posts"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-white text-[#0A66C2] border border-[#0A66C2] px-6 py-2.5 rounded-lg transition-all duration-300 hover:bg-[#0A66C2] hover:text-white group w-full sm:w-auto"
              >
                <span>View Updates</span>
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}