import { resolve } from 'path';
import Buffer from 'buffer';
import RubyPlugin from 'vite-plugin-ruby';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

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
  },
  build: {
    manifest: true,
  },
  plugins: [
    // react(),
    RubyPlugin(),
    viteCommonjs(),
  ],
  resolve: {
    alias: {
      '@fonts': '../node_modules/@powerhome/power-fonts/fonts',
      'site_styles': resolve(__dirname, 'app/javascript/site_styles'),
      'components': resolve(__dirname, 'app/javascript/components'),
      'website': resolve(__dirname, 'app/javascript/components/Website'),
      'images': resolve(__dirname, 'app/javascript/images'),
      'scripts': resolve(__dirname, 'app/javascript/scripts'),
      'utils': resolve(__dirname, 'app/javascript/utilities'),
      'playbook-tokens': 'playbook-ui/dist/tokens',
      'playbook-kits': resolve(__dirname, '../playbook/app/pb_kits/playbook'),
    },
  },
};

export default config;
