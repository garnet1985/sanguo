function Entity(entity){

	this.entity = [];

}

Entity.prototype.util = new Util();

Entity.prototype.target = function(data){
	this.entity = data;
	return this;
}

Entity.prototype.calculatePopulation = function(){

	this.entity.forEach(function(city){
		var factor = city.agriculture.current * .7 
		+ city.merchant.current * .2 
		+ city.morale * .2 
		+ city.disasterPrevention * .1;
		city.population = Math.round(factor) * 10000;
	});
	return this;
}

Entity.prototype.calculateMorale = function(){

	this.entity.forEach(function(city){
		if(city.tax == 10){
			city.morale = 0;
		}else{
			var top = city.agriculture.current + city.merchant.current + (10 - city.tax) * 50 + city.disasterPrevention;
			var bottom = city.agriculture.max + city.merchant.max + 50 * 10 + gameData.gameConstant.maxDisasterPrevention;
			city.morale = Math.round(top / bottom * 100);
		}
	});
	return this;
}

Entity.prototype.calculateCityScale = function(){

	this.entity.forEach(function(city){
		city.isLargeCity = false;
		if(city.agriculture.max >= 100){
			city.isLargeCity = true;
		}
		if(city.merchant.max >= 100){
			city.isLargeCity = true;
		}
	});
	return this;
}

Entity.prototype.calculateLevel = function(){

	this.entity.forEach(function(person){
		person.level = Math.ceil(person.exp/gameData.gameConstant.expThreshold);
		if(person.level == 0){
			person.level++;
		}
	});
	return this;
}

Entity.prototype.calculateStatistics = function(){

	var tmp = this.util.turnToArray(this.entity);

	tmp.arr.forEach(function(kingdom){
		kingdom.statistics = {}
		kingdom.statistics.total = {}
		kingdom.statistics.total.cities = kingdom.cities.length;
		kingdom.statistics.total.generals = 0;
		kingdom.statistics.total.money = 0;
		kingdom.statistics.total.food = 0;
		kingdom.statistics.total.soliders = 0;
		kingdom.statistics.total.population = 0;
		if(kingdom.statistics.total.cities){
			kingdom.cities.forEach(function(city){
				kingdom.statistics.total.generals += city.generals.length;
				kingdom.statistics.total.money += city.money;
				kingdom.statistics.total.food += city.food;
				kingdom.statistics.total.soliders += city.solider;
				kingdom.statistics.total.population += city.population;
			});
		}
	});

	if(tmp.notArr){
		this.entity = tmp.arr.pop();
	}else{
		this.entity = tmp.arr;
	}

	return this;
}

Entity.prototype.calculateCommands = function(){

	this.entity.forEach(function(kingdom){
		var cityNumber = kingdom.cities.length;
		if(cityNumber == 1){
			kingdom.command = 2;
		}else if(cityNumber == 2){
			kingdom.command = 3;
		}else if(cityNumber == 3){
			kingdom.command = 4;
		}else if(cityNumber <= 5){
			kingdom.command = 5;
		}else if(cityNumber <= 7){
			kingdom.command = 7;
		}else if(cityNumber <= 9){
			kingdom.command = 8;
		}else if(cityNumber <= 13){
			kingdom.command = 9;
		}else if(cityNumber <= 18){
			kingdom.command = 10;
		}else if(cityNumber <= 24){
			kingdom.command = 11;
		}else if(cityNumber <= 30){
			kingdom.command = 12;
		}else{
			kingdom.command = 13;
		}
	});

	return this;

}

Entity.prototype.autoRun = function(callback){

	if(callback){
		callback();
	}

	return this;
}

