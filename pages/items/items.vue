<template>
	<view class="content">
		<header-filter @showlist="showTree">
			<view class="header-text">知识点： {{kownValue.name}}</view>
		</header-filter>
		<select-box @showDownlist="showDownlist" 
		:listData="selectValue" 
		:showSelect="showSelect"
		></select-box>
		<downlist-vertical ref="downfilter" 
		:listData="currentDownList" 
		:value="currentDownListValue"
		@seclecItem ="seclecItem"
		@formatArrow = 'fArrow'
		></downlist-vertical>
		<tree ref="tree" 
		 @choice="choiceKnowList"
         @hideSelect = "hideSelect"
		 :treeDatab="treeData"
		 ></tree>
		<view class="space-global"></view>
		<view class="listWrap">
			<item-list ref="itemlist" 
			:dataList="listData"
			rurl="Commonajax/searchQtrunk"
			:rdata = "rdata"
			></item-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headData:[],
				dowlistMain:[],
				curentDownlist:0,
				selectValue:[{name:"全部题型",id:"",open:false},{name:"全部难度",id:"",open:false},{name:"全部年级",id:"",open:false}],
				kownValue:{name:"全部",id:""},
				showSelect:true,
				treeData:[],
				listData:[],
			};
		},
		onShow() {
			this.headData = uni.getStorageSync("sub");
			this.getDonwList();
			this.$nextTick(() => {
			     this.$refs.itemlist.render();
			})
		},
		onReachBottom(){
			this.$refs.itemlist.reach();
		},
		computed:{
			currentDownList(){
				return this.dowlistMain[this.curentDownlist];
			},
			
			currentDownListValue(){
				return {
					id:this.selectValue[this.curentDownlist].id,
					index:this.curentDownlist
				}
			},
			rdata(){
				return {
					qtp_code: this.selectValue[0].id,
					diff: this.selectValue[1].id,
					grade_code: this.selectValue[2].id,
					know_node: this.kownValue.id,
					...this.headData
				}
			},
		},
		methods:{
			showTree(){
				this.$refs.tree.show();
				this.showSelect = ! this.showSelect;
				if(this.treeData.length < 1){
					this.getTreeData();
				}
			},
			showDownlist(index){
				if(this.curentDownlist == index){
					this.$refs.downfilter.show();
				    this.selectValue[index].open = !this.selectValue[index].open;
				}else{
					this.$refs.downfilter.show("open");
					this.curentDownlist = index;
					this.selectValue.forEach((item,i)=>{
						if(i == index ){
							this.selectValue[i].open = true;
						}else{
							this.selectValue[i].open = false;
						}
					})
				}
			},
			seclecItem(obj){
				this.$set(this.selectValue,obj.index,obj);
				this.$refs.downfilter.show();
				this.$nextTick(()=>{
				   this.$refs.itemlist.render();
				});
			},
			choiceKnowList(obj){
				this.showTree();
				this.kownValue = obj;
				this.$refs.itemlist.render();
			},
			fArrow(){
				this.selectValue.forEach((item,i)=>{
					this.selectValue[i].open = false;
				})
			},
			hideSelect(){
				this.showSelect = true;
			},
			formfilterData(data){
				const value = [];
			    var TempArry = [];
			    for (let x in data){
				  for (let y in data[x]){
					 TempArry.push({id:y,name:data[x][y]});     
				  }
				  if (x == "diff_list"){TempArry.unshift({id:"",name:"全部难度"})}
				  if (x == "grade_list"){TempArry.unshift({id:"",name:"全部年级"})}
				  if (x == "qtp_list"){TempArry.unshift({id:"",name:"全部题型"})}
				  value.push(TempArry);
				  TempArry = [];
			   }
			   return value;
			},
			async getDonwList(){
				const res = await this.$http({
					url:'Commonajax/getQtpDiffGrade',
					method:"post",
					data:this.headData
				})
			    this.dowlistMain = this.formfilterData(res);
			},
			async getTreeData(){
				const res = await this.$http({
					url:'Commonajax/knowList',
					method:"post",
					data:this.headData
				})
				res.unshift({id:"",name:"全部"});
			    this.treeData = res;
			}
		}
	}
</script>

<style lang="scss">
    .header-text {
	    font-size:17px;
		@include textover
	}
	.listWrap {
		 padding-top:80rpx;
		 
	}
	
</style>
