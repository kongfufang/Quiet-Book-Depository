<template>
	<div class="select">
		<div class="select_title">
					<ul class="Tleft">
						<li><p>今日推荐</p></li>
					</ul>
					<ul class="Tright">
						<li  @click="changeNovel(1)"><p :class="{active:activeTab ===1}">经典</p></li>
						<li  @click="changeNovel(2)"><p :class="{active:activeTab ===2}">国外</p></li>
						<li  @click="changeNovel(3)"><p :class="{active:activeTab ===3}">武侠</p></li>
						<li  @click="changeNovel(4)"><p :class="{active:activeTab ===4}">玄幻</p></li>
						<li  @click="changeNovel(5)"><p :class="{active:activeTab ===5}">历史</p></li>
						<li  @click="changeNovel(6)"><p :class="{active:activeTab ===6}">科幻</p></li>
					</ul>
				</div>
				<div class="select_cont cont">
					<ul>
						<li v-for="item in setNovel " :key="item.id" @click="enterNovel(item.id,item.title)">
							<a href="#">
								<div class="pic">
									<img :src="item.image" width="180px"/>
								</div>
								<div class="txt">
									<div class="info">
										<h3>作者:{{item.author}}</h3>
									</div>
									<p class="price" align='center'><span>{{item.title }}</span></p>
								</div>
							</a>
							<div class="cover">
								<p>开始阅读<span class="iconfont icon-icon-test1"></span></p>
							</div>
						</li>

					</ul>
					<div class="moreNovel" @click="morefn">更多</div>
				</div>

	</div>
</template>

<script>
import { getNovel } from '@/apis/layout'
export default {
  name: 'selectIndex',
  data () {
    return {
      setNovel: [],
      activeTab: 1
    }
  },
  async created () {
    const res = await getNovel(1)
    this.setNovel = res.data
  },
  methods: {
    enterNovel (id, title) {
      // console.log(id)
      this.$router.push(`/reading?id=${id}&title=${title}`)
    },
    async changeNovel (page) {
      this.activeTab = page
      const res = await getNovel(page)
      // console.log(res)
      this.setNovel = res.data
    },
    morefn () {
      alert('敬请期待!')
    }
  }
}
</script>

<style>
.moreNovel{
	position: absolute;
	right: 2%;
	top: 0%;
	font-size: 20px;
	width: 60px;
	height: 40px;
	background-color: #E5E7E9;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
	border-radius: 3em;
}
.select{
	width: 100%;
	height: 760px;
	background: #ececec
}

.select .select_title{
	width: 95%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	height: 42px;
	margin-bottom: 20px;
}
.select .select_title .Tright{
	display: flex;

}
.select .select_title .Tright li {
	margin-top: 20px;
	margin-right: 20px;
	width: 50px;
	height: 25px;
}
.select .select_title ul li p{
	color: #000;
	font-size: 20px;
}
.select .select_title .Tleft li p{
	font-size: 30px;
	line-height: 42px;
}

.select .select_title .Tright li p{
	text-align: center;
	line-height: 28px;
	height: 30px;
}
.select .select_title .Tright li p:hover{
	cursor: pointer;
}
.select .select_title .Tright .active{
	color: #ffffff;
	background-color: #0091d9;
}
.select .select_cont{
	width: 95%;
	margin: 0 auto;
	height: 620px;
	margin-bottom: 90px;
	display: none;/* 隐藏内容 */
	position: relative;
}
.select .cont{
	display: block;/* 显示内容 */
}

.select .select_cont ul{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.select .select_cont  li{
	overflow: hidden;
	position: relative;
	margin: 4px;
	width: 242px;
	height: 340px;

}

.select .select_cont .pic{
	width: 242px;
	height: 242px;
}
.select .select_cont .info {
	text-align: center;
	margin-top: 14px;
	height: 40px;
	line-height: 19px;
}
.select .select_cont .info p{
	color: #000000;
}
.select .select_cont .price{
	color: #2C3E50;

}
.select .select_cont .price span{
	margin-left: 5px;
	font-size: 22px;
}
.select .select_cont li .cover{
	position: absolute;
	bottom: -100px;
	left: 0;
	width: 242px;
	height: 95px;
	background-color: #0091d9;
	text-shadow: 2px 0px 5px #000000;
	padding-top: 15px;
	text-align: center;
	transition: all 0.5s;
}
.select .select_cont li .cover p{
	font-size: 30px;
	line-height: 50px;
	text-align: center;
	color: #ffffff;

}
.select .select_cont li .cover .icon-icon-test1{
	font-size: 50px;
	color: rgba(255,255,255,0.5);
}
.select .select_cont li .cover .icon-icon-test1:hover{
	color: #ffffff
}

.select .select_cont li:hover .cover{
	bottom: 0;
}
.select .select_cont li:hover{
	border: 3px solid #0091d9;
}

</style>
