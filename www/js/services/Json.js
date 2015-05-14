services.factory('json', function($http, $q) {

	return {
		all: function(path) {
			return $http.get('js/data/' + path);
		}
	}
});