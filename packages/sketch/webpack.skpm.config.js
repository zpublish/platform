const path = require('path');
const webpack = require('webpack');

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {boolean} isPluginCommand - wether the config is for a plugin command or a resource
 */
module.exports = function (config) {
  /* you can change config here */

  config.module.rules[1].test = /^(?!.*\.(jsx?|tsx?|json|nib|md|mdx|xib|framework|xcodeproj|xcworkspace|xcworkspacedata|pbxproj)$).*/;

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      window: path.resolve(__dirname, './mock.js'),
    }),
  ];

  config.resolve = {
    ...config.resolve,
    extensions: [...config.resolve.extensions, '.jsx', '.md'],
    alias: {
      ...config.resolve.alias,
      react: path.resolve(__dirname, './node_modules/react/'),
      'react-test-renderer': path.resolve(__dirname, './node_modules/react-test-renderer/'),
      'react-native': path.resolve(__dirname, './mock.js'),
      'react-sketchapp': path.resolve(__dirname, './node_modules/react-sketchapp/'),
      'react-primitives': path.resolve(__dirname, './node_modules/react-primitives/'),
      '@react-platform/core': path.resolve(__dirname, './node_modules/@react-platform/core/'),
      '@react-platform/native': path.resolve(__dirname, './node_modules/@react-platform/native/'),
      '@react-platform/svg': path.resolve(__dirname, './node_modules/@react-platform/svg/'),
      '@elemental-zcash/components': path.resolve(__dirname, './node_modules/@elemental-zcash/components/'),
      '@elemental-zcash/icons': path.resolve(__dirname, './node_modules/@elemental-zcash/icons/'),
      'elemental-color': path.resolve(__dirname, './node_modules/elemental-color/'),
      '@zpublish/components': path.resolve(__dirname, '../components'),
      'react-primitives-svg': path.resolve(__dirname, './node_modules/react-primitives-svg/'),
      'simple-masonry-layout': path.resolve(__dirname, './node_modules/simple-masonry-layout/'),
      // 'elemental-react': path.resolve(__dirname, './node_modules/elemental-react'),
      'react-sketchapp-router': path.resolve(__dirname, './node_modules/react-sketchapp-router'),
      'styled-components': path.resolve('./node_modules/styled-components'),
      'qrcode': path.resolve('./node_modules/qrcode'),
    },
  };
}
