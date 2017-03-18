var game = angular.module("game",['ngAnimate'])

.controller("main", ['$scope', function($scope){

	$scope.game = new Game();

	$scope.scene = "gameStart";

	// globl variable to contain msg info
	$scope.msg = {
		top: null,
		bottom: null,
		aside: null,
		popup: null,
		event: null
	}


	// debug code:
	$scope.scene = "kingdomSelection";
	$scope.game = new Game().init();
	console.log($scope.game)
	$scope.msg.top = $scope.game.data.kingdoms;
	// $scope.game.selectKindom(1);

	// $scope.game.run();

	// console.log($scope.game)



	if($scope.scene == "gameStart"){
		// start game
		$scope.startGame = function(){
			// trun to lord selection page
			$scope.scene = "kingdomSelection";
			$scope.game.init();
			console.log($scope.game)
		}

	}


	if($scope.scene == "kingdomSelection"){
		
		$scope.showKingdomInfo = function(kingdom){
			$scope.msg.bottom = kingdom;
			$scope.msg.type = 'confirm';
			setTimeout(function(){
				$scope.game.displayGeneralRadarChart(kingdom.lord);
			},0);
		}

		$scope.lordSelected = function(kingdom){
			$scope.game.selectKindom(kingdom.id);
			$scope.scene = "map";
		}

	}

	if($scope.scene == "map"){

		$scope.cityClass = function(isLargeCity, isActive){
			
			var cls = "";

			if(isLargeCity){
				cls += " large";
			}
			if(isActive){
				cls += " active";
			}

			return cls;
		}

		$scope.openCity = function(city){
			ui.inActiveAllCities($scope.gameData.cities);
			city.isActive = true;
			if(core.isMyCity(city, $scope.playerKingdom)){
				$scope.msg = msg.openCityDialog(city);
			}else{
				$scope.msg = msg.notYourCity(city);
			}
		}

		$scope.closeMsg = function(e){
			if(e.target == document.querySelector(".map") && $scope.msg){
				$scope.msg = null;
			}
		}
	}

}]);