import { generateAuthUrl } from '../../lib/zoho/auth';
import Button from '../shared/Button';

export default function AuthPrompt() {
  const handleAuth = () => {
    const authUrl = generateAuthUrl();
    window.location.href = authUrl;
  };

  return (
    <div className="rounded-xl bg-white/5 backdrop-blur-sm p-8 text-center">
      <h3 className="text-xl font-semibold text-white mb-4">
        Calendar Authentication Required
      </h3>
      <p className="text-gray-400 mb-6">
        To view live installation data, please authenticate with Zoho Calendar
      </p>
      <Button onClick={handleAuth}>
        Connect Calendar
      </Button>
    </div>
  );
}