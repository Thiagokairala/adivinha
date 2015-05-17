controller.controller('MatchCtrl', 
	function(
		$scope,
		$stateParams,
		$timeout,
		$state,
		$cordovaMedia,
		$ionicLoading,
		SendArray,
		json,
		Shuffler) {
	// loading audio files and starting games.
	document.addEventListener("deviceready", onDeviceReady, false);

	// preparing the board for the game
	var fileWithQuestions = $stateParams.fileWithQuestions;
	$scope.currentWordIndex = 0;
	var answeredWords = [];

	$scope.nextWord = null;
	var isOn = true;
	var isPlaying = false;
	var myTymeOut;

	json.all(fileWithQuestions).success(function(words){
		$scope.allWords = Shuffler.shuffle(words);
	});

	function changeOrientation() {
		screen.lockOrientation('landscape');
		$timeout.cancel(timerToChangeOrientation);
	}
	

	const errorSpace = 2.0;

	const xToBegin = 9.8;
	const yToBegin = 0;
	const zToBegin = 0;

	var accelerometerToBegin = null;

	var timerToChangeOrientation;
	function onDeviceReady() {
		timerToChangeOrientation = $timeout(changeOrientation, 1000);
		
		var beginOfPath = getBeginOfPath();
   		$scope.correctAudio = new Media(beginOfPath + "audio/correct.mp3");
		$scope.wrongAudio = new Media(beginOfPath + "audio/wrong.mp3");
		$scope.timeRunningOut = new Media(beginOfPath + "audio/countdown.mp3");
		$scope.timeUp = new Media(beginOfPath + "audio/timeup.mp3");

		var frequency = { frequency: 250 };  // Update every half second
		accelerometer = navigator.accelerometer.watchAcceleration(isToBegin, onError, frequency);			
	}
	// fix for the android way to put audios.
	function getBeginOfPath() {
		if(device.platform.toLowerCase() == "android") {
			return "/android_asset/www/";
		} else {
			return "";
		}
	}

	$scope.counterBegin = 3;
	var timerBegin = null;
	function beginGame() {
		$scope.counterBegin--;
		if($scope.counterBegin == 0) {
	    	isPlaying = true;
	    	isOn = false;
	    	$scope.nextWord = $scope.allWords[0];
	    	$timeout.cancel(timerBegin)
	    	myTymeOut = $timeout(countDown, 1000);
    	} else {
			timerBegin = $timeout(beginGame, 1000);
    	}
	}

	function isToBegin(acceleration) {
		var x = acceleration.x;
		var y = acceleration.y;
		var z = acceleration.z;

		if(y > yToBegin - errorSpace && y < yToBegin + errorSpace) {
			if(z > zToBegin - errorSpace && z < zToBegin + errorSpace) {
				if(x < 0) {
					x = -x;
				} else {
					x = x;
				}
				if(x  > xToBegin - errorSpace && x < xToBegin + errorSpace) {
					navigator.accelerometer.clearWatch(accelerometer);
					timerBegin = $timeout(beginGame, 1000);
				}
			}
		}
	}
    
    // function to release midia memory
    function releaseMidias() {
    	$scope.correctAudio.release();
    	$scope.wrongAudio.release();
    	$scope.timeRunningOut.release();
    	$scope.timeUp.release();
    }

    $scope.counter = 20;
     
    var clock = 0;
	function countDown() {
		myTymeOut = $timeout(countDown, 250);
		clock++;
		if(clock === 5) {
			$scope.counter--;
			clock = 0;
			playTimeIsRunningOut();
		}
		if($scope.counter === 0) {
			$timeout.cancel(myTymeOut);
			SendArray.sendData(answeredWords);
			$scope.timeUp.play();
			releaseMidias();
			$state.go('game.result');
		}
		navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
	}

	function playTimeIsRunningOut() {
		if($scope.counter <= 5) {
			$scope.timeRunningOut.play();
		}
	}

	// using the accelerometer
	var wasSetBack = true;
	function onSuccess(acceleration) {
		var z = acceleration.z;
		if(wasSetBack === true) {
			if(z < -4.0) {
				$scope.wrongAudio.play();
				showAndHideStatus('templates/wrong.html');
				insertWordToResult($scope.allWords[$scope.currentWordIndex], false);
				wasSetBack = false;
			} else if(z > 4.0) {
				$scope.correctAudio.play();
				showAndHideStatus('templates/correct.html');
				insertWordToResult($scope.allWords[$scope.currentWordIndex], true);
				wasSetBack = false;
			}
		} else if(z > -2.0 && z < 2.0) {
			wasSetBack = true;
		}
	}

	var timeOutStatus = null;
	function showAndHideStatus(path) {
		$ionicLoading.show({templateUrl: path});
		timeOutStatus = $timeout(hideStatus, 1000);
	}

	function hideStatus() {
		$ionicLoading.hide();
		$timeout.cancel(timeOutStatus);
	}

	function insertWordToResult(word, answer) {
		answeredWord = 
			{
				word:word.word,
				answer:answer
			};
		answeredWords.push(answeredWord);
		$scope.currentWordIndex = $scope.currentWordIndex + 1;
		$scope.nextWord = $scope.allWords[$scope.currentWordIndex];
	}

	function onError() {
	    alert('onError!');
	}

	$scope.gameIsBeingPrepare = function() {
		return isOn;
	}

	$scope.gameRolling = function() {
		return isPlaying;
	}
});