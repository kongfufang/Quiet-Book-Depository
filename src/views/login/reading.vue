<template>
  <div class="body">
		<h2>{{$route.query.title}}</h2>
		<br>
    <div v-for="(paragraph, index) in paragraphs" :key="index">
      <p>{{ paragraph }}</p>
    </div>
    <div class="container">
			<Menu :theme="theme3" active-name="1">
			<Menu-group title="文章管理">
					<Menu-item name="1"  >
							<Icon type="document-text" @click="drawer = true" ></Icon>
							<el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
								章节选择
              </el-button>
					</Menu-item>
					<Menu-item name="2">
							<Icon type="chatbubbles" ></Icon>
              <el-button  @click="goBack" type="primary" style="margin-left: 16px;">
								点击返回
              </el-button>

					</Menu-item>
			</Menu-group>

	</Menu>
      <!-- Your Menu component here -->
   </div>

    <!-- Your el-radio-group and el-drawer components here -->
    <el-radio-group v-model="direction">

    </el-radio-group>

    <el-drawer
      title="请选择您要观看的章节"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
      <span @click="changeNovel(1)">&nbsp; &nbsp;&nbsp;第一章节</span>
      <br>
      <span  @click="changeNovel(2)">&nbsp; &nbsp;&nbsp;第二章节</span>
      <br>
      <span>&nbsp; &nbsp;&nbsp;第三章节</span>
      <br>
      <span>&nbsp; &nbsp;&nbsp;第四章节</span>
      <br>
      <span>&nbsp; &nbsp;&nbsp;第五章节</span>
      <br>
      <span>&nbsp; &nbsp;&nbsp;第六章节</span>
      <br>
    </el-drawer>
  </div>
</template>

<script>
import { getNovelData } from '@/apis/novel'
import { Loading } from 'element-ui'
import { mapState } from 'vuex'
export default {
  name: 'readingIndex',
  data () {
    return {
      drawer: false,
      direction: 'rtl',
      paragraphs: [],
      title: '',
      id: ''
    }
  },
  async created () {
    this.id = this.$route.query.id
    await this.loadNovelData(this.id, 1)
    Loading.service()
    setTimeout(() => {
      Loading.service().close()
    }, 1000)
  },
  methods: {
    async loadNovelData (chapter, section) {
      if (this.token !== '') {
        const res = await getNovelData(chapter, section, this.token)
        this.paragraphs = res.split('\n').filter(paragraph => paragraph.trim() !== '')
      } else {
        const res = await getNovelData(chapter, section)
        this.paragraphs = res.split('\n').filter(paragraph => paragraph.trim() !== '')
      }
    },
    handleClose () {
      this.drawer = false
    },
    goBack () {
      window.history.go(-1)
    },
    async changeNovel (section) {
      const res = await getNovelData(this.id, section)
      console.log(section)
      this.paragraphs = res.split('\n').filter(paragraph => paragraph.trim() !== '')
    }
  },
  computed: {
    ...mapState('user', ['token'])
  }
}
</script>

<style scoped>
.body{
	font-size: 25px;
	margin: 0 auto;
	height: 100%;
	width: 980px;
	/* background: pink; */
}
/* 为el-drawer添加动态样式 */
.el-drawer__wrapper {
  animation: none !important;
}
.container {
	font-size: 15px;
	opacity: 0.75;
  position: fixed !important;
  right: 2% !important;
  top: 25% !important;
}
h2{
	font-size: 35px;
	color: #1C2833 ;
	border-bottom: #1C2833 solid 2px;
  text-align: center;
  border-radius: 30px
}
p{
	font-family: 'Georgia', sans-serif;
	text-indent: 45px;
	line-height: 45px;
}
.btn{
	padding:0 20px 0 0;
	background: #fff;
	cursor: pointer;
}
span{
  display: block;
  margin: 0 auto;
  padding: 10px 0;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;

}
</style>
