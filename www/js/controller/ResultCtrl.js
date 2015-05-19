controller.controller('ResultCtrl', function(
	$scope,
	$state,
	$cordovaSplashscreen,
	returnToBegin,
	SendArray) {

	$scope.array = SendArray.getData();
	$scope.back = function() {
		returnToBegin.goBack();
	};
});