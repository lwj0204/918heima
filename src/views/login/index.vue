<template>
  <div class="login">
      <el-card class="login-card">
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <el-form ref="myForm" style="margin-top:20px" :model="loginForm" :rules="loginRules">
              <el-form-item prop="mobile">
                  <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:65%"></el-input>
                  <el-button style="float:right">发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="agree">
                  <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button @click="login" style="width:100%" type="primary">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callback) {
    //   if (value) {
    //     callback()
    //   } else {
    //     callback(new Error('您必须同意用户协议和隐私条款'))
    //   }
    // },
      value ? callback() : callback(new Error('您必须同意用户协议和隐私条款'))
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        agree: false
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }],
        code: [{ required: true, message: '请输入验证码' }, { pattern: /^\d{6}$/, message: '验证码为6位数字' }],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            method: 'post',
            url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
            data: this.loginForm
          }).then(result => {
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            this.$message({ type: 'warning', message: '账号或密码错误' })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
    background-image: url('../../assets/img/login_bg.jpg');
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
        width: 440px;
        height: 340px;
        .title{
            text-align: center;
            img {
                height: 45px;
            }
        }
    }
}
</style>
