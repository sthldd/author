## ES6

## let var const的区别
- ==var== 可以变量提升，可以重复声明 ，全局作用域下给window增加属性
- ==let==  没有变量提升 ，不能重复声明  ，暂时性死区 ，全局作用域下不给window增加属性，块级作用域
- 使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”
```
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```
- ==const==  赋值不能改变 ，初始化必须赋值，块级作用域
## 解构赋值
## 模板字符串
## 字符串扩展
- __includes():返回布尔值__，表示是否找到参数字符串。
- __startsWith():返回布尔值__，表示参数字符串是否在原字符串的头部。
- __endsWith():返回布尔值__，表示参数字符串是否在原字符串的尾部。
复制代码并且这三个方法都支持第二个参数，表示起始搜索的位置。
```

let a = 'hello leo';
a.startsWith('leo',1);   // false
a.endsWith('o',5);       // true
a.includes('lo',6);      // false
```

- __repeat()__ 方法返回一个新字符串，表示将原字符串重复n次。
```
'ab'.repeat(3);        // 'ababab'
```
- __padStart(),padEnd()__
这两个方法接收2个参数，第一个指定字符串最小长度，第二个用于补全的字符串。
```
'x'.padStart(5, 'ab');   // 'ababx'
'x'.padEnd(5, 'ab');     // 'xabab'
```
## Number扩展
- __Number.isFinite()__ 用于检查一个数值是否是有限的，即不是Infinity，若参数不是Number类型，则一律返回==false== 。
- __Number.isNaN()__ 用于检查是否是NaN，若参数不是NaN，则一律返回==false==。
与传统全局的isFinite()和isNaN()方法的区别，传统的这两个方法，是先将参数转换成 __==数值==__，再判断。
- __Number.isInteger()__ 用来判断一个数值是否是整数，若参数不是数值，则返回==false==。
## math的扩展
## Symbol的扩展
- 表示独一无二的值，主要是为了防止属性名冲突。
- Symbol作为属性名，防止同名属性，还有防止键被改写或覆盖。
## 函数扩展
- __参数默认值__
 rest参数形式为（...变量名），其值为一个数组，用于获取函数多余参数。
 ```
 function f (a, ...b){
    console.log(a, b);
}
f(1,2,3,4); // 1 [2, 3, 4]
 ```
 rest参数只能放在最后一个，否则报错：
 ```function f(a, ...b, c){...}; // 报错 ```
