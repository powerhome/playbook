// const path = require('path')

const { environment } = require('@rails/webpacker')

environment.loaders.insert('javascript', {
  test: /\.(js|jsx|mjs)$/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  },
  exclude: /(node_modules|playbook-ui)/,
})

module.exports = environment
