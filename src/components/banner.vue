<template>
	<div>
		<div class="banner">
				<div class="box banner_time">
					<div class="banner_time_title1">热榜阅读</div>
					<div class="banner_time_title2"><span class="timeSet1">{{currentTime}}</span>&nbsp;点场&nbsp;&nbsp;距离下一次进入阅读</div>
					<div class="banner_time_title3"><div class="timeSet2">{{remainingTime.hours}}</div>&nbsp;:&nbsp;<div class="timeSet3">{{remainingTime.minutes}}</div>&nbsp;:&nbsp;<div class="timeSet4">{{remainingTime.seconds}}</div></div>
				</div>
				<div class="mainbox">

					<div class="Bt rightBt">
						<Icon type="arrow-right-a" size="30" class="ioi"></Icon>
					</div>
					<div class="Bt leftBt">
						<Icon type="arrow-left-a" size="30" class="ioi"></Icon>

					</div>

					<!-- 圆点指示器 -->
					<ol>
						<li class="current"><i></i></li>
						<li><i></i></li>
						<li><i></i></li>
					</ol>
					<!-- 圆点指示器 -->

					<ul id="banner_box">
						<li class="bg">

							<div class="bg_box" v-for="item in imgs.slice(0,3)" :key="item.id">
								<div class="bg_pic" @click="enterNovel(item.id,item.title)">
									<p>{{item.type}}</p>
									<p>{{item.author}}</p>
									<img :src="item.image"/>
									<p class="title"><span class="iconfont icon-renminbi1688"></span>{{item.title}}</p>
									<div class="shop">
										<p>现在开始阅读<span class="iconfont icon-icon-test1"></span></p>
									</div>
								</div>
							</div>

						</li>

						<li class="bg">
							<div class="bg_box" v-for="item in imgs.slice(4,7)" :key="item.id">
								<div class="bg_pic"  @click="enterNovel(item.id,item.title)" >
									<p>{{item.type}}</p>
									<p>{{item.author}}</p>
									<img :src="item.image"/>
									<p class="title"><span class="iconfont icon-renminbi1688"></span>{{item.title}}</p>
									<div class="shop">
										<p>现在开始阅读<span class="iconfont icon-icon-test1"></span></p>
									</div>
								</div>
							</div>

						</li>

						<li class="bg">
							<div class="bg_box" v-for="item in imgs.slice(6,9)" :key="item.id">
								<div class="bg_pic"  @click="enterNovel(item.id,item.title)">
									<p>{{item.title}}</p>
									<p>{{item.type}}</p>
									<img :src="item.image"/>
									<p class="title"><span class="iconfont icon-renminbi1688"></span>{{item.author}}</p>
									<div class="shop">
										<p>现在开始阅读<span class="iconfont icon-icon-test1"></span></p>
									</div>
								</div>
							</div>

						</li>

						<!-- 无缝轮播的假元素 -->

					</ul>

				</div>
				<!-- 随机商品功能 -->
				<div class="box banner_select">
					<div class="banner_time_title1">放心读</div>
					<div class="head">
						<a href="#"><img :src="selectedImg"/></a>
					</div>
					<div class="buttom" :class="{ 'buttom-running': isRunning }" @click="toggleRandom" ref="buttom">
  {{ buttonLabel }}
</div>
				</div>
				<!-- 随机商品功能 -->
			</div>
	</div>

</template>

