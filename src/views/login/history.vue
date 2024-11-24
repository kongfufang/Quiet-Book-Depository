<template>
	<div class="whole">
		<div class="body">

		<h2><Icon type="ios-arrow-left" size="30" class="btn" @click="goBack"></Icon>历史浏览记录</h2>
		<ul v-if="isTrue">
			<li class="history_index" v-for="item in novelList" :key="item.id">
				<div class="left">
					<img :src="item.image" alt="">
					<span class="writer">作者:{{item.author}}
						<br>
						<div class="work">{{ item.title }}</div>
					</span>

				</div>
				<div class="rigth">
					<div>您已经读到第{{item.chapter}}章</div>
				</div>

			</li>

		</ul>
		<el-empty description="这里空空如也" v-else></el-empty>
	</div>

	</div>

</template>

<script>
import { Icon } from 'iview'
import { getHistory } from '@/apis/history'
import { mapState } from 'vuex'
export default {
  name: 'historyIndex',
  data: function () {
    return {
      index: 0,
      w: 1,
      isTrue: true,
      novelList: []
    }
  },
  computed: {
    ...mapState('user', ['token'])
  },
  async created () {
    if (this.token !== '') {
      const res = await getHistory(this.token)
      if (res.code === 0) this.isTrue = false
      this.novelList = res.data
    } else {
      const res = await getHistory()
      if (res.code === 0) this.isTrue = false
      this.novelList = res.data
    }
    // console.log(res)
  },
  components: {
    Icon
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.btn{
	padding:0 20px 0 0;
	background: #fff;
	cursor: pointer;
}
.whole{
	background-color: #F8F9F9;
}
.body{
	width: 1000px;
	margin: 0 auto;
	background-color: #F8F9F9 ;
}
h2{
	font-size: 30px;
	color: #1C2833 ;
	border-bottom: #1C2833 solid 2px;
}
.history_index{
	margin: 20px 0;
	display:flex;
	width: 100%;
	height: 250px;
	/* border: 10px solid #F9E79F; */
	box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	border-radius: 1em;
	cursor: pointer;
}
.history_index .left{
	width: 650px;
	display: flex;
}
img{
	width: 130px;
	height: 220px;
	padding: 30px 0;
}
.writer{
	padding:30px 0;
	margin: 0 50px;
	font-size: 20px;
}
.work{
	padding: 50px 0;
	text-align: center;
	font-weight: 800;
}
.rigth{
	text-align: center;
	font-size: 20px;
	padding: 100px 0;
}
</style>
