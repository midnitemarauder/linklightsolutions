import { useState, useEffect } from 'react';
import { AutoSync } from '../lib/zoho/auto-sync';
import TokenManager from '../lib/zoho/token-manager';
import type { Installation } from '../types/installation';

const STATIC_INSTALLATIONS: Installation[] = [
  {
    id: '1',
    lat: 48.4467,
    lng: -89.2750,
    title: 'Thunder Bay Installation',
    description: 'Major network infrastructure upgrade',
    status: 'ongoing',
    date: '2024-03-01',
    address: 'Thunder Bay, ON',
    clientName: 'Confidential',
    projectType: 'Network Upgrade',
    completionDate: '2024-04-15',
    technicians: []
  },
  {
    id: '2',
    lat: 51.0447,
    lng: -114.0719,
    title: 'Calgary Downtown Project',
    description: 'Hotel network infrastructure deployment',
    status: 'ongoing',
    date: '2024-03-15',
    address: 'Calgary, AB',
    clientName: 'Confidential',
    projectType: 'New Installation',
    completionDate: '2024-05-01',
    technicians: []
  },
  {
    id: '3',
    lat: 43.6532,
    lng: -79.3832,
    title: 'Toronto Hotel Network',
    description: 'Complete network overhaul',
    status: 'completed',
    date: '2024-02-01',
    address: 'Toronto, ON',
    clientName: 'Confidential',
    projectType: 'Network Overhaul',
    completionDate: '2024-02-28',
    technicians: []
  },
  {
    id: '4',
    lat: 45.5017,
    lng: -73.5673,
    title: 'Montreal Installation',
    description: 'Hospitality network deployment',
    status: 'completed',
    date: '2024-01-15',
    address: 'Montreal, QC',
    clientName: 'Confidential',
    projectType: 'New Installation',
    completionDate: '2024-02-15',
    technicians: []
  }
];

export function useInstallations() {
  const [installations, setInstallations] = useState<Installation[]>(STATIC_INSTALLATIONS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const tokenManager = TokenManager.getInstance();
    setIsAuthenticated(Boolean(tokenManager.getStoredRefreshToken()));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const autoSync = AutoSync.getInstance();
    
    const handleUpdate = (newInstallations: Installation[]) => {
      setInstallations(newInstallations.length > 0 ? newInstallations : STATIC_INSTALLATIONS);
      setError(null);
      setLoading(false);
    };

    const handleError = (err: Error) => {
      console.error('Failed to fetch installations:', err);
      setError('Unable to load live installation data. Showing demo data.');
      setInstallations(STATIC_INSTALLATIONS);
      setLoading(false);
    };

    try {
      autoSync.startSync(handleUpdate);
    } catch (err) {
      handleError(err instanceof Error ? err : new Error('Failed to start auto-sync'));
    }

    return () => {
      autoSync.stopSync();
    };
  }, [isAuthenticated]);

  return { 
    installations, 
    loading, 
    error,
    isAuthenticated 
  };
}