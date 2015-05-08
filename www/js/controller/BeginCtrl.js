controller.controller('BeginCtrl', function(
	$scope, 
	$state, 
	$ionicPlatform, 
	json) {

	json.all('questionTypes.json').success(function(types){
		$scope.questionTypes = types;
	});

	$scope.isPaidAndLocked = function(questionType) {
		if(questionType.free == false && questionType.available == false) {
			return true;
		} else {
			return false;
		}
	}

	$scope.isPaindAndAvailable = function(questionType) {
		if(questionType.free == false && questionType.available == true) {
			return true;
		} else {
			return false;
		}
	}

	$scope.verifyIfIsAvailable = function(questionType) {
		var free = questionType.free;
		var paidAndAvailable = free == false && questionType.available == true;
		if(free || paidAndAvailable) {
			$state.go(
				'game.match', 
				{
					typeName: questionType.typeName,
					fileWithQuestions: questionType.fileWithQuestions
				}
			);
		} else {
			// Here is gonna be the inappbilling code
			alert("nao comprou");
		}
		href="#/game/match/{{questionType.typeName}}/{{questionType.backGroundColor}}" 
	}
});