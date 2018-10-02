import Vue from 'vue'

// 导入moment格式化日期的库
import moment from 'moment'

// 创建一个全局过滤器
/**
 * 作用：日期过滤器，用来格式化日期
 *
 * input 表示要格式化的日期
 * formatStr 表示格式
 */
Vue.filter('date', (input, formatStr = 'YYYY-MM-DD hh:mm:ss') => {
  return moment(input).format(formatStr)
})
