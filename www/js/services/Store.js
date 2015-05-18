services.factory('Store', function(db) {
    return {
        init: function() {
            //registering Celebritys
            store.register({
                id:    "5",
                alias: "Celebridades",
                type:  store.NON_CONSUMABLE
            });

            store.register({
                id:    "6",
                alias: "Hits",
                type:  store.NON_CONSUMABLE
            });

            store.register({
                id:    "7",
                alias: "Futebol",
                type:  store.NON_CONSUMABLE
            });
            
            store.register({
                id:    "8",
                alias: "Novelas",
                type:  store.NON_CONSUMABLE
            });
            
            store.register({
                id:    "9",
                alias: "Series",
                type:  store.NON_CONSUMABLE
            });
            
            store.register({
                id:    "10",
                alias: "MusciasNacionais",
                type:  store.NON_CONSUMABLE
            });
            
            store.register({
                id:    "11",
                alias: "Games",
                type:  store.NON_CONSUMABLE
            });
            
            store.register({
                id:    "12",
                alias: "Marcas",
                type:  store.NON_CONSUMABLE
            });


            store.when("order").approved(function(order) {
                db.purchase(order.id);
                order.finish();
                $state.go($state.current, {}, {reload: true});
            });
        },

        purchase: function(id, $state) {
            store.ready(function() {
                var product = store.get(id).id;
                store.order(product).then(function(product) {
                    // wait for store
                }, function(err) {
                    alert(err.message);
                });
            });
            store.refresh();
        },

        restorePurchases: function($state) {
            store.ready(function() {
                store.refresh();
                products = store.products;
                for(var i = 0; i<products.length; i++) {
                    if(products[i].owned === true) {
                        id = products[i].id;
                        db.purchase(id);
                    }
                }
                $state.go($state.current, {}, {reload:true});
            });
        }
    }
});