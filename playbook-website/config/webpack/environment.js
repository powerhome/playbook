const path = require('path')

const { environment } = require('@rails/webpacker')

const babelLoader = environment.loaders.get('babel')
babelLoader.test = /\.(js|jsx|ts|tsx)?(\.erb)?$/

const nodeLoader = environment.loaders.get('nodeModules')
nodeLoader.exclude = [
  nodeLoader.exclude,
  /node_modules\/@powerhome\/playbook-icons-react/
]

environment.loaders.prepend('ESM', {
  test: /\.mjs$/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  },
  // include: /node_modules/,
  type: 'javascript/auto',
})

environment.loaders.prepend('svgr', {
  test: /\.(svg)$/,
  use: {
    loader: '@svgr/webpack',
    options: {
      svgoConfig: {
        plugins: [
          { removeViewBox: false }
        ]
      }
    }
  },
  include: [
    path.resolve(__dirname, '../../../node_modules/@powerhome/playbook-icons/icons')
  ],
})

// Don't let file entry stomp on SVGs
environment.loaders.get('file').test = /(.jpg|.jpeg|.png|.gif|.tiff|.ico|.eot|.otf|.ttf|.woff|.woff2)$/i
environment.loaders.get('file').include = path.resolve(__dirname, '../../app')

environment.loaders.append('image', {
  test: /\.(svg)$/,
  use: {
    loader: 'file-loader',
  },
  include: [
    path.resolve(__dirname, '../../app')
  ],
})

environment.config.merge({
  optimization: {
    runtimeChunk: 'single',
    splitChunks: { chunks: 'all' },
    removeAvailableModules: false,
    removeEmptyChunks: true,
  },
})

module.exports = environment
