import qs from "qs";
const BASE_URL = "https://tpaper.dodoedu.com/";
export const myRequest = (options)=> {
	  if(!options.text){
		   uni.showLoading({title: '加载中'});
	  }else{
		  uni.showLoading({title:options.text});
	  }
	  const requestData = formatParams(options.data);
	  return new Promise((resolve,reject)=>{
		   uni.request({
			   url:BASE_URL + options.url,
			   header:{'Content-Type': 'application/x-www-form-urlencoded'},
			   method:options.method || 'GET',
			   data:requestData,
			   success:(res) => {
				   uni.hideLoading();
				   const {type,data,message} = res.data;
				   if(type == "error"){
					  return uni.showToast({
						  icon:'none',
						  title:message
					  })
				   }
				   if(type == "success"){
				   		resolve(message)
				   }
			   },
			   fail:(err)=>{
				    uni.showToast({
						icon:'none',
						title:'请求接口失败'
					})
					reject(err)
			   }
		   })
	  })
}

function formatParams(params) {
	const token = uni.getStorageSync("token") ? uni.getStorageSync("token") : "";
	if (!params) {
	const params = {
			token: token
		}
	} else {
		params.token = token;
	}
	return qs.stringify({param: params})
}
