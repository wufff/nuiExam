<template>
	 <view class="selecBox" v-show="visable">
		 <view class="content animated" :class="{fadeInUpMin:visable}">
			 <scroll-view scroll-y="true" class="scroll">
			   <view class="item" v-for="(item,index) in listData" :key="index">
				  <view class="h5">
					  {{$ft.subText(index)}}
				  </view>
				  <view class="inner">
					   <view v-for="(item1,index1) in item" 
					       :class="{ active:item1.subject_code == current.subject_code && index == current.stage_code-1}" 
						    class="span"
						    @tap="choice(index,item1.subject_code,item1.subject_name)"
						   >
						   {{item1.subject_name}}
					   </view>
				  </view>
			  </view>
		     </scroll-view> 	
		 </view>
	 </view>
</template>
<script>
	export default {
		props:{
			 listData:{
                 type:Array,
				  default:()=>[]
			 },
			 current:{
				 type:Object,
				 default:{
					 stage_code:0,
					 subject_code:"",
					 subject_name:""
				 }
			 }
		},
		data() {
			return {
				visable:false
			};
		},
		created(){
			
		},
		methods:{
			 show(){
				 this.visable = ! this.visable;
			 },
			 choice(index,code,name){
				 var obj = {
					 stage_code:index+1,
					 subject_code:code,
					 subject_name: name
				 }
				 this.show();
				 this.$emit('choice',obj)
			 }
		}
	}
</script>
<style lang="scss">
	.selecBox {
	      width: 100%;
		  height: 100%;
		  position: fixed;
		  left: 0;
		  right: 0;
		  top: 0;
		  background-color: rgba(0,0,0,.5);
		  padding-top: 46px;
		  .content{
			  background-color: #FFFFFF;
			  width: 100%;
			  padding:0 0 0 30rpx;
			  height: 100%;
			  .scroll {
				  height: 100%;
			  }
			  .item {
			           .h5 {
			               height: 80rpx;
			               line-height:80rpx;
						   font-size: 30rpx;
			            }
			            .inner {
			               display: flex;
						   flex-wrap:wrap;
						   .span{
							   width: 156rpx;
							   height: 66rpx;
							   font-size:28rpx;
							   text-align: center;
							   background-color: #f1f1f1;
							   line-height:66rpx;
							   margin-bottom: 20rpx;
							   margin-right: 24rpx;
							   &.active{
								   background-color: $uni-color-primary;
								   color:#FFFFFF;
							   }
						   }
			            }
			         }
		  }
	} 
</style>
