import { resolve } from 'path'
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

export default defineConfig({
  build: {
    manifest: true,
  },
  plugins: [
    RubyPlugin(),
    viteCommonjs()
  ],
  resolve: {
    alias: {
      'site_styles': resolve(__dirname, 'app/javascript/site_styles'),
      'components': resolve(__dirname, 'app/javascript/components'),
      'website': resolve(__dirname, 'app/javascript/components/Website'),
      'images': resolve(__dirname, 'app/javascript/images'),
      'scripts': resolve(__dirname, 'app/javascript/scripts'),
      'utils': resolve(__dirname, 'app/javascript/utilities'),
    }
  }
})
