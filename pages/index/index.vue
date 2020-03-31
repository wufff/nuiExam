<template>
	<view class="content">
		<header-filter @showlist="showSubList">
			<view class="header-text">{{$ft.subText(headData.stage_code-1)}}</view>
			<view class="header-text space-header" v-if="headData.subject_name">.</view>
			<view class="header-text">{{headData.subject_name}}</view>
		</header-filter>
		<downlist-row 
		     :listData="subData" 
			:current="headData" 
			ref="subList"
			@choice="choiceSub"
			></downlist-row>
		<view class="space-global"></view>
		<view class="vip-title">开通VIP享更多会员特效</view>
		<view class="nav-index">
			 <view class="nav-item" @tap="goItems">
				 <image  src="../../static/img/bases.png"></image>
				 <view class="nav-text">知识点选题</view>
			</view>
			 <view class="nav-item" url="/pages/items/items" open-type="switchTab">
				 <image src="../../static/img/selects.png" ></image>
				 <view class="nav-text">试卷下载</view>
			 </view>
			 <view class="nav-item">
				 <image src="../../static/img/wrongs.png"></image>
			     <view class="nav-text">错题本</view>
			 </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				subData:[],
				headData:{}
			}
		},
		onLoad() {
			this.getSub();
		},
		onShow(){
			getApp().globalData.itemsOpen = false
		},
		methods: {
			showSubList(){
				this.$refs.subList.show();
			},
			choiceSub(obj){
				this.headData = obj;
				uni.setStorageSync("sub",this.headData);
			},
			goItems(){
				getApp().globalData.itemsOpen = true;
				uni.switchTab({url:"/pages/items/items"})
			},
            async getData(){
				const res = await this.$http({
					url:'Qtrunk/skepCount',
					method:"post"
				})
			},
			async getPaperList(){
				const res = await this.$http({
					url:'/Index/pagePaperList',
					method:"post",
					data:this.headData
				})
			},
			
			async getSub(){
			 	const res = await this.$http({
			 		url:'/Commonajax/subjectList',
			 		method:"post"
			 	})
			 	let data = res;
				for(let k in data) {
					this.subData.push(data[k]);
			    } 
				const subStore = uni.getStorageSync("sub");
				const num = uni.getStorageSync("num");
				if(subStore){
					this.headData = subStore;
				}else{
					 this.headData = {
						 stage_code:2,
						 subject_code: this.subData[0][0].subject_code,
						 subject_name: this.subData[0][0].subject_name
					 }
					 uni.setStorageSync("sub",this.headData);
				}
				if(!num){
					uni.setStorageSync("num",0)
				}
				this.getPaperList();
			 }     
		}
	}
</script>

<style lang="scss">
  
    // slot
   .space-header {
        position: relative;
         top:-4px;
   }
   .header-text{
       margin-right: 4px;
   }
    // vip标题
   .vip-title {
	   background-color: #dcaf72;
	   font-size: 13px;
	   color: #7f5010;
	   padding: 6px 15px;
   }
   // 三个图
   .nav-index {
	   width: 100%;
	   height:252rpx;
	   display: flex;
	   align-items: center;
	   background-color: #FFFFFF;
	   padding: 0 15rpx;
	   .nav-item {
		    text-align: center;
			flex: 1;
			image {
				height: 74rpx;
				width: 74rpx;
				margin-bottom: 10rpx;
			}
			.nav-text{
				font-size: 28rpx;
			}
	   }
   }
</style>
