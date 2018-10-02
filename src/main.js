// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入全局日期过滤器
// import './filters/index.js'
// 只要导入这个JS，JS中的代码就会执行，全局日期过滤器就创建好，并且可以使用了
import './filters'

// 导入elementui - js
import ElementUI from 'element-ui'
// 导入elementui - css
// import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式
import '@/assets/index.css'
// 导入axios
import axios from 'axios'

// 配置公共路径,
// 配置好公共路径后，每次使用axios发送请求，只需要写当前接口的路径（比如：/users）就可以了，axios在发送请求之前，会将baseUrl+'/users' 得到完整路径才会发送请求
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
// 只要配置了拦截器，那么所有的请求都会走拦截器，因此，可以在拦截器中统一处理headers，在拦截器中添加headers

// 只要配置了拦截器，那么所有的请求都会走拦截器,包括登录接口，但是登录是谁都可以访问的，不需要Authorization中的token,是登陆之后才拿到的token,但现在登录接口有token,但是也没影响，如果非要去掉token,可以通过请求拦截器中的url判断是不是登录接口，进行处理

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 判断是不是login接口
  // endsWith 字符串的方法，用来判断是不是以参数为结尾，如果是就返回为true
  if (!config.url.endsWith('/login')) {
    // 在config中添加headers
    config.headers['Authorization'] = localStorage.getItem('token')
  }
  // console.log('请求拦截器', config)
  return config
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log('响应拦截器', response)
  if (response.data.meta.status === 401) {
    // 找不到token,拿不到数据就通过路由返回登录页
    // 因为现在不是在组件中，因此无法通过this.$router来访问到路有实例，但是，可以直接通过上面导入的路由模块中的router(路由实例)来访问到路由对象
    router.push('/login')
    // 清除掉token
    localStorage.removeItem('token')
  }
  return response
})

// 将axios添加到Vue的原型中，实例对象可以直接使用原型对象中的属性和方法，所有组件都可以看做VUe的实例
// 注意：只要是像axios这样的第三方库（与VUe没有任何关系），都应该通过这样的方式统一来导入
Vue.prototype.$http = axios
// 安装插件
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,

  // 注册 App 组件为当前实例的局部组件，然后，才可以在template中使用该组件
  components: { App },
  template: '<App/>'
})
