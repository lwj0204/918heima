<template>
  <el-row type="flex" justify="space-between" class="layout-header" align="middle">
      <el-col :span="8">
        <i class="el-icon-s-unfold" style="font-size:22px"></i>
        <span class="title">江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span="4">
        <img class='head-img' :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">
        <el-dropdown trigger="click" @command="commonClick">
            <span class="el-dropdown-link">
                {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="account">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">git地址</el-dropdown-item>
            <el-dropdown-item command="lgout">退出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
      </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getUserInfo () {
      let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(result => {
        this.userInfo = result.data.data
      })
    },
    commonClick (key) {
      if (key === 'account') {
        this.$router.push('/home/account')
      } else if (key === 'git') {
        window.location.href = 'https://github.com/lwj0204/918heima.git'
      } else {
        //   退出
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
    .layout-header {
        height: 50px;
        .title {
            margin-left: 4px;
            vertical-align: top
        }
        .head-img {
            border-radius: 50%;
            width: 40px;
            height:40px;
            vertical-align: middle;
            margin-right: 4px;
        }
    }
</style>
