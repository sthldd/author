# js篇
## 数组中的forEach和map的区别
###### 相同点
- 都是循环遍历数组中的每一项
- forEach和map每次执行匿名函数支持3个参数，参数分别是item（当前每一项），index（索引值），arr（原数组）
- 匿名函数中的this都是指向window
- 只能遍历数组
- 都不会改变原数组
###### 区别
- map方法返回一个新的数组，数组中的元素为原始数组调用函数处理后的值。
- forEach返回的都是undefined。
## 转数组
- ```[].slice.call(arguments)```
- ```Array.of()```
- ```Array.from()```
- ```split('')```
## 转字符串
- ```join('')```
- ```toString()```
## 判断数组
- ```[] instance Array```
- ```arr.constructor === Array```
- ```Array.isArray```
- ```Object.prototype.toString.call([])==="[object Array]"```

## null和undefined的区别
- null是一个表示"无"的对象，转为数值时为0
- undefined是一个表示"无"的原始值，转为数值时为NaN
- typeof null 为object typeof underfined 为 underfined
###### undefined表示 “缺少值”，就是此处应该有一个值，但是还没有定义。典型用法是：
- 变量被声明了，但没有赋值时，就等于 undefined
- 调用函数时，应该提供的参数没有提供，该参数等于 undefined
- 对象没有赋值的属性，该属性的值为 undefined
-  函数没有返回值时，默认返回 undefined

###### null表示“没有对象”，即该处不应该有值。典型用法是：
- 作为函数的参数，表示该函数的参数不是对象
- 作为对象原型链的终点
- 定义的变量准备用来保存对象（数组、对象、函数） ，最好将变量初始化为null

## 虚拟dom
每一次 DOM 的变动，浏览器就得重新渲染一次页面。为了提高页面的性能，就应该尽量减少 DOM 的变更次数。现代框架通常会用一个对象来保存目标 DOM 节点的标签名、属性、内容、子节点等信息，也就是用 js 的对象结构来表示 DOM 树的结构，这个 js 对象就是虚拟 DOM。当状态变更的时候，js 会先更新虚拟 DOM，再通过 diff 算法比较虚拟 DOM 和真实 DOM 的差异，找出最少变更的方案，最后一并更新到真实 DOM 中。如果全程操作真实 DOM 的话，任何一个状态的变更，都会导致页面重绘，这个环节就非常耗性能了。采用虚拟 DOM 的话，就能避免这个问题。，就是不会出现频繁的、大面积的 DOM 操作，从而提升了页面性能。
## call apply bind实现原理
```
Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    var result = eval('context.fn(' + args +')');
    delete context.fn
    return result;
}
```
```
Function.prototype.apply = function (context, arr) {
    var context = context || window;
    context.fn = this;
    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }
    delete context.fn
    return result;
}
```
```
Function.prototype.mybind = function(context) {
    var self = this;
    var args = [];//保存bind函数调用时传递的参数
    for(var i = 1, len = arguments.length; i< len;i ++) {
        args.push(arguments[i]);
    }
    //bind()方法返回值是一个函数
    return function() {
        //哇，新创建的函数传进来的参数可以在这里拿到哎！！
        var bindArgs = Array.prototype.slice.call(arguments);
        self.apply(context, args.concat(bindArgs))
    }
```

