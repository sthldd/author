## 生命周期
- 创建前/后： 在beforeCreated阶段，vue实例的挂载的数据对象data都为undefined，还未初始化。在created阶段，vue实例的数据对象data有了。
- 载入前/后：在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点。在mounted阶段，vue实例挂载完成，
- 更新前/后：当data变化时，会触发beforeUpdate和updated方法。
- 销毁前/后：在执行destroy方法后，对data的改变不会再触发周期函数，此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在
- activated和deactivated 分别在keep-alive激活和关闭时调用
- errorCaptured当捕获一个来自子孙组件的错误时被调用。
## eventbus
1. 创建eventbus.js文件
```
import Vue from 'vue'
export const EventBus = new Vue()
```
2. 父组件子组件都引入
```
import { EventBus } from "./event-bus.js";//父组件
EventBus.$on("事件", {})

import { EventBus } from "./event-bus.js"; //子组件
EventBus.$emit("事件", {})
```
## 响应式原理
- 主要是数据劫持结合发布者-订阅模式
- 通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时，发布消息给订阅者，触发相应的监听回调。
- Observer类是将每个目标对象（即data）的键值转换成getter/setter形式，用于进行依赖收集以及调度更新。
- 如果是数组，就修改后可以截获响应的数组方法替换掉该数组的原型中的原生方法，然后就对数组每一项进行observe
- 对象进行walk绑定，遍历对象进行defineReactive绑定
- getter的时候Dep收集依赖 setter的时候新的值需要重新进行observe，dep对象通知所有的观察者去更新数据，从而达到响应式效果。
- 赖收集简单点理解就是收集只在实际页面中用到的data数据
- Watcher是一个观察者对象。依赖收集以后Watcher对象会被保存在Dep的subs中，数据变动的时候Dep会通知Watcher实例，然后由Watcher更新。
## vue的优势和react比
- 资料丰富，框架功能完善，加入非常多的特性，例如，if, for, async指令,为开发者节省很多垃圾代码。模板支持html和jsx，支持自定义指令，方便操作dom的一致行为。
- 框架功能强大，非常灵活，组建非常规范，jsx功能强大，生态不错。文档也不错。
## computed和methods watch的区别
- computed是响应式的，methods并非响应式。
- 调用方式不一样，computed定义的成员像属性一样访问，methods定义的成员必须以函数形式调用。
- computed是带缓存的，只有其引用的响应式属性发生改变时才会重新计算，而methods里的函数在每次调用时都要执行。
- computed中的成员可以只定义一个函数作为只读属性，也可以定义get/set变成可读写属性，这点是methods中的成员做不到的
- __watch__ 是侦听器 一个数据影响多个数据。如果一个值变化后会引起一系列操作，或者一个值变化会引起一系列值的变化（一对多）
- __computed__ 是计算属性，一个数据受多个数据影响,是计算属性，也就是依赖其它的属性计算所得出最后的值,一个值依赖多个属性（多对一）
## 组件通信方式
- vuex
- props和$emit
- eventbus
- provide和inject
```
provide(){  //根节点
  return{
      root:this
  }
},
addItems(vm){
  this.items.push(vm)
    //console.log(this.items)
},


inject:['root'], //子节点或者孙节点注入
created(){ //子节点直接this.root使用父节点方法
  this.root.addItems(this)
},
```
## vuex
vuex是状态管理，有几个核心概念
- __State__:存放数据
- __Getter__:处理state里面的数据，例如对列表进行过滤并计数
```
getters: {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  }
}
```
通过```store.getters.doneTodos```访问，也可以接受其他 getter 作为第二个参数：在组件中使用
```
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
import { mapGetters } from 'vuex'
```
```
export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```
- __Mutation__:```更改 Vuex 的 store 中的状态的唯一方法是提交 mutation```,组件里调用 __Mutation__ ```store.commit('increment')```，还可以传参```store.commit('increment', 10)```,在大多数情况下，传参应该是一个对象，__对象风格的提交方式__ ```store.commit({type: 'increment',amount: 10
})```,Mutation 必须是同步函数,否则 __不可追踪的__
- __Action__:Action 提交的是 mutation，Action 可以包含任意异步操作，通过```store.dispatch('increment')```触发Action，和Mutation传参和对象风格一样
- __Module__:Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
```
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
## 路由的实现
vue-router中，它提供mode参数来决定采用哪一种方式
- 在初始化history之前，会对mode做一些校验：若浏览器不支持HTML5History方式，则mode强制设为'hash'；若不是在浏览器环境下，则mode强制设为'abstract'
- VueRouter类中的onReady(), push()等方法只是一个代理，实际是调用的具体history对象的对应方法
##### Hash
- hash虽然出现在URL中，但不会被包括在HTTP请求中。它是用来指导浏览器动作的，对服务器端完全无用，因此，改变hash不会重新加载页面
- 使用hashchange监听
- 每一次改变hash（window.location.hash），都会在浏览器的访问历史中增加一个记录
##### History
- HTML5，History interface提供了两个新的方法：pushState(), replaceState()使得我们可以对浏览器历史记录栈进行修改：
- popstate事件,每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。仅仅调用pushState方法或replaceState方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用back、forward、go方法时才会触发。
##### 比较
- hash丑
- pushState设置的新URL可以是与当前URL同源的任意URL；而hash只可修改#后面的部分，故只可设置与当前同文档的URL

- pushState设置的新URL可以与当前URL一模一样，这样也会把记录添加到栈中；而hash设置的新值必须与原来不一样才会触发记录添加到栈中

- pushState通过stateObject可以添加任意类型的数据到记录中；而hash只可添加短字符串

- pushState可额外设置title属性供后续使用
- hash模式下，仅hash符号之前的内容会被包含在请求中，如 http://www.abc.com, 因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回404错误；
- history模式下，前端的url必须和实际向后端发起请求的url 一致，如http://www.abc.com/book/id 。如果后端缺少对/book/id 的路由处理，将返回404错误。
## 路由传参
##### 编程式的导航的传参 router.push
命名路由传参 __不会在url出现__
```
this.$router.push({ name: 'news', params: { userId: 123 }})
```
接收方
```
this.$route.params.userId
```
查询参数传参 __会在url出现__
查询参数就是在路由地址后面带上参数和传统的url参数一致的，传递参数使用query而且必须配合path来传递参数而不能用name，目标页面接收传递的参数使用query。
```
this.$router.push({ path: '/news', query: { userId: 123 }});
```
接收方
```
this.$route.query.userId
```
==name配对的是params，和path配对的是query==
##### 声明式的导航的传参 router-link
命名路由  __不会在url出现__
```
<router-link :to="{ name: 'news', params: { userId: 1111}}">click to news page</router-link>
```
查询参数 __会在url出现__
```
<router-link :to="{ path: '/news', query: { userId: 1111}}">click to news page</router-link>
```
1. 命名路由搭配params，刷新页面参数会 __丢失__
2. 查询参数搭配query，刷新页面数据 __不会丢失__
3. 接受参数使用this.$router后面就是搭配路由的名称就能获取到参数的值
## 动态路由
```
routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
```
- 当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，也意味着组件的生命周期钩子不会再被调用。可以用==watch==或者==beforeRouteUpdate==来监听路由变化
## api
- __router.push__ 这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。
- __router.replace__ 不会向 history 添加新记录
- __router.go(n)__ 在 history 记录中向前或者后退多少步
- __重定向redirect__
```
routes: [
    { path: '/a', redirect: '/b' }
  ]
```
