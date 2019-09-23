<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">评论列表</template>
      </bread-crumb>
      <!-- 表格列表 -->
      <el-table :data="list">
          <el-table-column width="500px" label="标题" prop="title"></el-table-column>
          <el-table-column :formatter="stateFormatter" align="center" label="评论状态" prop="comment_status"></el-table-column>
          <el-table-column align="center" label="总评论数" prop="total_comment_count"></el-table-column>
          <el-table-column align="center" label="粉丝评论数" prop="fans_comment_count"></el-table-column>
          <el-table-column label="操作">
              <!-- 自定义内容 -->
              <el-button type="text" size="small">修改</el-button>
              <el-button type="text" size="small">关闭评论</el-button>
          </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    //   获取评论列表
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results
      })
    },
    stateFormatter (row, column, cellvalue, index) {
      return cellvalue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