## event loop事件
__回调队列先进先出  执行栈先进后出__
js是单线程的，处理任务是一件接着一件处理，所以如果一个任务需要处理很久的话，后面的任务就会被阻塞，所以js通过Event Loop事件循环的方式解决了这个问题,浏览器在执行栈执行的时候，发现有异步任务之后，会交给webapi去维护，而执行栈则继续执行后面的任务，此时，倒计时结束后的setTimeout的可执行函数，被放入了回调队列。
- setTimeout的可执行函数，被从回调队列中取出，再次放入了执行栈,对于setTimeout代码，定时器触发线程 在接收到代码时就开始计时，时间到了将回调函数扔进队列。
- 对于ajax代码，http异步线程  立即发起http请求，请求成功后将回调函数扔进队列。
- 对于dom.onclick，浏览器事件线程会先监听dom，直到dom被点击了，才将回调函数扔进队列。
## 宏任务 微任务
- miatask（微任务）：process.nextTick, Promises, Object.observe, MutationObserver
- marco-task（宏任务）script(主程序代码),setTimeout, setInterval, setImmediate, I/O, UI rendering
- script(主程序代码)—>process.nextTick—>Promises…——>setTimeout——>setInterval——>setImmediate——> I/O——>UI rendering
## 数组去重
```
var arr = [1,3,4,5,6,7,4,3,2,4,5,6,7,3,2];
 var newArr = [];
for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) == -1 ) {
        newArr.push(arr[i]);
    }
}
```
```
function a(arr){
  return [... new Set(arr)]
}
```
```
function a(arr){
  return Array.from(new Set(arr))
}
```
## 捕获和冒泡
事件冒泡和事件捕获分别由微软和网景公司提出，这两个概念都是为了解决页面中事件流（事件发生顺序）的问题。
- ==冒泡== 微软提出了名为事件冒泡(event bubbling)的事件流，因此在事件冒泡的概念下在p元素上发生click事件的顺序应该是p -> div -> body -> html -> document
- ==捕获== 网景提出另一种事件流名为事件捕获(event capturing)。与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。
- w3c 采用折中的方式，平息了战火，制定了统一的标准——先捕获再冒泡。addEventListener的第三个参数就是为冒泡和捕获准备的.参数默认值是false，表示冒泡阶段.

## 原型和原型链
```
var a = [1,2,3]
只有0、1、2、length 4 个key
为什么可以 a.push(4) ，push 是哪来的？
a.proto === Array.prototype
push 就是沿着 a.proto 找到的，也就是 Array.prototype.push
Array.prototype 还有很多方法，如 join、pop、slice、splice
Array.prototype 就是 a 的原型（proto）
```
## 深拷贝
- 深拷贝（deep copy）：复制并创建一个一摸一样的对象，不共享内存，修改新对象，旧对象保持不变。
```
 var a = {...}
 var b = JSON.parse( JSON.stringify(a) )
```
```
function clone(object){
     var object2
     if(! (object instanceof Object) ){
         return object
     }else if(object instanceof Array){
         object2 = []
     }else if(object instanceof Function){
         object2 = eval(object.toString())
     }else if(object instanceof Object){
         object2 = {}
     }
     for(let key in object){
         object2[key] = clone(object[key])
     }
     return object2
 }
```
## 浅拷贝
- 浅拷贝（shallow copy）：只复制指向某个对象的指针，而不复制对象本身，新旧对象共享一块内存；
```
var json1 = {"a":"name","arr1":[1,2,3]}
function copy(obj1) {
　　　　var obj2 = {};
　　　　for (var i in obj1) {
　　　　　　obj2[i] = obj1[i];
　　　　}
　　　　return obj2;
}
var json2 = copy(json1);
```
## 闭包
- 闭包就是函数内部访问函数作用域外的变量,这个变量和这个函数之间的这个环境就叫闭包
- 闭包可以暂存数据,已经给变量开辟私密空间,避免外部污染 在一个函数作用域中声明一个变量,子函数(访问器)可以操作这个变量,通过return 这个子函数(访问器),
外面可以访问这一个变量,来达到此目的,外面变量通过得到return的函数,这样外面访问这个函数,这个函数访问父级函数的变量,这样变量就一直存在这个依赖关系无法销毁
__缺点__：
造成内存消耗过大，如果处理不当，会造成内存泄漏
## 对象遍历方法  for in 遍历的是索引 for of遍历的是值
## typeof和instanceof
typeof主要用于检测 __基本数据类型__：数值、字符串、布尔值、undefined， 因为typeof用于检测引用类型值时，对于任何Object对象实例（包括null），typeof都返回"object"值，没办法区分是那种对象，对实际编码用处不大。
## get和post
- 参数。GET 的参数放在 url 的查询参数里，POST 的参数（数据）放在请求消息体里。
- 安全（扯淡）。GET 没有 POST 安全（都不安全）
- GET 的参数（url查询参数）有长度限制，一般是 1024 个字符。POST 的参数（数据）没有长度限制（扯淡，4~10Mb 限制）
- GET 请求只需要发一个包，POST 请求需要发两个以上包（因为 POST 有消息体）（扯淡，GET 也可以用消息体）
- GET 用来读数据，POST 用来写数据，POST 不幂等（幂等的意思就是不管发多少次请求，结果都一样。）
## 事件委托
```
function listen(element, eventType, selector, fn) {
 element.addEventListener(eventType, e => {
     let el = e.target
     while (!el.matches(selector)) {
         if (element === el) {
             el = null
             break
         }
         el = el.parentNode
     }
     el && fn.call(el, e, el)
 })
 return element
}
listen(ul, 'click', 'li', ()=>{})
```
## 相同和严格相同
== 代表相同, ===代表严格相同
- 双等号比较,先检查两个操作数数据类型,如果相同, 则进行===比较,如果不同,进行一次类型转换, 转换成相同类型后再进行比较,
- ===比较时, 如果类型不同,直接就是false,使用 == 的情景是快速判断值是否相等的情况，并不考虑类型，比如 1 == '1'
## new做了什么
1、创建一个新对象；[var o = new Object();]
2、将构造函数的作用域赋给新对象（因此this指向了这个新对象；
3、行构造函数中的代码(为这个新对象添加属性)；
4、返回新对象。
## 找字符串中出现最多的字符
```
var str = 'aaabbbcccdddddaeaaddddf'
String.prototype.getMostOffen = function () {
  var arr = JSON.stringify(this)
  var obj = {}
  for (let i in str) {
    if (obj[str[i]]) {
      obj[str[i]]++;

    } else {
      obj[str[i]] = 1;
    }
  }
  console.log(obj)
  let keys = Object.keys(obj)
  let values = Object.values(obj)
  let maxVal = Math.max(...values)
  return keys[values.indexOf(maxVal)]
}
var ch = str.getMostOffen()
```

