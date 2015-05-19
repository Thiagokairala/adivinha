controller.controller('ResultCtrl', function(
	$scope,
	$state,
	$window,
	$cordovaSplashscreen,
	$timeout,
	SendArray) {
	screen.lockOrientation('portrait');

	var timerToRemoveSplash = null;

	function removeSplash() {
		$cordovaSplashscreen.hide();
		$timeout.cancel(timerToRemoveSplash);
	}

	$timeout(removeSplash, 1000);

	$scope.array = SendArray.getData();
	$scope.back = function() {
		$cordovaSplashscreen.show();
		$state.go('^.begin', {}, {reload: true});
	};
});