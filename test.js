// 引入 Axios 库
const axios = require('axios')

// 定义请求地址
const url = 'https://www.wk-fdk.top:443/user/login'

// register

// 定义请求参数
const data = {
  username: 'fdk',
  password: '123456'
}

// 发起 POST 请求
axios.post(url, data)
  .then(response => {
    console.log('Response:', response.data)
  })
  .catch(error => {
    console.error('Error:', error)
  })
