controller.controller('ResultCtrl', function($scope, $state, SendArray) {
	screen.lockOrientation('portrait');
	$scope.array = SendArray.getData();
	$scope.back = function() {
		$state.go('game');
	}
});