var services = angular.module('adivinha.services', [])

.factory('QuestionsTypes', function($http, $q) {

	return {
		all: function() {
			return $http.get('js/data/questionTypes.json');
		}
	}
})

.factory('SendArray', function(){

    var finalData;
    return {
        sendData: function(data) {
            finalData = data;
        },
        getData: function() {
            return finalData;
        }
    }
});