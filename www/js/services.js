var services = angular.module('adivinha.services', [])

.factory('QuestionsTypes', function($http, $q) {

	return {
		all: function() {
			return $http.get('js/data/questionTypes.json');
		}
	}
});