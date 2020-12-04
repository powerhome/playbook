const path = require('path')

const { environment } = require('@rails/webpacker')
const erb = require('./loaders/erb')
const svg = require('./loaders/svg')

environment.loaders.get('sass')
  .use.find((item) => item.loader === 'sass-loader')
  .options.includePaths = [path.resolve(__dirname, 'node_modules/trix')]

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

module.exports = environment
