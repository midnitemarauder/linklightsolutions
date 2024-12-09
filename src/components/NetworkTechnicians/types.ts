export interface Technician {
  id: string;
  name: string;
  role: string;
  certifications: string[];
  image: string;
}

export interface TechnicianCardProps {
  technician: Technician;
}

export interface NetworkTechniciansProps {
  title?: string;
  subtitle?: string;
}