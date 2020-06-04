const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = (env) => {
  return {
    mode: env.development ? 'development' : 'production',
    entry: './app/pb_kits/playbook/index.js',
    output: {
      libraryTarget: 'commonjs2',
      filename: env.development ? 'playbook.js' : 'playbook.min.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: env.development ? 'playbook.css' : 'playbook.min.css',
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
