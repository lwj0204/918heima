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
              <!-- 作用域插槽 -->
              <template slot-scope="obj">
                <!-- 自定义内容 -->
                <el-button type="text" size="small">修改</el-button>
                <el-button :style="{color:obj.row.comment_status ? '#E6A23C':'#409EFF'}" @click="closeOrOpen(obj.row)" type="text" size="small">
                  {{
                      obj.row.comment_status ? '关闭评论': '打开评论'
                  }}
                </el-button>
              </template>
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
    },
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论`).then(() => {
        //   确定调用接口
        this.$axios({
          url: 'comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          // 成功之后一定会进入then
          this.getComment() // 重新拉取数据
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
