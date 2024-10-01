import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Asegúrate de importar path

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'process.env': env,
    },
    plugins: [react()],
    resolve: {
      alias: {
        'jwt-decode': path.resolve(__dirname, 'node_modules/jwt-decode/build/jwt-decode.esm.js'),
      },
    },
  };
});
