controller.controller('BeginCtrl', function(
	$scope, 
	$state, 
	$ionicPlatform,
	$ionicPopup,
	$timeout,
	$ionicLoading,
	$cordovaDeviceMotion,
	json,
	Store,
	db) {

	$ionicPlatform.ready(function() {
		db.get().then(gotValue, didntWork);
		Store.init();

		var hideSplashScreenTimer = null;

		function hideSplashScreen() {
			$ionicLoading.hide();
			$timeout.cancel(hideSplashScreenTimer);
		}

		function gotValue(arrayOfTypes) {
			console.log("loading types");
			$scope.questionTypes = arrayOfTypes;
			hideSplashScreenTimer = $timeout(hideSplashScreen, 1000);
		}

		function didntWork(e) {
			console.log("Something wen`t wrong on the database: " + e.message);
		}
	});

	$scope.isPaidAndLocked = function(questionType) {
		if(questionType.free == false && questionType.available == false) {
			return true;
		} else {
			return false;
		}
	}

	$scope.verifyIfIsAvailable = function(questionType) {
		var free = questionType.free;
		var paidAndAvailable = free == false && questionType.available == true;
		if(free || paidAndAvailable) {
			console.log("types is available going to game");

			$state.go(
				'^.match', 
				{
					fileWithQuestions: questionType.fileWithQuestions
				}
			);
		} else {
			console.log("type is not available");
			var confirmPopup = $ionicPopup.confirm({
    			title: 'Categoria paga',
    			template: 'Deseja ir para a loja?'
   			});
			confirmPopup.then(function(res) {
				if(res) {
					console.log("want to buy, redirecting to store");
					buyItem(questionType.id);
				} else {
					console.log("don't want to buy");
					// nothing to do.
				}
			});
		}
	}

	$scope.restorePurchases = function() {
		console.log("restoring purchases");
		Store.restorePurchases($state);
	}

	function buyItem(id) {
		console.log("buying an item with id: " + id);
		Store.purchase(id, $state);
	}
});