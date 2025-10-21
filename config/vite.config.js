import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Optimized Vite configuration for alladsmarket.com
export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh for development
      fastRefresh: true,
      // Optimize JSX runtime
      jsxRuntime: 'automatic'
    })
  ],
  
  server: {
    port: 3000,
    host: true,
    open: true,
    // CORS configuration for alladsmarket.com
    cors: {
      origin: ['https://alladsmarket.com', 'https://www.alladsmarket.com', 'http://localhost:3000', 'http://localhost:3001'],
      credentials: true
    },
    // Proxy configuration for API calls
    proxy: {
      '/api': {
        target: 'https://alladsmarket.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    // Security headers for alladsmarket.com
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  },

  // Production build optimization
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild', // Use esbuild instead of terser for better React compatibility
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    
    // Rollup configuration
    rollupOptions: {
      output: {
        // Optimized chunk splitting
        manualChunks: {
          // Core React chunks
          'react-vendor': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          
          // UI libraries
          'ui-vendor': ['lucide-react'],
          
          // Utility libraries
          'utils-vendor': [],
          
          // Internationalization
          'i18n-vendor': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          
          // Toast notifications
          'toast-vendor': ['react-hot-toast']
        },
        
        // Optimized file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        
        // Asset optimization
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|svg|gif|webp|avif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${ext}`;
          }
          return `assets/[ext]/[name]-[hash].${ext}`;
        },
        
        // Add security headers and branding
        banner: `
          // AllAdsMarket.com - Secure E-commerce Platform
          // Generated: ${new Date().toISOString()}
          // Domain: alladsmarket.com
        `,
        footer: `
          // AllAdsMarket.com - End of Bundle
        `
      }
    }
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'lucide-react', 
      'i18next',
      'react-i18next',
      'i18next-browser-languagedetector',
      'react-hot-toast'
    ],
    force: true
  },

  // CSS optimization
  css: {
    devSourcemap: false
  },

  // Asset handling
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp', '**/*.avif'],

  // Environment variables for alladsmarket.com
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __DOMAIN__: JSON.stringify('alladsmarket.com'),
    __API_URL__: JSON.stringify('https://alladsmarket.com'),
    __SITE_URL__: JSON.stringify('https://alladsmarket.com'),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VITE_DOMAIN': JSON.stringify('alladsmarket.com'),
    'process.env.VITE_API_URL': JSON.stringify('https://alladsmarket.com'),
    'process.env.VITE_SITE_URL': JSON.stringify('https://alladsmarket.com')
  },

  // ESBuild optimization
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    target: 'es2020',
    jsx: 'automatic',
    jsxDev: false
  },

  // Base configuration for alladsmarket.com
  base: '/',

  // Performance optimization
  resolve: {
    alias: {
      '@': '/quick',
      '@components': '/quick/components',
      '@pages': '/quick/pages',
      '@styles': '/quick/styles',
      '@services': '/quick/services',
      '@utils': '/quick/utils',
      '@contexts': '/quick/contexts',
      '@hooks': '/quick/hooks',
      '@router': '/quick/router',
      '@assets': '/quick/assets'
    }
  },

  // Preview server
  preview: {
    port: 3000,
    host: true,
    open: true,
    cors: {
      origin: ['https://alladsmarket.com', 'https://www.alladsmarket.com'],
      credentials: true
    }
  }
})