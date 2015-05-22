controller.controller('MatchCtrl', 
	function(
		$scope,
		$stateParams,
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
		CountDownGame,
		AccelerometerForGame) {

		$scope.match = {
			gameRolling: false,
			counterBegin: 3,
			counterGame: 8,
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
			medias.init();
			CountDownGame.countDownGame($scope.match, finishGame);
			AccelerometerForGame.startGameAccelerometer($scope.match);
		}

		function finishGame() {
			console.info("game finishing going to result");
			AccelerometerForGame.clearWatch();
			console.info("sending data to result");
			SendArray.sendData($scope.match.wordsUsed);
			console.info("goingo to result");
			$state.go("^.result");
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
			AccelerometerForGame.clearWatch();
			returnToBegin.goBack();
		};
});