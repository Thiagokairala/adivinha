services.factory('Store', function(db, $state, returnToBegin) {
    return {
        init: function() {
            console.log("Initializing store");
            store.verbosity = store.INFO;

            if(store.products.length === 0) {

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
                console.log("registered all itens");
            } else {
                console.log("itens already registered");
            }
            
            store.when("product").approved(
                function(product) {
                    console.log("order approved");
                    db.purchase(product.id);
                    product.finish();
                    returnToBegin.goBack();
                }
            );
        },

        purchase: function(id, $state) {
            store.ready(function() {
                console.log("purchasing itens");
                var product = store.get(id).id;
                store.order(product).then(function(product) {
                    console.log("waiting for store");
                }, function(err) {
                    console.log("error: " + err.message);
                });
            });
            store.refresh();
        },

        restorePurchases: function($state) {
            store.ready(function() {
                console.log("restoring purchases");
                store.refresh();
                products = store.products;
                for(var i = 0; i<products.length; i++) {
                    if(products[i].owned === true) {
                        id = products[i].id;
                        db.purchase(id);
                    }
                }
                returnToBegin.goBack();
            });
        }
    }
});