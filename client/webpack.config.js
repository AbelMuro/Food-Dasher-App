const path = require('path');               //path is now a module that has access to pre defined methods that are built into Node.js
const HtmlWebpackPlugin = require("html-webpack-plugin"); //to use a plugin with webpack, you must use require


module.exports = {

    entry: './src/index.js', //this is where webpack will start its dependency graph, and will automatically figure out with modules depend on this entry point                  
    output: {                              
        path: path.join(__dirname, '/dist'),  //__dirname represents the current directory, /dist is the folder that will contain our production code
        filename: 'bundle.js'                 //the bundled js file
    },
    plugins: [                      
        new HtmlWebpackPlugin({               //this plugin will help us generate the production html file in our /dist
            filename: 'index.html',           //our production html file will be named index.html
            template: './src/index.html'      //this is a template for our production html file, we are defining how the html will look like before we make our production html file
        })
    ],
    module: {
        rules: [                               
            {
                test: /\.js$/, 
                use: {
                    loader: 'babel-loader',  //for all .js files, we will load the babel transpiler
                    options: {presets: ['@babel/preset-env', '@babel/preset-react']} //preset-env is a group of babel plugins that will transpile all the new features of javascript 
                    }                                                                 //preset-react is also a group of babel plugins, but it will transpile jsx with other new features of javascript
            },
            {
                test: /\.css$/,
                use: [{loader: 'style-loader'}, {loader: 'css-loader'}]
            },
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource'
            },
        ]
    },
}