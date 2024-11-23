import { useState, useEffect, useCallback } from 'react';
import { fetchCalendarEvents } from '../lib/calendar';
import type { Installation } from '../types/installation';

// Fallback data when calendar is not connected
const FALLBACK_INSTALLATIONS: Installation[] = [
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
    completionDate: '2024-04-01',
    technicians: []
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
    completionDate: '2024-03-20',
    technicians: []
  },
  {
    id: '3',
    lat: 38.9072,
    lng: -77.0369,
    title: 'Washington Hilton',
    description: 'Full network infrastructure implementation',
    status: 'ongoing',
    date: '2024-03-10',
    address: 'Washington, DC',
    clientName: 'Hilton',
    projectType: 'Network Implementation',
    completionDate: '2024-04-15',
    technicians: []
  },
  {
    id: '4',
    lat: 30.4383,
    lng: -97.6201,
    title: 'Spark by Hilton North Folk',
    description: 'Network system installation and configuration',
    status: 'ongoing',
    date: '2024-03-12',
    address: 'North Folk, TX',
    clientName: 'Hilton',
    projectType: 'New Installation',
    completionDate: '2024-04-10',
    technicians: []
  },
  {
    id: '5',
    lat: 39.0497,
    lng: -84.6680,
    title: 'Hampton Inn & Suites Cincinnati Airport South',
    description: 'Network upgrade and expansion',
    status: 'ongoing',
    date: '2024-03-15',
    address: 'Cincinnati, OH',
    clientName: 'Hilton',
    projectType: 'Network Upgrade',
    completionDate: '2024-04-05',
    technicians: []
  },
  {
    id: '6',
    lat: 32.4683,
    lng: -93.7819,
    title: 'Hilton Garden Inn Shreveport',
    description: 'Complete network infrastructure overhaul',
    status: 'ongoing',
    date: '2024-03-18',
    address: 'Shreveport, LA',
    clientName: 'Hilton',
    projectType: 'Infrastructure Overhaul',
    completionDate: '2024-04-20',
    technicians: []
  },
  {
    id: '7',
    lat: 35.7721,
    lng: -78.6386,
    title: 'Hampton Inn Raleigh Clayton I40',
    description: 'Network system modernization',
    status: 'ongoing',
    date: '2024-03-20',
    address: 'Raleigh, NC',
    clientName: 'Hilton',
    projectType: 'System Modernization',
    completionDate: '2024-04-15',
    technicians: []
  },
  // Completed Projects
  {
    id: '8',
    lat: 18.4655,
    lng: -66.1057,
    title: 'Condado Plaza',
    description: 'Full network infrastructure deployment',
    status: 'completed',
    date: '2023-11-01',
    address: 'San Juan, PR',
    clientName: 'Hilton',
    projectType: 'Network Deployment',
    completionDate: '2024-01-15',
    technicians: []
  },
  {
    id: '9',
    lat: 38.0522,
    lng: -122.5536,
    title: 'Courtyard Novato Marin Sonoma',
    description: 'Network system implementation',
    status: 'completed',
    date: '2023-10-15',
    address: 'Novato, CA',
    clientName: 'Marriott',
    projectType: 'System Implementation',
    completionDate: '2023-12-20',
    technicians: []
  },
  {
    id: '10',
    lat: 40.0583,
    lng: -75.3055,
    title: 'Courtyard Philadelphia Bensalem',
    description: 'Network infrastructure upgrade',
    status: 'completed',
    date: '2023-09-01',
    address: 'Bensalem, PA',
    clientName: 'Marriott',
    projectType: 'Infrastructure Upgrade',
    completionDate: '2023-11-15',
    technicians: []
  },
  {
    id: '11',
    lat: 40.7589,
    lng: -73.9851,
    title: 'Fairfield Inn & Suites Times Square',
    description: 'Complete network overhaul',
    status: 'completed',
    date: '2023-08-15',
    address: 'New York, NY',
    clientName: 'Marriott',
    projectType: 'Network Overhaul',
    completionDate: '2023-10-30',
    technicians: []
  },
  {
    id: '12',
    lat: 41.1399,
    lng: -100.7601,
    title: 'Fairfield Inn Suites North Platte',
    description: 'Network modernization project',
    status: 'completed',
    date: '2023-07-01',
    address: 'North Platte, NE',
    clientName: 'Marriott',
    projectType: 'Network Modernization',
    completionDate: '2023-09-15',
    technicians: []
  },
  {
    id: '13',
    lat: 39.7684,
    lng: -86.2720,
    title: 'Hampton Inn & Suites Indianapolis',
    description: 'Network infrastructure implementation',
    status: 'completed',
    date: '2023-06-15',
    address: 'Indianapolis, IN',
    clientName: 'Hilton',
    projectType: 'Infrastructure Implementation',
    completionDate: '2023-08-30',
    technicians: []
  },
  {
    id: '14',
    lat: 39.6303,
    lng: -106.0356,
    title: 'Hampton Inn & Suites Silverthorne',
    description: 'Complete network installation',
    status: 'completed',
    date: '2023-05-01',
    address: 'Silverthorne, CO',
    clientName: 'Hilton',
    projectType: 'Network Installation',
    completionDate: '2023-07-15',
    technicians: []
  },
  {
    id: '15',
    lat: 32.2988,
    lng: -90.1848,
    title: 'Hilton Garden Inn Jackson',
    description: 'Network system upgrade',
    status: 'completed',
    date: '2023-04-15',
    address: 'Jackson, MS',
    clientName: 'Hilton',
    projectType: 'System Upgrade',
    completionDate: '2023-06-30',
    technicians: []
  },
  {
    id: '16',
    lat: 39.9867,
    lng: -75.3972,
    title: 'Hilton Garden Inn Newtown Square',
    description: 'Network infrastructure deployment',
    status: 'completed',
    date: '2023-03-01',
    address: 'Newtown Square, PA',
    clientName: 'Hilton',
    projectType: 'Infrastructure Deployment',
    completionDate: '2023-05-15',
    technicians: []
  },
  {
    id: '17',
    lat: 44.0121,
    lng: -92.4802,
    title: 'Home2 Suites by Hilton Rochester',
    description: 'Full network implementation',
    status: 'completed',
    date: '2023-02-15',
    address: 'Rochester, MN',
    clientName: 'Hilton',
    projectType: 'Network Implementation',
    completionDate: '2023-04-30',
    technicians: []
  },
  {
    id: '18',
    lat: 38.8977,
    lng: -77.0365,
    title: 'Marriott Marquis Washington DC',
    description: 'Complete system overhaul',
    status: 'completed',
    date: '2023-01-15',
    address: 'Washington, DC',
    clientName: 'Marriott',
    projectType: 'System Overhaul',
    completionDate: '2023-03-30',
    technicians: []
  },
  {
    id: '19',
    lat: 38.8048,
    lng: -77.0469,
    title: 'Residence Inn Alexandria',
    description: 'Network upgrade project',
    status: 'completed',
    date: '2022-12-01',
    address: 'Alexandria, VA',
    clientName: 'Marriott',
    projectType: 'Network Upgrade',
    completionDate: '2023-02-15',
    technicians: []
  },
  {
    id: '20',
    lat: 38.9847,
    lng: -77.4558,
    title: 'Residence Inn Dulles Airport',
    description: 'Infrastructure modernization',
    status: 'completed',
    date: '2022-11-15',
    address: 'Dulles, VA',
    clientName: 'Marriott',
    projectType: 'Infrastructure Modernization',
    completionDate: '2023-01-30',
    technicians: []
  }
];

export function useInstallations() {
  const [installations, setInstallations] = useState<Installation[]>(FALLBACK_INSTALLATIONS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInstallations = useCallback(async () => {
    try {
      const data = await fetchCalendarEvents();
      if (data && data.length > 0) {
        setInstallations(data);
        setError(null);
      } else {
        setError('Using fallback installation data');
      }
    } catch (err) {
      console.error('Error loading installations:', err);
      setError('Using fallback installation data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInstallations();
    // Refresh every 5 minutes
    const interval = setInterval(loadInstallations, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadInstallations]);

  return { installations, loading, error, refetch: loadInstallations };
}