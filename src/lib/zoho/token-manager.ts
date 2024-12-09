import axios from 'axios';
import { ZOHO_CONFIG, STORAGE_KEYS } from './config';
import type { ZohoTokenResponse } from './types';

class TokenManager {
  private static instance: TokenManager;
  private accessToken: string | null = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  private refreshToken: string | null = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  private expiresAt: number = Number(localStorage.getItem(STORAGE_KEYS.EXPIRES_AT)) || 0;

  private constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  getStoredRefreshToken(): string | null {
    return this.refreshToken;
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
      
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, this.accessToken);
      localStorage.setItem(STORAGE_KEYS.EXPIRES_AT, this.expiresAt.toString());
      
      if (response.data.refresh_token) {
        this.refreshToken = response.data.refresh_token;
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refresh_token);
      }

      return this.accessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearTokens();
      throw new Error('Failed to refresh access token');
    }
  }

  setRefreshToken(token: string) {
    this.refreshToken = token;
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    this.expiresAt = 0;
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.EXPIRES_AT);
  }
}

export default TokenManager;