## 懒加载原理
- offsetTop是图片距离浏览器顶部的距离  innerHeight是浏览器页面的高度 scrooltop是浏览器滚动了多少
- innerHeight + scrooltop >= offsetTop
## 函数防抖节流
```
function debounce(func, wait) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}
```
```
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout;
      timeout = setTimeout(function(){
          timeout = null;
      }, wait)
      if (callNow) func.apply(context, args)
    }
    else {
      timeout = setTimeout(function(){
          func.apply(context, args)
      }, wait);
    }
  }
}
```
```
function throttle(func, wait) {
  var context, args;
  var previous = 0;
  return function() {
    var now = +new Date();
    context = this;
    args = arguments;
    if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
    }
  }
}
```
```
function throttle(func, wait) {
  var timeout;
  var previous = 0;
  return function() {
    context = this;
    args = arguments;
    if (!timeout) {
      timeout = setTimeout(function(){
        timeout = null;
        func.apply(context, args)
      }, wait)
    }
  }
}
```
## 继承
- 原型链继承
    - 缺点 包含引用类型值的函数，所有的实例都指向同一个引用地址，修改一个，其他都会改变。不能像超类型的构造函数传递参数
- 构造函数继承
    - 缺点 方法都在构造函数中定义，因此函数复用就无从谈起了，而且超类型中的原型的属性和方法，对子类型也是不可见的，结果所有的类型只能使用构造函数模式。
- 组合继承
    -  无论什么时候，都会调用两次超类型的构造函数
```
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
Parent.prototype.getName = function () {
    console.log(this.name)
}
function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}
// 关键的三步
var F = function () {};
F.prototype = Parent.prototype;
Child.prototype = new F();

var child1 = new Child('kevin', '18');
console.log(child1);
```
## 创建对象的方法
## 跨域
## 重绘和回流

回流必定触发重绘，而重绘不一定触发回流
sort排序是根据个位数来的 垃圾