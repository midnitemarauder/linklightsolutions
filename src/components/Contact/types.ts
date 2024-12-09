import { ReactNode } from 'react';

export interface ContactInfo {
  icon: JSX.Element;
  title: string;
  content: string;
  linkedContent?: ReactNode;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
}