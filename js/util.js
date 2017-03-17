function Util(){

}

Util.prototype.turnToArray = function(value){

	value = value || [];

	var singleVal = false;

	if(!angular.isArray(value)){
		value = [value];
		singleVal = true;
	}

	return {
		arr: value,
		notArr: singleVal
	}

}

Util.prototype.isIn = function(single, group){
	if(angular.isArray(group)){
		var index = group.indexOf(single);
		if(index < 0){
			return false;
		}else{
			return true;
		}
	}else if(angular.isObject(group)){
		for (var key in group){
			if(single == group[key]){
				return true;
			}
		}
		return false;
	}
	return false;
}



