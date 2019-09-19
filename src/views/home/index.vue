<template>
  <el-container>
    <!-- 左边容器 -->
    <el-aside>
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>

</style>
