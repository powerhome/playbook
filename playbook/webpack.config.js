const path = require('path')

const webpack = require('webpack')

const SOURCE_PATH = path.resolve(__dirname, 'app/pb_kits/playbook')
const DIST_PATH = path.resolve(__dirname, 'dist')
const NODE_MODULES_PATH = path.resolve(__dirname, '../node_modules')
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Copy tokens and fonts to dist
const CopyPlugin = require('copy-webpack-plugin')
const COPY_PLUGIN_CONFIG = new CopyPlugin({
  patterns: [
    {
      from: `${SOURCE_PATH}/tokens`,
      globOptions: {
        ignore: ['**/exports/**'],
      },
      to: `${DIST_PATH}/tokens`,
      transformPath(targetPath) {
        return targetPath.replace(/^tokens\/_/, 'tokens/')
      },
    },
    {
      from: path.resolve(__dirname, 'fonts'),
      to: `${DIST_PATH}/fonts`,
    },
  ],
  options: {
    concurrency: 100,
  },
})

const BABEL_JS_CONFIG = {
  test: /\.(js|jsx|mjs)$/,
  use: 'babel-loader',
  include: SOURCE_PATH,
  exclude: /node_modules/,
}

const CSS_LOADER_CONFIG = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: '[name]',
      getLocalIdent: (_context, _localIdentName, localName) => localName,
    },
    sourceMap: true,
  },
}

const SASS_LOADER_CONFIG = {
  loader: 'sass-loader',
  options: {
    sassOptions: {
      includePaths: [NODE_MODULES_PATH],
    },
  },
}

const SVG_URL_LOADER = {
  test: /\.svg$/,
  include: SOURCE_PATH,
  exclude: /node_modules/,
  use: [
    {
      loader: 'svg-url-loader',
      options: {
        limit: 10000,
      },
    },
  ],
}

new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
})

module.exports = {
  entry: {
    'playbook-react': `${SOURCE_PATH}/index.js`,
    'playbook-rails': `${SOURCE_PATH}/playbook-rails.js`,
    'playbook-doc': `${SOURCE_PATH}/playbook-doc.js`,
    'reset.css': `${SOURCE_PATH}/_reset.scss`,
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'trix': 'trix',
    'webpacker-react': 'webpacker-react',
  },
  resolve: {
    // Extensions used (in the specified order order)to resolve imports w/o an explicit extension
    extensions: [
      '.js',
      '.jsx',
    ],
    modules: [
      SOURCE_PATH,
      NODE_MODULES_PATH,
    ],
  },
  resolveLoader: {
    modules: [
      NODE_MODULES_PATH,
    ],
  },
  optimization: { minimize: !IS_DEVELOPMENT },
  output: {
    libraryTarget: 'umd',
    filename: '[name].js',
    path: DIST_PATH,
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    COPY_PLUGIN_CONFIG,
  ],
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          CSS_LOADER_CONFIG,
          SASS_LOADER_CONFIG,
        ],
      },
      BABEL_JS_CONFIG,
      SVG_URL_LOADER,
    ],
  },
}
