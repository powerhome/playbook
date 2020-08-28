const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const path = require('path')
const svgUrlLoader = require('./config/webpack/loaders/svg.js')

const config = {
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'webpacker-react': 'webpacker-react',
  },
  resolve: {
    extensions: [
      ".js",
      ".sass",
      ".scss",
      ".css",
      ".svg",
      ".jsx",
    ],
    modules: [
      path.resolve(__dirname, 'app/pb_kits/playbook'),
      path.resolve(__dirname, 'app/assets'),
      path.resolve(__dirname, 'node_modules'),
    ]
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'config/webpack/loaders')
    ],
  },
  optimization: {
    minimize: false
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: (env) => {
    return [
      new MiniCssExtractPlugin({
        filename: env.development ? '[name].css' : '[name].min.css',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'app/pb_kits/playbook/tokens'),
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
      }),
    ]
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]',
                getLocalIdent: (context, localIdentName, localName, options) => {
                  return localName;
                }
              },
              sourceMap: true,
            }
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(js|jsx|mjs)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      svgUrlLoader
    ],
  }
}

const mainConfig = (env) => {
  return {
    mode: 'production',
    resolve: config.resolve,
    resolveLoader: config.resolveLoader,
    optimization: config.optimization,
    externals: config.externals,
    entry: {
      playbook: './app/pb_kits/playbook/index.js',
      vendor: './app/pb_kits/playbook/vendor.js',
    },
    output: {
      libraryTarget: config.output.libraryTarget,
      filename: env.development ? '[name].js' : '[name].min.js',
      path: config.output.path,
    },
    plugins: config.plugins(env),
    module: config.module,
    resolve: config.resolve
  }
}

const docsConfig = (env) => {
  return {
    mode: 'production',
    resolve: config.resolve,
    resolveLoader: config.resolveLoader,
    optimization: config.optimization,
    externals: config.externals,
    entry: {
      docs: './app/pb_kits/playbook/packs/examples.js',
    },
    output: {
      libraryTarget: 'amd',
      filename: env.development ? '[name].js' : '[name].min.js',
      path: config.output.path,
    },
    plugins: config.plugins(env),
    module: config.module,
    resolve: config.resolve
  }
}

module.exports = [mainConfig, docsConfig]
