// 

module.exports = {
    entry: { 
        start: "./src/start.js",
        calendar: "./src/calendar.js" 
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