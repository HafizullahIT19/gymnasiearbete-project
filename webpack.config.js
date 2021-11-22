const HtmlWebpackPlugin  = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');
const { ProgressPlugin } = require('webpack'); 

//Controllers 
const hash = false;

const config = {
    entry: {
        main : './src/index',
        example: './src/example'
    },
    output: {
        path: path.join(__dirname, 'dist'),
    },
    optimization: {
        splitChunks: {
            chunks: 'all'  //look at to all js files and create vendors.js
        }
    },
    // stats: 'errors-warnings',
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,   
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: 'images',  //dist/images => images
                            outputPath: 'images',
                            name: '[name].[ext]'
                        }
                    },
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2|)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: 'fonts',    //dist/fonts => fonts
                            outputPath: 'fonts',
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hafiz is Coding | Home page',
            template: 'index.html',     //name template
            filename: 'index.html',     //name html file
            chunks: ['main']          //all js,css and scss are name bundle
        }),
        new HtmlWebpackPlugin({
            title: 'Hafiz is Coding | Example page',
            template: 'example.html',     //name template
            filename: 'example.html',     //name html file
            chunks: ['example']          //all js,css and scss are name bundle
        }),
        new CleanWebpackPlugin(),
        new ProgressPlugin()
    ],
}


module.exports = (env , {mode})=>{
    console.log('Mode: '+ mode);
    
    let devMode = mode ==='development';

    // DevelopmentMode
    if(devMode){
        //Dev server 
        config.devServer = {
            contentBase: path.join(__dirname, 'dist'),
            index: 'index.html',
            port: 9000,
        }
        //Stats
        config.stats = 'normal'
    }

    // CSS and SASS(style.loader or MiniCssExtractPlugin.loader)
    config.module.rules.push(...[
        {
            test: /\.css$/i,
            use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader"], 
        },
        {
            test: /\.s[ac]ss$/i,  // /\.(scss|sass)$/i  
            use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
    ]);

    //  ProductionMode
    if(!devMode){
        //Output (Contenthash)
        if(hash){
            config.output.filename = '[name].[contenthash].js';
            //MiniCssExtractPlugin
            config.plugins.push(
                new MiniCssExtractPlugin({
                    filename: '[name].[contenthash].css'
                }),
            );
        }
        else{
            config.output.filename = '[name].js';

            config.plugins.push(
                new MiniCssExtractPlugin({
                    filename: '[name].css'
                }),
            );   
        }
        //Stats
        config.stats = 'errors-only';
    }

    return config;
};
