controller.controller('MatchCtrl', function($scope, $stateParams, $ionicPlatform,
 $timeout, $state, $cordovaMedia, SendArray) {
	screen.lockOrientation('landscape');

	// preparing the board for the game
	$scope.questionType = $stateParams.typeName;
	$scope.backGroundColor = $stateParams.backgroundColor;
	
	// preparing counter
	$scope.counter = 30;
	
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
			SendArray.sendData("oi");
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
		} else if(z > 5.0) {
			$scope.wrongAudio.play();
		}
	};

	function onError() {
	    alert('onError!');
	};
});