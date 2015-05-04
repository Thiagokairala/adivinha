var controller = angular.module('adivinha.controllers', [])

controller.controller('BeginCtrl', function($scope, QuestionsTypes) {
	QuestionsTypes.all().success(function(types){
		$scope.questionTypes = types;
	});
});

controller.controller('MatchCtrl', function($scope, $stateParams, $timeout, $state) {
	screen.lockOrientation('landscape');

	$scope.questionType = $stateParams.typeName;
	$scope.backGroundColor = $stateParams.backgroundColor;
	
	// preparing counter
	$scope.counter = 20;
	$scope.countDown = function() {
		$scope.counter--;
		if($scope.counter == 0) {
			$state.go('game.result');
		}
		$timeout($scope.countDown, 1000);
	}


	// starting counter
	var start = $timeout($scope.countDown, 1000);
});

controller.controller('ResultCtrl', function($scope) {

});