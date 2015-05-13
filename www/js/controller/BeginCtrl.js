controller.controller('BeginCtrl', function(
	$scope, 
	$state, 
	$ionicPlatform, 
	json,
	db) {

	$ionicPlatform.ready(function() {
		db.get().then(gotValue, didntWork);

		function gotValue(arrayOfTypes) {
			$scope.questionTypes = arrayOfTypes;
		}

		function didntWork(e) {
			alert("Sorry an error have ocurred");
		}
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
				'^.match', 
				{
					fileWithQuestions: questionType.fileWithQuestions
				}
			);
		} else {
			// Here is gonna be the inappbilling code
			alert("nao comprou");
			db.purchase(questionType.id, $state);
		}
	}
});