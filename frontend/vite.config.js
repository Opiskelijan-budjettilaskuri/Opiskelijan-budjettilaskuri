import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  //highlight-next-line
  base: '/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
