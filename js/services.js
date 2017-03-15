game.service('game', ['cache', 'core', 'cfg', function(cache, core, cfg){

	var _this = this;

	this.loadSavedGame = function(index){
		return localStorage.sangoGameData.savedData[index];
	}

	this.newGame = function(){
		_this.buildGameData();
		return cache.buildData;
	}

	this.buildGameData = function(){
		cache.buildData.people = core.calc('level', cache.buildData.people);
		cache.markLord();
		cache.buildPerson();
		cache.buildCity();
		cache.buildKingdom();
		cache.buildData.cities = core.calc('population', cache.buildData.cities);
		cache.buildData.cities = core.calc('morale', cache.buildData.cities);
		cache.buildData.cities = core.calc('cityScale', cache.buildData.cities);
		cache.buildData.date = angular.copy(cfg.gameStartDate);
	}

}]);

game.service('cache', ['data', 'service', function(data, service){

	var _this = this;

	this.buildData = angular.copy(data);

	this.loadEntity = function(entityName, id, fromRawData, callback){

		var res = {};

		if(!entityName){
			throw new Error('Entity Name is not defined when calling function loadEntity');
		}

		if(fromRawData){
			data[entityName].forEach(function(element){
				if(id == element.id){
					res = element;
				}
			});
		}else{
			_this.buildData[entityName].forEach(function(element){
				if(id == element.id){
					res = element;
				}
			});
		}

		if(callback){
			callback(res);
		}

		return res;
	}

	this.load = function(entityType, id, fromRawData, callback){

		var tmp = service.turnToArray(id);

		id = tmp.arr;

		var result = [];

		id.forEach(function(element){
			result.push(_this.loadEntity(entityType, element, fromRawData));
		});

		if(tmp.notArr){
			result = result.pop();
		}

		if(callback){
			callback(result);
		}

		return result;

	}

	this.buildPerson = function(){
		_this.buildData.people.forEach(function(person){
			person.decisionPreference = _this.load('decisions', person.decisionPreference, true);
			person.personality = _this.load('personalities', person.personality, true);
			person.armor = _this.load('armors', person.armor, true);
			person.weapon = _this.load('weapons', person.weapon, true);
			person.loyalTo = _this.load('people', person.loyalTo, true);
			person.army = _this.load('armies', person.army, true);
			if(person.isLord){
				person.title = _this.load('titles', 0, true);
			}else{
				person.title = _this.load('titles', person.level, true);
			}
		});
	}

	this.buildCity = function(){
		_this.buildData.cities.forEach(function(city){
			city.counsellor = _this.load('people', city.counsellor);
			city.generals = _this.load('people', city.generals);
			city.isActive = false;
		});
	}

	this.buildKingdom = function(){
		_this.buildData.kingdoms.forEach(function(kingdom){
			kingdom.ancestor = _this.load('people', kingdom.ancestor);
			kingdom.lord = _this.load('people', kingdom.lord);
			kingdom.cities = _this.load('cities', kingdom.cities);
		});
	}

	this.markLord = function(){
		_this.buildData.people.forEach(function(person){
			person.isLord = false;
			_this.buildData.kingdoms.forEach(function(kingdom){
				if(kingdom.lord == person.id){
					person.isLord = true;
				}
			});
		});
	}

}]);

game.service('service', [function(){

	this.turnToArray = function(value){

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

	this.isIn = function(single, group){
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

}]);

game.service('ui', [function(){

	this.inActiveAllCities = function(cities){
		cities.forEach(function(city){
			city.isActive = false;
		});
	}

}]);

game.service('msg', [function(){

	var _this = this;

	this.open = function(city){
		var pos = _this.decideMsgPos(city);
	}

	this.decideMsgDialogPosition = function(city){
		var pos = {
			x: "right",
			y: "bottom"
		}
		if(city.pos.x > 50){
			pos.x = "left";
		}
		if(city.pos.y > 50){
			pos.y = "top";
		}
		return pos.x + " " + pos.y;
	}

	this.openCityDialog = function(city){
		return {
			isBattle: -1,
			position: _this.decideMsgDialogPosition(city),
			data: city,
			body: "请您下令",
			operational: true
		}
	}

	this.notYourCity = function(city){
		return {
			isBattle: -1,
			position: _this.decideMsgDialogPosition(city),
			data: "",
			body: "对不起，" + city.name + "不是您的城池",
			operational: false
		}
	}

	this.openBattleDialog = function(){
		return {
			isBattle: 1,
			// position: _this.decideMsgDialogPosition(),
			data: null
		}
	}

}]);

game.service('core', ['cfg', 'service', 'ui', function(cfg, service, ui){
	
	this.calc = function(type, entities){

		var tmp = service.turnToArray(entities);

		var result = [];

		entities = tmp.arr;

		switch(type){
			case 'command':
				entities.forEach(function(kingdom){
					kingdom.command = 0;
					switch(kingdom.cities.length){
						case 1:
							kingdom.command = 3;
							break;
						case 1:
							kingdom.command = 4;
							break;
						case 1:
							kingdom.command = 5;
							break;
						case 1:
							kingdom.command = 6;
							break;
						case 1:
							kingdom.command = 7;
							break;
						case 1:
							kingdom.command = 8;
							break;
						case 1:
							kingdom.command = 9;
							break;
						case 1:
							kingdom.command = 10;
							break;
						case 1:
							kingdom.command = 11;
							break;
						case 1:
							kingdom.command = 12;
							break;
					}
					result.push(city);
				});
				break;
			case 'cityScale': 
				entities.forEach(function(city){
					city.isLargeCity = false;
					if(city.agriculture.max >= 100){
						city.isLargeCity = true;
					}
					if(city.merchant.max >= 100){
						city.isLargeCity = true;
					}
					result.push(city);
				});
				break;
			case 'level':
				entities.forEach(function(person){
					person.level = Math.ceil(person.exp/cfg.gameConstant.expThreshold);
					if(person.level == 0){
						person.level++;
					}
					result.push(person);
				});
				break;
			case 'morale':
				entities.forEach(function(city){
					if(city.tax == 10){
						city.morale = 0;
					}else{
						var top = city.agriculture.current + city.merchant.current + (10 - city.tax) * 50 + city.disasterPrevention;
						var bottom = city.agriculture.max + city.merchant.max + 50 * 10 + cfg.gameConstant.maxDisasterPrevention;
						city.morale = Math.round(top / bottom * 100);
					}
					result.push(city);
				});
				break;
			case 'population':
				entities.forEach(function(city){
					var factor = city.agriculture.current * .8 
					+ city.merchant.current * .3 
					+ city.morale * .2 
					+ city.disasterPrevention * .1;
					city.population = Math.round(factor) * 10000;
					result.push(city);
				});
				break;
			default:
				throw new Error("unknow entity type in calc function");
		}

		if(tmp.notArr){
			result = result.pop();
		}

		return result;

	}

	this.isMyCity = function(city, kingdom){
		return service.isIn(city, kingdom.cities);
	}

}]);