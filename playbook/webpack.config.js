const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const SOURCE_PATH = path.resolve(__dirname, 'app/pb_kits/playbook');
const DIST_PATH = path.resolve(__dirname, 'dist');
const NODE_MODULES_PATH = path.resolve(__dirname, '../node_modules');
const WEBSITE = path.resolve(__dirname, '../playbook-website');
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const CIRCULAR_DEPENDENCY_PLUGIN = new CircularDependencyPlugin({
  exclude: /node_modules/,
  failOnError: true,
  allowAsyncCycles: false,
  cwd: process.cwd(),
});

const COPY_PLUGIN = new CopyPlugin({
  patterns: [
    {
      from: `${SOURCE_PATH}/tokens`,
      globOptions: {
        ignore: ['**/exports/**'],
      },
      to: `${DIST_PATH}/tokens`,
      transformPath(targetPath) {
        return targetPath.replace(/^tokens\/_/, 'tokens/');
      },
    },
    {
      from: `${WEBSITE}/config/menu.yml`,
      to: `${DIST_PATH}/`
    },
    {
      from: `${WEBSITE}/app/components/playbook/pb_docs`,
      to: `${DIST_PATH}/app/components/playbook/pb_docs`
    },
    {
      from: `${WEBSITE}/lib/pb_doc_helper.rb`,
      to: `${DIST_PATH}/`
    }
  ],
  options: {
    concurrency: 100,
  },
});

const CLEAN_DIST_PLUGIN = new FileManagerPlugin({
  events: {
    onEnd: {
      delete: [
        `${DIST_PATH}/playbook-rails.css`,
        `${DIST_PATH}/playbook-doc.css`,
        `${DIST_PATH}/reset.js`,
      ],
    },
  },
});

const JS_LOADER = [
  {
    test: /\.(js|jsx|mjs)$/,
    use: 'babel-loader',
    include: SOURCE_PATH,
    exclude: /node_modules/,
  },
  {
    test: /\.js$/,
    include: /node_modules\/intl-tel-input/,
    use: {
      loader: 'babel-loader',
    },
  }
];

const TS_LOADER = {
  test: /\.(ts|tsx)$/,
  use: [
    {
      loader: 'babel-loader',
    },
    {
      loader: 'ts-loader',
    },
  ],
  include: SOURCE_PATH,
  exclude: /node_modules/,
};

const CSS_LOADER = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: '[name]',
      getLocalIdent: (_context, _localIdentName, localName) => localName,
    },
    sourceMap: true,
  },
};

const SASS_LOADER = {
  loader: 'sass-loader',
  options: {
    sassOptions: {
      includePaths: [NODE_MODULES_PATH],
    },
  },
};

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
};

module.exports = {
  watchOptions: {
    ignored: [
      `${DIST_PATH}/playbook-rails.css`,
      `${DIST_PATH}/playbook-doc.css`,
      `${DIST_PATH}/reset.js`,
    ],
  },
  entry: {
    'playbook': `${SOURCE_PATH}/index.js`,
    'playbook-rails': `${SOURCE_PATH}/playbook-rails.js`,
    'playbook-doc': `${SOURCE_PATH}/playbook-doc.js`,
    'reset': `${SOURCE_PATH}/_reset.scss`,
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'trix': 'trix',
    'webpacker-react': 'webpacker-react',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [SOURCE_PATH, NODE_MODULES_PATH],
  },
  resolveLoader: {
    modules: [NODE_MODULES_PATH],
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
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png$/,
        use: 'file-loader',
      },
      TS_LOADER,
      ...JS_LOADER,  // Spread the JS_LOADER array here
      SVG_URL_LOADER,
    ],
  },
};
