import { Linkedin, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function LinkedInFeed() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const companyName = import.meta.env.VITE_COMPANY_NAME;

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
    <section className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Connected</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our journey and stay updated with our latest news and insights
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className={`lg:w-1/3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#0A66C2] p-3 rounded-lg animate-pulse">
                    <Linkedin className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Link Light Solutions</h3>
                    <p className="text-gray-600">Technology & Services</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">Join our professional network for the latest updates in network infrastructure and technology solutions.</p>
                <a 
                  href={`https://linkedin.com/company/${companyName}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#0A66C2] text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-[#004182] transform hover:scale-105 group"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>Follow Us on LinkedIn</span>
                  <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          <div className={`lg:w-2/3 bg-white p-6 rounded-xl shadow-lg transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="linkedin-feed-container min-h-[600px] relative overflow-hidden rounded-lg">
              <div 
                className="linkedin-profile"
                dangerouslySetInnerHTML={{
                  __html: `
                    <script src="https://platform.linkedin.com/in.js" type="text/javascript">
                      lang: en_US
                    </script>
                    <script type="IN/OrganizationProfile" 
                      data-id="${companyName}"
                      data-format="inline" 
                      data-related="false" 
                      data-supported-themes="light dark">
                    </script>
                  `
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}