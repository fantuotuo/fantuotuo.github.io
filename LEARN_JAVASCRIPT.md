## es5
### 基本变量类型
- number,string,boolean,null,undefined,object
- typeof返回：number,string,boolean,undefined,object,function

### 作用域
一个函数形成一个封闭的作用域
- 全局作用域：全局范围内可引用，执行完成不会被销毁
- 局部作用域：只能在局部作用域（或子作用域）内使用，一般情况下在函数执行完毕后销毁
> 闭包：局部作用域的函数引用了局部作用域的变量，并且这个函数可以被外部访问到，此时局部作用域代码执行完毕后变量不会被销毁
> 作用域链：当变量没有在本作用域找到时，自动查找上一级作用域

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

### exports和module.exports
node.js在执行的时候会自动包裹一个变量module，通过module.exports可以导出模块，而exports是module.exports的简写形式，可以通过对exports对象的属性赋值达到模块导出的目的









