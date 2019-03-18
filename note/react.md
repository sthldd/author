- 组件名字必须 __大写__,自定义组件必须继承 __react.component__
类
- ==render== 接受两个参数，第一个是组件要被div包裹起来，第二个是jsx语法，要插入到那个 __dom__ 里面
- 元素class 要写成 __className__
- __{}__ 临时插入一个js表达式，不能写 __if，for__ 复杂结构，可以写或与 __非运算__ 和 __三元表达式__，可以调用 __函数__
- 原生自定义属性要加 __data-__ 前缀
- 可以直接运行函数，插入函数，函数可以写if else
```
class App extends component{
  haha(){
    //if(){} //这里可以写if else
    return (
      <ul>
        <li>1</li>
        <li>1</li>
        <li>1</li>
      </ul>
    )
  }
  render(){
    return (
      <div>
        <h1>你好</h1>
        {this.haha}
      </div>

    )
  }
}
```
- 内联样式必须==双大括号==，是==json==对象格式，也可以相加，要用驼峰
```
  render(){
    return (
      <div>
        <h1 style={{"width":"100px"}}>你好</h1>
        {this.haha}
      </div>

    )
  }
  <h1 style={{ "width": 100 + 100 + "px"}}>你好</h1>
```
- ==dom对象==能直接展开 不用遍历 ，==只有==dom对象才能
```
 render(){
    let arr = ['1','2','3'].map((item)=>{
      return <li>{item}</li>
    })
    return (
      <div>
        <ul>
          <li>{arr}</li>
        </ul>
      </div>

    )
  }
```
#### 数据传递三兄弟，state，props，context
- 事件触发on后面要大写，事件要绑定this，绑定函数用单大括号{}
```
  <button onClick={this.clickme.bind(this)}>点我</button>
```
- state，内部组件属性，使用this.state.a,不能写this.state.a++,因为state只读属性
```
this.setState({a:this.state.a+1})
```
- props props改变，会引发视图的重绘,绝对不允许更改props的传值
```
<Cos a='11'></Cos> //父组件
<p>{this.state.a}</p> //子组件直接使用
constructor(props){ //还可以吧props变成自己的
  super()
  this.state = {
    a:props.a
  }
}
```
- propsType验证props,写在class下面，导出之前
```
yarn add props-type
import PropTypes from 'prop-types';
Cos.propTypes = {
  a:PropTypes.string.isRequired, //必传
  b: PropTypes.string            //不必传
}
```
- 子传递给父数据
```
//父组件
getValue(number){
  this.setState({
    "a" : number
  })
}

<Cos  getValue={(this.getValue).bind(this)} a={this.props.a}></Cos>

//子组件
<button onClick={()=>{this.props.getValue(8)}}>点我</button>

---------------------------------------//也可以这么写

<button onClick={()=>{this.props.getValue(8)}}>点我</button>

 this.getValue = (number)=>{
  props.getValue(number)
}
```
- 老版本context
```
//爷爷组件
 getChildContext(){
  return{
    a:this.state.a
  }
}
Yeye.childContextTypes = {
  a:PropTypes.number.isRequired
}
```
```
//孙子组件
 constructor(props, context) {
  super()
  console.log(context,'sunzi')
}
Sunzi.contextTypes = {
  a: PropTypes.number.isRequired
}
```
