controller.controller('ResultCtrl', function($scope, $state, SendArray) {
	screen.lockOrientation('portrait');
	document.addEventListener("deviceready", onDeviceReady, false);


	$scope.array = SendArray.getData();

	function onDeviceReady() {
		$scope.back = function() {
			alert('oi');
			alert($state.go('game.begin'));
		}
	}

});