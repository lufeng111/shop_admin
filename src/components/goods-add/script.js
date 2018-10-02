// 导入富文本编辑器的样式
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

// 导入组件
import { quillEditor } from 'vue-quill-editor'

export default {
  data() {
    return {
      // step 步骤条组件当前激活索引
      stepActive: 0,
      // tab 栏当前激活的name属性
      tabActiveName: 'basic',

      // 添加表单：
      goodsAddForm: {
        // 商品名称
        goods_name: '',
        // 分类
        goods_cat: '',
        // 价格
        goods_price: '',
        // 数量
        goods_number: '',
        // 重量
        goods_weight: '',
        // 是否促销
        is_promote: false,
        // 图片
        pics: [],
        // 介绍
        goods_introduce: ''
      },

      // 上传后的图片列表数据，是一个数组
      uploadFileList: [],

      // 分类级联选择器的数据源
      goodsCategories: [],
      goodsCategoriesSelectedOptions: [],

      // 上传图片时用到的header
      uploadHeaders: {
        Authorization: localStorage.getItem('token')
      }
    }
  },

  created() {
    this.getCategoriesList()
  },

  methods: {
    /**
     * tab栏切换事件
     * @param {object} tab 当前组件实例
     */
    changeTab(tab) {
      console.log('tab: ', tab.index)
      this.stepActive = tab.index - 0
    },

    /**
     * 切换step和tab实现激活高亮
     * @param {number} stepIndex step索引号
     * @param {string} tabActiveName tab标签名称
     */
    changeNextStep(stepIndex, tabActiveName) {
      console.log('step：', stepIndex, 'tab: ', tabActiveName)
      this.stepActive = stepIndex
      this.tabActiveName = tabActiveName
    },

    /**
     * 获取分类数据
     */
    async getCategoriesList() {
      const res = await this.$http.get('/categories', {
        params: {
          type: 3
        }
      })

      console.log(res)
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.goodsCategories = data
      }
    },

    changeGoodsCat() {
      console.log('级联菜单选中了', this.goodsCategoriesSelectedOptions)
    },

    /**
     * 上传图片成功的回调函数
     * @param {object} response 图片上传接口返回的数据
     */
    handleSuccess(response) {
      // console.log(response)
      // 将上传后的图片地址，存储到 pics 数组中，将来要将这些图片传递给服务器
      this.goodsAddForm.pics.push({
        pic: response.data.tmp_path
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },

    /**
     * 添加商品
     */
    async addGoods() {
      // console.log(this.goodsAddForm)
      const goodsAddForm = {
        ...this.goodsAddForm,

        // 给 goods_cat 重新设置值，将来生成的数据中， goods_cat 就以这个为准了
        goods_cat: this.goodsCategoriesSelectedOptions.join(',')
      }

      const res = await this.$http.post('/goods', goodsAddForm)

      const { meta } = res.data
      if (meta.status === 201) {
        this.$router.push('/goods')
      }
    }
  },

  // 注册为局部组件
  components: {
    quillEditor
  }
}
