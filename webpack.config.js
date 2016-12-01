// 

module.exports = {
    entry: "./src/start.js",

    output: {
        path: "./bin/",
        filename: "bundle.js"
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: "babel" }
        ]
    }
}