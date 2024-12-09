import axios from 'axios';
import { parseISO, isAfter } from 'date-fns';
import { ZOHO_CONFIG } from './config';
import TokenManager from './token-manager';
import type { ZohoEventsResponse, ZohoEvent } from './types';
import type { Installation } from '../../types/installation';

export default class CalendarService {
  private static instance: CalendarService;
  private tokenManager: TokenManager;
  private cache: {
    events: Installation[];
    timestamp: number;
  } | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private constructor() {
    this.tokenManager = TokenManager.getInstance();
  }

  static getInstance(): CalendarService {
    if (!CalendarService.instance) {
      CalendarService.instance = new CalendarService();
    }
    return CalendarService.instance;
  }

  private transformEvent(event: ZohoEvent): Installation {
    return {
      id: event.uid || String(Math.random()),
      lat: parseFloat(event.location_coordinates?.latitude) || 0,
      lng: parseFloat(event.location_coordinates?.longitude) || 0,
      title: event.title || 'Untitled Event',
      description: event.description || '',
      status: isAfter(parseISO(event.end_time), new Date()) ? 'ongoing' : 'completed',
      date: event.start_time,
      address: event.location || '',
      clientName: event.custom_fields?.client_name || 'Confidential',
      projectType: event.custom_fields?.project_type || 'Network Installation',
      completionDate: event.end_time,
      technicians: event.attendees?.map(a => a.email) || []
    };
  }

  private async validateConfig() {
    if (!ZOHO_CONFIG.calendarUid) {
      throw new Error('Missing Zoho Calendar UID');
    }
    if (!ZOHO_CONFIG.clientId || !ZOHO_CONFIG.clientSecret) {
      throw new Error('Missing Zoho API credentials');
    }
  }

  async fetchEvents(forceRefresh = false): Promise<Installation[]> {
    try {
      await this.validateConfig();

      // Return cached data if available and not expired
      if (!forceRefresh && this.cache && Date.now() - this.cache.timestamp < this.CACHE_DURATION) {
        return this.cache.events;
      }

      const accessToken = await this.tokenManager.getAccessToken();
      
      const response = await axios.get<ZohoEventsResponse>(
        `${ZOHO_CONFIG.apiDomain}/calendar/v1/calendars/${ZOHO_CONFIG.calendarUid}/events`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Accept': 'application/json'
          },
          params: {
            from: new Date().toISOString(),
            to: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
            showAttendees: true,
            includeCustomFields: true
          }
        }
      );

      if (!response.data?.events) {
        throw new Error('Invalid response format from Zoho Calendar API');
      }

      const installations = response.data.events.map(this.transformEvent);
      
      // Update cache
      this.cache = {
        events: installations,
        timestamp: Date.now()
      };

      return installations;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          this.tokenManager.clearTokens();
          throw new Error('Authentication failed. Please reconnect your calendar.');
        }
        throw new Error(`Calendar API error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }
}