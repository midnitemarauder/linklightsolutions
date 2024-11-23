import axios from 'axios';
import { Installation } from '../types/installation';
import { parseISO, isAfter } from 'date-fns';

const ZOHO_CONFIG = {
  clientId: import.meta.env.VITE_ZOHO_CLIENT_ID,
  clientSecret: import.meta.env.VITE_ZOHO_CLIENT_SECRET,
  calendarUid: import.meta.env.VITE_ZOHO_CALENDAR_UID,
  apiDomain: 'https://www.zohoapis.com',
  accountsDomain: 'https://accounts.zoho.com',
  scope: 'ZohoCalendar.calendar.READ'
};

interface ZohoTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

class TokenManager {
  private static instance: TokenManager;
  private accessToken: string | null = null;
  private refreshToken: string | null = localStorage.getItem('zohoRefreshToken');
  private expiresAt: number = 0;

  private constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.expiresAt) {
      return this.accessToken;
    }

    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    if (!ZOHO_CONFIG.clientId || !ZOHO_CONFIG.clientSecret) {
      throw new Error('Missing Zoho API credentials');
    }

    try {
      const response = await axios.post<ZohoTokenResponse>(
        `${ZOHO_CONFIG.accountsDomain}/oauth/v2/token`,
        null,
        {
          params: {
            refresh_token: this.refreshToken,
            client_id: ZOHO_CONFIG.clientId,
            client_secret: ZOHO_CONFIG.clientSecret,
            grant_type: 'refresh_token'
          }
        }
      );

      this.accessToken = response.data.access_token;
      this.expiresAt = Date.now() + (response.data.expires_in * 1000);
      
      if (response.data.refresh_token) {
        this.refreshToken = response.data.refresh_token;
        localStorage.setItem('zohoRefreshToken', response.data.refresh_token);
      }

      return this.accessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.accessToken = null;
      this.expiresAt = 0;
      localStorage.removeItem('zohoRefreshToken');
      throw new Error('Failed to refresh access token');
    }
  }

  setRefreshToken(token: string) {
    this.refreshToken = token;
    localStorage.setItem('zohoRefreshToken', token);
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    this.expiresAt = 0;
    localStorage.removeItem('zohoRefreshToken');
  }
}

export const fetchCalendarEvents = async (): Promise<Installation[]> => {
  if (!ZOHO_CONFIG.calendarUid) {
    throw new Error('Missing calendar UID');
  }

  const tokenManager = TokenManager.getInstance();

  try {
    const accessToken = await tokenManager.getAccessToken();
    const response = await axios.get(
      `${ZOHO_CONFIG.apiDomain}/calendar/v1/calendars/${ZOHO_CONFIG.calendarUid}/events`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          from: new Date().toISOString(),
          to: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
        }
      }
    );

    if (!response.data || !response.data.events) {
      throw new Error('Invalid response format from Zoho Calendar API');
    }

    return response.data.events.map((event: any) => ({
      id: event.uid || String(Math.random()),
      lat: parseFloat(event.location_coordinates?.latitude) || 0,
      lng: parseFloat(event.location_coordinates?.longitude) || 0,
      title: event.title || 'Untitled Event',
      description: event.description || '',
      status: isAfter(parseISO(event.end_time), new Date()) ? 'ongoing' : 'completed',
      date: event.start_time,
      address: event.location || '',
      clientName: event.custom_fields?.client_name || 'Unknown Client',
      projectType: event.custom_fields?.project_type || 'Network Installation',
      completionDate: event.end_time,
      technicians: event.attendees?.map((a: any) => a.email) || []
    }));
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    tokenManager.clearTokens(); // Clear invalid tokens
    throw error;
  }
};