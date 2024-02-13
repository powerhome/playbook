const path = require('path')

const { environment } = require('@rails/webpacker')

environment.loaders.insert('javascript', {
  test: /\.(js|jsx)$/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  },
  include: path.resolve(__dirname, '../../app'),
})

environment.loaders.prepend('svgr', {
  test: /\.svg$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'packs/images', // Optionally specify a directory within the output path
      }
    },
    {
      loader: '@svgr/webpack',
      options: {
        svgoConfig: {
          plugins: [
            { removeViewBox: false }
          ]
        }
      }
    }
  ],
  include: [
    path.resolve(__dirname, '../../../node_modules/@powerhome/playbook-icons/icons'),
    path.resolve(__dirname, '../../public'),
  ],
})

// Don't let file entry stomp on SVGs
environment.loaders.get('file').test = /(.jpg|.jpeg|.png|.gif|.tiff|.ico|.eot|.otf|.ttf|.woff|.woff2)$/i
environment.loaders.get('file').include = path.resolve(__dirname, '../../app')

environment.loaders.append('image', {
  test: /\.(svg)$/,
  use: {
    loader: 'file-loader',
  },
  include: [
    path.resolve(__dirname, '../../app')
  ],
})

// Allow ESM modules
environment.config.merge({
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
})

environment.config.merge({
  optimization: {
    runtimeChunk: 'single',
    splitChunks: { chunks: 'all' },
    removeAvailableModules: false,
    removeEmptyChunks: true,
  },
})


module.exports = environment
