const path = require('path');
const webpack = require('webpack');

exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  rules,
  loaders,
  actions,
}) => {
  actions.setWebpackConfig({
    plugins: [
      ...getConfig().plugins,
      new webpack.ProvidePlugin({
        process: path.resolve(__dirname, './node_modules/process/browser'),
      }),
    ],
    resolve: {
      fallback: {
        ...getConfig().resolve.fallback,
        os: false,
      },
      alias: {
        ...getConfig().resolve.alias,
        react: path.resolve(__dirname, './node_modules/react/'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        'elemental-react': path.resolve(__dirname, './node_modules/elemental-react/'),
        'styled-system': path.resolve(__dirname, './node_modules/styled-system'),
        'styled-components': path.resolve(__dirname, './node_modules/styled-components'),
        'react-native': path.resolve(__dirname, './src/mock.js'),
        'react-native-web': path.resolve(__dirname, './node_modules/react-native-web'),
        'simple-masonry-layout': path.resolve(__dirname, './node_modules/simple-masonry-layout/'),
        'react-primitives': path.resolve(__dirname, './node_modules/react-primitives/'),
        'react-primitives-svg': path.resolve(__dirname, './node_modules/react-primitives-svg'),
        'react-primitives-svg': path.resolve(__dirname, './node_modules/react-primitives-svg'),
        '@react-platform/core': path.resolve(__dirname, './node_modules/@react-platform/core/'),
        '@react-platform/native': path.resolve(__dirname, './node_modules/@react-platform/native/'),
        '@react-platform/svg': path.resolve(__dirname, './node_modules/@react-platform/svg/'),
        '@elemental-zcash/components': path.resolve(__dirname, './node_modules/@elemental-zcash/components/'),
        '@elemental-zcash/icons': path.resolve(__dirname, './node_modules/@elemental-zcash/icons/'),
        // '@zpublish/components': path.resolve(__dirname, '../components'),
        '@zpublish/components': path.resolve(__dirname, './node_modules/@zpublish/components/'),
  
      },
      extensions: getConfig().resolve.extensions.concat('.web.js'),
    },
  });
};
