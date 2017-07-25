module.exports = {
    entry: [
        "babel-polyfill",
        "./lib/index.js"
    ],
    output: {
        path: __dirname + '/dist/',
        publicPath: "/dist/",
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};