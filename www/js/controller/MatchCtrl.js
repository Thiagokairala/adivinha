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

		/***********************************************
		 * Instantiating game
		 **********************************************/
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

		function startCountDownToGame() {
			console.info("Starting countdown to game");
			CountDownToGame.startCountDownToGame($scope, startGameItSelf);
		}

		function startGameItSelf() {
			console.info("Game Started");
		}

		/************************************************
		 * This part is used when the user quits the game
		 ************************************************/
		function stopCountDowns() {
			CountDownToGame.cancelTimeOut();
		}

		$scope.closeType = function() {
			medias.destroy();
			stopCountDowns();
			AccelerometerToBegin.clearWatch();
			returnToBegin.goBack();
		};
});