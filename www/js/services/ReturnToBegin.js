services.factory('returnToBegin', function($state, $timeout, $ionicLoading) {
	return {
		goBack: function() {
			var timeOutGoBack = null;

			function goBackToBegin() {
				$timeout.cancel(timeOutGoBack)
				$state.go("game.begin", {}, {reload: true});
			}

			function findIcon() {
				if(device.platform.toLowerCase() == "android") {	
					return "android";
				} else {
					return "ios";
				}
			}

			console.log("showing loading status");
			$ionicLoading.show({
				template: 
				'<ion-pane class="status_of_word">'+
					'<div class="template transition_template">'+
						'<h1>Carregando <ion-spinner icon="' +findIcon()+'"></ion-spinner></h1>'+
					'</div>'+
				'</ion-pane>'
			});

			console.log("redirecting to begin");
			timeOutGoBack = $timeout(goBackToBegin, 1000);
		}
	}
});