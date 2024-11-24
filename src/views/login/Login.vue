<template>
<div class="body">
	<div class="box">
			<div class="pre-box">
				<h1>读万卷书</h1>
				<div class="img-bx">
					<img src="@/assets/登录&注册/1.jpg" width="500px"/>
				</div>
			</div>
			<!-- 注册框 -->
			<div class="register-form">
				<div class="titlBox">
					<h1>注册</h1>
				</div>
				<!-- 文本框 -->
				<div class="input-box">
					<input  class="user" type="text" placeholder="用户名" v-model="loginUser"/>
					<span class="use" v-show="isShow" >
						请输入由英文,数字组成的1到5位字符
					</span>
					<input v-model="loginPassword" class="passwd" type="password" placeholder="密码"/>
					<span class="pass_1" v-show="isPsShow">
						请输6位由英文,数字组成的字符
					</span>
					<input @change="comfirePs" v-model="repeatPs" class="passwd" type="password" placeholder="确认密码" @keyup.enter="enterHome('rejister')"/>
					<span class="pass" v-show="isPsReShow">
						两次输入的密码不相同
					</span>
				</div>
				<!-- 文本框 -->

				<!-- 按钮框 -->
				<div class="bt-box">
					<button @click="enterHome('rejister')">注册</button>
					<p @click="changeLogin">已有账号?去登录</p>
				</div>
				<!-- 按钮框 -->

			</div>
			<!-- 注册框 -->

			<!-- 登录框 -->
			<div class="login-form">

				<div class="titlBox">
					<h1>登录</h1>
				</div>

				<!-- 文本框 -->
				<div class="input-box">
					<input v-model="loginUser" class="user" type="text" placeholder="用户名"/>
					<span class="use" v-show="isShow">
						请输入由英文,数字组成的1到5位字符
					</span>
					<input v-model="loginPassword" class="passwd" type="password" placeholder="密码" @keyup.enter="enterHome('')"/>
					<span class="pass" v-show="isPsShow">
						请输6位由英文,数字组成的字符
					</span>
				</div>
				<!-- 文本框 -->

				<!-- 按钮框 -->
				<div class="bt-box">
					<button @click="enterHome('')">登录</button>
					<p @click="changeRejister">没有账号?去注册</p>
				</div>
				<!-- 按钮框 -->
			</div>
			<!-- 登录框 -->
			<el-alert v-show="loginSusses"
       title="成功登录"
       type="success"
       description="现在开始你的阅读之旅吧！"
       show-icon
			class="Alert">
    </el-alert>
		</div>
</div>
</template>

<script>
import { getLogin, getRegister } from '@/apis/login'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'loginIndex',
  created () {
    localStorage.removeItem('token')
    this.setToken('')
  },
  data: function () {
    return {
      isPsReShow: false,
      isShow: true,
      isPsShow: true,
      box: null,
      pic: null,
      h1: null,
      use: null,
      loginUser: '',
      loginPassword: '',
      repeatPs: '',
      res: '',
      loginSusses: false
    }
  },
  computed: {
    UserName () {
      return this.$store.user.data.userName
    },
    ...mapState('user', ['token'])
  },

  mounted () {
    this.box = document.querySelector('.pre-box')
    this.pic = document.querySelector('.img-bx img')
    this.h1 = document.querySelector('.pre-box h1')
    this.use = document.querySelectorAll('.box .use')
    // const cookies = document.cookie
    // console.log(cookies)
  },
  methods: {
    ...mapMutations('user', ['setToken']),
    changeRejister () {
      this.box.style.left = '525px'
      this.pic.src = require('@/assets/登录&注册/2.jpg')
      this.box.style.background = 'linear-gradient(to right, #FFC0CB, #FFFFFF)'
      this.h1.innerHTML = '也行万里路'
      this.loginUser = ''
      this.loginPassword = ''
    },
    comfirePs (e) { // 确认密码框
      // console.log(e.target.value)
      if (this.repeatPs !== this.loginPassword) {
        this.isPsReShow = true
        return false
      } else {
        this.isPsReShow = false
      }
    },
    changeLogin () {
      this.box.style.left = '0'
      this.pic.src = require('@/assets/登录&注册/1.jpg')
      this.box.style.background = 'linear-gradient(to top, #D2691E, #FFD700)'
      this.h1.innerHTML = '读万卷书'
      this.loginUser = ''
      this.loginPassword = ''
      this.res = ''
      this.repeatPs = ''
    },
    LoginNow () {
    },
    async enterHome (mode) { // 登录框函数
      if (mode === 'rejister') {
        if (!this.isShow && !this.isPsShow && !this.isPsReShow) {
          this.res = await getRegister(this.loginUser, this.loginPassword, this.repeatPs)
          // console.log(this.res)
          if (this.res.code === 1) {
            alert('注册成功,您现在可进行登录')
            this.changeLogin()
          } else {
            console.log(this.res.msg)
            alert(this.res.msg)
          }
        }
      } else {
        if (!this.isShow && !this.isPsShow) {
          this.res = await getLogin(this.loginUser, this.loginPassword)
          // console.log(this.res)
          // console.log(this.res.data)
          this.setToken(this.res.data)
          localStorage.setItem('token', JSON.stringify(this.res.data))
          // console.log(this.res.headers)
          if (this.res.code === 1) {
            this.loginSusses = true
            setTimeout(() => {
              this.loginSusses = false
              this.$router.push(`/?id=${this.loginUser}&code=${this.res.code}`)
            }, 1000)
          } else {
            alert('登录失败')
          }
        }
      }
    }
  },
  watch: {
    loginUser (newValue) {
      // console.log(newValue)
      const reg = /^[a-zA-Z0-9]{1,5}$/
      if (reg.test(newValue) !== true) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    loginPassword (newValue) {
      // console.log(newValue)
      const reg = /^[a-zA-Z0-9]{6}$/
      if (reg.test(newValue) !== true) {
        this.isPsShow = true
        return false
      } else {
        this.isPsShow = false
      }
    }
  }
}
</script>

