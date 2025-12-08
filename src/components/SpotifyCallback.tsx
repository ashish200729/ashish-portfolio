import { useEffect, useState } from 'react';
import { handleCallback } from '../services/spotify';

export default function SpotifyCallback() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const errorParam = params.get('error');

      if (errorParam) {
        setError(`Authentication failed: ${errorParam}`);
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
        return;
      }

      if (!code) {
        setError('No authorization code received');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
        return;
      }

      try {
        await handleCallback(code);
        window.location.href = '/';
      } catch (err) {
        console.error('Error handling callback:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      }
    };

    processCallback();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <>
            <div className="text-red-500 mb-4 text-lg">❌ {error}</div>
            <p className="text-gray-400">Redirecting back...</p>
          </>
        ) : (
          <>
            <div className="mb-4">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
            <p className="text-gray-400">Connecting to Spotify...</p>
          </>
        )}
      </div>
    </div>
  );
}
