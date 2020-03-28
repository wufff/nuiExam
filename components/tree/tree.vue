<template>
	<downWrap :visable="visable"  @hide="show" paddTop="47">
		<view v-for="(item,index)  in treeData" :key='index'>
			<view class="treeItem" @tap="selectItem(item.name,item.search_node)">
				<view class="img-tree">
					<view class="iconfont" v-show="!item.open" v-if="item.children" @tap.stop="open(index)">&#xe6e9;</view>
					<view class="iconfont" v-show="item.open" v-if="item.children" @tap.stop="close(index)">&#xe72d;</view>
				</view>
				{{item.name}}
				<view class="right-icon iconfont">&#xe607;</view>
			</view>
			<view v-for="(item2,index2) in item.children" v-show="item.open" :key="index2"> 
				<view class="treeItem2" @tap="selectItem(item2.name,item2.search_node)">
					<view class="img-tree">
						<view class="icon iconfont" v-show="!item2.open" v-if="item2.children" @tap.stop="open(index,index2)">&#xe6e9;</view>
						<view class="icon iconfont" v-show="item2.open" v-if="item2.children" @tap.stop="close(index,index2)">&#xe72d;</view>
					</view>
					{{item2.name}}
					<view class="right-icon iconfont">&#xe607;</view>
				</view>
				<view v-for="(item3,index3) in item2.children" :key="index3" v-show="item2.open">
					<view class="treeItem3" @tap="selectItem(item3.name,item3.search_node)">
						<view class="img-tree"></view>
						{{item3.name}}
						<view class="right-icon iconfont">&#xe607;</view>
					</view>
				</view>
			</view>
		</view>
	</downWrap>
</template>
<script>
	import downWrap from "../downWrap.vue";
	export default {
		components: {
			downWrap
		},
	    props:{
			treeDatab:{
				type:Array,
				default:()=> [{id:"",name:"全部"},{id:1489,name: "数词",node_fid: 1467,open: false,children:[{id:1,name:"子一"},{id:1,name:"子二"}]}]
			}
		},
		computed:{
			treeData(){
				return this.treeDatab;
			}
		},
		data() {
			return {
				visable: false
				// ,treeData:
			};
		},
		methods: {
			show(a) {
				this.visable = !this.visable;
				if(a=="mask"){
					this.$emit("hideSelect")
				}
			},
			open(index, index2) {
				if (index2 || index2 == 0) {
					this.treeData[index].children[index2].open = true;
				} else {
					this.treeData[index].open = true;
				}
			},
			close(index, index2) {
				if (index2 || index2 == 0) {
					this.treeData[index].children[index2].open = false;
				} else {
					this.treeData[index].open = false;
					
				}
			},
			selectItem(name, id) {
				this.$emit('choice',{name:name,id:id})
			}
		}
	}
</script>
<style lang="scss">
	.ld{
		font-family: "iconfont" !important;
		font-size: 28rpx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
	}
	.treeItem,
	.treeItem2,
	.treeItem3 {
		font-size: 34rpx;
		height: 84rpx;
		line-height: 84rpx;
		color: #474747;
		display: flex;
		position: relative;
		@include textover 
		.img-tree {
			margin-right: 10rpx;
			.iconfont {
				font-size: 32rpx;
			}
		}
		.right-icon {
			 font-size: 30rpx;
			 position: absolute;
			 right: 30rpx;
			 top:4rpx;
		}
	}
	
	.treeItem2 {
		padding-left: 60rpx;
	}
	.treeItem3 {
		padding-left: 140rpx;
	}
</style>
