module.exports = {
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
