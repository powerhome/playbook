const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const path = require('path')
const svgUrlLoader = require('./config/webpack/loaders/svg.js')

const mainConfig = (env) => {
  return {
    mode: env.development ? 'development' : 'production',
    entry: {
      playbook: './app/pb_kits/playbook/index.js',
    },
    output: {
      libraryTarget: 'commonjs2',
      filename: env.development ? 'playbook.js' : 'playbook.min.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: env.development ? 'playbook.css' : 'playbook.min.css',
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
        ],
        options: {
          concurrency: 100,
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader' },
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
    },
    resolve: {
      extensions: ['.js', '.jsx', '.svg'],
    },
  }
}

const docsConfig = (env) => {
  return {
    mode: env.development ? 'development' : 'production',
    entry: {
      playbook: './app/pb_kits/playbook/packs/examples.js',
    },
    output: {
      libraryTarget: 'commonjs2',
      filename: 'docs.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: [
            { loader: 'css-loader' },
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
    },
    resolve: {
      extensions: ['.js', '.jsx', '.svg'],
    },
  }
}

const vendorConfig = (env) => {
  return {
    mode: env.development ? 'development' : 'production',
    entry: {
      playbook: './app/pb_kits/playbook/vendor.js',
    },
    output: {
      libraryTarget: 'commonjs2',
      filename: env.development ? 'vendor.js' : 'vendor.min.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.(js|jsx|mjs)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        }
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  }
}

module.exports = [mainConfig, docsConfig, vendorConfig]
