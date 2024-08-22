<<<<<<< HEAD
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
=======
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
>>>>>>> main
  return {
    define: {
      'process.env': env
    },
    plugins: [react()],
<<<<<<< HEAD
  }
})
=======
  };
});
>>>>>>> main
