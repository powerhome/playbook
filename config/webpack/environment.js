const { environment } = require('@rails/webpacker')
const erb = require('./loaders/erb')
const svg = require('./loaders/svg')

// Swap sass-loader for fast-sass-loader
require('./loaders/fast-sass-loader').use(environment)

environment.loaders.insert('react-svg', svg, { before: 'file' })

environment.loaders.insert('javascript', {
  test: /\.(js|jsx|mjs)$/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  },
  exclude: /(node_modules)/,
})

const fileLoader = environment.loaders.get('file')
fileLoader.exclude = /\.(svg)$/i

// Add .erb loader
environment.loaders.prepend('erb', erb)

environment.splitChunks()

module.exports = environment
