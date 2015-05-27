services.factory('AccelerometerForGame', 
	function(
		$cordovaDeviceMotion,
		$ionicLoading,
		$timeout,
		medias) {

	var wasSetBack = true;
	var timeout = null;
	var stop = true;
	var match = null;
	var timeOutStatus = null;

	function showLoading(path) {
		$ionicLoading.show(
			{
				templateUrl: path,
				duration: 1000
			}
		);
	}

	function setStatus(answer) {
		timeOutStatus = $timeout(function() {
			match.currentWordIndex++;
			match.wordsUsed.push(
				{
					word: match.currentWord,
					answer: answer
				}
			);
			match.currentWord = match.words[match.currentWordIndex];
			$timeout.cancel(timeOutStatus);
		}, 500);
	}

	function success(result) {
		z = result.z;
		if(wasSetBack === true) {
			if( z < -4.0 ) {
				medias.wrong();
				console.info("wrong answer");
				showLoading('templates/wrong.html');
				wasSetBack = false;
				setStatus(false);
			} else if(z > 4.0) {
				medias.correct();
				console.info("correct answer");
				showLoading('templates/correct.html');
				wasSetBack = false;
				setStatus(true);
			}
		} else if(z > -2.0 && z < 2.0) {
			wasSetBack = true;
		}
	}

	function error(error) {
		console.error(error.message);
	}

	function gameAccelerometer() {
		$cordovaDeviceMotion.getCurrentAcceleration().then(success, error);
		if(stop == false) {
			timeout = $timeout(gameAccelerometer, 250);
		} else {
			$timeout.cancel(timeout);
		}
	}

	return {
		startGameAccelerometer: function(matchAttr) {
			console.info("Starting to watch acceleration of game");
			stop = false;
			match = matchAttr;
			timeout = $timeout(gameAccelerometer, 250);
		},
		clearWatch: function() {
			console.info("canceling accelerometer for game");
			if(timeout) {
				while(timeout.$$state.value != 'canceled') {
					$timeout.cancel(timeout);
				}
			}
		}
	}
});