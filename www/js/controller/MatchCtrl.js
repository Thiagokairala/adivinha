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
		CountDownToGame,
		CountDownGame) {

		$scope.match = {
			gameRolling: false,
			counterBegin: 3,
			counterGame: 10,
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

		/************************************************
		 * Game functions
		 ************************************************/
		function startCountDownToGame() {
			console.info("Starting countdown to game");
			CountDownToGame.startCountDownToGame($scope, startGameItSelf);
		}

		function startGameItSelf() {
			console.info("Game Started");
			$scope.match.gameRolling = true;
			$scope.match.currentWord = $scope.match.words[0];
			CountDownGame.countDownGame($scope.match, function() {});
		}

		/************************************************
		 * This part is used when the user quits the game
		 ************************************************/
		function stopCountDowns() {
			CountDownToGame.cancelTimeOut();
			CountDownGame.cancelTimeOut();

		}

		$scope.closeType = function() {
			medias.destroy();
			stopCountDowns();
			AccelerometerToBegin.clearWatch();
			returnToBegin.goBack();
		};
});