let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
module.exports = {
  entry: './src/index.js', //入口
  output: {
    filename: '[name].[hash:8].js',
    path:path.resolve('./build')
  }, //出口
  devServer: {
    contentBase:'./build',
    port: 3000, //端口配置
    compress: true, //服务器压缩
    open: true, //自动打开
    hot:true
  }, //开发服务器
  module: { //模块配置
    rules: [
       {
         test: /\.css$/,
         use: ExtractTextWebpackPlugin.extract([{
           loader: 'css-loader'
         }, ])
       }, {
         test: /\.scss$/,
         use: ExtractTextWebpackPlugin.extract([{
             loader: 'css-loader'
           },
           {
             loader: 'sass-loader'
           },
         ])
       },
       {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
       },
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: 'css/index.css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['./build']),
    new HtmlWebpackPlugin({ //打包js到html里用的插件
      template:'./src/index.html',
      title:'我是a',
      hash: true, //build.js?bf7a608d1f61a08bea46 引入js后直接hash
    }),
  ], //插件配置
  mode: "development", //更开开发模式或者生产模式
  resolve: {} //配置解析
}
