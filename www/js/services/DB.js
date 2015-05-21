services.factory('db', function($cordovaSQLite, $q) {
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
                console.log(e.message);
            });

            return deferred.promise;
        },
        purchase: function(id) {
            query = "UPDATE 'questionType' SET available = '1' WHERE id = ?";

            db.transaction(
                function(tx) {
                    tx.executeSql(query, [id], 
                        function(tx, r) {
                            // nothing to do.
                        }, 
                        function(tx, e) {
                            console.log("SQLite Error: " + e.message);
                        }
                    );
                }
            );
        }
    }
});
