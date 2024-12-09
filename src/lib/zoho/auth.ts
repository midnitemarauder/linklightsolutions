import { ZOHO_CONFIG } from './config';
import TokenManager from './token-manager';

export function generateAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: ZOHO_CONFIG.clientId,
    response_type: 'code',
    scope: ZOHO_CONFIG.scope,
    access_type: 'offline',
    redirect_uri: window.location.origin + '/auth/callback',
    prompt: 'consent'
  });

  return `${ZOHO_CONFIG.accountsDomain}/oauth/v2/auth?${params.toString()}`;
}

export async function handleAuthCallback(code: string): Promise<void> {
  const params = new URLSearchParams({
    code,
    client_id: ZOHO_CONFIG.clientId,
    client_secret: ZOHO_CONFIG.clientSecret,
    redirect_uri: window.location.origin + '/auth/callback',
    grant_type: 'authorization_code'
  });

  const response = await fetch(
    `${ZOHO_CONFIG.accountsDomain}/oauth/v2/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    }
  );

  if (!response.ok) {
    throw new Error('Failed to exchange code for tokens');
  }

  const data = await response.json();
  const tokenManager = TokenManager.getInstance();
  tokenManager.setRefreshToken(data.refresh_token);
}