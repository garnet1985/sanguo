function Game(){

	this.gameData = angular.copy(window.gameData);

	this.myKingdom = null;

	this.aiKingdoms = [];

	this.timer = null;

	this.player = 0;

}

Game.prototype.util = new Util();

Game.prototype.model = new Model();

Game.prototype.entity = new Entity();

Game.prototype.saveGame = function(index){

}

Game.prototype.loadGame = function(index){
	return localStorage.sangoGameData.savedData[index];
}

Game.prototype.newGame = function(){
	this.init();
	return this;
}

Game.prototype.selectKindom = function(id){

	var _this = this;

	this.gameData.kingdoms.forEach(function(kingdom){
		if(kingdom.id != id){
			kingdom.isAI = true;
			_this.aiKingdoms.push(kingdom);
		}else{
			kingdom.isAI = false;
			_this.myKingdom = kingdom;
		}
	})

	this.gameData.kingdoms.sort(function(){
		return Math.random() > 0.5 ? -1 : 1;
	})

	return this;
}

Game.prototype.init = function(){
	this.gameData = this.buildData();
	this.gameData = this.calculateData();
	this.gameData.date = angular.copy(window.gameData.gameConstant.gameStartDate);
	return this;
}

Game.prototype.buildData = function(){
	this.model.markLord();
	this.model.loadPerson();
	this.model.loadCities();
	this.model.loadKingdoms();
	return this.gameData;
}

Game.prototype.calculateData = function(){
	this.entity
	.target(this.gameData.cities)
	.calculatePopulation()
	.calculateMorale()
	.calculateCityScale()
	.target(this.gameData.kingdoms)
	.calculateCommands()
	.target(this.gameData.people)
	.calculateLevel();
	return this.gameData;
}

Game.prototype.newMonth = function(){
	this.gameData.date.month++;
	if(this.gameData.date.month > 12){
		this.gameData.date.month = 1;
		this.gameData.date.year++;
	}
	return this.gameData.date;
}

Game.prototype.run = function(){

	var _this = this;

	if(this.player == this.gameData.kingdoms.length){
		this.player = 0;
		this.newMonth();
		console.log(this.gameData.date);
	}

	var runKingdom = function(){
		clearTimeout(_this.timer);
		console.log(_this.gameData.kingdoms[_this.player].isAI);
		if(_this.gameData.kingdoms[_this.player].isAI){
			_this.entity.target(_this.gameData.kingdoms[_this.player]).autoRun(function(){
				_this.player++;
				_this.run();
			});
		}else{
			_this.player++;
			if(confirm("continue?")){
				_this.run();
			}
		}
	}


	this.timer = setTimeout(function(){
		runKingdom();
	}, 1500);
}

Game.prototype.isEndOfPlayerRound = function(){
	if(this.myKingdom.command == 0){
		this.myKingdom.restoreCommand();
		this.run(this.nextPlayer)
		return true;
	}
	return false;
}















Game.prototype.isMyCity = function(city, kingdom){
	return util.isIn(city, kingdom.cities);
}

Game.prototype.inActiveAllCities = function(cities){
	cities.forEach(function(city){
		city.isActive = false;
	});
}

Game.prototype.openMsg = function(city){
	var pos = _this.decideMsgPos(city);
}

Game.prototype.decideMsgDialogPosition = function(city){
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

Game.prototype.openCityDialog = function(city){
	return {
		isBattle: -1,
		position: _this.decideMsgDialogPosition(city),
		data: city,
		body: "请您下令",
		operational: true
	}
}

Game.prototype.notYourCity = function(city){
	return {
		isBattle: -1,
		position: _this.decideMsgDialogPosition(city),
		data: "",
		body: "对不起，" + city.name + "不是您的城池",
		operational: false
	}
}

Game.prototype.openBattleDialog = function(){
	return {
		isBattle: 1,
		// position: _this.decideMsgDialogPosition(),
		data: null
	}
}