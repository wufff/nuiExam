<template>
	<view class="selectTitle" v-show="showSelect">
	    <view class="select-item"
		 v-for="(item,index) in listData" 
		 :key="index"
		 @tap.stop="showDownlist(index)"
		 >
			 {{item.name}}
			 <view class="icon iconfont" v-show="!item.open">&#xe69b;</view>
			 <view class="icon iconfont"  v-show="item.open">&#xe629;</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			listData:{
				 type:Array,
				 default:()=>[{name:"全部题型",id:"",open:false},{name:"全部难度",id:"",open:false},{name:"全部年级",id:"",open:false}]
			},
			showSelect:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			 showDownlist(index){
				 this.$emit("showDownlist",index)
			 }
		}
	}
</script>

<style lang="scss">
   .selectTitle {
	   position: fixed;
	   left: 0;
	   right: 0;
	   top: 44px;
	   background-color: #FFFFFF;
	   display: flex;
	   border-bottom: 1px solid #f1f1f1;
	   .select-item {
		    height:80rpx;
			text-align: center;
			line-height: 80rpx;
			flex:1;
			display: flex;
			justify-content: center;
			.icon {
				 margin-left: 6rpx;
				 color: #000;
			}
	   }
   }
      
</style>
