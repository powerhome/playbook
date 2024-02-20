const path = require('path')

const { environment } = require('@rails/webpacker')

environment.loaders.insert('javascript', {
  test: /\.(js|jsx)$/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  },
  include: path.resolve(__dirname, '../../app'),
})

// Allow ESM modules
environment.config.merge({
  module: {
    rules: [
      // Existing rule for .mjs files
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      // Adding babel-loader for JS and MJS files
      {
        test: /\.(js|mjs)$/,
        exclude: /node_modules/, // You might want to process some node_modules with Babel, adjust as needed
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              // Add '@babel/preset-react' here if you're working with React
            ],
            // You can add more Babel plugins here if needed
          },
        },
      },
    ],
  },
});

environment.config.merge({
  optimization: {
    runtimeChunk: 'single',
    splitChunks: { chunks: 'all' },
    removeAvailableModules: false,
    removeEmptyChunks: true,
  },
})

module.exports = environment
