#vue

##计算属性
- `computed:{}`本质是方法（一定要return一个值），使用时使用它的名称
    + 在引用的时候，不能加括号，要当作属性使用
    + 只要function内部使用到的任何数据发生了变化，就会重新计算
    + 求值结果会被缓存，如果依赖的任何数据都没有发生变化，就不会重新求值

##父子组件传值
- 父向子：`v-bind`属性绑定，子向父：`v-on`监听事件与`$emit`触发事件  

##vue-router
- 基本使用
    + ```js
    + var routes=[{path:"/login",component:""}]
    + var router=new VueRouter({routes})
    + new Vue({template:"",router})
    + ```
    + 重定向：{path:"/",redirect:"/login"}
- router-link
    - 默认被激活的类：`router-link-active`，修改使用`new VueRouter()`中的`linkActiveClass:""`
- router-view
    - 切换动画：`transition`包裹`router-view`
- 路由规则中定义参数
    - query方法传参，不需要修改路由规则  
    - params方法传参，需要修改路由规则`path/:id`
- 路由嵌套
    - `{path:"",component:"",children:{path:"login",component:""}}`
- 命名视图
    + 多个`router-view`同时指定`name`属性
    + `path:"/",components:{default:"",left:"",right:""}`
- `watch:{"$route.path"：function(new,old){}}`监听路由地址的改变

##webpack
- 网页中常见的静态资源
    + js：.js .jsx .coffee .ts
    + css：.css .less .sass .scss
    + images：.jpg .png ,gif .bmp .svg
    + 字体（fonts）：.svg .ttf .eot .woff .woff2
    + 模板文件：.ejs .jade .vue
- 静态资源变多以后的问题
    + 网页加载速度变慢（二次请求html+静态资源）
