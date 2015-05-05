controller.controller('MatchCtrl', function($scope, $stateParams, $timeout, $state, SendArray) {
	screen.lockOrientation('landscape');

	$scope.questionType = $stateParams.typeName;
	$scope.backGroundColor = $stateParams.backgroundColor;
	
	// preparing counter
	$scope.counter = 50;

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
	
	$scope.countDown = function() {
		$scope.counter--;
		if($scope.counter == 0) {
			$state.go('game.result');
		}
		navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
		$timeout($scope.countDown, 1000);
	}
});