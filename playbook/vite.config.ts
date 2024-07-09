import { defineConfig } from 'vite'
import { resolve } from 'path';
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import cssExport from 'vite-plugin-css-export'

export default defineConfig({
  build: {
    manifest: true,
    outDir: resolve(__dirname, './vite-build'),
  },
  plugins: [
    react(),
    RubyPlugin(),
    cssExport({
      include: resolve(__dirname, 'app/pb_kits/playbook/tokens/exports/*.scss'),
    }),
  ],
  resolve: {
    alias: {
      'kits': resolve(__dirname, 'app/pb_kits/playbook'),
      'tokens': resolve(__dirname, 'app/pb_kits/playbook/tokens'),
      'utilities': resolve(__dirname, 'app/pb_kits/playbook/utilities'),
      'playbook-ui': resolve(__dirname, 'app/entrypoints/index'),
    },
  },
})
