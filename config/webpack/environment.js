const { environment } = require('@rails/webpacker')
const erb = require('./loaders/erb')

// Swap sass-loader for fast-sass-loader
require('./loaders/fast-sass-loader').use(environment)

// Add .erb loader
environment.loaders.prepend('erb', erb)

module.exports = environment
