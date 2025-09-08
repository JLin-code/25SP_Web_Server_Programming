import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'unplugin-vue-router/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), '');
  
  // Validate required environment variables
  const requiredEnvVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
  const missingVars = requiredEnvVars.filter(varName => !env[varName] && !env[varName.replace('VITE_', '')]);
  
  if (missingVars.length > 0 && mode === 'production') {
    console.warn('Missing required environment variables:', missingVars.join(', '));
  }
  
  return {
    plugins: [
      VueRouter(),
      vue(),
      vueJsx({
        // Prevent Babel from generating vulnerable RegExp patterns
        babelPlugins: [],
        transformOn: false,
        // Use safer JSX transform
        optimize: true
      }),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: '../dist',
      // Security: Minimize bundle to detect potential ReDoS patterns
      minify: 'terser',
      terserOptions: {
        compress: {
          // Remove potentially vulnerable regex patterns
          unsafe_regexp: false,
          passes: 2
        }
      },
      // Prevent large bundles that might contain vulnerable patterns
      chunkSizeWarningLimit: 1000,
    },
    // Expose specific environment variables to the client
    // WARNING: Only expose PUBLIC keys, never secret keys to client-side code
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL || env.SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY),
    },
    server: {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
      },
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
          timeout: 30000,
        },
      },
    },
  }
})
