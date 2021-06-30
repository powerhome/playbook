const path = require('path')

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const SOURCE_PATH = path.resolve(__dirname, 'app/pb_kits/playbook')
const DIST_PATH = path.resolve(__dirname, 'dist')
const NODE_MODULES_PATH = path.resolve(__dirname, '../node_modules')
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

const CIRCULAR_DEPENDENCY_PLUGIN = new CircularDependencyPlugin({
  // exclude detection of files based on a RegExp
  exclude: /node_modules/,
  // add errors to webpack instead of warnings
  failOnError: true,
  // allow import cycles that include an asyncronous import,
  // e.g. via import(/* webpackMode: "weak" */ './file.js')
  allowAsyncCycles: false,
  // set the current working directory for displaying module paths
  cwd: process.cwd(),
})

// Copy tokens and fonts to dist
const COPY_PLUGIN = new CopyPlugin({
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

// Remove extra css and js created by webpack
const CLEAN_DIST_PLUGIN  = new FileManagerPlugin({
  events: {
    onStart: {
      delete: [ DIST_PATH ],
    },
    onEnd: {
      move: [
        { source: `${DIST_PATH}/playbook-react.css`, destination: `${DIST_PATH}/playbook.css` },
        { source: `${DIST_PATH}/reset.css.css`, destination: `${DIST_PATH}/reset.css` },
      ],
      delete: [ `${DIST_PATH}/playbook-rails.css`, `${DIST_PATH}/playbook-doc.css`, `${DIST_PATH}/reset.css.js` ],
    },
  },
})

const BABEL_LOADER = {
  test: /\.(js|jsx|mjs)$/,
  use: 'babel-loader',
  include: SOURCE_PATH,
  exclude: /node_modules/,
}

const CSS_LOADER = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: '[name]',
      getLocalIdent: (_context, _localIdentName, localName) => localName,
    },
    sourceMap: true,
  },
}

const SASS_LOADER = {
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
    CIRCULAR_DEPENDENCY_PLUGIN,
    COPY_PLUGIN,
    CLEAN_DIST_PLUGIN,
  ],
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          CSS_LOADER,
          SASS_LOADER,
        ],
      },
      BABEL_LOADER,
      SVG_URL_LOADER,
    ],
  },
}
