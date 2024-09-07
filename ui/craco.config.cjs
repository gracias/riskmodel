// craco.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add the buffer polyfill
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        process: require.resolve('process/browser'),
        buffer: require.resolve('buffer/'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        
      };

      webpackConfig.resolve.alias = {
        "react/jsx-dev-runtime.js": "react/jsx-dev-runtime",
        "react/jsx-runtime.js": "react/jsx-runtime",
      }


      // Add ProvidePlugin to make Buffer available globally
   
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        })
      ];

       // Ensure all `mjs` files are properly resolved
       webpackConfig.resolve.extensions = ['.js', '.jsx', '.mjs', '.json', '.cjs'];
       webpackConfig.module.rules = [
        ...webpackConfig.module.rules,
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false
          },
        },
       ]

      return webpackConfig;
    }
  }
};
