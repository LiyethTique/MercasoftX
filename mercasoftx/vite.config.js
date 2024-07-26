import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import html from '@vitejs/plugin-html-swc';
// import {urls} from './'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // html(),
    // otros plugins que puedas necesitar
  ],
  optimizeDeps: {
    exclude: [
      'mock-aws-s3',
      'aws-sdk',
      'nock',
      'pg-hstore',
      // otros módulos que desees excluir
    ],
  },
});
