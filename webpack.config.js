const { UglifyJsPlugin } = require('webpack').optimize;

module.exports = {
    entry: {
        'location-search': './src/angularjs/location.search.module.ts',
        'data.worker': './src/commons/worker/data.worker.ts'
    },
    output: {
        filename: "./dist/[name].js",
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
      new UglifyJsPlugin({
        "mangle": false,
        "compress": {
          "screw_ie8": true,
          "warnings": false
        },
        "output": {
          "ascii_only": true
        },
        "sourceMap": false,
        "comments": false
      })
    ]
}