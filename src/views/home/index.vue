<template>
  <el-container>
    <!-- 左边容器 -->
    <el-aside style="width:200px;overflow:hidden;background-color:#323745">
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main style="padding:0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
