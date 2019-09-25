<template>
<el-card v-loading="loading">
    <bread-crumb slot="header">
        <template slot="title">素材管理</template>
    </bread-crumb>
    <el-upload class="uploadImg" action="" :http-request="uploadImg" :show-file-list="false">
        <el-button type="primary">上传图片</el-button>
    </el-upload>
    <el-tabs v-model="activeName" @tab-click="changeTab">
        <el-tab-pane label="全部素材" name="all">
            <div class="img-list">
                <el-card class="img-item" v-for="item in list" :key="item.id">
                    <img :src="item.url" alt="">
                    <div class="operate">
                        <i @click=" collectOrCancel(item)" class="el-icon-star-on" :style="{color:item.is_collected ? 'red' : '#000'}"></i>
                        <!-- 删除 -->
                        <i @click="delImg(item.id)" class="el-icon-delete-solid"></i>
                    </div>
                </el-card>
            </div>
            <el-row type="flex" justify="center">
                <el-pagination
                @current-change="changePage"
                    background
                    layout="prev, pager, next"
                    :total="page.total"
                    :current-page="page.currentPage"
                    :page-size="page.pageSize"
                    >
                </el-pagination>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="收藏素材" name="collect">
            <div class="img-list">
                <el-card class="img-item" v-for="item in list" :key="item.id">
                    <img :src="item.url" alt="">
                </el-card>
            </div>
            <el-row type="flex" justify="center">
                <el-pagination
                @current-change="changePage"
                    background
                    layout="prev, pager, next"
                    :total="page.total"
                    :current-page="page.currentPage"
                    :page-size="page.pageSize"
                    >
                </el-pagination>
            </el-row>
        </el-tab-pane>
    </el-tabs>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选择全部素材
      list: [], // 定义一个list接收数据
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      loading: false
    }
  },
  methods: {
    //   取消或者收藏
    collectOrCancel (item) {
      let mess = item.is_collected ? '取消' : ''
      this.$confirm(`您确定要${mess}收藏该图片？`).then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'put',
          data: { collect: !item.is_collected }
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    //   删除图片
    delImg (id) {
      this.$confirm('您确定要删除该图片吗？').then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.getMaterial()
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage // 将最新页码赋值给currentPage
      this.getMaterial() // 获取最新数据
    },
    // 切换页签方法
    changeTab () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    getMaterial (collect) {
      this.loading = true
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 赋值总数
        this.loading = false
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
    .uploadImg {
        position: absolute;
        right:20px;
        margin-top: -10px;
    }
    .img-list {
        display: flex;
        flex-wrap:wrap;
        justify-content: center;
        .img-item{
            width: 180px;
            height: 180px;
            border-radius: 6px;
            margin:10px;
            position: relative;
            img {
                width: 100%;
                height:100%

            }
            .operate{
                background-color: #f4f5f6;
                position:absolute;
                left:0;
                bottom:0;
                width:100%;
                height:30px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                i {
                    font-size: 18px;
                }
            }
        }
    }
</style>
