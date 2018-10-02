// 导入 element-tree-grid 组件
// 作用：用来配合 el-table 实现表格展开树形控件功能
// 因为，这个组件只在当前组件中用到了，所以，只需要将其注册为当前组件的子组件就可以了
import ElTreeGrid from 'element-tree-grid'

export default {
  data() {
    return {
      // 商品分类列表数据
      categoriesList: [],
      // 总条数
      total: 0,
      // 每页大小
      pageSize: 10,
      // 当前页
      curPage: 1,
      // 加载中
      loading: true,
      // 添加分类对话框的显示和隐藏
      categoriesAddDialog: false,
      categoriesAddForm: {
        // 分类名称
        cat_name: '',
        // 分类id
        cat_pid: -1,
        // 分类级别
        cat_level: -1,

        // value属性 表示当前值
        // label属性 表示显示给用户看的文字
        // children 指定自己分类
        categoriesAddList: [],
        categoriesSelectedOptions: [],
        defaultProps: {
          value: 'cat_id',
          label: 'cat_name'
        }
      }
    }
  },

  created() {
    this.getCategoriesList()

    this.getCategoriesAddList()
  },

  methods: {
    /**
     * 获取商品分类列表数据
     */
    async getCategoriesList(curPage = 1) {
      // 每次获取列表数据，都开启加载中的效果
      this.loading = true

      const res = await this.$http.get('/categories', {
        params: {
          // 当前页
          pagenum: curPage,
          // 每页展示多少条数据
          pagesize: this.pageSize
        }
      })

      console.log(res.data)

      const { data, meta } = res.data
      if (meta.status === 200) {
        this.categoriesList = data.result
        this.total = data.total
        this.curPage = data.pagenum + 1

        // 关闭loading效果
        this.loading = false
      }
    },

    /**
     * 分页事件
     */
    changePage() {
      this.getCategoriesList(this.curPage)
    },

    /**
     * 显示添加分类对话框
     */
    showCategoriesAddDialog() {
      this.categoriesAddDialog = true
    },

    /**
     * 获取添加分类时用到的分类列表数据
     */
    async getCategoriesAddList() {
      const res = await this.$http.get('/categories', {
        params: {
          // 2 表示获取一级和二级菜单
          type: 2
        }
      })

      const { data, meta } = res.data
      if (meta.status === 200) {
        this.categoriesAddForm.categoriesAddList = data
      }
    },

    handleChange(value) {
      console.log(value)
    },

    /**
     * 添加分类
     */
    async addCategories() {
      // 解构数据的时候起别名，来避免ESLint校验错误的问题
      // cat_name: catName
      const {
        cat_name: catName,
        categoriesSelectedOptions
      } = this.categoriesAddForm
      // 获取到pid
      // 直接使用数组最后一项就可以获取到当前分类的pid了
      const catPid =
        categoriesSelectedOptions[categoriesSelectedOptions.length - 1]
      // 分类层级
      // 一级分类的 level = 0
      // 二级分类的 level = 1
      // 三级分类的 level = 2
      const catLevel = categoriesSelectedOptions.length

      // console.log(catPid, catLevel, catName)
      const res = await this.$http.post('/categories', {
        cat_pid: catPid,
        cat_name: catName,
        cat_level: catLevel
      })

      if (res.data.meta.status === 201) {
        // 关闭对话框
        this.categoriesAddDialog = false
        // 刷新页面
        this.getCategoriesList(this.curPage)
      }
    },

    closeCategoriesAddDialog() {
      this.$refs.categoriesAddForm.resetFields()
    }
  },

  // 注册为局部组件
  components: {
    // 属性名表达式
    [ElTreeGrid.name]: ElTreeGrid
    // 以上属性名表达式最终转化为以下形式：
    // 'el-table-tree-column': ElTreeGrid
  }
}
