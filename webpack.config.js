// 

module.exports = {
    entry: { 
        start: "./src/start.js" 
    },

    output: {
        path: "./bin/",
        filename: "[name].bundle.js"
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: "babel" }
        ]
    }
}