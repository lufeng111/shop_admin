import Vue from 'vue'
import Router from 'vue-router'

// 导入 Login 组件（注意，不要添加 .vue 后缀）
import Login from '@/components/login/Login'

// 异步组件
const Home = () =>
  import(/* webpackChunkName: 'home' */ '@/components/home/Home')
const Users = () => import('@/components/users/Users')
const Rights = () =>
  import(/* webpackChunkName: 'rights' */ '@/components/rights/Rights')
const Roles = () => import('@/components/roles/Roles')
const Categories = () => import('@/components/categories/Categories')
const Goods = () =>
  import(/* webpackChunkName: 'goods' */ '@/components/goods/Goods')
const GoodsAdd = () =>
  import(/* webpackChunkName: 'goods' */ '@/components/goods-add/GoodsAdd')

/* // 导入首页组件
import Home from '@/components/home/Home'
// 导入用户列表组件
import Users from '@/components/users/Users'
// 导入权限列表组件
import Rights from '@/components/rights/Rights'
// 导入角色列表组件
import Roles from '@/components/roles/Roles'
// 导入商品分类组件
import Categories from '@/components/categories/Categories'
// 导入商品列表组件
import Goods from '@/components/goods/Goods'
// 导入商品添加组件
import GoodsAdd from '@/components/goods-add/GoodsAdd' */


Vue.use(Router)

const router = new Router({
  routes: [
    // 默认路由,重定向
    { path: '/', redirect: '/home' },
    // children 用来配置子路由，将来匹配的组件会展示在 Home 组件的 router-view 中
    // 对于子路由path来说：
    // 1 如果不是以 / 开头，那么，哈希值为： 父级path + / + 子级path
    //    也就是： /home/users
    // 2 如果子级路由的path是以 / 开头的，那么将来的哈希值为：/users 不再带有父级的path了
    //    也就是：/users
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Categories },

        // 路由 `/goods/:page` 能够匹配以下形式的哈希值: /goods/1
        // 带有?的路由 `/goods/:page?` 表示 :page 参数是可选的, 可以有这个参数,也可以没有
        // 这个参数,此时就可以匹配: /goods/1 或者 /goods
        { path: '/goods/:page?', component: Goods },
        { path: '/goods-add', component: GoodsAdd }
      ]
    },
    { path: '/login', component: Login }
  ]
})

// 全局导航守卫
// 所有的路由都会先走守卫
// 添加导航守卫之后，不管是访问哪个路由，都会执行beforeEach回调函数中的代码
// 因为所有的路由，都会经过该导航守卫，所以，就可以在这个导航守卫的回调函数中
// 判断有没有登录了
router.beforeEach((to, from, next) => {
  // console.log('导航守卫在看门', to)
  // ...

  if (to.path === '/login') {
    // 如果访问的是login页面，直接放行，也就是任何人不管有没有登录
    // 都可以访问登录页面
    // 直接调用 next() 方法，表示：访问的是哪个页面，就展示这个页面的内容
    next()
  } else {
    // 访问的不是登录页面

    // 判断用户是否登录成功，
    // 1 当用户登录成功，直接调用 next() 方法放行
    // 2 当用户没有登录，应该调用 next('/login') 跳转到登录页面，让用户登录

    // 通过登录成功时候保存的token，来作为有没有登录成功的条件
    const token = localStorage.getItem('token')
    if (token) {
      // 有，登录成功
      next()
    } else {
      // 没有，登录失败
      next('/login')
    }
  }
})
export default router
