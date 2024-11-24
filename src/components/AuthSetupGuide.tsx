import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { APP_CONFIG } from '../config/app-config';

function AuthSetupGuide({ error }: { error: string }) {
  const isUnauthorizedDomain = error.includes('auth/unauthorized-domain') || 
                              error.includes('domain is not authorized');
  const env = import.meta.env.MODE;
  const domains = APP_CONFIG[env as keyof typeof APP_CONFIG].allowedDomains;

  if (!isUnauthorizedDomain) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Authentication Setup Required</h3>
            <p className="mt-2 text-sm text-gray-600">
              To enable authentication, please add your development domain to Firebase:
            </p>
            <ol className="mt-4 space-y-3 text-sm text-gray-600">
              <li>1. Go to the <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Firebase Console</a></li>
              <li>2. Select your project</li>
              <li>3. Navigate to Authentication → Settings → Authorized domains</li>
              <li>4. Click "Add domain"</li>
              <li>5. Add the following domain{domains.length > 1 ? 's' : ''}:
                <ul className="mt-2 space-y-1">
                  {domains.map(domain => (
                    <li key={domain}>
                      <code className="bg-gray-100 px-2 py-1 rounded">{domain}</code>
                    </li>
                  ))}
                </ul>
              </li>
            </ol>
            <p className="mt-4 text-sm text-gray-600">
              After adding the domain{domains.length > 1 ? 's' : ''}, refresh this page to try again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthSetupGuide;