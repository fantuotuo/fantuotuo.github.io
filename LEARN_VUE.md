#vue

##计算属性
- `computed:{}`本质是方法（一定要return一个值），使用时使用它的名称
    + 在引用的时候，不能加括号，要当作属性使用
    + 只要function内部使用到的任何数据发生了变化，就会重新计算
    + 求值结果会被缓存，如果依赖的任何数据都没有发生变化，就不会重新求值

##父子组件传值
- 父向子：`v-bind`属性绑定，子向父：`v-on`监听事件与`$emit`触发事件  

##render函数
    ```js
    render:function(createElement){
        return createElements(login);
    }
    ```

##引入方式
- 普通网页
    + `stript`标签引入vue包
    + 在页面中创建一个id为app的容器
    + 通过new Vue创建一个vm实例
- webpack
    + 

##vue-router
- 基本使用
    ```js
    var routes=[{path:"/login",component:""}];
    var router=new VueRouter({routes});
    new Vue({template:"",router});
    ```
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

 

#node
- 包的查找规则（比如vue）
    + 找项目根目录中有没有node_modules文件夹
    + 在node_modules中根据包名找对应的vue文件夹
    + 在vue文件夹中，找package.json的配置文件
    + 在package.json中，寻找main属性【指定了包在加载的时候的入口文件】

#webpack
- 网页中常见的静态资源
    + js：.js .jsx .coffee .ts
    + css：.css .less .sass .scss
    + images：.jpg .png ,gif .bmp .svg
    + 字体（fonts）：.svg .ttf .eot .woff .woff2
    + 模板文件：.ejs .jade .vue
- 静态资源变多以后的问题
    + 网页加载速度变慢（二次请求html+静态资源）
    + 要处理复杂的依赖关系
- 解决
    + 合并、压缩、精灵图、图片的Base64编码
    + `requireJS`、`webpack`
- gulp和webpack的区别
    + gulp基于task任务，webpack基于整个项目构建（多个task）
- import与export
    + 语法`import name from "path"`
- 使用
    + 基本使用 `$ webpack src_path dist_path`
    + 配置文件使用 
        ```js
        module.exports={
            entry:_dirname+"/src/main.js",
            output:{
                path:__dirname+"/dist"
                filename:"bundle.js"
            }
        }
        ```
>执行webpack命令过程
>命令是否指定了入口和出口
>若未指定，去根目录下查找webpack.config.js文件
>找到配置文件后，webpack解析执行配置文件，得到配置对象
>拿到配置对象后，拿到入口和出口，开始打包构建  

    + webpack-dev-server（package.json中添加scripts，"dev":"webpack-dev-server --open --port 3000 --contentBase src --hot"）
    + server的配置可以在webpack.config.json中做
        ```json
        devServer:{
            open:true,
            port:3000,
            contentBase:"src",
            hot:true
        },
        plugins:[
            new webpack.HotModuleReplacementPlugin()
        ]
        ```
    + html-webpack-plugin（生成html页面并将js插入到页面中）
        ```js
        plugins:[
            new htmlWebpackPlugin({
                template:__dirname+"/src/index.html",
                filename:"index.html",

            })
        ]
        ```
    + loader：webpack默认只能打包js文件
        ```json
        module:{
            rules:[
                {
                    test:/\.css$/,
                    use:["style-loader","css-loader"]
                    // 从右到左依次调用loader，css-loader读取成css字符串，style-loader插入样式到html中
                },{
                    test:/\.less$/,
                    use:["style-loader","css-loader","less-loader"]
                },{
                    test:/\.scss$/,
                    use:["style-loader","css-loader","sass-loader"]
                },{
                    test:/\.(png|jpg|jpeg|bmp|gif)$/,
                    use:["url-loader?limit=7632&name=[name]-[hash:32].[ext]"]
                    // limit小图片base64编码，name设置重命名格式，防止重名
                }
            ]
        }
        ```
        * css:style-loader，css-loader，less-loader，scss-loader
        * image:url-loader
    + babel
        处理高级ES6和ES7的语法
        ```js
        class Person{
            constructor(){

            }
            static info=1
            run(){

            }
        }
        ```
        * 安装依赖
            * npm install babel-core babel-loader babel-plugin-transform-runtime -D
            * npm install babel-preset-env babel-preset-stage-0 -D
        * 修改配置文件中module.rules
        ```json
        {
            test:/\.js$/,
            user:"babel-loader",
            exclude:/node_modules/
        }
        ```
        * 根目录新建.babelrs配置文件（JSON语法规范）
        ```json
        {
            "presets":["env","stage-0"],
            "plugins":["transform-runtime"]
        }
        ```
    
- webpack可以解决
    + 能够处理js文件的互相依赖关系
    + 能够处理js兼容问题，把高级的语法转换成浏览器能识别的语法

#jQuery

##隔行变色
```js
$("li:odd").css("backgroundColor","lightblue")
$("li:even").css("backgroundColor",function(){
    return "#232323";
})  
```
