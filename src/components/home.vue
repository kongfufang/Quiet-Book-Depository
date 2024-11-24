<template>
  <div>
    <!-- 顶部 -->
    <div id="bg">
      <!-- 导航栏 -->
      <div id="nav">
        <div class="wrapper">
          <ul class="search">
            <li id="search_text">
							<Icon type="ios-search" size="35" class="search_icon"></Icon>
              <input type="text" @keyup.enter="alertSearch" ref="inputSearch" placeholder="搜一搜"/>
            </li>
              <li id="shop"  @click="enterHistory" >
                <Icon type="ios-home" size="35" class="icon-icon-test1"></Icon>
								<i class="text">浏览记录</i>
                <i id="cont"></i>
              </li>

          </ul>
          <ul>
            <li v-if="this.code==='1'"><router-link to="/"><Icon type="person" size="20"></Icon>&nbsp;{{ this.userName }}</router-link></li>
						<li v-else><router-link to="/login"><Icon type="log-in" size="20"></Icon>&nbsp;登录/注册</router-link></li>
            <li @click="giveLove"><a id='money' href=""><Icon type="cash" size="20" class="icom"></Icon>&nbsp;为爱发力</a></li>
            <li class="hotRead" @click="goHotRead"><a href="#"><Icon type="ios-flame-outline" size="20"></Icon>&nbsp;畅阅热榜</a></li>
            <li id="exct" @click="logout"><a href="#"><Icon type="log-out" size="20" ></Icon>&nbsp;退出登录</a></li>
          </ul>
        </div>
      </div>
      <!-- 导航栏 -->

      <!-- 时间栏 -->
			<div class="time">
        <p class="BeijingTime">{{ beijingTime }}</p>
      </div>

      <!-- 时间栏 -->

      <!-- 打字动画 -->
      <div class="text">
        <p class="p1">「静谧藏书阁」</p>
        <div id="text_center">
          <span class="p2"></span><span class="mark">|</span>
        </div>
      </div>
      <!-- 打字动画 -->

      <!-- 箭头动画 -->
      <div class="arrow">
        <Icon type="ios-arrow-down" size="40"></Icon>
      </div>
      <!-- 箭头动画 -->
    </div>
    <!-- 顶部 -->
  </div>

</template>

<script>
import { Icon } from 'iview'
import { mapMutations, mapState } from 'vuex'
export default {

  name: 'homeIndex',
  components: {
    Icon
  },
  data () {
    return {
      text: [
        '欢迎来到静谧藏书阁。',
        '答案在路上,自由在风里,风吹哪页读哪页,哪页难读撕哪页。',
        '落日沉溺于书籍之海,晚风也品书中的爱。',
        '我躺在一大片书海的中央,享受着书本带来的芬芳'
      ],
      date: 500,
      cont: 0,
      char: 0,
      judge: false,
      start: null,
      beijingTime: '',
      userName: '',
      code: ''
    }
  },
  created () {
    this.userName = this.$route.query.id
    this.code = this.$route.query.code
  },
  mounted () {
    setTimeout(() => {
      this.$el.style.opacity = 1
      requestAnimationFrame(this.action)
      this.$el.querySelector('.arrow').addEventListener('click', () => {
        window.scrollTo({ top: 800, left: 0, behavior: 'smooth' })
      })
    }, 1000)
    this.updateBeijingTime()
    setInterval(this.updateBeijingTime, 1000)
    this.setCode(this.Code)
    // console.log(this.Code)
  },
  computed: {
    ...mapState('user', ['Code'])
  },
  methods: {
    ...mapMutations('user', ['setCode']),
    action (time) {
      if (this.start === null) {
        this.start = time
      }
      const progress = time - this.start
      if (progress > this.date) {
        const text1 = this.text[this.cont]
        if (this.judge === false) {
          this.char = this.char + 1
          this.$el.querySelector('.p2').innerHTML = text1.slice(0, this.char)
          this.date = 500 - Math.random() * 400
        } else {
          this.$el.querySelector('.p2').innerHTML = text1.slice(0, this.char)
          this.char = this.char - 1
        }
        this.start = time
        if (this.char === text1.length) {
          this.judge = true
          this.date = 50
          this.start = time + 2000
        }
        if (this.char < 0) {
          this.judge = false
          this.start = time + 200
          this.cont++
          this.cont = this.cont % this.text.length
        }
      }
      requestAnimationFrame(this.action)
    },
    updateBeijingTime () {
      const now = new Date() // 获取当前时间
      const offset = 8 // 北京时区偏移量，北京时区为东八区
      const utc = now.getTime() + now.getTimezoneOffset() * 60000 // 获取当前时间的UTC时间
      const beijingTime = new Date(utc + 3600000 * offset) // 计算北京时间
      this.beijingTime = this.formatTime(beijingTime) // 格式化北京时间
    },
    formatTime (time) {
      const hours = this.padZero(time.getHours())
      const minutes = this.padZero(time.getMinutes())
      return `${hours}:${minutes}`
    },
    padZero (value) {
      return value < 10 ? '0' + value : value // 小于10的数字前补零
    },
    logout () {
      this.$router.push('/login')
      this.setCode('')
      localStorage.removeItem('token')
    },
    giveLove () {
      alert('您的支持就是对我们最强的发力，无需任何其他发发力')
    },
    goHotRead () {
      window.scrollTo({ top: 1100, left: 0, behavior: 'smooth' })
    },
    alertSearch () {
      alert('敬请期待')
      this.$refs.inputSearch.value = ''
    },
    enterHistory () {
      if (this.code === '1') {
        this.$router.push('/history')
      } else {
        alert('请先登录页面')
      }
    }
  }
}

