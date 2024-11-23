import { useState, useEffect } from 'react';
import type { Installation } from '../types/installation';

// Static installation data
const INSTALLATIONS: Installation[] = [
  // Current/Ongoing Projects
  {
    id: '1',
    lat: 44.0805,
    lng: -103.2310,
    title: 'Hotel Alex Johnson Rapid City',
    description: 'Network infrastructure upgrade and implementation',
    status: 'ongoing',
    date: '2024-03-01',
    address: 'Rapid City, SD',
    clientName: 'Curio Collection by Hilton',
    projectType: 'Network Upgrade',
    completionDate: '2024-04-01'
  },
  {
    id: '2',
    lat: 48.4467,
    lng: -89.2750,
    title: 'Hampton Inn & Suites Thunder Bay',
    description: 'Complete network installation',
    status: 'ongoing',
    date: '2024-03-05',
    address: 'Thunder Bay, ON',
    clientName: 'Hilton',
    projectType: 'New Installation',
    completionDate: '2024-03-20'
  },
  // Add more installations as needed...
];

export function useInstallations() {
  const [installations, setInstallations] = useState<Installation[]>(INSTALLATIONS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading for smoother UI transitions
    setLoading(true);
    setTimeout(() => {
      setInstallations(INSTALLATIONS);
      setLoading(false);
    }, 500);
  }, []);

  return { installations, loading };
}