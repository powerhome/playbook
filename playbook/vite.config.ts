import { defineConfig } from 'vite'
import { resolve } from 'path';
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy'
import consolidate from './app/javascript/rollup/consolidate-plugin';
import cssUrl from './app/javascript/rollup/css-url-plugin';
import { env } from 'process';

const isProduction = env.NODE_ENV === 'production'

export default defineConfig({
  optimizeDeps: {
    exclude: ['tiptap/react'],
  },
  build: {
    minify: isProduction ? 'terser' : false,
    terserOptions: {
      mangle: false,
      compress: false,
    },
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      input: {
        'chunks/vendor.js': resolve(__dirname, 'app/entrypoints/playbook.js'),
      },
      output: {
        assetFileNames: ({name}) => {
          if (name?.endsWith('.css')) {
            const updatedName = name.replace('entrypoints/', '')
            if (updatedName.charAt(0) === '_') return `styles/${name.slice(1)}`
            return updatedName
          }
          return 'assets/[name].[ext]'
        },
        entryFileNames: ({name}) => {
          let updatedName = `${name.replace('entrypoints/', '')}`
          const [fileName, ext] = updatedName.split('.')
          if (['tsx', 'ts', 'jsx'].includes(ext)) updatedName = `${fileName}.js`
          return updatedName
        },
        chunkFileNames: 'chunks/[name]-[hash].js',
        dir: resolve(__dirname, 'dist'),
        sourcemap: !isProduction,
        manualChunks: {
          'lib': [
            resolve(__dirname, 'app/javascript/dashboard.js'),
            resolve(__dirname, 'app/javascript/plugins.js'),
            resolve(__dirname, 'app/javascript/tokens.js'),
            resolve(__dirname, 'app/javascript/theme.js'),
          ],
        },
      },
      external: [
        'maplibre-gl',
        'react',
        'react/jsx-runtime',
        'react-dom',
        'react-is',
        'trix',
        'react-trix',
        'tiptap/react',
        'highcharts',
        'highcharts-react-official',
        'highcharts/highcharts-more',
        'highcharts/modules/solid-gauge',
      ],
    },
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    }
  },
  plugins: [
    react(),
    RubyPlugin(),
    copy({
      targets: [
        {
          src: resolve(__dirname, 'app/pb_kits/playbook/tokens/*.scss'),
          dest: 'dist/tokens',
          rename: (name, extension) => `${name.replace('_', '')}.${extension}`,
        },
      ]
    }),
    consolidate({
      groups: [
        {
            files: [
              resolve(__dirname, 'dist/playbook.css'),
              resolve(__dirname, 'dist/lib.css'),
            ],
            outputFile: resolve(__dirname, 'dist/playbook.css'),
        }
      ],
    }),
    cssUrl(),
  ],
  resolve: {
    dedupe: ['playbook'],
    alias: {
      'kits': resolve(__dirname, 'app/pb_kits/playbook'),
      'tokens': resolve(__dirname, 'app/pb_kits/playbook/tokens'),
      'utilities': resolve(__dirname, 'app/pb_kits/playbook/utilities'),
      'playbook-ui': resolve(__dirname, 'app/entrypoints/playbook'),
    },
  },
})
