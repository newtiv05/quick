// AllAdsMarket.com Configuration
export const alladsmarketConfig = {
  // Domain Configuration
  domain: 'alladsmarket.com',
  apiUrl: 'https://alladsmarket.com',
  siteUrl: 'https://alladsmarket.com',
  
  // Application Information
  appName: 'AllAdsMarket',
  appVersion: '2.0.0',
  description: 'Secure and reliable e-commerce platform',
  
  // Security Configuration
  security: {
    enableCORS: true,
    enableCSP: true,
    enableHSTS: true,
    allowedOrigins: [
      'https://alladsmarket.com',
      'https://www.alladsmarket.com',
      'http://localhost:3000',
      'http://localhost:3001'
    ]
  },
  
  // Performance Configuration
  performance: {
    enablePWA: true,
    enableServiceWorker: true,
    cacheStrategy: 'aggressive',
    enableCompression: true,
    enableMinification: true
  },
  
  // SEO Configuration
  seo: {
    title: 'AllAdsMarket - E-commerce Platform',
    description: 'Secure and reliable e-commerce platform for all your shopping needs',
    keywords: 'e-commerce,shopping,online store,secure payment',
    ogImage: '/og-image.jpg',
    twitterCard: '/twitter-card.jpg'
  },
  
  // Analytics Configuration
  analytics: {
    enabled: true,
    trackingId: 'alladsmarket-analytics',
    enableErrorTracking: true,
    enablePerformanceTracking: true
  },
  
  // API Configuration
  api: {
    baseUrl: 'https://alladsmarket.com/api',
    timeout: 30000,
    retryAttempts: 3,
    enableCaching: true
  },
  
  // Build Configuration
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    enableTreeShaking: true
  }
};

export default alladsmarketConfig;
