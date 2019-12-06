process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const environment = require('./environment')

environment.plugins.append(
  'CleanWebpackPlugin',
  new CleanWebpackPlugin({
    root: path.resolve(__dirname, '../../public'),
    verbose: true,
  })
)

module.exports = environment.toWebpackConfig()
