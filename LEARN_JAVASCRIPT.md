### 基本变量类型
- `number`,`string`,`boolean`,`null`,`undefined`,`object`
- `typeof`返回：`number`,`string`,`boolean`,`undefined`,`object`,`function`

### 运算符
- `+`号：
    + 值为(number|boolean|null|undefined)类型时，或者object类型值的valueOf方法返回（默认为`[object Object]`）以上类型的值时，视为可以可以转换为数字，其余类型变量视为不可转换为数字,
    + 当两个值都可以转换为数字，当作算数运算，否则为字符串连接
    + 确定了运算方式，然后进行隐式类型转换：算数运算首先将值转换成数字：`boolean->1/0`，`null->0`，`undefined->NaN`，`object->valueOf方法返回值然后进行上述转换`,字符串连接转换成字符串：`boolean->"true"/"false"`,`null->"null"`,`undefined->"undefined"`，`object->valueOf方法返回值然后进行上述转换`，再进行计算
- `-`号
    + 任何时候都当作算数运算
    

### 作用域
一个函数形成一个封闭的作用域
- 全局作用域：全局范围内可引用，执行完成不会被销毁
- 局部作用域：只能在局部作用域（或子作用域）内使用，一般情况下在函数执行完毕后销毁
- _闭包：局部作用域的函数引用了局部作用域的变量，并且这个函数可以被外部访问到，此时局部作用域代码执行完毕后变量不会被销毁_
- _作用域链：当变量没有在本作用域找到时，自动查找上一级作用域_


### 变量定义与申明
- 未使用关键字，直接赋值的变量
    - 全局作用域内：看作变量申明，绑定到`window`对象上，并且可以使用`delete`删除
    - 局部作用域内：会对全局变量重新赋值，如果全局变量未定义，同以上行为
- var关键字申明的变量  
    - 变量提升：可以在（在本作用域内）申明之前使用，但是值为`undefined`，相当于在头部使用了`var variable`
    - 全局作用域内：
        - 使用var定义的变量会绑定到window对象上，但不可以被删除
        - 可以使用var重新对变量值进行覆盖，但是如果后面的var没有指定值则不会覆盖
    - 局部作用域内：
        - 使用var定义的变量属于局部作用域，函数执行完毕会被销毁
- function申明的变量
    - 同var关键字申明的变量，区别在于它的变量提升相当于`var fun=function(){}`


### 模块化`exports`和`module.exports`与`require`，`export`和`import`
node.js在执行的时候会自动包裹一个变量module
- `module.exports`可以导出模块，而exports是module.exports的简写形式，可以通过对exports对象的属性赋值达到模块导出的目的（直接赋值只能使用`module.export=obj`）
- `require`用于加载`module.exports`导出的模块对象，两者一般成对出现  
>`export`和`import`属于es6语法关键词，后面可以直接接需要导出的对象  
>`export`导出时必须加大括号`export {name1,name2}`或者加`default关键字` `export default name1`或者导出函数`export function fn(){}`（总之，导出时必须附带名字或`default`） 
>`import`一般和`export`配合使用，一般语法`import {name1,name2} from ""`（当导出的是`default`时可以选择省略大括号）
>基于工厂模式，每次`import`会调用`factory`生成一个模块
>多次加载同一个模块的时候（即使在不同模块中），只会加载一次，以后的加载都会指向第一次加载的对象


### 正则表达式`RegExp`
#### RegExp对象构造方式：
- 字面量：`/[\d]*/i`
- new关键字：`new RegExp(string,pattern)`,`string`参数可以为字符串或正则对象，如果提供`pattern`参数，string的模式会被忽略

#### 正则修饰符
- i忽略大小写
- g全局匹配
- m多行匹配

#### 正则模式
- 方括号（查找某个范围内的字符）
    + [abc]
    + [0-9]
    + [x|y] |代表或
- 元字符（特殊含义的字符）
    + \d 数字
    + \s 空白字符
    + \b 单词边界
    + \uxxxx 十六进制数xxxx规定的Unicode字符（`[\u4E00-\u9FA5]+`匹配中文）
- 量词（表示前面表达式的数量）
    + +至少一个
    + *零个或多个
    + ?零个或一个

#### 正则对象的使用
- `test()`方法：检测字符串是否符合某个模式，返回`boolean`
- `exex()`方法：返回正则匹配的结果`Array`或`null`，数组里存放匹配的结果
- 字符串的`match(reg)`方法和`replace(reg,"")`方法可以接受`string`和`RegExp`参数，区别在于使用正则可以指定模式


### 布尔`boolean`
- 创建方法
    + 字面量`true`和`false`
    + `Boolean(param)`其中param会进行类型转换
    + `new Boolean(param)`其中param会进行类型转换，返回`Boolean`对象
- 类型转换
    + 凡是在__期望__得到一个布尔值的地方出现了一个非布尔值，都会触发自动类型转换（包括if、逻辑运算符、Boolean构造函数中等）
    + 除`""`、`null`、`undefined`,`0`,`-0`,`NaN`,`false`会转换成`false`以外，其余都转换成`true`


### 数字`number`
- 创建方法
    + 字面量`123`
    + `Number(param)`其中param会进行类型转换
    + `new Number(param)`其中param会进行类型转换，返回`Number`对象
