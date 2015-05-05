controller.controller('ResultCtrl', function($scope, $state) {
	screen.lockOrientation('portrait');
	$scope.back = function() {
		$state.go('game.begin')
	}
});