export default {
  data() {
    return {
      // 商品列表数据
      goodsList: [],
      // 总条数
      total: 0,
      // 当前页
      curPage: 1,
      // 每页大小
      pageSize: 5,
      // 加载中
      isLoading: true
    }
  },

  /**
   * 组件钩子函数
   * 进入页面就加载数据
   */
  created() {
    // 从路由参数中获取到页码
    const page = this.$route.params.page
    console.log('路由参数为:', page)
    this.getGoodsList(page)
  },

  watch: {
    /**
     * 监视路由参数的变化, 来根据路由参数获取对应页的数据
     * @param {object} to 当前路由信息,比如:路由参数等
     */
    $route(to) {
      // console.log('监视到路由发生改变了', to)
      const page = to.params.page
      this.getGoodsList(page)
    }
  },

  methods: {
    /**
     * 获取商品列表数据
     */
    async getGoodsList(curPage = 1) {
      // 每次加载数据,都开启加载中效果
      this.isLoading = true

      const res = await this.$http.get('/goods', {
        params: {
          pagenum: curPage,
          pagesize: this.pageSize
        }
      })

      console.log(res)
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.goodsList = data.goods
        this.total = data.total
        // 因为服务器返回的类型为 string， 而分页组件需要的类型为：number，所以，此处需要转换类型
        this.curPage = data.pagenum - 0

        // 关闭加载中
        this.isLoading = false
      }
    },

    /**
     * 自定义索引号
     * @param {number}} index 从0开始的索引号
     */
    indexMethod(index) {
      return index + 1
    },

    /**
     * 分页组件切换页码的时候触发的事件
     * @param {number} curPage 点击分页组件的当前页
     */
    pageChange(curPage) {
      // console.log('当前页为：', curPage)
      // this.getGoodsList(curPage)
      // 切换路由
      this.$router.push(`/goods/${curPage}`)
    }
  }
}
