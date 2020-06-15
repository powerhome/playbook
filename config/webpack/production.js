process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')
const TerserPlugin = require('terser-webpack-plugin')

environment.optimization = {
  minimize: true,
  minimizer: [new TerserPlugin({cache: true})],
}

module.exports = environment.toWebpackConfig()
