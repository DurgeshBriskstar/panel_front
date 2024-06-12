const webpack = require('webpack');

module.exports = function override(config) {
    // config.stats = {
    //     errorDetails: true,
    //     children: true
    // };

    config.resolve.fallback = {
        process: require.resolve('process/browser'),
        zlib: require.resolve('browserify-zlib'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util'),
        buffer: require.resolve('buffer'),
        asset: require.resolve('assert'),
        url: false,
        http: false
    };

    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser.js',
            Buffer: ['buffer', 'Buffer'],
        })
    );

    return config;
};