</script>

<style >
body{
	animation: scroll-down 1.5s;
	transition: all 1s;
	opacity: 1;/* 页面初始透明度 */
	margin: 0;
}
/* 页面向下划动动画 */

.wrapper{
	margin: 0 auto;
	width: 1240px;
}

/* 头部 */
/* 页面向下划动动画 */
#bg
{
	position: relative;
	width: 100vw;/* 图片的宽度将占满整个视口的宽度 */
	height: 100vh;/* 图片的高度将占满整个视口的高度 */
	background-image: url('@/assets/首页/bg.jpg');
	background-repeat: no-repeat;/* 图片不重复 */
	background-size: cover;/* 将图片等比例填满窗口 */
	background-attachment: fixed;/* 背景图随滚轮一起动 */
	margin-bottom: 90px;
}

/* 导航栏 */
#bg #nav{
	position: fixed;
	background: rgba(101, 101, 101, 0.5);		/*高斯模糊 */
	backdrop-filter: blur(5px);          /*高斯模糊 */
	width: 100%;
	height: 60px;
	z-index: 2;/* 导航栏始终在最上层 */
}
#bg #nav .wrapper{/* 版心 */
	display: flex;
	justify-content: space-between;/* 两端对齐 */
	align-items: center;/* 块级元素垂直居中 */
	margin: 0 auto;
	height: 60px;
	width: 1300px;

}
 #bg #nav .wrapper ul{
	display: flex;
}
#bg #nav .wrapper ul li {
	list-style: none;
}
#bg #nav .wrapper ul li a{
	font-size: 19px;
	font-weight: bold;
	transition: all 0.5s;
	color: #ffffff;
	padding: 0 20px;
	text-decoration: none;
}
#bg #nav .wrapper ul li a:hover{
	color: #03eaff;
}

#bg #nav ul li a .iconfont{
	width: 20px;
	height: 20px;
	font-size: 20px;
	vertical-align: middle;/* 字体图标垂直居中 */
}
#bg #nav .wrapper .search{/* 右侧导航栏 */
	display: flex;
	width: 400px;
	height: 60px;
}
#bg #nav .wrapper .search #search_text{
	position: relative;
	width: 200px;
	height: 60px;
}
.search_icon {
  position: absolute;
  left: -28px; /* 根据需要调整图标相对于输入框的位置 */
  top: 45%;
  transform: translateY(-50%);
}
#bg #nav .wrapper .search #search_text input{
	margin-top: 9px;
	width: 150px;
	height: 35px;
	text-indent: 4px;
	border: 1px solid #cecece;
	border-radius: 4px;
	outline: none;
}
#bg #nav .wrapper .search #search_text .icon-icon-test2{
	transition: all 0.5s;
	font-weight: bold;
	color: #ffffff;
	font-size: 30px;
	vertical-align: middle;/* 字体图标垂直居中 */
}
#bg #nav .wrapper .search #search_text .icon-icon-test2:hover{
	color: #03eaff;
}
/* 购物车标签 */
#bg #nav .wrapper .search #shop{
	cursor: pointer;
	position: relative;
	margin-left: 20px;
	width: 140px;
	height: 60px;
}
#bg #nav .wrapper .search #shop .icon-icon-test1{
	color: #ffffff;
	transition: all 0.5s;
	font-size: 40px;
	line-height: 65px;/* 字体图标垂直居中 */
}
#bg #nav .wrapper .search #shop:hover{
	color: #03eaff;
}
#bg #nav .wrapper .search #shop .text{
	font-size: 20px;
}

#bg #nav .wrapper .search #shop #cont{/* 商品数量计数器 */
	transition: all 1s;
	font-family: 'Courier New', Courier, monospace;
	font-weight: bold;
	color: #ffffff;
	top: 8px;
	left: 10px;
	padding: 0 5px;
	height: 20px;
	font-size: 15px;
	line-height: 20px;
	background-color: #ff5d00;
	border-radius: 10px;
	opacity: 0;
	position: absolute;
}
/* 导航栏 */

/* 时间栏 */
#bg .time{
	position: absolute;
	top: 25%;
	left: 40%;
	width: 20%;
	height: 20%;
}
#bg .time p{
	color: #ffffff;
	text-align: center;
	font-size: 100px;
	font-weight: bold;
}
/* 时间栏 */

/* 打字动画区域 */
.text
{
	display: flex;
	justify-content:center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height:25%;
	position: absolute;
	top: 44%;
	left: 0%;
}
#bg .text .p1
{
	margin-bottom: 1px;
	color: #33FFE6;
	text-align: center;
	font-size: 60px;
	font-weight: bold;
	width: 100%;
	height: 40%;
}
#bg .text .p2
{
	width: 100%;
	font-size: 40px;
	color: #ffffff;
}
#bg .text .mark
{
	color: #ffffff;
	font-size: 40px;
	animation: blink 0.8s step-end infinite;
}
@keyframes blink{/* 定义光标动画 */
	from,
	to{
		color: transparent;
	}
	50%{
		color: #ffffff;
	}
}
/* 打字动画区域 */
/* 箭头动画 */
#bg .arrow{
	position: absolute;
	width: 40px;
	height: 40px;
	bottom: 10%;
	left: 47%;
	animation: arrow-down 1.5s infinite;
}
@keyframes arrow-down {
	0% {
		bottom: 10%;
 }
	50%{ bottom: 5%;
	opacity: .2
	}
	100%{
		bottom: 10%;
		opacity: 1
		}
}
#bg .arrow .icon-icon-test3{
	color: #ffffff;
	font-size: 60px;
	font-weight: bold;
	text-shadow: 2px 0px 5px #000000;
}
</style>
