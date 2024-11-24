import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://8.134.68.12:8080/',
  timeout: 5000
  // withCredentials: true
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // Loading.service()

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 修改响应头部字段的值，确保不是通配符 '*'
  // const headers = response.headers
  // if (headers['Access-Control-Allow-Origin'] === '*') {
  //   headers['Access-Control-Allow-Origin'] = 'http://localhost:3000' // 将通配符修改为你的网站域名
  // }

  return response.data
}, function (error) {
  // 处理响应错误
  return Promise.reject(error)
})

export default instance
