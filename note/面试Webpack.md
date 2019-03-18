- __webpack有哪些优点__
>1：专注于处理模块化的项目，能做到开箱即用，一步到位
>2：可通过plugin扩展，好用
>3：社区庞大活跃，经常引入紧跟时代发展的新特性
>4：良好的开发体验
- __什么是bundle,什么是chunk，什么是module?__
>bundle是由webpack打包出来的文件，chunk是指webpack在进行模块的依赖分析的时候，代码分割出来的代码块。module是开发中的单个模块。
- __什么是Loader?什么是Plugin?__
>1：实现对不同格式的文件的处理，比如说将scss转换为css，或者typescript转化为js
2：ExtractTextWebpackPlugin: 它会将入口中引用css文件，都打包都独立的css文件中，而不是内嵌在js打包文件中。下面是他的应用
3：HtmlWebpackPlugin:
作用： 依据一个简单的index.html模版，生成一个自动引用你打包后的js文件的新index.html
- __webpack-dev-server__
路径重定向，支持https，浏览器中可以显示编译错误，可以进行接口代理，模块热更新
- __devServer配置__
target：指定代理的地址，
changeOrigin：改变源到url，在虚拟主机上很有用
headers：增加http请求头，
logLevel：帮助调试
pathRewrite：重定向
![1.png](https://i.loli.net/2019/03/02/5c7aa209f037c.png)

- __ __
- __ __
- __ __
- __ __
- __ __
- __entry__：如果有两个js文件，__没有关系引入__ 的情况下，只会打包一个到js里，所以要变成数组，引入两个
```
entry: './src/b.js', //引入一个，字符串
-------------------------------
entry: ['./src/b.js', './src/a.js'], //引入两个，数组
-------------------------------
entry: {//一个js文件对应一个html，对象，多入口对应多出口，所以要用两个html文件
  index:'./src/index.js',
  a: './src/a.js',
}, //多页页面
output: {
  filename:'[name].[hash:8].js',
  path:path.resolve('./build')
},
new HtmlWebpackPlugin({ //打包js到html里用的插件
  filename: 'b.html',  //重新生成的html文件名字
  template: './src/index.html',//用到的html模板
  title: '我是b',//title
  hash: true, //build.js?bf7a608d1f61a08bea46 引入js后直接hash
  chunks: ['index']//引入那个js
}),
```
- __wepackplugin__ 可以将html打包到build下可以自动引入当前的js  html-webpack-plugin 可以将js引入到html
- __hash: true__ 在js后面加hash
```
output: {
    filename:'build.[hash:8].js', //build.bf7a608d.js?bf7a608d1f61a08bea46
    path:path.resolve('./build')
  },
```
```
plugins: [
    new HtmlWebpackPlugin({ //打包js到html里用的插件
      template:'./src/index.html',
      hash: true //build.js?bf7a608d1f61a08bea46 引入js后加hash
    })
  ], //插件配置
```
- 每次build都要生成新的文件，清除旧的文件 __clean-webpack-plugin__
```
new CleanWebpackPlugin(['./build']), //要清空的文件，数组
```
- __热更新__
```
devServer: {
    hot:true
},
plugins: [
    new webpack.HotModuleReplacementPlugin(),
]
```
- webpack不支持解析css，所以要引入css-loader ,解析从右往左,这样打包会把css打包到 __js__ 文件里
```
module: { //模块配置
    rules: [
      {
        test:/\.css$/,use:[
          {loader:'style-loader'},
          {loader:'css-loader'},
        ]
      },
      {
        test:/\.scss$/,use:[
          {loader:'style-loader'},
          {loader:'css-loader'},
          {loader:'sass-loader'},
        ]
      },
    ]
  },
```
- __抽离css,打包成单独的文件__```ExtractTextWebpackPlugin()```，不用写 ```style-loader```
```
 plugins: [
    new ExtractTextWebpackPlugin({
      filename: 'css/index.css'
    }),
 ]
 module: { //模块配置
    rules: [
      {
        test:/\.css$/,use:ExtractTextWebpackPlugin.extract([
          {loader:'css-loader'},
        ])
      },
      {
        test:/\.scss$/,use:ExtractTextWebpackPlugin.extract([
          {loader:'css-loader'},
          {loader:'sass-loader'},
        ])
      },
    ]
  },
```
- 分开抽离 scss抽离成scss文件，css抽离成css文件
```
const ScssExtract = new ExtractTextWebpackPlugin('css/scss.css')
const CssExtract =  new ExtractTextWebpackPlugin('css/css.css')
  module: { //模块配置
    rules: [
      {
        test:/\.css$/,use:CssExtract.extract([
          {loader:'css-loader'},
        ])
      },
      {
        test:/\.scss$/,use:ScssExtract.extract([
          {loader:'css-loader'},
          {loader:'sass-loader'},
        ])
      },
    ]
  },
   plugins: [
      ScssExtract,CssExtract,
   ]
```
- __按需加载__
 拆分js，拆分js才能按需加载，否则都打包到一个文件里，无法按需加载```chunkFilename``` 按需加载的名字
配置好路径，不然找不到```publicPath:```
```
import b from './b.js';
const btn = document.querySelector("#btn");
btn.onclick = ()=>{
    import('./b').then(function(module){
      const b = module.default;
      b();
    })
}
```
```
module.exports = {
  entry:'./a.js',
  output:{
    filename:'[name].js',
    chunkFilename:'[name].js'// 设置按需加载后的chunk名字
    publicPath:'dist/' // 设置基础路径
  }
}
```
