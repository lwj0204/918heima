<template>
<el-card>
    <bread-crumb slot="header">
        <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName" @tab-click="getMaterial">
        <el-tab-pane label="全部素材" name="all">
            <div class="img-list">
                <el-card class="img-item" v-for="item in list" :key="item.id">
                    <img :src="item.url" alt="">
                    <div class="operate">
                        <i class="el-icon-star-on" :style="{color:item.is_collected ? 'red' : '#000'}"></i>
                        <i class="el-icon-delete-solid"></i>
                    </div>
                </el-card>
            </div>
        </el-tab-pane>
        <el-tab-pane label="收藏素材" name="collect">
            <div class="img-list">
                <el-card class="img-item" v-for="item in list" :key="item.id">
                    <img :src="item.url" alt="">
                </el-card>
            </div>
        </el-tab-pane>
    </el-tabs>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选择全部素材
      list: [] // 定义一个list接收数据
    }
  },
  methods: {
    getMaterial (collect) {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect'
        }
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
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
