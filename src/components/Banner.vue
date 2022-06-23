<template>
	<div class="top-banner clearfix">
		<div class="site-category"
			@mouseleave="evtSideLeave">
			<div class="top-side-left">
				<ul class="side-left">
					<li class="side-item"
						@mouseenter="evtSideEnter(item.type)"
						v-for="item in sideItems" :key="item">
						{{item.content}}
					</li>
				</ul>
			</div>
			<div class="site-category-detail"
				v-show="goodsStatus">
				<ul class="category-items" v-for="goods in filterCurrGoods" :key="goods">
					<li class="category-goods" v-for="item in goods" :key="item.sourceUrl">
						<a class="goods-link" :href="item.sourceUrl">
							<img :src="item.imgUrl" alt="" />
							<div class="text-name">
								{{item.name}}
							</div>
						</a>
						<a class="goods-buy-link"
							v-show="item.buyStatus"
							:href="item.buyUrl">
								选购
						</a>
					</li>
				</ul>
			</div>
		</div>
		<slide></slide>
		
	</div>
</template>

<script>
import slide from '../common/slide'
export default {
	data () {
		return {
			currGoods: [],
			goodsStatus: false,
			sideItems: [
				{type: 'phones', content: '手机 电话卡'},
				{type: 'computer', content: '笔记本 平板'},
				{type: 'box', content: '电视 盒子'},
				{type: 'router', content: '路由器 智能硬件'},
				{type: 'power', content: '移动电源 电池 插线板'},
				{type: 'headset', content: '耳机 音响'},
				{type: 'foil', content: '保护套 贴膜'},
				{type: 'line', content: '线材 支架 存储卡'},
				{type: 'bags', content: '箱包 服饰'},
				{type: 'rabbit', content: '兔米 生活周边'}],
			rabbit: [
				{sourceUrl: 'http://mitu.mi.com/', imgUrl: 'http://c1.mifile.cn/f/i/g/2015/cn-index/mitu-80.jpg?width=40&height=40', name: '米兔玩偶', buyStatus: false},
				{sourceUrl: '//list.mi.com/59', imgUrl: 'http://c1.mifile.cn/f/i/g/2015/cn-index/shubiaodian-80.jpg?width=40&height=40', name: '鼠标垫', buyStatus: false},
				{sourceUrl: '//list.mi.com/24', imgUrl: 'http://c1.mifile.cn/f/i/15/goods/sidebar/zhoubian1.jpg?width=40&height=40', name: '生活周边', buyStatus: false},
				{sourceUrl: '//www.mi.com/zazhi/index.html', imgUrl: 'http://c1.mifile.cn/f/i/g/2015/cn-index/zazhi-80-80.jpg?width=40&height=40', name: '《小米》杂志', buyStatus: false}
			]

		}
	},
	ready () {
	},
	computed: {
		filterCurrGoods: function () {
			let filterGoods = [[], [], [], [], []]
			this.currGoods.forEach(function (item, index) {
				let goodsIndex = Math.floor(index / 6)
				filterGoods[goodsIndex].push(item)
			})
			return filterGoods
		}
	},
	methods: {
		evtSideEnter (currType) {
			this.currGoods = this[currType]
			this.goodsStatus = true
		},
		evtSideLeave () {
			this.goodsStatus = false
		}
	},
	components: {
		slide
	}
 }
</script>

<style lang="scss" scoped>
.top-banner {
	position: relative;
	width: 1226px;
	height: auto;
	margin: 0 auto;
}
.site-category {
	position: absolute;
	left: 0;
	top: 0;
	width: 235px;
	height: auto;
	padding: 20px 0;
	background: rgba(0, 0, 0, 0.3);
	z-index: 10;
}

.side-left {
	margin: 0;
	padding: 0;
	width: 235px;
	height: 420px;
	list-style: none;
	.side-item {
		width: 100%;
		height: 42px;
		line-height: 42px;
		font-size: 14px;
		color: #fff;
		text-align: center;
		cursor: pointer;
		&:hover {
			background: #ff6700;
		}
	}
}

.site-category-detail {
	position: absolute;
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	left: 235px;
	top: 0;
	z-index: 10;
	border: 1px solid #e0e0e0;
	box-shadow: 3px 8px 16px rgba(0,0,0,0.18);
	.category-items {
		width: auto;
		height: 460px;
		margin: 0;
		padding: 0;
		list-style: none;
		background: #fff;
	}
	.category-goods {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		width: 265px;
		height: 76.6px;
		padding: 0 20px 0 20px;
		box-sizing: border-box;
		background: #fff;
		cursor: pointer;
		.goods-link {
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
			width: 170px;
		}
		.text-name {
			padding-left: 10px;
			font-size: 14px;
		}
		.goods-buy-link {
			display: block;
			width: 58px;
			height: 22px;
			line-height: 24px;
			font-size: 12px;
			text-align: center;
			color: #ff6700;
			border: 1px solid #ff6700;
			&:hover {
				color: #fff;
				background: #ff6700;
			}
		}
	}
}
</style>
