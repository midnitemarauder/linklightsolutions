export interface ZohoConfig {
  clientId: string;
  clientSecret: string;
  calendarUid: string;
  apiDomain: string;
  accountsDomain: string;
  scope: string;
}

export interface ZohoTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface ZohoEvent {
  uid: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  location?: string;
  location_coordinates?: {
    latitude: string;
    longitude: string;
  };
  custom_fields?: {
    client_name?: string;
    project_type?: string;
  };
  attendees?: Array<{
    email: string;
  }>;
}

export interface ZohoEventsResponse {
  events: ZohoEvent[];
}