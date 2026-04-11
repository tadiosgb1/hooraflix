import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
   
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: 'all'
  },

  preview: {
    host: '0.0.0.0',
    port: 5173
  },

  optimizeDeps: {
    include: ['rtcpeerconnection-shim', 'sdp']
  },

  assetsInclude: ['**/*.PNG', '**/*.JPG', '**/*.jpeg', '**/*.gif', '**/*.svg']
})
