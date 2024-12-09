import { Mail, Phone, Linkedin } from 'lucide-react';
import LinkedContent from './LinkedContent';
import type { ContactInfo } from './types';

export const COMPANY_LINKEDIN_URL = 'https://linkedin.com/company/linklightsolutions';

export const CONTACT_INFO: ContactInfo[] = [
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
      <LinkedContent 
        url={COMPANY_LINKEDIN_URL}
        postsUrl={`${COMPANY_LINKEDIN_URL}/posts`}
      />
    )
  }
];

export const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  message: ''
};