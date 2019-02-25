const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    path.resolve(__dirname, '../sass-mixins/application.scss'),
  ],

  output: {
    filename: "[name].css",
    chunkFilename: "[id].css",
    path: path.resolve(__dirname, '../public'),
  },

  plugins: [
    new ExtractTextPlugin({
      filename: "[name].css",
      allChunks: true,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(s?css|sass)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {loader: 'css-loader'},
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  path.resolve(__dirname, '../sass-mixins'),
                  path.resolve(__dirname, '../components'),
                ]
              }
            }
          ]
        })
      }
    ],
  },
};
