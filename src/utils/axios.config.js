// 负责对axios进行处理
import axios from 'axios'
import jsonBig from 'json-bigint'
import router from '../permission' // 导入一个实例
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

axios.defaults.transformResponse = [function (data) {
  return jsonBig.parse(data)
}]

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
  let status = error.response.status // 获取失败的状态码
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未传'
      window.localStorage.clear() // 清理缓存
      router.push('/login') // this.$router.push()
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ message, type: 'warning' })
  return new Promise(function () {}) // 终止当前错误
})
// export default axios
export default {
  install (Vue) {
    Vue.prototype.$axios = axios
  }
}
