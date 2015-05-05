controller.controller('MatchCtrl', function($scope, $stateParams, $timeout, $state, SendArray) {
	screen.lockOrientation('landscape');

	$scope.questionType = $stateParams.typeName;
	$scope.backGroundColor = $stateParams.backgroundColor;
	
	// preparing counter
	$scope.counter = 3;

	// using the accelerometer
	function onSuccess(acceleration) {
		var z = acceleration.z;
		if(z < -5.0) {
			alert("para baixo");
		} else if(z > 5.0) {
			alert("Para cima")
		}
	};

	function onError() {
	    alert('onError!');
	};
	
	var myTymeOut;

	$scope.countDown = function() {
		myTymeOut = $timeout($scope.countDown, 1000);
		$scope.counter--;
		if($scope.counter === 0) {
			$timeout.cancel(myTymeOut);
			SendArray.sendData("oi");
			$state.go('game.result');
		}
		navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
	}
});