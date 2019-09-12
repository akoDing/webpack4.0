const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // installed via npm

module.exports = {
    entry: './src/index.js',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/')
        },
        extensions: [".js", ".vue", ".json"]
    },
    externals: {  // 把一个模块设置成外部依赖
        jquery: 'jQuery',
        lodash: '_'
    },
    module: {
        rules: [
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'url-loader', // 根据图片大小，把图片优化成base64
                        options: {
                            limit: 10000
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,  // 加快编译速度，不包含node_modules文件夹内容
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    },
                    {
                        loader: "eslint-loader",
                        options: {
                            // eslint options (if necessary)
                            fix: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'AICODER 全栈线下实习', // 默认值：Webpack App
            filename: 'main.html', // 默认值： 'index.html'
            template: path.resolve(__dirname, 'src/main.html'),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true // 移除属性的引号
            }
        })
    ]
};