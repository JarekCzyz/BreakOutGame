
var webpack = require('webpack');

module.exports = {
    path: require('path'),
    webpack: webpack,
    Optimize: webpack.optimize,
    ExtractTextPlugin: require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin: require('html-webpack-plugin'),
    WebPackStrip: require('strip-loader'),
    CopyWebpackPlugin: require('copy-webpack-plugin'),
    CleanWebpackPlugin: require('clean-webpack-plugin')
}