<style scoped>
*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.body{
	height: 100vh;
	display: flex;
	background: linear-gradient(to right, #8B4513, #FFFFFF);
	/* 设置渐变背景色 */
}

.box{

	position: relative;
	display: flex;
	width: 1050px;
	height: 600px;
	margin: 0 auto;
	border-radius: 8px;/* 设置圆角 */
	border: 1px solid rgb(215, 215, 215);
	box-shadow: 4px 4px 3px rgb(0, 0, 0,.1);/* 设置边框阴影 */
}
.Alert{
	position: absolute;
	z-index:100;
	top: 8%;
}
.pre-box{
	width: calc(1050px/2);
	background: linear-gradient(to top, #D2691E, #FFD700);
	height: 100%;
	left: 0;
	top: 0;
	z-index: 1;
	position: absolute;
	border-radius: 8px;
	box-shadow: 4px 4px 3px rgb(0, 0, 0,.1);/* 设置边框阴影 */
	transition: all 0.7s;
}

.img-bx{
	margin: 80px auto;
	width: 300px;
	height: 300px;
	border-radius: 50%;
	overflow: hidden;
	box-shadow: 4px 4px 3px rgb(0, 0, 0,.1);
}
.img-bx img{
	width: 100%;
}

.pre-box h1{
	color: linear-gradient(to right, #FFD700, #8A2BE2);
	text-shadow:  4px 4px 3px rgb(0, 0, 0,.1);
	margin-top: 50px;
	text-align: center;
	letter-spacing: 5px;
}

.login-form,.register-form{
	flex: 1;/* 将父级分成2分 */
	height: 100%;
}

.titlBox{
	height: 200px;
	line-height: 300px;/* 字体垂直居中显示 */
}

.titlBox h1{
	color: #ffffff;
	text-align: center;
	letter-spacing: 5px;/* 字体间距 */
}

.input-box{
	position: relative;
	display: flex;
	flex-direction: column;/* 垂直排列 */
align-items: center;
}

input{
	outline: none;
	width: 60%;
	height: 40px;
	margin-bottom: 20px;
	text-indent: 4px;
	border: 1px solid #cecece;
	border-radius: 4px;
}
/* 规范提示词位置 */
span{
	color: #ffffff;
	font-size: 15px;
}
.use{
	position: absolute;
	top: 39px;
	color: #FF5733;
}

.pass_1{
	position: absolute;
	bottom: 61px;
	color: #FF5733;
}

.pass{
	position: absolute;
	bottom: -5px;
	color: #FF5733;
}
/* 规范提示词位置 */

input:focus{
	color: #000000;
}

input:focus::placeholder{
	opacity: 0;
}

.bt-box{
	display:flex;
	flex-direction: column;
	justify-content:center; /* 水平居中 */
	align-items:center; /* 垂直居中 */
}

button{
	margin-top: 5px;
	width: 100px;
	height: 30px;
	line-height: 30px;
	border-radius: 4px;
	border: none;
	color: #ffffff;
	background-color: #00aaff;
	margin-bottom: 10px;
}

.bt-box p{
	font-size: 14px;
	color: #ffffff;
	border-bottom: 1px solid #ffffff;
}

button:hover{
	cursor: pointer;
	opacity: .8; /* 不透明度设置 */
}
.bt-box p:hover{
	cursor: pointer;/* 改变光标形态 */
	opacity: .8; /* 不透明度设置 */
}

</style>
