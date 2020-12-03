const { environment } = require('@rails/webpacker')

const ExternalModules = /node_modules\/(?!playbook-ui\/app)/

const SvgLoader = {
  test: /\.svg$/,
  exclude: ExternalModules,
  use: [
    {
      loader: 'svg-url-loader',
      options: {
        limit: 10000,
      },
    },
  ],
}

const BabelLoader = {
  test: /\.(js|jsx|mjs)$/,
  exclude: ExternalModules,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  },
}

const fileLoader = environment.loaders.get('file')
fileLoader.exclude = SvgLoader.test

environment.loaders.insert('react-svg', SvgLoader)
environment.loaders.insert('javascript', BabelLoader)

module.exports = environment
