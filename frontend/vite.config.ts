import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy : { "/api" : "http://localhost:8000" },
    host: 'localhost',
    port: 3000
  },
})
