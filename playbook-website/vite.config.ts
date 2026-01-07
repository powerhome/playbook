import { resolve } from 'path';
import Buffer from 'buffer';
import RubyPlugin from 'vite-plugin-ruby';

const config = {
  define: {
    'process.env': process.env,
    'Buffer': Buffer,
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: resolve(__dirname, '..'),
    },
    warmup: {
      clientFiles: [
        '../playbook/dist/playbook.css'
      ]
    }
  },
  build: {
    manifest: true,
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        includePaths: [
          resolve(__dirname, '../playbook/app/pb_kits/playbook'),
          resolve(__dirname, '../playbook/app/pb_kits/playbook/tokens'),
          resolve(__dirname, '../playbook/app/entrypoints'),
        ],
      }
    }
  },
  plugins: [
    RubyPlugin(),
  ],
  resolve: {
    alias: {
      'fonts': resolve(__dirname, 'app/javascript/fonts'),
      'site_styles': resolve(__dirname, 'app/javascript/site_styles'),
      'components': resolve(__dirname, 'app/javascript/components'),
      'website': resolve(__dirname, 'app/javascript/components/Website'),
      'images': resolve(__dirname, 'app/javascript/images'),
      'scripts': resolve(__dirname, 'app/javascript/scripts'),
      'utils': resolve(__dirname, 'app/javascript/utilities'),
  'utilities': resolve(__dirname, '../playbook/app/pb_kits/playbook/utilities'),
  'tokens': resolve(__dirname, '../playbook/app/pb_kits/playbook/tokens'),
      'kits': resolve(__dirname, '../playbook/app/pb_kits/playbook'),
      'playbook-ui/dist/reset': resolve(__dirname, '../playbook/app/entrypoints/reset.scss'),
      'playbook-ui/dist/playbook': resolve(__dirname, '../playbook/app/entrypoints/playbook.scss'),
      'playbook-ui/dist/playbook-rails.js': resolve(__dirname, '../playbook/app/entrypoints/playbook-rails.js'),
      'playbook-ui/dist/tokens': resolve(__dirname, '../playbook/dist/tokens'),
      'playbook-ui/charts': resolve(__dirname, '../playbook/app/entrypoints/playbook-charts.js'),
      'playbook-ui': resolve(__dirname, '../playbook/app/entrypoints/playbook.js'),
      'playbook-tokens': resolve(__dirname, '../playbook/dist/tokens'),
      'playbook-kits': resolve(__dirname, '../playbook/app/pb_kits/playbook'),
    },
  },
};

export default config;
