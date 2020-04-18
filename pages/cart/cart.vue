<template>
	<view>
		<HMfilterDropdown :filterData="filterData" :defaultSelected="filterDropdownValue" :updateMenuName="true" @confirm="confirm"></HMfilterDropdown>
		<view class="datajson">
			<view class="text">菜单数据index：</view>
			<view>
				<view class="index" v-for="(v,index) in indexArr" :key="index">
					<text class="item">{{index}}</text>:{{v|outData}}
				</view>
			</view>
			<view>
				<view class="text">菜单数据value：</view>
				<view class="value" v-for="(v,index) in valueArr" :key="index">
					<text class="item">{{index}}</text>:{{v|outData}}
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="product-list">
				<view class="product" v-for="(goods) in goodsList" :key="goods.goods_id">
					<image mode="widthFix" :src="goods.img"></image>
					<view class="name">{{goods.name}}</view>
					<view class="info">
						<view class="price">{{goods.price}}</view>
						<view class="slogan">{{goods.slogan}}</view>
					</view>
				</view>
			</view>
			<view class="loading-text">{{loadingText}}</view>
		</view>

	</view>
</template>

<script>
	import HMfilterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import data from '@/data/data-filter.js'; //筛选菜单数据
	export default {
		components: {
			'HMfilterDropdown': HMfilterDropdown
		},
		data() {
			return {
				indexArr: '',
				valueArr: '',
				//商品数据
				goodsList: [{
						goods_id: 0,
						img: '/static/img/goods/p1.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 1,
						img: '/static/img/goods/p2.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 2,
						img: '/static/img/goods/p3.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 3,
						img: '/static/img/goods/p4.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 4,
						img: '/static/img/goods/p5.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 5,
						img: '/static/img/goods/p6.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 6,
						img: '/static/img/goods/p7.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 7,
						img: '/static/img/goods/p8.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 8,
						img: '/static/img/goods/p9.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 9,
						img: '/static/img/goods/p10.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					}
				],
				loadingText: "正在加载...",
				filterDropdownValue: [],
				filterData: []
			};
		},
		filters: {
			outData(value) {
				return JSON.stringify(value);
			}
		},

		onLoad: function() {
			 this.filterData = data;
			// //定时器模拟ajax异步请求数据
			// setTimeout(() => {
			// 	//传入defaultSelected的结构不能错，错了就报错运行异常。 不想选中的项目请传入null
			// 	// 一下的注释是针对测试数据说明结构的意思，具体传入什么数据，要看你自己数据。
			
			//模拟ajax请求子菜单数据。
			
			setTimeout(() => {
				this.filterData[1].submenu[0].submenu = [{
					"name": "附近",
					"value": "附近"
				}, {
					"name": "1km",
					"value": "1km"
				}, {
					"name": "2km",
					"value": "2km"
				}, {
					"name": "3km",
					"value": "3km"
				}, {
					"name": "4km",
					"value": "4km"
				}, {
					"name": "5km",
					"value": "5km"
				}];
				
			}, 800);
			
			
		setTimeout(() => {
			this.filterDropdownValue = [
					[1, 1, 0], //第0个菜单选中 一级菜单的第1项，二级菜单的第1项，三级菜单的第3项
					[null, null], //第1个菜单选中 都不选中
					[1], //第2个菜单选中 一级菜单的第1项
					[
						[0],
						[1, 2, 7],
						[1, 0]
					], //筛选菜单选中 第一个筛选的第0项，第二个筛选的第1,2,7项，第三个筛选的第1,0项
					[
						[0],
						[1],
						[1]
					], //单选菜单选中 第一个筛选的第0项，第二个筛选的第1项，第三个筛选的第1项
				];
			
			}, 100);
		},
		
		methods: {
			//接收菜单结果
			confirm(e) {
				this.indexArr = e.index
				this.valueArr = e.value
			}
		}
	}
</script>
<style lang="scss">
	.datajson {
		z-index: 2;
		position: fixed;
		left: 0;
		right: 0;
		bottom: var(--window-bottom);
		height: 250px;
		padding: 0 10px;
		background-color: rgba(255, 255, 255, .8);
		backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(15px);
		font-size: 12px;
		.text {
			margin-top: 10px;
		}

		.item {
			width: 15px;
		}
	}

	.place {
		background-color: #ffffff;
		height: 44px;
	}

	.goods-list {
		padding-top: 10px;

		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 30px;
			color: #979797;
			font-size: 12px;
		}

		.product-list {
			width: 92%;
			padding: 0 4% 3vw 4%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.product {
				width: 48%;
				border-radius: 10px;
				background-color: #fff;
				margin: 0 0 7px 0;
				box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);

				image {
					width: 100%;
					border-radius: 10px 10px 0 0;
				}

				.name {
					width: 92%;
					padding: 5px 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 15px;
				}

				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 5px 4% 5px 4%;

					.price {
						color: #e65339;
						font-size: 15px;
						font-weight: 600;
					}

					.slogan {
						color: #807c87;
						font-size: 12px;
					}
				}
			}

		}
	}
</style>

