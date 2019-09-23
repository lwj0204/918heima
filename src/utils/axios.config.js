// 负责对axios进行处理
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截 请求到达后台之前拦截
axios.interceptors.request.use(function (config) {
  // 在发起请求前做一些处理
  // config 是要发送请求的配置信息
  let token = window.localStorage.getItem('user-token') // 获取token
  config.headers['Authorization'] = `Bearer ${token}` // 统一注入token
  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})
// 响应拦截  响应数据 回来 到达then方法之前
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理 执行成功时进入
  return response.data ? response.data : {}
}, function (error) {
  // 执行失败时执行
  return Promise.reject(error)
})
// export default axios
export default {
  install (Vue) {
    Vue.prototype.$axios = axios
  }
}
