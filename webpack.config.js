
const {
    path,
    webpack,
    Optimize,
    ExtractTextPlugin,
    HtmlWebpackPlugin,
    CopyWebpackPlugin,
    CleanWebpackPlugin
} = require('./webpack/config.js');

var TARGET = process.env.npm_lifecycle_event;
if (TARGET === 'build') {
    htmlPlugin = new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './app/index.html'),
        minify: {
            collapseWhitespace : true,
            trimCustomFragments: true
        }
      })
    } else {
        htmlPlugin = new HtmlWebpackPlugin({
            template: './app/index.html'
        })
    }
let pathsToClean = [
    path.resolve(__dirname, './build')
]
let cleanOptions = {
    allowExternal: true
}

module.exports = {
    // Everything flows from this file
    entry: [
        "./app/js/main.js"
    ],
    // Once Webpack is done, it assembles the file and deposits it
    // in the current directory in the build subdirectory, with a name of build.js
    output: {
        path: __dirname + "/build",
        filename: "build.[hash].js"
    },
    devtool: TARGET !== 'build' ? 'source-map' : '',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                enforce: "pre",
                exclude: [
                    /bower_components/,
                    /node_modules/
                ],
				use: [
					{
						loader: "jshint-loader"
					}
				]
            },
            {
            // Watch all files that end in .js
            test: /\.js?$/,
            // Unless it's in the node_modules directory
            exclude: /node_modules/,
            // And run it through the babel loader
            loader: 'babel-loader'
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"]
            })
        }, {
            test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
        }, {
            test: /\.html$/,
            loader: "html-loader"
        }],
    },
    plugins: [
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        htmlPlugin,
        new ExtractTextPlugin('style.css'),
        new CopyWebpackPlugin([
            {
                from: 'gfx/**/*',
                to: __dirname + '/build',
                context: __dirname + '/app/'
                // flatten: true
            }
        ])
    ]
}