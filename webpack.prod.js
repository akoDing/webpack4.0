const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // installed via npm
const merge = require('webpack-merge');
const common = require('./webpack.common.js');


let prodConfig = {
    mode: 'production',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.(sc|c|sa)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            // 开启找到源文件
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            // 添加标识
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: loader => [autoprefixer({ browsers: ['> 0.15% in CN'] })]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            // 开启找到源文件
                            sourceMap: true
                        }
                    }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name][hash].css', // 设置最终输出的文件名
            chunkFilename: '[id][hash].css'
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({}) // 压缩css
        ]
    }
};

module.exports = merge(common, prodConfig);