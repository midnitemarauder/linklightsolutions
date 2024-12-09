import type { Technician } from './types';

export const TECHNICIANS: Technician[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Senior Network Engineer',
    certifications: ['CCIE', 'CCNP', 'AWS Certified'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Infrastructure Specialist',
    certifications: ['CCNA', 'Microsoft Certified'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'Security Expert',
    certifications: ['CISSP', 'CompTIA Security+'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300'
  }
];