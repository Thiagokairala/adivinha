var services = angular.module('adivinha.services', [])

.factory('json', function($http, $q) {

	return {
		all: function(path) {
			return $http.get('js/data/' + path);
		}
	}
})

.factory('db', function($cordovaSQLite) {
    return {
        get: function() {
            var db = window.sqlitePlugin.openDatabase({name: "adivinha.db", createFromLocation: 1, createFromResource: 1});
            query = "SELECT * FROM 'questionType'";
            db.transaction(function(tx) {
                tx.executeSql(query, [], function(tx, res){
                   return res.rows;
                });
            }, function(e) {
                alert(e.message);
            });
        }
    }
})

.factory('Shuffler', function() {
    return {
        shuffle: function(array) {
            var currentIndex = array.length;
            var temporaryValue;
            var randomIndex ;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
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