- __rest 参数__
- __name 属性__
```
function f (){...};
f.name;    // f
```
- __箭头函数__
1.箭头函数内的this总是指向定义时所在的对象，而不是调用时。
2.箭头函数不能当做构造函数，即不能用new命令，否则报错。
3.箭头函数不存在arguments对象，即不能使用，可以使用rest参数代替。
4.箭头函数不能使用yield命令，即不能用作Generator函数。
5.没有原型
6.不能改变this
箭头函数的 this 始终指向函数定义时的 this，而非执行时。，箭头函数需要记着这句话：“箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined”。
## 数组扩展
- __拓展运算符__
```
console.log(...[1, 2, 3]);   // 1 2 3
console.log(1, ...[2,3], 4); // 1 2 3 4
```
- __find__ 返回第一个找到的值
- __findIndex__ 返回第一个找到的下标
- __includes__ 第二个参数是起始位置 __返回布尔__
- __entries__ 遍历数组的key value for(let a of arr.entries())
- __fill__ 填充  三个参数 当前值 起始和结束 __改变原数组__
<!-- - __some__ 遍历所有 一项为true结果就是true  __返回布尔__
- __every__ 每项返回true,则最终结果为true。当任何一项返回false时，停止遍历，返回false。  __返回布尔__ -->
- __map、filter返回一个新数组__。
- __Array.of()__ 方法永远返回一个数组，参数不分类型，只分数量，数量为0返回空数组。
- __Array.from()__ 将两类对象转为真正的数组：__类数组__ 的对象和 __可遍历（iterable）的对象__
- __flat()__ 拍平数组，默认转一维数组，__flat(n)__ 接受参数 转成n维数组，__flat(Infinity)__ 无论多少层数组转为一层,__返回新数组，不改变原数组__
## 对象新增方法
- ==Object.is()==
用于比较两个值是否严格相等，在ES5时候只要使用相等运算符和严格相等运算符就可以做比较，但是它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0。
- ==Object.assign()==
方法用于对象的合并,实现的是 __==浅拷贝==__。
- ==Object.keys()，Object.values()，Object.entries()==
```
Object.is('a','a');   // true
Object.is({}, {});    // false

// ES5
+0 === -0 ;           // true
NaN === NaN;          // false

// ES6
Object.is(+0,-0);     // false
Object.is(NaN,NaN);   // true
```
## Symbol
## Set
###### Set
Set本身为一个构造函数，用来生成Set数据结构。但成员是唯一且无序的，没有重复的值。
- 四个操作方法，四个遍历方法
- 数组去重
- 获取并集、交集和差集：
```
let a = new Set([1,2,3]);
let b = new Set([4,3,2]);

// 并集
let c1 = new Set([...a, ...b]);  // Set {1,2,3,4}

// 交集
let c2 = new Set([...a].filter(x => b.has(x))); // set {2,3}

// 差集
let c3 = new Set([...a].filter(x => !b.has(x))); // set {1}
```
- keys()：返回键名的遍历器。
- values()：返回键值的遍历器。
- entries()：返回键值对的遍历器。
## Map
ES6增加Map数据结构，传统的JavaScript对象只能用字符串当做键，Map使得各种类型的值(包括对象)都可以作为键。
```
const m = new Map();
const o = {p: 'Hello World'};
m.set(o, 'content')
------
console.log(m)
key: {p: "Hello World"}
value: "content"
------

let a = new Map();
let b = {name: 'leo' };
a.set(b,'my name'); // 添加值
a.get(b);           // 获取值
a.size;      // 获取总数
a.has(b);    // 查询是否存在
a.delete(b); // 删除一个值
a.clear();   // 清空所有成员 无返回
```
- 如果对同一个键多次赋值，后面的值将覆盖前面的值。
- 如果读取一个未知的键，则返回undefined。
- 同样的值的两个实例，在 Map 结构中被视为两个键。
```
let a = new Map();
let a1 = ['aaa'];
let a2 = ['aaa'];
a.set(a1,111).set(a2,222);

0:key: ["aaa"]
value: 111
1:key: ["aaa"]
value: 222
```
## Proxy
- Proxy是ES6新增的一个构造函数，拦截外界对目标对象访问的一种机制，从而对外界的访问进行过滤和修改，即代理某些操作，也称“代理器”。
proxy实例化需要传入两个参数，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。
```
let p = new Proxy(target, handler);

let a = new Proxy({}, {
    get: function (target, handler){
        return 'leo';
    }
})
a.name; // leo
```
上面拦截外界访问，并且get方法接收两个参数，分别是目标对象和所要访问的属性，所以不管外部访问对象中任何属性都会执行get方法返回leo。
- 只能使用Proxy实例的对象才能使用这些操作。
- 如果handler没有设置拦截，则直接返回原对象。
- __revoeke__();取消Proxy实例。
## 手写promise
> Promise 是异步编程的一种解决方案：从它是承诺，承诺它过一段时间会给你一个结果。promise有三种状态：pending(等待态)，resolve(成功态)，rejected(失败态)；状态一旦改变，就不会再变。创造promise实例后，它会立即执行。
- Promise为一个构造函数，需要用new来实例化。
- Promise接收一个函数作为参数，该函数两个参数resolve和reject
- __then__ :链式then
- __catch__：捕捉错误
- __finally__：不管成功失败 最后都执行
```
const p = Promise.all([p1, p2, p3]);
```
1.p1、p2、p3的状态都变成resolve，p的状态才会变成resolve,组合传给p
2. p1、p2、p3之中有一个被rejected，p的状态就变成rejected,第一个被reject的实例的返回值，会传递给p的回调函数。
- __all__
- __race__
###### 缺点
- 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
- 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
- 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
## Iterator和 for...of循环
>Iterator是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作
## Generator
- ES6 提供的一种异步编程解决方案，Generator 函数会返回一个遍历器对象，Generator有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式。
- Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。
- 每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。
## async 和 await
- async 函数 __返回__ 的是一个 __Promise__ 对象,如果在函数中 return 一个直接量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象。如果不是 Promise 对象，就直接返回对应的值。
- await 不仅仅用于等 Promise 对象，await 后面实际是可以接普通函数调用或者直接量的。
- 是 Generator 函数的语法糖，对Generator做了几点改进。
async函数自带执行器，更好的语义，返回值是 Promise。
```
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123
```


#### 优势
- 单一的 Promise 链并不能发现 async/await 的优势，但是，如果需要处理由多个 Promise 组成的 then 链的时候，优势就能体现出来了（很有意思，Promise 通过 then 链来解决多层回调的问题，现在又用 async/await 来进一步优化它）。
## Class
- 实例化必须==new==
- 不存在提升
- 默认严格模式
- __静态方法__ :在一个方法前，加上static关键字，就表示该方法不会被==实例==继承，而是直接通过类来调用，==父类的静态方法，可以被子类继承,也是可以从super对象上调用的。==。
```
class Foo {
  static classMethod() {
    return 'hello';
  }
}
Foo.classMethod() // 'hello'
var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```
- __私有方法和私有属性__ :
```
class Widget {
  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }
}
```
私有属性和私有方法都可以用 __#__ 来表示
```
class Foo {
  #count = 0;
  #sum() {
    return #a + #b;
  }
}
```
## super
子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
## ES5和ES6继承的区别
ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

ES5和ES6继承最大的区别就是在于：
　　1.ES5先创建子类，在实例化父类并添加到子类this中
　　2.ES6先创建父类，在实例化子集中通过调用super方法访问父级后，在通过修改this实现继承
## Object.getPrototypeOf()
Object.getPrototypeOf方法可以用来从子类上获取父类。因此，可以使用这个方法判断，一个类是否继承了另一个类。
```
Object.getPrototypeOf(ColorPoint) === Point // true
```