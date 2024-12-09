import { Mail, Phone, Linkedin, ExternalLink, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { sendEmail, initEmailJS } from '../lib/emailjs';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactInfo {
  icon: JSX.Element;
  title: string;
  content: string;
  linkedContent?: React.ReactNode;
}

const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  message: ''
};

const COMPANY_LINKEDIN_URL = 'https://linkedin.com/company/linklightsolutions';

const CONTACT_INFO: ContactInfo[] = [
  { 
    icon: <Mail className="h-6 w-6 text-blue-600 mt-1" />, 
    title: "Email Us", 
    content: "info@linklight.solutions" 
  },
  { 
    icon: <Phone className="h-6 w-6 text-blue-600 mt-1" />, 
    title: "Call Us", 
    content: "+1 (403) 596-6368" 
  },
  {
    icon: <Linkedin className="h-6 w-6 text-[#0A66C2] mt-1" />,
    title: "Connect With Us",
    content: "Follow us on LinkedIn",
    linkedContent: (
      <div className="flex flex-col space-y-2 mt-2">
        <a 
          href={COMPANY_LINKEDIN_URL}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 bg-[#0A66C2] text-white px-4 py-1.5 rounded-lg transition-all duration-300 hover:bg-[#004182] group text-sm"
        >
          <Linkedin className="h-4 w-4" />
          <span>Follow on LinkedIn</span>
        </a>
        <a 
          href={`${COMPANY_LINKEDIN_URL}/posts`}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 bg-white text-[#0A66C2] border border-[#0A66C2] px-4 py-1.5 rounded-lg transition-all duration-300 hover:bg-[#0A66C2] hover:text-white group text-sm"
        >
          <span>View Updates</span>
          <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    )
  }
];

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    initEmailJS();

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const result = await sendEmail(formRef.current);

      if (result.text === 'OK') {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! We\'ll get back to you soon.'
        });
        setFormData(INITIAL_FORM_DATA);
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white scroll-mt-20" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your network infrastructure? Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className={`bg-gray-50 p-8 rounded-xl transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="from_name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-300 hover:shadow-md"
                />
              </div>

              <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="from_email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-300 hover:shadow-md"
                />
              </div>

              <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-300 hover:shadow-md"
                />
              </div>

              {status.message && (
                <div className={`p-4 rounded-lg ${
                  status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:bg-blue-700 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          <div className={`space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            {CONTACT_INFO.map((item, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-4 transform transition-all duration-300 hover:translate-x-2"
              >
                <div className="animate-float">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.content}</p>
                  {item.linkedContent}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}