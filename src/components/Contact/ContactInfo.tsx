import { ReactNode } from 'react';

interface ContactInfoProps {
  icon: JSX.Element;
  title: string;
  content: string;
  linkedContent?: ReactNode;
}

export default function ContactInfo({ icon, title, content, linkedContent }: ContactInfoProps) {
  return (
    <div className="flex items-start space-x-4 transform transition-all duration-300 hover:translate-x-2">
      <div className="animate-float">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{content}</p>
        {linkedContent}
      </div>
    </div>
  );
}