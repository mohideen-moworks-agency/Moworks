// App-wide configuration
export const APP_CONFIG = {
  // Development configuration
  development: {
    allowedDomains: ['localhost', '127.0.0.1'],
    apiUrl: 'http://localhost:5173'
  },
  // Production configuration
  production: {
    allowedDomains: ['moworks-ai.web.app', 'moworks-ai.firebaseapp.com'],
    apiUrl: 'https://moworks-ai.web.app'
  }
}

export const isAllowedDomain = () => {
  const env = import.meta.env.MODE;
  const currentDomain = window.location.hostname;
  return APP_CONFIG[env as keyof typeof APP_CONFIG].allowedDomains.includes(currentDomain);
};