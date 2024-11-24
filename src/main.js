import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/base.css'
import '@/utils/iView'
import 'iview/dist/styles/iview.css'
import '@/utils/Element'
import instance from './utils/request'

instance.defaults.withCredentials = true
Vue.config.productionTip = false
// window.addEventListener('beforeunload', function (event) {
//   // 在这里执行清除 token 的操作
//   localStorage.removeItem('token')
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
