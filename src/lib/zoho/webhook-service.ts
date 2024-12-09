import axios from 'axios';
import { ZOHO_CONFIG } from './config';
import TokenManager from './token-manager';
import type { Installation } from '../../types/installation';

export class WebhookService {
  private static instance: WebhookService;
  private tokenManager: TokenManager;

  private constructor() {
    this.tokenManager = TokenManager.getInstance();
  }

  static getInstance(): WebhookService {
    if (!WebhookService.instance) {
      WebhookService.instance = new WebhookService();
    }
    return WebhookService.instance;
  }

  async registerWebhook(notificationUrl: string) {
    try {
      const accessToken = await this.tokenManager.getAccessToken();
      
      const response = await axios.post(
        `${ZOHO_CONFIG.apiDomain}/calendar/v1/webhooks`,
        {
          url: notificationUrl,
          events: ['CREATE', 'UPDATE', 'DELETE'],
          channelExpiry: null // Never expire
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to register webhook:', error);
      throw error;
    }
  }

  async handleWebhookEvent(event: any): Promise<Installation | null> {
    // Validate webhook signature
    if (!this.validateWebhookSignature(event)) {
      throw new Error('Invalid webhook signature');
    }

    const { type, data } = event;

    switch (type) {
      case 'CREATE':
      case 'UPDATE':
        return this.transformEventData(data);
      case 'DELETE':
        return null;
      default:
        throw new Error(`Unsupported webhook event type: ${type}`);
    }
  }

  private validateWebhookSignature(event: any): boolean {
    // Implement webhook signature validation
    // This should match the signature from Zoho with your webhook secret
    return true; // Placeholder
  }

  private transformEventData(data: any): Installation {
    return {
      id: data.uid,
      lat: parseFloat(data.location_coordinates?.latitude) || 0,
      lng: parseFloat(data.location_coordinates?.longitude) || 0,
      title: data.title,
      description: data.description || '',
      status: 'ongoing',
      date: data.start_time,
      address: data.location || '',
      clientName: data.custom_fields?.client_name || 'Confidential',
      projectType: data.custom_fields?.project_type || 'Network Installation',
      completionDate: data.end_time,
      technicians: data.attendees?.map((a: any) => a.email) || []
    };
  }
}