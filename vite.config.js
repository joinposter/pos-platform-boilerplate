import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/js/app.jsx'),
      formats: ['umd'],
      name: 'bundle',
      fileName: 'bundle',
    },
  },
  plugins: [
    cssInjectedByJsPlugin(),
    mkcert(),
    react({
      include: '**/*.{jsx}',
    }),
  ],
});
