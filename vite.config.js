import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080
  },
  envPrefix: 'REACT_',
  resolve: {
    alias: {
      '~': resolve(__dirname, './src')
    }
  }
});
