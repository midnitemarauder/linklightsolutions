import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleAuthCallback } from '../../lib/zoho/auth';
import LoadingState from '../shared/LoadingState';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (!code) {
      setError('Authorization code not found');
      return;
    }

    handleAuthCallback(code)
      .then(() => {
        navigate('/', { replace: true });
      })
      .catch(err => {
        console.error('Auth callback error:', err);
        setError('Failed to complete authentication');
      });
  }, [searchParams, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-500/10 text-red-400 p-6 rounded-lg max-w-md text-center">
          <h2 className="text-xl font-semibold mb-2">Authentication Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <LoadingState message="Completing authentication..." />
    </div>
  );
}