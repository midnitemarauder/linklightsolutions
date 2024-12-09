import { ExternalLink, Linkedin } from 'lucide-react';

interface LinkedContentProps {
  url: string;
  postsUrl: string;
}

export default function LinkedContent({ url, postsUrl }: LinkedContentProps) {
  return (
    <div className="flex flex-col space-y-2 mt-2">
      <a 
        href={url}
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center space-x-2 bg-[#0A66C2] text-white px-4 py-1.5 rounded-lg transition-all duration-300 hover:bg-[#004182] group text-sm"
      >
        <Linkedin className="h-4 w-4" />
        <span>Follow on LinkedIn</span>
      </a>
      <a 
        href={postsUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center space-x-2 bg-white text-[#0A66C2] border border-[#0A66C2] px-4 py-1.5 rounded-lg transition-all duration-300 hover:bg-[#0A66C2] hover:text-white group text-sm"
      >
        <span>View Updates</span>
        <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
}