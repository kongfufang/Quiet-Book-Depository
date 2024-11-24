import Vue from 'vue'
import VueRouter from 'vue-router'
import layoutIndex from '@/views/login/Layout.vue'

import historyIndex from '@/views/login/history.vue'
import notFound from '@/views/login/notFound.vue'
import readingIndex from '@/views/login/reading.vue'
import loginIndex from '../views/login/Login.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', component: layoutIndex }, // 设置根路径为 layoutIndex 组件
  { path: '/login', component: loginIndex }, // 如果需要登录页面，可以添加一个登录路径
  { path: '/history', component: historyIndex },
  { path: '/reading', component: readingIndex },
  { path: '/*', component: notFound }

]

const router = new VueRouter({
  routes
})
export default router
