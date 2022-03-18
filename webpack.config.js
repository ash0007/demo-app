const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = (angularWebpackConfig, options) => {
  return merge.smart(angularWebpackConfig, {
    optimization: {
      splitChunks: {
        automaticNameDelimiter:'-',
        chunks: "async",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
          vendor: {
            minSize: 1000000,
            maxSize: 1000000,
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            enforce: true
          }
        }
      }
    }
  });
};
