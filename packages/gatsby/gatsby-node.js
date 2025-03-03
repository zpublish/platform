const path = require('path');
const webpack = require('webpack');

const devOrProd = (devPath, prodPath) => path.resolve(__dirname, process.env.NODE_ENV === 'development' ? devPath : prodPath);
const getNodeModulePath = (moduleName) => `./node_modules/${moduleName}/`;
const resolveNodeModulePath = (moduleName) => path.resolve(__dirname, getNodeModulePath(moduleName));

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
        react: resolveNodeModulePath('react'),
        'react-dom': resolveNodeModulePath('react-dom'),
        'elemental-react': resolveNodeModulePath('elemental-react'),
        'styled-system': resolveNodeModulePath('styled-system'),
        'styled-components': resolveNodeModulePath('styled-components'),
        'react-native': path.resolve(__dirname, './src/mock.js'),
        'react-native-web': resolveNodeModulePath('react-native-web'),
        'simple-masonry-layout': resolveNodeModulePath('simple-masonry-layout'),
        'react-select': resolveNodeModulePath('react-select'),
        'react-primitives': resolveNodeModulePath('react-primitives'),
        'react-primitives-svg': resolveNodeModulePath('react-primitives-svg'),
        'react-primitives-svg': resolveNodeModulePath('react-primitives-svg'),
        '@react-platform/core': resolveNodeModulePath('@react-platform/core'),
        '@react-platform/native': resolveNodeModulePath('@react-platform/native'),
        '@react-platform/svg': resolveNodeModulePath('@react-platform/svg'),
        // '@elemental-zcash/components': resolveNodeModulePath('@elemental-zcash/components/'),
        '@elemental-zcash/components': devOrProd(
            '../../../../elemental-zcash/react/packages/core',
            getNodeModulePath('@elemental-zcash/components')
          ),
        'elemental-color': resolveNodeModulePath('elemental-color'),
        '@elemental-zcash/icons': resolveNodeModulePath('@elemental-zcash/icons'),
        '@zpublish/components': devOrProd('../components', getNodeModulePath('@zpublish/components/')),
        // '@zpublish/components': path.resolve(__dirname, '../components'),
        // ...(process.env.NODE_ENV === 'development'
        //   ? { '@zpublish/components': path.resolve(__dirname, '../components') }
        //   : {  }
        // ),
  
      },
      extensions: ['.web.js'].concat(getConfig().resolve.extensions),
    },
  });
};
