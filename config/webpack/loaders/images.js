  module.exports = {
    /**
    * OPTION A:
    * default file-loader fallback
    **/
    test: /\.(png|jpg|jpeg|gif)$/,
    loaders: [
      {
        loader: 'lqip-loader',
        options: {
            path: '/cool', // your image going to be in media folder in the output dir
            name: '[name].[ext]', // you can use [hash].[ext] too if you wish,
            base64: true, // default: true, gives the base64 encoded image
            palette: true // default: false, gives the dominant colours palette
        }
      }
    ]
  }