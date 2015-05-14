services.factory('Store', function(db) {
    return {
        init: function(id, $state) {
            store.verbosity = store.INFO;
            //registering Celebritys
            store.register({
                id:    "5",
                alias: "Celebridades",
                type:  store.CONSUMABLE
            });

            store.register({
                id:    "6",
                alias: "Hits",
                type:  store.CONSUMABLE
            });

            store.register({
                id:    "7",
                alias: "Futebol",
                type:  store.CONSUMABLE
            });
            
            store.register({
                id:    "8",
                alias: "Novelas",
                type:  store.CONSUMABLE
            });
            
            store.register({
                id:    "9",
                alias: "Series",
                type:  store.CONSUMABLE
            });
            
            store.register({
                id:    "10",
                alias: "MusciasNacionais",
                type:  store.CONSUMABLE
            });
            
            store.register({
                id:    "11",
                alias: "Games",
                type:  store.CONSUMABLE
            });
            
            store.register({
                id:    "12",
                alias: "Marcas",
                type:  store.CONSUMABLE
            });

            store.when("order").approved(function(order) {
                db.purchase(order.id);
                order.finish();
                $state.go($state.current, {}, {reload: true});
            });

            store.register
            store.ready(function() {
                var product = store.get(id).id;
                store.order(product).then(function(product) {
                    alert("carregando")
                }, function(err) {
                    alert(err.message);
                });

            });
            store.refresh();
        }
    }
});