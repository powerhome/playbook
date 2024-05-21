const path = require('path');
const { environment } = require('@rails/webpacker');

// Get the existing Babel loader
const babelLoader = environment.loaders.get('babel');
babelLoader.test = /\.(js|jsx|ts|tsx)?(\.erb)?$/;

// Ensure Babel processes TypeScript files
babelLoader.use = [
  {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript' // Add this line
      ]
    }
  }
];

// Get the existing nodeModules loader and update its exclude pattern
const nodeLoader = environment.loaders.get('nodeModules');
nodeLoader.exclude = [
  nodeLoader.exclude,
  /node_modules\/@powerhome\/playbook-icons-react/
];

// Prepend ESM loader
environment.loaders.prepend('ESM', {
  test: /\.mjs$/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  },
  type: 'javascript/auto',
});

// Prepend SVGR loader
environment.loaders.prepend('svgr', {
  test: /\.(svg)$/,
  use: {
    loader: '@svgr/webpack',
    options: {
      svgoConfig: {
        plugins: [
          { removeViewBox: false }
        ]
      }
    }
  },
  include: [
    path.resolve(__dirname, '../../../node_modules/@powerhome/playbook-icons/icons')
  ],
});

// Update file loader test pattern
environment.loaders.get('file').test = /(.jpg|.jpeg|.png|.gif|.tiff|.ico|.eot|.otf|.ttf|.woff|.woff2)$/i;
environment.loaders.get('file').include = path.resolve(__dirname, '../../app');

// Append image loader
environment.loaders.append('image', {
  test: /\.(svg)$/,
  use: {
    loader: 'file-loader',
  },
  include: [
    path.resolve(__dirname, '../../app')
  ],
});

// Merge additional configuration
environment.config.merge({
  optimization: {
    runtimeChunk: 'single',
    splitChunks: { chunks: 'all' },
    removeAvailableModules: false,
    removeEmptyChunks: true,
  },
});

module.exports = environment;
