<template>

	<div class="footer">
			<div class="wrapper">
				<div class="service">
					<ul>
						<li>
							<h5></h5>
							<p>鼎力支持</p>
						</li>
						<li>
							<h5></h5>
							<p>准时上线</p>
						</li>
						<li>
							<h5></h5>
							<p>品质保障</p>
						</li>
						<li>
							<h5></h5>
							<p>反复观看</p>
						</li>
					</ul>
				</div>
				<div class="help">
					<div class="left">
						<dl>
							<dt>阅读指南</dt>
							<dd><a href="#">阅读流程</a></dd>
							<dd><a href="#">观看顺序</a></dd>
							<dd><a href="#">阅读规则</a></dd>
						</dl>
						<dl>
							<dt>更新疑问</dt>
							<dd><a href="#">更新时间</a></dd>
							<dd><a href="#">作者安排</a></dd>
							<dd><a href="#">上架新书</a></dd>
						</dl>
						<dl>
							<dt>关于我们</dt>
							<dd><a href="#">平台规则</a></dd>
							<dd><a href="#">联系我们</a></dd>
							<dd><a href="#">问题反馈</a></dd>
						</dl>
						<dl>
							<dt>新书推荐</dt>
							<dd><a href="#">推荐小说</a></dd>
							<dd><a href="#">推荐经典</a></dd>
							<dd><a href="#">推荐音频</a></dd>
						</dl>
						<dl>
							<dt>服务热线</dt>
							<dd>
								<a href="#">
									在线客服
									<span class="iconfont icon-customer-service"></span>
								</a>
							</dd>
							<dd><a href="#">客服电话 18975051169</a></dd>
							<dd><a href="#">工作时间 周一至周日 8:00-18:00</a></dd>
						</dl>
					</div>
					<div class="right">
						<div class="pic" id="p1">
							<h1><a href="#">hhhhhhhhhh</a></h1>
							<p>制作人：后端</p>
						</div>
						<div class="pic" id="p2">
							<h1><a href="#">hhhhhhhhhh</a></h1>
							<p>制作人：前端</p>
						</div>
					</div>
				</div>
				<div class="copyright">
					<p>
						<a href="#">关于我们</a>|
						<a href="#">帮助中心</a>|
						<a href="#">阅读服务</a>|
						<a href="#">设计与推荐</a>|
						<a href="#">商务合作</a>|
						<a href="#">搜索推荐</a>|
						<a href="#">友情链接</a>
					</p>
					<p>serenityBook © 静谧藏书阁</p>
				</div>
			</div>
		</div>

</template>

<script>
export default {
  name: 'footIndex'
}
</script>

<style>
.footer{
	margin: 0 auto;
	height: 650px;
	background-color: #e0e0e0;
}
/* 服务中心 */
.service{
	padding:60px 0;
	height: 178px;
}
.service ul{
	display: flex;
	justify-content: space-evenly;
}
.service li{
	display: flex;
	width: 190px;
	height: 58px;
}
.service li h5{
	margin-right: 20px;
	width: 58px;
	height: 58px;
	background-image: url(@/assets/首页/sprite.png);
}
.service li:nth-child(2) h5{
	background-position:0 -58px;
}
.service li:nth-child(3) h5{
	background-position:0 -116px;
}
.service li:nth-child(4) h5{
	background-position:0 -174px;
}
.service li p{
	font-size: 28px;
	line-height: 58px;
}

/* 帮助中心 */
.help{
	display: flex;
	justify-content: space-between;
	padding-top: 40px;
	height: 300px;
}
.left{
	display: flex;
}
.left dl{
	margin-right: 84px;
}
.left dl :last-child{
	margin-right: 0px;
}
.left dt{
	margin-bottom: 30px;
	font-size: 18px;
}
.left dd{
	margin-bottom: 10px;

}
.left dd a{
	color: #878787;
}
.left .iconfont{
	color: #30c023;
}

.right{
	display: flex;
}
.right .pic{
	width: 120px;
	height: 120px;
}
#p1{
	margin-right: 45px;
}
#p1 a{
	background-image: url(@/assets/首页/wechat.png);
	background-size: contain;
	cursor: default;
}
#p2 a{
	background-image: url(@/assets/首页/app.png);
	background-size: contain;
	cursor: default;
}
.pic a{
	font-size: 0;
	display: block;
	width: 120px;
	height: 120px;
}
.right p{
	text-align: center;
	color: #878787;
}

/* 版权中心 */
.copyright{
	text-align: center;
}
.copyright p{
	margin-bottom: 10px;
	color: #878787;
}
.copyright p a{
	margin: 0 10px;
	color: #878787;
}
</style>
