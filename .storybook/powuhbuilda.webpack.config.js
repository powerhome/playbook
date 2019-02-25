const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, '../components/index.js'),
  ],

  output: {
    filename: 'webpack-bundle.js',
    path: path.resolve(__dirname, '../'),
    library: "modules",
    libraryTarget: "var"
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules/
      },
      {
        test: /\.(s?css|sass)$/,
        use: [
         {loader: 'style-loader'},
         {loader: 'css-modules-flow-types-loader'},
         {loader: 'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]'},
         {
           loader: 'sass-loader',
           options: {
             includePaths: [
               path.resolve(__dirname, '../sass-mixins')
             ]
           }
         }
       ]
      }
    ],
  },
};
