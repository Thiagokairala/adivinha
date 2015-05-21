services.factory('CountDownToGame', function($timeout) {
	return {
		timeout: null,
		startCountDownToGame: function(scope, runWhenIsOK) {
			var self = this;
			this.timeout = $timeout(function() {
				self.runCountDownToGame(scope.match, runWhenIsOK);
			}, 1000);
		},
		
		runCountDownToGame: function(match, runWhenIsOK) {
			console.info("counting to begin: " + match.counterBegin);
			match.counterBegin--;
			var self = this;
			if(match.counterBegin === 0) {
				$timeout.cancel(this.timeout);
				runWhenIsOK();
			} else {
				this.timeout = $timeout(function() {
					self.runCountDownToGame(match, runWhenIsOK);
				}, 1000);
			}
		},

		cancelTimeOut: function() {
			console.info("canceling timeout to begin");
			$timeout.cancel(this.timeout);
		}
	}
});