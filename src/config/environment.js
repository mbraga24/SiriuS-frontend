// Environment Configuration
export const config = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api/v1',
  environment: process.env.REACT_APP_ENVIRONMENT || 'development',
  debug: process.env.REACT_APP_DEBUG === 'true',
  isProduction: process.env.REACT_APP_ENVIRONMENT === 'production',
  isDevelopment: process.env.REACT_APP_ENVIRONMENT === 'development'
};

// Environment validation
if (!process.env.REACT_APP_API_BASE_URL && config.isProduction) {
  console.warn('Warning: REACT_APP_API_BASE_URL not set in production environment');
}

export default config;