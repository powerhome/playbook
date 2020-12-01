const { environment } = require('@rails/webpacker')
const svg = require('./loaders/svg')

environment.loaders.insert('react-svg', svg)
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
fileLoader.exclude = svg.test

module.exports = environment
