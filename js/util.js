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

Util.prototype.drawRadarChart = function(opt){

	if(window.chart){
		window.chart.destroy();
	}

	var data = {
    	labels: opt.labels,
	    datasets: [
	        {
	            label: opt.name,
	            backgroundColor: "rgba(255,75,100,0.2)",
	            borderColor: "rgba(255,75,100,.8)",
	            pointBackgroundColor: "rgba(255,75,100,.5)",
	            pointBorderColor: "#fff",
	            pointHoverBackgroundColor: "#fff",
	            pointHoverBorderColor: "rgba(255,75,100,.7)",
	            data: opt.data
	        }
	    ]
	};

	var options = {
    	legend: {
	        display: false
	    },
	    scale: {
			ticks: {
				beginAtZero: true,
				max: 100,
				stepSize: 60,
				display: false,
			}
		}
	};

	window.chart = new Chart(opt.ctx, {
	    type: 'radar',
	    data: data,
	    options: options
	});

}

