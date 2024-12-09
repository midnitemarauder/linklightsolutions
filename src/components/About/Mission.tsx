import { Shield } from 'lucide-react';
import MissionPoints from './MissionPoints';

export default function Mission() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
      <div className="flex flex-col justify-center space-y-6">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-blue-500 mr-3" />
          <h3 className="text-2xl font-bold text-white">Our Mission</h3>
        </div>
        
        <p className="text-gray-400 leading-relaxed">
          We strive to revolutionize hospitality networking by delivering state-of-the-art infrastructure solutions that enhance guest experiences and streamline operations. Our commitment to excellence drives us to continuously innovate and exceed industry standards.
        </p>
        
        <MissionPoints />
      </div>

      <div className="relative rounded-xl overflow-hidden group">
        <img
          src="https://stackblitz.com/storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMGFGSkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--d2e7f0d8f7c8d8f7c8d8f7c8d8f7c8d8f7c8d8f7/networktechnicians.png"
          alt="Network Technicians"
          className="w-full h-full object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
        
        {/* Interactive Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Scanning Line Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-transparent h-1/2 w-full animate-scan" />
        </div>
        
        {/* Tech Grid */}
        <div className="absolute inset-0 grid-background opacity-30" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
          <div className="space-y-2">
            <h4 className="text-xl font-semibold text-white">
              Expert Network Infrastructure
            </h4>
            <p className="text-blue-200/90 text-sm">
              Our team of certified professionals ensures reliable and secure network solutions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}