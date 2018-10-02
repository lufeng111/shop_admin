<template>
  <div class="login-wrapper">
    <!-- 登录
    <el-button type="primary">成功按钮</el-button> -->

    <!--
      el-form
        label-position="top" 设置label的位置
        :model 用来给表单设置数据模型（对象）
        :rules 用来设置表单验证规则的
        ref 用来引用当前的表单组件

      el-form-item
        label 当前表单项的名称
        prop 它的值是 model 对象中的一个属性
          当使用 表单验证 或者 表单重置 功能时，必须要提供该属性

      el-input
        v-model 实现双向数据绑定
     -->

    <!-- row 表示一行 -->
    <el-row type="flex" class="loginForm" justify="center" align="middle">
      <!-- col 表示一列 span 表示占用几份（共24份） -->
      <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4" class="login-content">
        <el-form label-position="top" :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入 axios
import axios from 'axios'

export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          // required 是否为必填项
          // message 当前规则校验失败时的提示
          // trigger 表单验证的触发实际，blur表示失去焦点时触发
          { required: true, message: '用户名为必填项', trigger: 'blur' },
          // min 最小长度
          // max 最大长度
          {
            min: 3,
            max: 6,
            message: '用户名长度在 3 到 6 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          {
            min: 3,
            max: 6,
            message: '密码长度在 3 到 6 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 登录功能的实现
    async login() {
      // 使用 axios 发送请求
      // http://localhost:8888/api/private/v1/login
      const res = await axios.post(
        'http://localhost:8888/api/private/v1/login',
        this.loginForm
      )
      console.log(res)

      const { data, meta } = res.data
      // console.log(data)
      if (meta.status === 200) {
        // console.log('登录成功')
        // 将登录成功的标识（token）存储到localStorage中
        localStorage.setItem('token', data.token)
        // 登录成功，需要跳转到 后台管理的首页
        this.$router.push('/home')
      } else {
        // console.log('登录失败', meta.msg)
        // this.$message.error(meta.msg)
        this.$message({
          type: 'error',
          message: meta.msg,
          duration: 1000
        })
      }
    },

    submitForm() {
      // ref 用在组件中，就表示当前组件
      // this.$refs.loginForm
      this.$refs.loginForm.validate(valid => {
        // valid 表示是否校验成功，如果成功就为：true
        // 如果失败就为：false
        if (valid) {
          // 成功：调用登录接口
          // alert('submit!')

          // 获取到用户名和密码
          // console.log(this.loginForm)
          this.login()
        } else {
          // 校验失败
          return false
        }
      })
    },
    resetForm() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style>
.login-wrapper,
.loginForm {
  height: 100%;
}

.loginForm {
  background-color: #2d434c;
}

.login-content {
  min-width: 240px;
  padding: 20px 35px;
  border-radius: 10px;
  background-color: #fff;
}
</style>
