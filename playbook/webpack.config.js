const path = require('path')

const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Copy tokens and fonts to dist
const CopyPlugin = require('copy-webpack-plugin')
const COPY_PLUGIN_CONFIG = new CopyPlugin({
  patterns: [
    {
      from: path.resolve(__dirname, 'app/pb_kits/playbook/tokens'),
      globOptions: {
        ignore: ['**/exports/**'],
      },
      to: path.resolve(__dirname, 'dist/tokens'),
      transformPath(targetPath) {
        return targetPath.replace(/^tokens\/\_/, 'tokens/')
      },
    },
    {
      from: path.resolve(__dirname, 'fonts'),
      to: path.resolve(__dirname, 'dist/fonts'),
    },
  ],
  options: {
    concurrency: 100,
  },
})

const BABEL_JS_CONFIG = {
  test: /\.(js|jsx|mjs)$/,
  use: 'babel-loader',
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
      includePaths: [path.resolve(__dirname, '../node_modules')],
    },
  },
}

const SVG_URL_LOADER = {
  test: /\.svg$/,
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
  mode: 'production',
  entry: {
    'playbook-react': './app/pb_kits/playbook/index.js',
    'playbook-rails': './app/pb_kits/playbook/playbook-rails.js',
    'playbook-doc': './app/pb_kits/playbook/playbook-doc.js',
    'reset.css': './app/pb_kits/playbook/_reset.scss',
  },
  externals: {
    'react': 'commonjs react',
    'react-dom': 'commonjs react-dom',
    'trix': 'commonjs trix',
    'webpacker-react': 'commonjs webpacker-react',
  },
  resolve: {
    extensions: [
      '.js',
      '.sass',
      '.scss',
      '.css',
      '.svg',
      '.jsx',
    ],
    modules: [
      path.resolve(__dirname, 'app/pb_kits/playbook'),
      path.resolve(__dirname, '../node_modules'),
    ],
  },
  resolveLoader: {
    modules: [
      '../node_modules',
      path.resolve(__dirname, 'config/webpack/loaders')
    ],
  },
  optimization: { minimize: process.env.NODE_ENV === 'development' ? false : true },
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
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
