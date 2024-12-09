import { Building2, Award, Globe2, Network, Shield, Users } from 'lucide-react';
import type { Tab, Stat, MissionPoint, CompanyValue } from './types';

export const TABS: Tab[] = [
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

export const STATS: Stat[] = [
  { value: '20+', label: 'Years Combined Experience' },
  { value: '1000s', label: 'Installed Rooms' },
  { value: '100s', label: 'Global Locations Installed' }
];

export const MISSION_POINTS: MissionPoint[] = [
  { id: 'mp1', text: 'Delivering cutting-edge network solutions' },
  { id: 'mp2', text: 'Ensuring 24/7 reliability and support' },
  { id: 'mp3', text: 'Maintaining highest security standards' },
  { id: 'mp4', text: 'Providing scalable infrastructure' }
];

export const COMPANY_VALUES: CompanyValue[] = [
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
];