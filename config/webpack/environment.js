const { environment } = require('@rails/webpacker')
const erb = require('./loaders/erb')

// Swap sass-loader for fast-sass-loader
require('./loaders/fast-sass-loader').use(environment)

environment.loaders.insert('javascript', {
  test: /\.(js|jsx|mjs)$/,
  use: 'babel-loader',
  exclude: /node_modules(?!\/playbook-ui)/,
})

// Add .erb loader
environment.loaders.prepend('erb', erb)

module.exports = environment
