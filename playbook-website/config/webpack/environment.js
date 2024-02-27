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
