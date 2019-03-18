#### html语义化
- 段落用 p，边栏用 aside，主要内容用 main 标签
- 可访问性：帮助辅助技术更好的阅读和转译你的网页，利于无障碍阅读；
- 可检索性：有了良好的结构和语义，可以提高搜索引擎的有效爬取，提高网站流量；
- 国际化：全球只有13%的人口是英语母语使用者，因此通用的语义化标签可以让各国开发者更容易弄懂你网页的结构；
- 互用性：减少网页间的差异性，帮助其他开发者了解你网页的结构，方便后期开发和维护；
#### html5新特性
- 语义化标签```header,footer,main,aside,section```
- input ```color,date,time,search,number```
- ```placehoder,audio,video,Canvas,drag,WebSocket,localStoage,sessionStorage```
#### 盒模型。
```
content-box: width == 内容区宽度
border-box: width == 内容区宽度 + padding 宽度 + border 宽度
```
#### 水平居中
- 内联：爸爸身上写 text-align:center;
- 块级：margin-left: auto; margin-right: auto;
#### 不定宽高垂直居中
```
display: flex;
justify-content: center;
align-items: center;
```
```
position: absolute;  //子元素绝对定位，父元素相对定位
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
```
```
div.table{
  display: table;
  border: 1px solid red;
  height: 600px;
}
div.td{
  display: table-cell;
  border: 1px solid blue;
  vertical-align: middle;
}
.child{
  border: 10px solid black;
}
```
#### link 与 @import 的区别
- link功能较多，可以定义 RSS，定义 Rel 等作用，而@import只能用于加载 css
- 当解析到link时，页面会同步加载所引的 css，而@import所引用的 css 会等到页面加载完才被加载
- @import需要 IE5 以上才能使用
- link可以使用 js 动态引入，@import不行
#### rem计算
- rem是通过根元素的字体大小来设置元素的宽高的,以此来达在不同屏幕尺寸中等比例缩放达到完美的展现效果 __1rem__ = __1 * 根元素px__ 字体大小,__em__ 单位是相对于 __父元素__ 的字体大小
```
@function px( $px ){
  @return $px/$designWidth*10 + rem;
}
$designWidth: 320px; 为设计稿的宽度
```
#### CSS3新特性
