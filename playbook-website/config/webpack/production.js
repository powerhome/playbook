process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')
const TerserPlugin = require('terser-webpack-plugin')

environment.config.merge({ devtool: 'none' })
environment.optimization = {
  minimize: true,
  minimizer: [new TerserPlugin({
    cache: true,
    exclude: /(node_modules|playbook-ui)/
  })],
}

module.exports = environment.toWebpackConfig()
