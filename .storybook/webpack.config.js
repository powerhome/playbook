const webpack = require('webpack');
const path = require('path');

const entries = [
  path.resolve(__dirname, '../fonts/regular.js'),
  path.resolve(__dirname, '../fonts/fontawesome.js'),
]

module.exports = (storybookBaseConfig, configType) => {
  for(let e = 0, eL = entries.length; e < eL; ++e) {
    storybookBaseConfig.entry.manager.push(entries[e])
    storybookBaseConfig.entry.preview.push(entries[e])
  }

  storybookBaseConfig.module.rules.push({
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
 });

  return storybookBaseConfig;
}
