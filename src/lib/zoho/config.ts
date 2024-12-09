import { ZohoConfig } from './types';

export const ZOHO_CONFIG: ZohoConfig = {
  clientId: import.meta.env.VITE_ZOHO_CLIENT_ID,
  clientSecret: import.meta.env.VITE_ZOHO_CLIENT_SECRET,
  calendarUid: import.meta.env.VITE_ZOHO_CALENDAR_UID,
  apiDomain: 'https://www.zohoapis.com',
  accountsDomain: 'https://accounts.zoho.com',
  scope: 'ZohoCalendar.calendar.READ'
} as const;

export const STORAGE_KEYS = {
  REFRESH_TOKEN: 'zoho_refresh_token',
  ACCESS_TOKEN: 'zoho_access_token',
  EXPIRES_AT: 'zoho_expires_at'
} as const;