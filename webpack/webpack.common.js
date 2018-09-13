require("babel-polyfill");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');
const fs  = require('fs');

// Directorios que usa el proyecto
const srcDir = path.resolve( __dirname, '../src' );
const publicDir = path.resolve( __dirname, '../public' );

// ANT-OBILE DESIGN personalizacion de variables
const lessToJs = require('less-vars-to-js');
const theme = lessToJs(fs.readFileSync(path.join(__dirname, '../src/config/ant.less'), 'utf8'));

// Verificar si en esta en produccion o desarrollo
const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
    context: srcDir,
    entry: ["babel-polyfill", "./index"],
    output: {
        path: publicDir,
        publicPath: '/',
        filename: 'main.js',
        sourceMapFilename: 'main.map'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:  ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use : [{
                        loader: 'css-loader',
                        options: {
                            url: false,
                            minimize: true,
                            sourceMap: IS_DEV,
                        }
                    },'postcss-loader']
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: IS_DEV,
                            }   
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                javascriptEnabled: true,
                                modifyVars: theme
                            }
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: IS_DEV,
                                modules: true,
                                localIdentName: '[local]__[hash:base64:5]',
                            }   
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: IS_DEV
                            }
                        }
                    ]
                })
            },
            
            {
                test    : /\.pug$/,
                use     : ['html-loader','pug-html-loader']
            },

            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader",
                query: {
                    plugins:[ 'transform-object-rest-spread' ]
                }
            },

            {
                test: /\.(ttf|eot|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader'
            },

            {
                test    : /\.(png|jpg)$/,
                use     : 'file-loader'
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath('[name].css').replace('css/js', 'css');
            },
            allChunks: true,
            // disable: IS_DEV,
        }),
        // new webpack.EnvironmentPlugin(['NODE_ENV']),
        new FaviconsWebpackPlugin({
            logo: './assets/logo.png',
            // background: '#1890ff',
            title: 'RQSystem',
        })
    ]
};