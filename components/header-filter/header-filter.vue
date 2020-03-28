<template>
	<view class="header-index">
	    <view class="icon iconfont classify" @tap="showlist">&#xe611;</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			 showlist(){
				 this.$emit('showlist')
			 }
		}
	}
</script>

<style lang="scss">
    .header-index {
    	   position: fixed;
    	   left:0;
    	   right: 0;
    	   height:44px;
    	   display: flex;
    	   align-items: center;
    	   background-color: $uni-color-primary;
    	   color:#FFFFFF;
    	   padding: 0 15px;
    	   font-size: 16px;
    	   .classify {
    		    font-size: 17px;
    			margin-right: 10px;
    	   }
      }
</style>