- 类型转换
    + 


### 字符串`string`
- 创建方法
    + 字面量`"str"`
    + `String(param)`其中param会进行类型转换
    + `new String(param)`其中param会进行类型转换，返回`String`对象
- 字符串也属于`iterable`类型值，对`iterable`值的操作同样适用于字符串（扩展运算符，for...of..等）
- 可以进行for...in...操作
- 有length属性，可以通过下标访问
- `split(char)`方法分割字符串为数组
- `charAt(pos)`返回指定索引的字符，`charCodeAt(pos)`返回指定索引的`Unicode编码`整数
- `indexOf`、`lastIndexOf`、`includes`
- `split(start,end)`和`substring(start,end)`、`substr(start,length)`


### 数组`array`
#### 创建数组的方法（`Array`的实例）
- 字面量：`[1,2,3]` 
- Array方法：`Array(...params)`
- new关键字：`new Array(...params)`

>当`params`长度为1时，如果这个参数是数字，则创建指定__长度__的空数组，否则创建一个指定__值__的数组（长度为1）  
>当`params`长度大于1时，每个参数对应生成一个数组元素

#### `Array.of(...params)`
- 功能类似`Array(...params)`，区别在于它__总是__把每个参数对应生成一个数组元素（即使是一个数字）

#### `Array.from(param,map_function,thisObj)`
- 功能为将一个“伪数组”值转换为一个数组
>“伪数组”：包含`length`属性的对象（包括String）或者`iterable`值，不是Array的实例
>>`iterable`值：意为可迭代的，比如`Array`,`Map`,`Set`， 
>> - 可以使用`for(let v in iterable)`循环遍历（所有数字下标-包括undefined）
>> - 不一定可以使用`for(let v of iterable)`遍历，这个循环会遍历所有属性（除了`length`）  
- 参数：第二第三参数可选，可指定映射函数
> - es6中与它功能相同的语法是`[...iterable]`

#### `Array.prototype.find()`和`Array.prototype.findIndex()`和`Array.prototype.some()`
- es5中可以通过`Array.prototype.indexOf()`和`Array.prototype.lastIndexOf()`查找特定元素
>es6中`Array.prototype.find()`和`Array.prototype.findIndex()`，可以指定搜索的条件（回调函数），当回调函数返回`true`时，迭代终止，两个方法分别返回匹配的`值`和`索引`
>`some`和`find`一样，不过返回值是`boolean`

#### `Array.prototype.includes(element,fromIndex)`
- 当从fromIndex开始搜索某一个`element`，返回`boolean`

#### `Array.prototype.forEach(func)`
- 对数组每一项执行`func`函数，返回`void`，值为`undefined`不会执行回调

#### `Array.prototype.map(func)`
- 对数组每一项执行`func`函数，返回`新Array`，值为`undefined`不会执行回调

#### `Array.protype.filter(func)`
- 对数组每一项执行`func`函数，返回`新Array`，值为`undefined`不会执行回调，函数返回`true`的迭代项会出现在新数组中

#### `Array.prototype.every(func)`
- 对数组每一项执行`func`函数，返回`boolean`，值为`undefined`不会执行回调，直接返回`true`

#### `Array.prototype.keys()`和`Array.prototype.values()`和`Array.prototype.entries`
- `keys`返回索引键的`Array iterator`对象：没有对象方法，但是可以遍历迭代
- `values`返回值的`Array iterator`对象
- `entries`返回键值对的`Array iterator`对象
>区别于`Object.keys(obj)`和`Object.values(obj)`和`Object.entries(obj)`都返回数组

#### 数组截断与合并
- `slice(start,end)`
- `splice(start,length)`改变原数组
- `concat(...arrs)`

#### 数组转字符串
- `join(char)`

### 原型链`prototype`
- 构造!=继承，构造是`__proto__=prototype`，而继承的一种方法`__proto__.__proto__=prototype`
- 所有`prototype`都是`Object`类型的值（`实例.__proto__.__proto__===Object.prototype`）
- 所有构造函数都是Function的实例（包括Function自身）
    + `Function.prototype===Function.__proto__`
    + `Object.__proto__===Function.prototype===Array.__proto__`



### ajax
- 定义：异步javascript和XML，不刷新整个页面的情况下，与服务器交换数据并跟新部分网页
- 可以设置为同步：`$.ajax({type:"POST",async:false})`，在等待ajax响应之前，页面会停止用户响应
```js
$.ajax({
    url:"url",
    type:"post",
    contentType:"application/x-www-form-urlencoded",
    dataType:"jsonp",
    jsonp:"callback",
    success:function(data){

    }
})
```
- get
    + `$.get("url?param=1",function(data){})`
    + 使用jsonp：在回调中使用`eval(data)`
- post
    + `$.post("url",{data},function(data){},"json")`
    + 使用jsonp：修改dataType为`"jsonp"`
- jsonp
    + 请求跨域资源，原理是利用script标签可以跨域的特点
    + 客户端：`$.getJSON("api.aspx?callback=?&param=1",function(data){console.log(data)})`
    + 服务端：`Request.QueryString("callback")+"("+data+")"`
- get和post请求的区别
    + get将数据放在URL中传递，post放在request body中
    + get请求数据长度限制一般为2k
    + get请求参数暴露，更不安全

