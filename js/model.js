function Model(){
	
	this.data = angular.copy(window.gameData);

}

Model.prototype.util = new Util();

Model.prototype.loadEntity = function(entityName, id, fromRawData, callback){

	var _this = this;

	var res = {};

	if(!entityName){
		throw new Error('Entity Name is not defined when calling function loadEntity');
	}

	if(fromRawData){
		window.gameData[entityName].forEach(function(element){
			if(id == element.id){
				res = angular.copy(element);
			}
		});
	}else{
		_this.data[entityName].forEach(function(element){
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

Model.prototype.load = function(entityType, id, fromRawData, callback){

	var _this = this;

	var tmp = this.util.turnToArray(id);

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

Model.prototype.loadPerson = function(){
	
	var _this = this;

	this.data.people.forEach(function(person){
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

Model.prototype.loadCities = function(){
	
	var _this = this;

	this.data.cities.forEach(function(city){
		city.counsellor = _this.load('people', city.counsellor);
		city.generals = _this.load('people', city.generals);
		city.isActive = false;
	});
}

Model.prototype.loadKingdoms = function(){
	
	var _this = this;

	this.data.kingdoms.forEach(function(kingdom){
		kingdom.ancestor = _this.load('people', kingdom.ancestor);
		kingdom.lord = _this.load('people', kingdom.lord);
		kingdom.cities = _this.load('cities', kingdom.cities);
	});
}

Model.prototype.markLord = function(){
	
	var _this = this;

	this.data.people.forEach(function(person){
		person.isLord = false;
		_this.data.kingdoms.forEach(function(kingdom){
			if(kingdom.lord == person.id){
				person.isLord = true;
			}
		});
	});
}