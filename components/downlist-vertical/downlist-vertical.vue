<template>
	<downWrap :visable="visable"  @hide="show" :paddTop="pageTop">
		<view class="item-list" 
		:class="{active:item.id == value.id}" 
		v-for="(item,index) in listData"
		:key= "index"
		@click="choice(item.id,item.name)"
		>
			{{item.name}}
		</view>
	</downWrap>
</template>
<script>
	import downWrap from "../downWrap.vue";
	export default {
		props:{
			listData:{
				type:Array,
				default:()=>["",""]
			},
			value:{
				type:Object,
				default:()=>{}
			}
		},
		components: {
			downWrap
		},
		data() {
			return {
               visable:false
			}
		},
		computed: {
			pageTop(){
				return String(uni.upx2px(80) + 47);
			}
		},
		methods: {
           show(a){
			  if(a == "open"){
				  this.visable = true
			  }else{
				 this.visable = ! this.visable;
			  }
			  if(!this.visable && a == "mask"){
				  this.$emit("formatArrow");
			  }	  
           },
		   choice(id,name){
			   const obj = {
				   id:id,
				   name:name,
				   index:this.value.index,
				   open:false
			   }
			   this.$emit("seclecItem",obj)
		   }
		}
	}
</script>
<style lang="scss">
	.item-list{
		height: 86rpx;
		line-height: 86rpx;
		@include textover
		&.active {
			color:$uni-color-primary;
		}
	}
</style>
