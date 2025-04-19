import { defineConfig } from 'vite'
import { resolve } from 'path'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy'
import consolidate from './app/javascript/rollup/consolidate-plugin'
import cssUrl from './app/javascript/rollup/css-url-plugin'
import { env } from 'process'

const isProduction = env.NODE_ENV === 'production'
const isCdn        = env.CDN_BUILD    === 'true'

// always run these
const corePlugins = [
  react(),
  RubyPlugin(),
]

// only for normal build
const cssPlugins = [
  copy({
    targets: [
      {
        src: resolve(__dirname, 'app/pb_kits/playbook/tokens/*.scss'),
        dest: 'dist/tokens',
        rename: (n, ext) => `${n.replace('_','')}.${ext}`,
      },
      {
        src: resolve(__dirname, 'app/pb_kits/playbook/pb_bar_graph/BarGraphStyles.scss'),
        dest: 'dist/pb_bar_graph/',
      },
    ],
  }),
  consolidate({
    groups: [{
      files: [
        resolve(__dirname, 'dist/playbook.css'),
        resolve(__dirname, 'dist/lib.css'),
      ],
      outputFile: resolve(__dirname, 'dist/playbook.css'),
    }],
  }),
  cssUrl(),
]

export default defineConfig({
  base: isCdn ? '' : undefined,
  build: {
    outDir: isCdn ? 'dist/cdn' : 'dist',
    minify: isProduction ? 'terser' : false,
    terserOptions: { mangle: false, compress: false },

    ...(isCdn
      ? {
          lib: {
            entry: resolve(__dirname, 'app/entrypoints/playbook.js'),
            name: 'Playbook',
            formats: ['es'],
            fileName: () => 'playbook.js',
          },
          rollupOptions: {
            external: [
              'maplibre-gl','react','react/jsx-runtime','react-dom',
              'react-is','trix','react-trix','webpacker-react',
            ],
            output: {
              entryFileNames:  'playbook.js',
              chunkFileNames:  '[name]-[hash].js',
              assetFileNames:  '[name].[ext]',
            },
          },
        }
      : {
          rollupOptions: {
            input: {
              'chunks/vendor.js': resolve(__dirname, 'app/entrypoints/playbook.js'),
            },
            output: {
              assetFileNames: ({name}) => {
                if (name?.endsWith('.css')) {
                  const n = name.replace('entrypoints/','')
                  return n.charAt(0)==='_' ? `styles/${n.slice(1)}` : n
                }
                return 'assets/[name].[ext]'
              },
              entryFileNames: ({name}) => {
                const u = name.replace('entrypoints/','')
                const [f,ext] = u.split('.')
                return ['tsx','ts','jsx'].includes(ext) ? `${f}.js` : u
              },
              chunkFileNames: 'chunks/[name]-[hash].js',
              dir:    resolve(__dirname,'dist'),
              sourcemap: !isProduction,
              manualChunks: {
                lib: [
                  resolve(__dirname,'app/javascript/dashboard.js'),
                  resolve(__dirname,'app/javascript/plugins.js'),
                  resolve(__dirname,'app/javascript/tokens.js'),
                  resolve(__dirname,'app/javascript/theme.js'),
                ],
              },
            },
            external: [
              'maplibre-gl','react','react/jsx-runtime','react-dom',
              'react-is','trix','react-trix','webpacker-react',
            ],
          },
        }
    ),
  },

  css: {
    modules: { generateScopedName: '[name]__[local]___[hash:base64:5]' }
  },

  plugins: isCdn ? corePlugins : [...corePlugins, ...cssPlugins],

  resolve: {
    dedupe: ['playbook'],
    alias: {
      kits:       resolve(__dirname,'app/pb_kits/playbook'),
      tokens:     resolve(__dirname,'app/pb_kits/playbook/tokens'),
      utilities:  resolve(__dirname,'app/pb_kits/playbook/utilities'),
      'playbook-ui': resolve(__dirname,'app/entrypoints/playbook'),
    },
  },
})