<script>
import { getSwipe } from '@/apis/layout'
export default {
  name: 'bannerIndex',
  data () {
    return {
      currentTime: '',
      remainingTime: {
        hours: '',
        minutes: '',
        seconds: ''

      },
      imgs: [],
      isRunning: false,
      selectedImg: ''
    }
  },
  async created () {
    const res = await getSwipe(1)
    this.imgs = res.data
    // console.log(res.data)
    this.selectedImg = this.imgs[5].image
  },
  computed: {
    buttonLabel () {
      return this.isRunning ? '结束' : '开始'
    }
  },
  mounted () {
    // console.log(this.selectedImg)
    this.move()
    this.updateTime()
    setInterval(this.updateTime, 1000)
  },
  methods: {
    move () {
      let i = 1
      const rightBt = document.querySelector('.rightBt')
      const leftBt = document.querySelector('.leftBt')
      const bannerbox = document.querySelector('#banner_box')
      const button = document.querySelectorAll('.banner .mainbox ol li')
      let sum = 0

      function handRightBt () {
        if (i < 3) {
          const currentElement = document.querySelector('.banner .mainbox ol .current')
          if (currentElement) {
            currentElement.classList.remove('current')
          }
          if (button[i]) {
            button[i].classList.add('current')
          }
          bannerbox.style.transition = '0.2s'
          sum = i * 100
          bannerbox.style.left = `-${sum}%`
          i++
        } else {
          sum = i * 100
          bannerbox.style.left = `-${sum}%`
          const currentElement = document.querySelector('.banner .mainbox ol .current')
          if (currentElement) {
            currentElement.classList.remove('current')
          }
          if (button[0]) {
            button[0].classList.add('current')
          }
          setTimeout(function () {
            bannerbox.style.transition = 'none'
            bannerbox.style.left = '0%'
          }, 200)
          i = 1
        }
      }

      function handLeftBt () {
        if (i !== 1) {
          const currentElement = document.querySelector('.banner .mainbox ol .current')
          if (currentElement) {
            currentElement.classList.remove('current')
          }
          if (button[i - 2]) {
            button[i - 2].classList.add('current')
          }
          bannerbox.style.transition = '0.2s'
          sum = (i - 2) * 100
          bannerbox.style.left = `-${sum}%`
          i--
        } else {
          i = 3
          const currentElement = document.querySelector('.banner .mainbox ol .current')
          if (currentElement) {
            currentElement.classList.remove('current')
          }
          if (button[2]) {
            button[2].classList.add('current')
          }
          bannerbox.style.transition = 'none'
          bannerbox.style.left = '-300%'
          setTimeout(function () {
            bannerbox.style.transition = '0.2s'
            bannerbox.style.left = '-200%'
          }, 0)
        }
      }
      // handRightBt
      for (let cont = 0; cont < 3; cont++) {
        button[cont].addEventListener('mouseenter', function () {
          document.querySelector('.banner .mainbox ol .current').classList.remove('current')
          button[cont].classList.add('current')
          bannerbox.style.transition = '0.2s'
          sum = cont * 100
          i = cont + 1
          bannerbox.style.left = `-${sum}%`
        })
      }

      rightBt.addEventListener('click', handRightBt)

      leftBt.addEventListener('click', handLeftBt)

      let data = setInterval(handRightBt, 3000)
      const mainbox = document.querySelector('.banner .mainbox')
      mainbox.addEventListener('mouseenter', function () {
        clearInterval(data)
      })
      mainbox.addEventListener('mouseleave', function () {
        clearInterval(data)
        data = setInterval(handRightBt, 3000)
      })
    },
    updateTime () {
      const now = new Date()
      let hours = now.getHours()
      let minutes = now.getMinutes()
      let seconds = now.getSeconds()

      if (hours < 10) {
        hours = '0' + hours
      }

      if (minutes < 10) {
        minutes = '0' + minutes
      }

      if (seconds < 10) {
        seconds = '0' + seconds
      }

      this.currentTime = hours + ':00'

      const remainingSeconds = 3600 - (minutes * 60 + seconds)
      this.remainingTime.hours = remainingSeconds === 0 ? '01' : '00'
      this.remainingTime.minutes = Math.floor(remainingSeconds / 60)
      this.remainingTime.seconds = remainingSeconds % 60
    },
    toggleRandom () {
      if (!this.isRunning) {
        this.isRunning = true
        this.$refs.buttom.style.animation = 'none'
        this.id = setInterval(() => {
          const rand = Math.floor(Math.random() * this.imgs.length)
          this.selectedImg = this.imgs[rand].image
        }, 50)
      } else {
        this.isRunning = false
        this.$refs.buttom.style.animation = 'buttom1 1.5s infinite'
        clearInterval(this.id)
      }
    },
    enterNovel (id, title) {
      // console.log(id)
      this.$router.push(`/reading?id=${id}&title=${title}`)
    }
  }
}

</script>

