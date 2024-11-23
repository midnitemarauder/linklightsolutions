export interface Installation {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
  status: 'completed' | 'ongoing';
  date: string;
  address: string;
  clientName: string;
  projectType: string;
  completionDate: string;
  technicians: string[];
}