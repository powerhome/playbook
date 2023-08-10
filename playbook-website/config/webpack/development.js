process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const environment = require('./environment')

environment.config.merge({
  plugins: [
    new BundleAnalyzerPlugin({
      generateStatsFile: true,
    }),
  ],
})

module.exports = environment.toWebpackConfig()
