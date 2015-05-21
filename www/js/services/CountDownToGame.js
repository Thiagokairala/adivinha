services.factory('CountDownToGame', function($timeout) {
	return {
		timeout: null,
		startCountDownToGame: function(scope, runWhenIsOK) {
			countDownToGame = this.runCountDownToGame;
			this.timeout = $timeout(function() {
				countDownToGame(scope.match, runWhenIsOK);
			}, 1000);
		},
		runCountDownToGame: function(match, runWhenIsOK) {
			console.info("counting to begin: " + match.counterBegin);
			var countDownToGame = this.runCountDownToGame;
			if(match.counterBegin === 0) {
				$timeout.cancel(this.timeout);
			} else {
				this.timeout = $timeout(function() {
					countDownToGame(scope.match, runWhenIsOK);
				}, 1000);
			}
		}
	}
});