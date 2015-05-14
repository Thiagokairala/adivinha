controller.controller('BeginCtrl', function(
	$scope, 
	$state, 
	$ionicPlatform,
	$ionicPopup,
	json,
	Store,
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
			var confirmPopup = $ionicPopup.confirm({
    			title: 'Categoria paga',
    			template: 'Deseja ir para a loja?'
   			});
			confirmPopup.then(function(res) {
				if(res) {
					Store.init(questionType.id, $state);
				} else {
					// nothing to do.
				}
			});
		}
	}
});