services.factory('Store', function() {
    return {
        init: function() {
            store.verbosity = store.INFO;
            store.register({
                id:    "com.example.app.inappid1",
                alias: "100 coins",
                type:  store.CONSUMABLE
            });
            store.ready(function() {
                alert("\\o/ STORE READY \\o/");
            });
            store.refresh();
        }
    }
});