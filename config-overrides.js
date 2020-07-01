const webpack = require('webpack');
const {
  override,
  fixBabelImports,
  addBabelPlugins,
  disableEsLint,
  addDecoratorsLegacy,
  addBundleVisualizer,
  addWebpackPlugin
} = require('customize-cra');

const changeDevtool = (name) => (config) => {
  if (process.env.NODE_ENV === 'development') {
    config.devtool = name;
  }

  if (process.env.NODE_ENV === 'production') {
    config.devtool = false;
  }
  return config;
};

const devAddBundleVisualizer = (...args) => (config) => {
  if (process.env.NODE_ENV === 'production') {
    return addBundleVisualizer(...args)(config);
  } else {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    config.plugins = config.plugins || [];
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};

// const antdIcon = () => (config) => {
//   config.module.rules = config.module.rules || [];
//   config.module.rules.push({
//     loader: 'webpack-ant-icon-loader',
//     enforce: 'pre',
//     include: [
//       require.resolve('@ant-design/icons/lib/dist')
//     ]
//   });

//   return config;
// };

module.exports = override(
  disableEsLint(),
  ...addBabelPlugins(
    'jsx-control-statements',
    'ramda',
    ['react-intl', {
      messagesDir: './src/i18n/messages/',
    }]
  ),
  addWebpackPlugin(new webpack.ContextReplacementPlugin(/react-intl[/\\]locale-data$/, /en|vi/),),
  addDecoratorsLegacy(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  // antdIcon(),
  changeDevtool('source-map'),
  devAddBundleVisualizer(),
);