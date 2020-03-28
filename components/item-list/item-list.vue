<template>
	<view class="item-viewst">
		<view v-show="num < 1" class="noneData">当前筛选没题 --!</view>
		<view class="test" v-for="(item,index) in dataList" :key="index">
			<view class="top" @tap="showDtail(item.master_code_crc32)">
				<view class="title" v-html="item.context"> </view>
				<view class="aswerbox" v-if="$ft.getQ_Zh(item.qtp_code) == '单选题' || $ft.getQ_Zh(item.qtp_code) == '多选题'">
					<view v-for="(item2,index2) in item.option" :key="index2">
						<view>{{$ft.ABC_Zh(index2)}}.</view>
						<rich-text :nodes="item2"></rich-text>
					</view>
				</view>
				<view class="aswerbox" v-if="$ft.getQ_Zh(item.qtp_code) == '判断题'">
					<view>
						对
					</view>
					<view>
						错
					</view>
				</view>
			</view>
			<view class="bottom">
				<view class="type">{{$ft.getQ_Zh(item.qtp_code)}}</view>
				<view>使用 {{item["usage_count"]}} 次</view>
				<view class="addItemBt" v-on:tap.stop="addNum_num({qtp_code:item.qtp_code,master_code:item.master_code,index:index},$event)"
				 v-show="item.is_add_qtrunk === 1">
					+ 试题篮
				</view>
				<view class="addItemBt_y" v-show="item.is_add_qtrunk === 0" @tap.stop="deletItem({qtp_code:item.qtp_code,master_code:item.master_code,index:index})">
					已添加
				</view>
			</view>
		</view>
		<view v-show="is_bottom" class="is_bottom">没有更多数据了</view>
	</view>
</template>
<script>
	export default {
		props: ['rurl', "rdata","itemsShow"],
		data() {
			return {
				dataList: [],
				num:1,
				page:1,
				totlePage:100,
				is_bottom:false,
				text:{
					noneData:""
				}
			};
		},
		mounted(){
			
		},
		methods: {
			addNum_num(obj,event) {
               this.dataList[obj.index].is_add_qtrunk = 0;
			   let num = uni.getStorageSync("num");
			   num ++;
			   uni.setStorageSync('num',num)
			   uni.setTabBarBadge({
			     index: 2,
			     text: String(num)
			   })
			},
			deletItem(obj) {
               this.dataList[obj.index].is_add_qtrunk = 1;
			   let num = uni.getStorageSync("num");
			   num --;
			   uni.setStorageSync('num',num)
			   if(num > 0){
				   uni.setTabBarBadge({
				     index: 2,
				     text: String(num)
				   })
			   }else{
				   uni.uni.removeTabBarBadge({
					   index:2
				   })
			   }
			},
			showDtail() {

			},
			async render() {
			   this.is_bottom = false;
			   uni.pageScrollTo({
			      scrollTop: 0,
			   	  duration:0
			   });
			   const data = {
			   	page: 1,
			   	...this.rdata
			   }
			   const res = await this.$http({
			   	url: this.rurl,
			   	method: "post",
			   	data: data
			   });
			   // console.log(res);
			   this.dataList = res.data;
			   this.num = this.dataList.length;
			   this.totlePage = res.total_page;
			   this.page = 2;
			   if(this.totlePage == 1 ){
				   this.is_bottom = true;
			   }
			},
			async reach() {
				// console.log("触底")
			   if(this.page > this.totlePage ){
				  this.is_bottom = true;
			    }else{
					const data = {
						page: this.page,
						...this.rdata
					}
					const res = await this.$http({
						url: this.rurl,
						method: "post",
						data: data,
						text:"加载下一页"
					});
					this.dataList.push(...res.data);
					this.page ++;
				}
				
			}
		}
	}
</script>
<style lang="scss">
	.noneData {
	   padding-top: 200rpx;
	   text-align: center;
	   color:#999999;
	   font-size: 32rpx;
	}
	.test {
		padding: 32rpx;
		margin-top: 20rpx;
		background-color: #fff;

		.add-img {
			width: 22rpx;
			height: 22rpx;
		}

		.add-img_y {
			width: 22rpx;
			height: 18rpx;
			margin-right: 6rpx;
		}

		.title {
			margin-bottom: 36rpx;
			position: relative;

			.sort {
				position: absolute;
			}
		}
    
		.aswerbox {
			padding-left: 24rpx;

			.sort {
				position: absolute;
				left: 4rpx;
			}

			.option {
				padding-left: 40rpx;
				display: block;
			}

			margin-bottom: 60rpx;
		}

		.bottom {
			padding-left: 30rpx;
			color: #919191;
			position: relative;
			display: flex;

			.type {
				margin-right: 40rpx;
			}

			.addItemBt {
				position: absolute;
				right: 0;
				bottom: -14rpx;
				border: 1px solid #919191;
				border-radius: 2px;
				padding: 12rpx 18rpx;
			}

			.addItemBt_y {
				position: absolute;
				right: 0;
				bottom: -14rpx;
				background-color: #37aafd;
				color: #fff;
				border-radius: 4rpx;
				padding: 12rpx 18rpx;
			}
		}
	}
	
</style>
