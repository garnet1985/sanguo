game.controller("main", ['service', 'game', 'core', 'ui', 'msg', '$scope', function(service, game, core, ui, msg, $scope){

	$scope.gameData = {};
	$scope.playerKingdom = {};

	// scene 1: open page
	// scene 2: map page
	// scene 3: battle page
	// $scope.scene = 1;

	// debug code:
	$scope.scene = 2;

	// sub scene 0: open page
	// sub scene 1: lord selection
	$scope.subScene = 0;

	// globl variable to contain msg info
	$scope.msg = null;


	// debug code:
	$scope.gameData = game.newGame();
	$scope.playerKingdom = $scope.gameData.kingdoms[0];
	console.log($scope.gameData);
	console.log($scope.playerKingdom);

	if($scope.scene == 1){
		// start game
		$scope.startGame = function(){
			// trun to lord selection page
			$scope.subScene = 1;
			$scope.gameData = game.newGame();
		}

		$scope.lordSelected = function(kingdom){
			$scope.playerKingdom = kingdom;
			$scope.scene = 2;
		}
	}

	if($scope.scene == 2){

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