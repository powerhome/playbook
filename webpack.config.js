const path = require('path')
const webpack = require('webpack')
const svgUrlLoader = require('./config/webpack/loaders/svg.js')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Copy tokens and fonts to dist
const CopyPlugin = require('copy-webpack-plugin')
const COPY_PLUGIN_CONFIG = new CopyPlugin({
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
})

const BABEL_JS_CONFIG = {
  test: /\.(js|jsx|mjs)$/,
  use: 'babel-loader',
  exclude: /node_modules/,
}

const CSS_LOADER_CONFIG = {
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
}

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
  optimization: (env) => {
    return { minimize: env.development ? false : true }
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: () => {
    let pluginList = []
    pluginList.push(new MiniCssExtractPlugin({ filename: 'playbook.css' }))
    pluginList.push(COPY_PLUGIN_CONFIG)
    return pluginList
  },
  module: {
    main: {
      rules: [
        {
          test: /\.scss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            CSS_LOADER_CONFIG,
            { loader: 'sass-loader' },
          ],
        },
        BABEL_JS_CONFIG,
        svgUrlLoader
      ],
    },
    js: {
      rules: [
        {
          test: /\.scss$/i,
          use: [
            CSS_LOADER_CONFIG,
            { loader: 'sass-loader' },
          ],
        },
        BABEL_JS_CONFIG,
        svgUrlLoader
      ]
    }
  }
}

const reactConfig = (env) => {
  return {
    mode: 'production',
    resolve: config.resolve,
    resolveLoader: config.resolveLoader,
    optimization: config.optimization(env),
    externals: config.externals,
    entry: {
      'playbook-react': './app/pb_kits/playbook/index.js',
    },
    output: {
      libraryTarget: config.output.libraryTarget,
      filename: '[name].js',
      path: config.output.path,
    },
    plugins: config.plugins(),
    module: config.module.main,
    resolve: config.resolve
  }
}

const railsConfig = (env) => {
  return {
    mode: 'production',
    resolve: config.resolve,
    resolveLoader: config.resolveLoader,
    optimization: config.optimization(env),
    externals: config.externals,
    entry: {
      'playbook-rails': './app/pb_kits/playbook/vendor.js',
    },
    output: {
      libraryTarget: config.output.libraryTarget,
      filename: '[name].js',
      path: config.output.path,
    },
    plugins: [
      new webpack.IgnorePlugin({resourceRegExp: /\.scss$/i})
    ],
    module: config.module.js,
    resolve: config.resolve
  }
}

const docsConfig = (env) => {
  return {
    mode: 'production',
    resolve: config.resolve,
    resolveLoader: config.resolveLoader,
    optimization: config.optimization(env),
    externals: config.externals,
    entry: {
      'playbook-doc': './app/pb_kits/playbook/packs/react-examples.js',
    },
    output: {
      libraryTarget: 'amd',
      filename: '[name].js',
      path: config.output.path,
    },
    plugins: [
      new webpack.IgnorePlugin({resourceRegExp: /\.scss$/i})
    ],
    module: config.module.js,
    resolve: config.resolve
  }
}

module.exports = [reactConfig, railsConfig, docsConfig]
