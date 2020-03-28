export default {
	subText(num){
		 if(num == 0){ return "小学"}
		 if(num == 1){ return "初中"}
		 if(num == 2){ return "高中"}
	},
	getQ_Zh(str){
		if(str === "QTP_OBJ_003") {return "单选题"}
	    if(str === "QTP_OBJ_004") {return "多选题"}
	    if(str === "QTP_OBJ_006") {return "判断题"}
	    if(str === "QTP_OBJ_007") {return "填空题"}
	    if(str === "QTP_SUB_006") {return "简答题"}
	},
	ABC_Zh(num){
	        if(num === 0) {return "A"}
	        if(num === 1) {return "B"}
	        if(num === 2) {return "C"}
	        if(num === 3) {return "D"}
    }
}