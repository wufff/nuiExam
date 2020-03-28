<template>
	 <downWrap :visable ="visable" @hide="show" paddTop="47">
		      <view class="item-row" v-for="(item,index) in listData" :key="index">
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
	 </downWrap>
</template>
<script>
	import  downWrap  from "../downWrap.vue";
	export default {
		components:{
			 downWrap
		},
		props:{
			 listData:{
                 type:Array,
				  default:()=>[1,2,3]
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
	.item-row {
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
</style>
