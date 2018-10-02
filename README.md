# Vue 项目

- [项目地址 https://gitee.com/zqran/shop_admin_25](https://gitee.com/zqran/shop_admin_25)

## 项目功能

- 1 登录
- 2 首页
- 3 退出
- 4 用户管理
  - 4.1 列表展示
  - 4.2 分页
  - 4.3 查询
  - 4.4 启用/禁用用户
  - 4.5 添加用户
  - 4.6 编辑用户
  - 4.7 删除用户
- 5 权限管理
  - 5.1 权限列表
- 6 角色管理
  - 6.1 角色列表
  - 6.2 编辑角色
  - 6.3 删除角色
  - 6.4 表格项展开，展示角色权限
  - 6.5 权限模块业务说明
  - 6.6 分配权限
- 7 用户管理
  - 7.1 分配角色
- 8 动态菜单
  - 8.1 获取登录用户菜单数据
  - 8.2 默认选中
- 9 商品分类管理
  - 9.1 展示列表数据
  - 9.2 分页加载数据+loading效果
  - 9.3 使用 el-table-tree-column 组件
  - 9.4 分类展开
  - 9.5 添加分类
- 10 商品管理
  - 10.1 商品列表
  - 10.2 路由分页
  - 10.3 添加分类
- 11 默认路由

## 项目搭建

- 1 `vue init webpack shop_admin`

```html
Project name                            ：默认
Project description                     ：默认
Author                                  ：默认
Vue build                               ：选择 Runtime + Compiler
Install vue-router?                     ：Y
Use ESLint to lint your code?           ：Y 选择 Standard
Set up unit tests                       ：n
Setup e2e tests with Nightwatch?        : n
Should we run `npm install` for you after the project has been created? (recommended) : Yes, use NPM
```

- 2 进入项目：cd shop_admin
- 3 运行项目：npm run dev

- 将脚手架默认生成的内容去掉，然后，添加了一个 Login 组件

## 如何添加一个新的功能？？？

- 1 在 `components` 中新建一个文件夹（login），在文件中创建组件(Login.vue)
- 2 在 `router/index.js` 中导入组件（Login.vue）
- 3 配置路由规则

## 在项目中使用 element-ui

- [ElementUI 文档](http://element-cn.eleme.io/#/zh-CN/component/installation)
- 安装：`npm i element-ui -S`

```js
// main.js

// 导入elementui - js
import ElementUI from 'element-ui'
// 导入elementui - css
import 'element-ui/lib/theme-chalk/index.css'
// 安装插件
Vue.use(ElementUI)
```

---

## 项目启动做了什么

- 1 在终端中运行：`npm run dev`，实际上就是运行了：`webpack-dev-server ...`
- 2 使用 webpack-dev-server 开启一个服务器
- 3 根据指定的入口 `src/main.js` 开始分析入口中使用到的模块
- 4 当遇到 `import` 的时候，webpack 就会加载这些模块内容（如果有重复模块，比如：Vue，实际上将来只会加载一次），遇到代码就执行这些代码
- 5 创建 Vue 实例，将 App 组件作为模板进行编译，并且将 App 组件中 template 的内容渲染在页面 #app 的位置

## 登录功能

- 1 安装：`npm i -S axios`
- 2 在 `Login.vue` 组件中导入 axios
- 3 使用 axios 根据接口文档来发送请求，完成登录

## 编程式导航

- 就是通过 JS 代码来实现路由的跳转功能

```js
// 注意：是 router 不是 route
// router用来实现路由跳转，route用来获取路由参数
// push 方法的参数为：要跳转到的路由地址（path）
this.$router.push('/home')
```

## 密码

- 给输入框组件添加 type="password" 就变为密码框状态了

```html
<el-input type="password" v-model="loginForm.password"></el-input>
```

## 登录拦截

- 说明：在没有登录的情况不应该让用户来访问除登录以外的任何页面

### 登录和拦截的整个流程说明

- 1 在登录成功以后，将 token 存储到 localStorage 中
- 2 在 导航守卫 中先判断当前访问的页面是不是登录页面
- 3 如果是登录页面，直接放行（next()）
- 4 如果不是登录页面，就从 localStorage 中获取 token，判断有没有登录
- 5 如果登录了，直接放行（next()）
- 6 如果没有登录，就跳转到登录页面让用户登录（next('/login')）

## token 机制的说明

- 在项目中，如果登录成功了，那么，服务器会给我们返回一个 token
- 这个 token 就是登录成功的标识
- 这个 token 就相当于使用 cookie+session 机制中的 sessionid

## 公司人员和项目开发流程

- 1 产品经理定制项目的需求
- 2 分配任务：先将所有的任务分配到项目组，然后，再由项目组具体分配给每个开发人员
- 3 开发：拿到 产品原型 + 需求文档 + UI 设计稿 资料，转化为 HTML 页面，完成功能
- 4 功能完成后，自己测试有没有 Bug
- 5 由测试人员来测试你的功能，当测试出 Bug 后，就会通过 禅道 这样的项目管理系统，来提出 Bug
- 6 由 自己 修改 测试人员提出来的 bug
- 7 最终，没有 bug 了，项目才会上线

```html
产品经理（Product Manager）
  提需求
  产出： 产品原型 + 需求文档
  原型设计软件：Axure 、墨刀

UI（设计）
  将 产品经理 给的 原型图 设计为 好看的UI稿

FE（前端）front-end
  产品原型 + 需求文档 + UI设计稿 ===> HTML页面

BE（后端） back-end
  给前端提供数据接口

测试人员
  产品原型 + 需求文档 + UI设计稿 来测试我们写的功能
  发现你的功能 与 需求 不一致，那就说明除Bug了，那么，测试人员就会提Bug
  Bug系统： 禅道

项目经理（管理技术）
  技术攻坚，与其他项目组人员沟通，分配任务 等
```

## vue 单文件组件中的 scoped

- 作用：给 `style` 标签添加 `scoped` 属性以后，样式只会对当前组件中的结构生效，而不会影响到其他组件

## vue 单文件组件中的 lang

- 作用：添加 `lang="less"` 后，就可以使用 less 语法了
- 但是需要自己安装：`npm i -D less less-loader`

## VSCode 中使用 Vetur 插件格式化单文件组件的 template

- 打开设置，配置：`"vetur.format.defaultFormatter.html": "js-beautify-html"`

## 接口调用的说明

- 注意：**所有接口都需要传递 token，只有传递了正确的 token，服务器才会将数据返回给前端**
- 如果没有传递`token`，服务器会返回 `401` ，告诉接口调用者，没有权限来访问这个接口

---

## cookie+session VS token

- [干掉状态：从 session 到 token](https://github.com/zqran/blog/issues/2)

## Git 使用

- [远程分支](https://blog.csdn.net/u012701023/article/details/79222731)

```html
刚进入公司，一般都是先通过 git 将项目 clone 到本地：git clone

实现一些功能后，需要将本地写完的代码，提交到git服务器中：git push 仓库地址

每天去公司开发前，都会使用 git pull 仓库地址 来获取下最新的代码
```

```bash
# 克隆仓库
git clone [仓库地址]

# 推送
git push [仓库地址] master

# 简化推送地址
git remote add shop_admin [仓库地址]
git push -u shop_admin master
# 第一次执行上面两条命令，以后只需要输入以下命令即可
git push shop_admin

# 拉取
git pull [仓库地址] master
git pull shop_admin master
```

## 分页

- 当前页 curPage
- 每页大小 pageSize
- 总条数 total

```js
总页数 = Math.ceil(total / pageSize)
```

## 用户管理

### 启用或禁用用户

- 注意：如果用户状态是禁用状态，那么这个用户是无法登录的
- 新添加的用户是禁用的状态
- 注意：**不要将 admin 用户禁用！！！否则会导致无法操作**

### 添加用户

- [表单验证规则](https://github.com/yiminghe/async-validator)

### 打开添加用户对话框的步骤

- 1 给添加用户按钮绑定单击事件，事件中让控制对话框展示的数据为 true
- 2 在 dialog 对话框中添加一个 form 表单
  - form 表单的数据（userAddForm）
  - form 表单的验证规则（userAddRules），还要给每个表单项添加 prop
  - 等等
- 3 点击用户添加对话框中的确定按钮，进行表单验证（this.$refs.userAddForm.validate...）
- 4 点击取消按钮，重置表单（this.$refs.userAddForm.resetFields()）

### 打开编辑用户对话框的步骤

- 1 给表格中的编辑按钮添加单击事件，事件中完成两件事情：
  - 1.1 将控制对话框展示的数据设置为 true
  - 1.2 获取到当前用户数据，并展示在对话框中
- 2 在 dialog 对话框中添加一个 form 表单
  - 编辑用户表单数据 + 验证规则
- 3 点击编辑用户对话框中的确定按钮，进行表单验证
- 4 点击取消按钮，重置表单

---

## 角色管理

### 删除角色

- 1 点击按钮弹出确认对话框
  - 1.1 给按钮绑定单击事件
  - 1.2 弹出确认对话框
- 2 点击确认按钮删除该角色

### 修改角色

- 1 点击修改按钮弹出修改对话框
- 2 将当前要修改的角色信息展示在对话框中
- 3 点击确定按钮修改信息

### 给角色分配权限

- 1 进入页面，就获取到所有的权限，并展示在tree中
- 2 点击分配权限按钮后，打开分配权限对话框
- 3 并且选中当前角色具有的权限

## async 和 await 的说明

- await 必须要出现在 async 修饰的函数中。并且 async 应该添加到 await 存在的那个方法中

## 权限模块

- 权限模块中涉及到以下几个内容：`权限` 、`角色` 、`用户`
  - 用户 -> 角色 -> 权限

- 权限和菜单是关联到一起，你有这个权限，才会看到对应的菜单！！！

```html
每个用户都有自己的角色
每个角色又有自己的权限

只要用户有这个角色，那么，用户就拥有这个角色的权限
比如：
  小明经过多年努力，小明当上了财务主管，此时，小明就具有了 财务主管 角色的所有权限了

在项目中：
  1 用户 和 角色是一对一的关系
    也就是：一个用户只能有一个角色

  2 角色 和 权限是多对多的关系
    也就是：一个角色可以有多个权限
           一个权限也可以属于多个角色
```

| 用户 | 角色     | 权限                                             |
| ---- | -------- | ------------------------------------------------ |
| 小明 | 普通员工 | 查看个人信息，查看自己的薪资                     |
| 小红 | 普通员工 | 查看个人信息，查看自己的薪资                     |
| 老王 | 财务主管 | 查看个人信息，查看自己的薪资，查看所有员工的薪资 |

### 权限模块的总结

- 项目中权限模块的三个内容说明：
- 用户与角色： 可以分配一个角色给用户
- 角色与权限： 可以给角色分配多个权限
- 先给角色分配权限，再给用户分配角色，那么，这个用户就拥有了该角色的权限

- 权限和菜单是默认关联在一起了，也就是说：用户有这个权限，就可以看到和使用这个菜单

---

## element-tree-grid

- 1 安装：`npm i -S element-tree-grid`（"element-tree-grid": "^0.1.3"）
  - [element-tree-grid](https://github.com/foolishchow/element-tree-grid)
  - [CDN 地址](https://unpkg.com/element-tree-grid@0.1.3/dist/tree-table.js)
  - [unpkg.com CDN](https://unpkg.com/)
- 2 在 main.js 中，注册全局组件：

```js
import ElTreeGrid from 'element-tree-grid'
Vue.component(ElTreeGrid.name, ElTreeGrid)
```

```html
<!--
  label ：设置列名称
  prop ：提供列内容的属性名

  tree-key ：区分其他菜单，不添加该key会导致所有菜单同时展开，添加该key只展开该菜单
  level-key ：设置菜单级别，以缩进形式表示子菜单
  child-key ：指定使用哪个属性名称表示子菜单
  parent-key ：父级菜单id，不添加该key，则无法收起子菜单
 -->

<el-table-tree-column
  label="分类名称"
  prop="cat_name"
  tree-key="cat_id"
  level-key="cat_level"
  child-key="children"
  parent-key="cat_pid"
  width="320"
  :indent-size="20">
  <template slot-scope="scope">
    <span>{{ scope.row.cat_name }}</span>
  </template>
</el-table-tree-column>
```

---

## 路由参数分页

- 1 配置分页路由参数, 参数是可选的
  - 参数可选后, 路由就能够匹配: `/goods` 或者 `/goods/3`
- 2 使用路由来分页, 有两种情况需要处理:
- 3 第一种: 进入页面,就要根据当前路由参数中的页码,来获取到对应页的数据
- 4 第二种: 点击分页组件获取数据, 需要做两件事:
  - 4.1 获取到当前页的数据( 调用获取数据的方法 )
  - 4.2 修改哈希值为当前页码 ( this.$router.push() )
- 5 点击分页按钮获取数据的第二种思路:
  - 5.1 点击分页按钮, 触发了分组件的 pageChange 事件
  - 5.2 在 pageChange 事件中修改了路由( this.$router.push() )
  - 5.3 路由发生改变后, watch 中的 $route 监视到了路由的改变
  - 5.4 在 `$route(to) {}` 方法中, 通过参数 to 获取到当前页码, 重新调用获取数据的方法来获取当前页的数据

## 富文本编辑器

- [vue-quill-editor](https://github.com/surmon-china/vue-quill-editor)
- 1 安装: `npm i -S vue-quill-editor`
- 2 在当前组件中导入, 注册为局部组件并使用

```js
// 导入样式文件：
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  }
}
```

```html
<quill-editor v-model="goodsAddForm.goods_introduce"></quill-editor>
```

## 项目打包和优化

- 打包命令：`npm run build`

## 按需加载

- 1 修改 `router/index.js` 中导入组件的语法

```js
// 使用：
const Home = () => import('@/components/home/Home')
// 替换：
// import Home from '@/components/home/Home'

// 给打包生产的JS文件起名字
const Home = () => import(/* webpackChunkName: 'home' */ '@/components/home/Home')

// chunkName相同，将 goods 和 goods-add 两个组件，打包到一起
const Goods = () => import(/* webpackChunkName: 'goods' */'@/components/goods')
const GoodsAdd = () => import(/* webpackChunkName: 'goods' */'@/components/goods-add')
```

- 2 （*该步可省略*）修改 `/build/webpack.prod.conf.js` 中的chunkFilename

```js
{
  // [name] 代替 [id]
  chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
}
```

## 使用CDN

- [开源项目 CDN 加速服务](https://www.bootcdn.cn/)

- 1 在 `index.html` 中引入CDN提供的JS文件
- 2 在 `/build/webpack.base.conf.js` 中（resolve前面）添加配置 externals
- **注意**：通过CDN引入 element-ui 的样式文件后，就不需要在 main.js 中导入 element-ui 的CSS文件了。所以，直接注释掉 main.js 中的导入 element-ui 样式即可

- `externals`配置：

```js
externals: {
  // 键：表示 导入包语法 from 后面跟着的名称
  // 值：表示 script 引入JS文件时，在全局环境中的变量名称
  vue: 'Vue',
  axios: 'axios',
  'vue-router': 'VueRouter',
  'element-ui': 'ELEMENT',

  BMap: 'BMap',
  echarts: 'echarts',
}

import ElementUI from 'element-ui'
```

### 常用包CDN

- [vue](https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.min.js)
- [vue-router](https://unpkg.com/vue-router@3.0.1/dist/vue-router.min.js)
- [axios](https://unpkg.com/axios/dist/axios.min.js)
- [element-ui JS](https://unpkg.com/element-ui/lib/index.js)
- [element-ui CSS](https://unpkg.com/element-ui/lib/theme-chalk/index.css)

- 说明：
  - 1 先在官方文档查找提供的CDN
  - 2 如果没有，在 `https://www.bootcdn.cn/` 或其他 CDN提供商 查找

### Quill

- [vue-quill-editor Quill](https://github.com/surmon-china/vue-quill-editor#example)

```html
<!-- Include the Quill library -->
<script src="https://cdn.quilljs.com/1.3.4/quill.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<!-- Quill JS Vue -->
<script src="https://cdn.jsdelivr.net/npm/vue-quill-editor@3.0.4/dist/vue-quill-editor.js"></script>
<!-- Include stylesheet -->
<link href="https://cdn.quilljs.com/1.3.4/quill.core.css" rel="stylesheet">
<link href="https://cdn.quilljs.com/1.3.4/quill.snow.css" rel="stylesheet">
<link href="https://cdn.quilljs.com/1.3.4/quill.bubble.css" rel="stylesheet">
```

## 缓存和保留组件状态

- [keep-alive](https://www.jianshu.com/p/0b0222954483)
- 解决方式：使用 `keep-alive` ，步骤如下：

```html
1 在需要被缓存组件的路由中添加 meta 属性
  meta 属性用来给路由添加一些元信息（其实，就是一些附加信息）
{
  path: '/',
  name: 'home',
  component: Home,
  // 需要被缓存
  meta: {
    keepAlive: true
  }
}

2 修改路由出口，替换为以下形式：
  根据 meta 是否有 keepAlive 属性，决定该路由是否被缓存
<keep-alive>
  <!-- 这里是会被缓存的视图组件 -->
  <router-view v-if="$route.meta.keepAlive">
  </router-view>
</keep-alive>

<!-- 这里是不被缓存的视图组件 -->
<router-view v-if="!$route.meta.keepAlive">
</router-view>
```

## 启用路由的 History 模式

- 通过在路由中添加 `mode: 'history'` 可以去掉 浏览器地址栏中的 #
- 在开发期间，只需要添加这个配置即可
- 但是，在项目打包以后，就会出现问题

```html
// 去掉 # 后，地址变为：

http://localhost:8080/goods

那么，服务器需要正确处理 /goods 才能正确的响应内容，
但是，/goods 不是服务端的接口，而是 用来在浏览器中实现 VueRouter 路由功能的
```

### 后端的处理方式

- 1 优先处理静态资源
- 2 对于非静态资源的请求，全部统一处理返回 index.html
- 3 当浏览器打开 index.html 就会加载 路由的js 文件，那么路由就会解析 URL 中的 /login 这种去掉#的路径了
