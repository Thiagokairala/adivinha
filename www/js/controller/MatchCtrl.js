controller.controller('MatchCtrl', function($scope, $stateParams, $ionicPlatform,
 $timeout, $state, $cordovaMedia, SendArray, json, Shuffler) {
	screen.lockOrientation('landscape');

	// preparing the board for the game
	$scope.questionType = $stateParams.typeName;
	$scope.backGroundColor = $stateParams.backgroundColor;
	var fileWithQuestions = $stateParams.fileWithQuestions;
	var currentWordIndex = 0;
	var answeredWords = [];

	json.all(fileWithQuestions).success(function(words){
		$scope.allWords = Shuffler.shuffle(words);
		$scope.nextWord = $scope.allWords[0];
	});

	// preparing counter
	$scope.counter = 10;
	
	var myTymeOut;

	// loading audio files.
	document.addEventListener("deviceready", onDeviceReady, false);
		function onDeviceReady() {
			var beginOfPath = getBeginOfPath();
	   		$scope.correctAudio = new Media(beginOfPath + "audio/correct.mp3");
			$scope.wrongAudio = new Media(beginOfPath + "audio/wrong.mp3");
		
		// fix for the android way to put audios.
		function getBeginOfPath() {
			if(device.platform.toLowerCase() == "android") {
				return "/android_asset/www/";
			} else {
				return "";
			}
		}
	}
    
    // function to release midia memory
    function releaseMidias() {
    	$scope.correctAudio.release();
    	$scope.wrongAudio.release();
    }           

	$scope.countDown = function() {
		myTymeOut = $timeout($scope.countDown, 1000);
		$scope.counter--;
		if($scope.counter === 0) {
			$timeout.cancel(myTymeOut);
			SendArray.sendData(answeredWords);
			releaseMidias();
			$state.go('game.result');
		}
		navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
	}

	// using the accelerometer
	function onSuccess(acceleration) {
		var z = acceleration.z;
		if(z < -5.0) {
			$scope.correctAudio.play();
			insertWordToResult($scope.allWords[currentWordIndex], true);
		} else if(z > 5.0) {
			$scope.wrongAudio.play();
			insertWordToResult($scope.allWords[currentWordIndex], false);
		}
	};

	function insertWordToResult(word, answer) {
		answeredWord = 
			{
				word:word.word,
				answer:answer
			};
		answeredWords.push(answeredWord);
		currentWordIndex++;
		$scope.nextWord = $scope.allWords[currentWordIndex];
	}

	function onError() {
	    alert('onError!');
	};
});