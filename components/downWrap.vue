<template>
	 <view class="selecBox" v-show="visable" :style="{ paddingTop: paddTop + 'px' }" @tap="hide">
		 <view class="wrap-content animated" :class="{fadeInUpMin:visable}" @tap.stop>
			 <!-- <scroll-view scroll-y="true" class="scroll"> -->
			     <slot></slot>
		     <!-- </scroll-view> 	 -->
		 </view>
	 </view>
</template>
<script>
	export default {
		props:{
			 paddTop:{
                  type:String,
				  default:"44"
			 },
			visable:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				 
			}
		},
		created(){
			
		},
		methods:{
			hide(){
				this.$emit("hide","mask")
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
		  .wrap-content{
			  background-color: #FFFFFF;
			  width: 100%;
			  padding:0 0 0 30rpx;
			  max-height: 100%;
			  overflow-y: auto;
			  overflow-x: hidden;
			  .scroll {
				  height: 100%;
			  }
			  
		  }
	} 
</style>
