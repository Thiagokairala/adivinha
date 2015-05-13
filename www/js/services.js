var services = angular.module('adivinha.services', [])

.factory('json', function($http, $q) {

	return {
		all: function(path) {
			return $http.get('js/data/' + path);
		}
	}
})

.factory('db', function($cordovaSQLite, $q) {
    return {
        get: function() {
            var deferred = $q.defer();
            
            query = "SELECT * FROM 'questionType'";
            db.transaction(function(tx) {
                tx.executeSql(query, [], function(tx, res) {
                    var arrayOfTypes = [];
                    for(var i = 0; i<res.rows.length; i++) {
                        arrayOfTypes.push(res.rows.item(i));
                    }
                    deferred.resolve(arrayOfTypes);
                });
            }, function(e) {
                deferred.reject(e);
                alert(e.message);
            });

            return deferred.promise;
        },
        purchase: function(id, $state) {
            query = "UPDATE 'questionType' SET available = '1' WHERE id = ?";
            alert(id);

            db.transaction(
                function(tx) {
                    tx.executeSql(query, [id], 
                        function(tx, r) {
                            alert("Your SQLite query was successful!");
                            $state.go($state.current, {}, {reload: true});
                        }, 
                        function(tx, e) {
                            alert("SQLite Error: " + e.message);
                        }
                    );
                }
            );
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