var controller = angular.module('adivinha.controllers', [])

controller.controller('BeginCtrl', function($scope, QuestionsTypes) {
	QuestionsTypes.all().success(function(types){
		$scope.questionTypes = types;
	});
})