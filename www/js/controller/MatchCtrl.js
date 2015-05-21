controller.controller('MatchCtrl', 
	function(
		$scope,
		$stateParams,
		$timeout,
		$state,
		$ionicLoading,
		$cordovaDeviceMotion,
		$ionicPlatform,
		returnToBegin,
		SendArray,
		json,
		Shuffler,
		medias) {

		$scope.match = {
			gameRolling: false,
			counterBegin: 3,
			counterGame: 60,
			currentWord: null,
			currentWordIndex: 0,
			words: [],
			wordsUsed: []
		}

		$ionicPlatform.ready(function() {
			fileName = $stateParams.fileWithQuestions;
			console.info("file with questions: " + fileName);
			medias.init();
		});

		$scope.closeType = function() {
			medias.destroy();
			returnToBegin.goBack();
		}
});