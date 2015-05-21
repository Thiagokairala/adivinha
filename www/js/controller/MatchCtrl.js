controller.controller('MatchCtrl', 
	function(
		$scope,
		$stateParams,
		$timeout,
		$state,
		$ionicLoading,
		$ionicPlatform,
		returnToBegin,
		SendArray,
		json,
		Shuffler,
		medias,
		AccelerometerToBegin,
		CountDownToGame) {

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
			json.all(fileName).success(function(words) {
				console.info("Shuffling words");
				$scope.match.words = Shuffler.shuffle(words);
			})
			AccelerometerToBegin.whenToStart(startCountDownToGame);
		});

		/***********************************************
		 * Section that controls the begin of the game.
		 ***********************************************/
		var countDownToGame = null;
		function startCountDownToGame() {
			console.info("Starting countdown to game");
			CountDownToGame.startCountDownToGame($scope, function() {});
			
		}

		function stopCountDowns() {
			$timeout.cancel(countDownToGame);
		}

		$scope.closeType = function() {
			medias.destroy();
			stopCountDowns();
			AccelerometerToBegin.clearWatch();
			returnToBegin.goBack();
		};
});