<style>
.buttom-running {
  animation: none;
}
 .banner {
	height: 350px;
	display: flex;
	margin-bottom: 10px;
}
 .banner .box{
	width: 20%;
	background: linear-gradient(to top, #D2691E, #fff);
}
/* 倒计时 */
 .banner  .banner_time_title1{
	margin-top: 50px;
	font-weight: bold;
	height: 60px;
	font-size: 35px;
	text-align: center;
	color: #B833FF;
}
 .banner .banner_time .banner_time_title2{

	margin-top: 110px;
	height: 40px;
	font-size: 15px;
	text-align: center;
	color: #ffffff;
}
 .banner .banner_time .banner_time_title2 .timeSet1{
	font-size: 20px;
	font-weight: bold;
}

 .banner .banner_time .banner_time_title3{
	display: flex;
	justify-content: center;
	font-weight: bold;
	height: 60px;
	font-size: 20px;
	text-align: center;
	color: #ffffff;
}
 .banner .banner_time .banner_time_title3 div{
	height: 30px;
	width: 30px;
	font-size: 20px;
	text-align: center;
	color: #ffffff;
	background-color: #000000;
}
/* 倒计时 */

/* 轮播图2.0 */
 .banner .mainbox{
	width: 60%;
	background: linear-gradient(to top, #D2691E, #fff);
	backdrop-filter: blur(3px);
	/* right: ; */
	overflow: hidden;
	position: relative;
}
 .banner .mainbox ol{
	position: absolute;
	left: 43%;
	bottom: 0;
	display: flex;
	z-index: 1;
}
 .banner .mainbox ol li{
	margin-left: 8px;
	width: 22px;
	height: 22px;
	border-radius: 50%;
}
.banner ol i{
	display: block;
	margin: 4px;
	width: 14px;
	height: 14px;
	background-color: rgba(255,255,255,0.5);
	border-radius: 50%;
}
 .banner .mainbox ol .current{
	background-color: rgba(255,255,255,0.5);
}
 .banner .mainbox ol .current i{
	background-color: #ffffff;
}
 .banner .mainbox .Bt{
	width: 40px;
	height: 60px;
	background-color: #fff;
	border-radius: 8px;
	z-index: 1;
	opacity: 0.3;
}
 .banner .mainbox .Bt:hover{
	background-color: #85929E ;
	opacity: 0.5;
}
 .banner .mainbox .rightBt{
	position: absolute;
	top: 40%;
	right: 0;
}
 .banner .mainbox .leftBt{
	position: absolute;
	top: 40%;
	left: 0;
}
 .banner .mainbox .iconfont{
	font-size: 40px;
	text-align: center;
	vertical-align: middle;
	color: rgba(255, 255, 255, 0.5);
}
 .banner .mainbox ul{
	display: flex;
	position: relative;
	top: 0;
	left: 0%;    /* 控制轮播图移动; */
	width: 400%;/* 避免 在弹性盒子中的子集元素被压缩 */
	height: 100%;
	transition: 0.2s;/* 过渡动画 */
}
 .banner .mainbox ul .bg{
	display: flex;
	justify-content: space-evenly;/* 手拉手对齐 */
	width: 25%;
	height: 100%;
	cursor: pointer;
}
 .banner .mainbox ul .bg .bg_box{
	display: flex;
	flex-wrap: wrap;
	align-items: center;/* 垂直居中 */
	justify-content: center;
	width: 30%;
	height: 100%;
}
/* 单元素轮播图片 */
 .banner .mainbox #banner_box .bg .bg_box .bg_pic{
	position: relative;
	width: 200px;
	height: 280px;
	overflow: hidden;
}
/* 弹框 */
 .banner .mainbox #banner_box .bg .bg_box .bg_pic .shop{
	position: absolute;
	cursor: pointer;
	bottom: -60px;
	width: 200px;
	height: 60px;
	border-radius: 8px;
	transition: all 0.5s;
	text-shadow: 2px 0px 5px #000000;

	background: linear-gradient(to top,#8800ff,#00aaff);
}
 .banner .mainbox #banner_box .bg .bg_box .bg_pic .shop p{
	font-size: 20px;
	text-align: center;
	color: #ffffff;
}
 .banner .mainbox #banner_box .bg .bg_box .bg_pic .shop p .icon-icon-test1{
	color: rgba(255,255,255,0.5);
}
 .banner .mainbox #banner_box .bg .bg_box .bg_pic .shop p .icon-icon-test1:hover{
	color: #ffffff
}
 .banner .mainbox #banner_box .bg .bg_box .bg_pic:hover .shop{
	bottom: 0;
}
/* 弹框 */

 .banner .mainbox #banner_box .bg .bg_box .bg_pic .title{
	text-align: center;
	color: #ffffff;
	font-weight: bold;
	font-size: 22px;
}

 .banner .mainbox #banner_box .bg .bg_box .bg_pic p{
	text-align: center;
	color: #ffffff;

}
 .banner .mainbox #banner_box .bg .bg_box .bg_pic .icon-renminbi1688{
	color: #ffffff;
	font-weight: bold;
	font-size: 15px;
}
 .banner .mainbox #banner_box .bg .bg_box .bg_pic img{
	width: 200px;
	height: 200px;
}
/* 轮播图 2.0 */

/* 随机商品 */
.banner .banner_select{
	position: relative;
}
.banner .banner_select .head{
	position: absolute;
	top: 105px;
	left: 42px;

	width: 150px;
	height: 150px;
	background-color: black;
}
.banner .banner_select .buttom{
	position: absolute;
	cursor: pointer;
	top: 265px;
	left: 67px;
	color: #ffffff;
	text-align: center;
	line-height: 40px;
	border-radius: 15px;
	background-color: #ff0000;
	width: 100px;
	height: 40px;
	animation: buttom1 1.5s infinite;
}
.ioi{
	padding-top: 16px;
	padding-left: 7px;
}
@keyframes buttom1 {
	0%{
	opacity: .2
		}
	50%{
	opacity: 1
		}
	100%{
	opacity: .2
		}
}

</style>
