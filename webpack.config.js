const path = require('path');               
const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const dotenv = require('dotenv-webpack');    

module.exports = {

    entry: './src/index.js',                 
    output: {                              
        path: path.join(__dirname, '/dist'),  
        filename: 'bundle.js'                 
    },
    plugins: [                      
        new HtmlWebpackPlugin({               
            filename: 'index.html',           
            favicon: './src/images/food dasher favicon.png',
            template: './src/index.html'      
        }),
        new dotenv({systemvars: true}),                                //using the dotenv plugin to use .env files
    ],
    module: {
        rules: [                               
            {
                test: /\.js$/, 
                use: {
                    loader: 'babel-loader',  
                    options: {presets: ['@babel/preset-env', '@babel/preset-react']} 
                    }                                                                 
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
    devServer: {
        port: 3000,
        historyApiFallback: true,
    }
}