let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    entry: {
        index:'./src/index.js',
        a: './src/a.js',
    }, //入口
    output: {
        filename: '[name].[hash:8].js',
        path:path.resolve('./build')
    }, //出口
    devServer: {
        contentBase:'./build',
        port: 3000, //端口配置
        compress: true, //服务器压缩
        open: true //自动打开
    }, //开发服务器
    module: { //模块配置

    },
    plugins: [
        new CleanWebpackPlugin(['./build']),
        new HtmlWebpackPlugin({ //打包js到html里用的插件
            filename:'a.html',
            template:'./src/index.html',
            title:'我是a',
            hash: true, //build.js?bf7a608d1f61a08bea46 引入js后直接hash
            chunks:['a']
        }),
        new HtmlWebpackPlugin({ //打包js到html里用的插件
            filename: 'b.html',
            template: './src/index.html',
            title: '我是b',
            hash: true, //build.js?bf7a608d1f61a08bea46 引入js后直接hash
            chunks: ['index']
        }),
    ], //插件配置
    mode: "development", //更开开发模式或者生产模式
    resolve: {} //配置解析
}
