const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const path = require('path')

module.exports = (env) => {
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
          exclude: /node_modules(?!\/playbook-ui)/,
        },
        {
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
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  }
}
