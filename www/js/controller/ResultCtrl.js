controller.controller('ResultCtrl', function(
	$scope,
	$state,
	$cordovaSplashscreen,
	SendArray) {

	$scope.array = SendArray.getData();
	$scope.back = function() {
		$cordovaSplashscreen.show();
		$state.go('^.begin', {}, {reload: true});
	};
});