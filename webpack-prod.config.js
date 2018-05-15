"use strict";
var {
    path,
    webpack,
    ExtractTextPlugin,
    HtmlWebpackPlugin,
    WebPackStrip
} = require('./webpack/config.js');
var devConfig = require('./webpack.config.js');

var StripLoader = {
    test: [/\.js$/, /\.es6$/],
    exclude: /node_modules/,
    loader: WebPackStrip.loader('console.log', 'perfLog')
}
var pkg = require('./package.json');

const strBanner = [
    '********',
    'author: ' + pkg.author,
    'version: ' + pkg.version,
    'license: ' + pkg.license,
    '********'
].join(' ');

var extendPlugin = new webpack.BannerPlugin(strBanner);
// var uglifyExtend = new webpack.optimize.UglifyJsPlugin({    
//     compress: {
//         warnings: false,
//         drop_console: true,
//         drop_debugger: true
//       },
//     comments: true
// })

devConfig.module.rules.push(StripLoader);
devConfig.plugins.push(extendPlugin);

module.exports = devConfig;