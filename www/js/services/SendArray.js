services.factory('SendArray', function(){

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