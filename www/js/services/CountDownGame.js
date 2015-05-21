services.factory('CountDownGame', function($timeout) {
	return {
		timeout: null,
		countDownGame: function(match, runWhenFinished) {
			var self = this;
			this.timeout = $timeout(function() {
				self.startCountDownGame(match, runWhenFinished);
			}, 1000);
		},

		startCountDownGame: function(match, runWhenFinished) {
			console.info("counting game: " + match.counterGame);
			match.counterGame--;
			var self = this;
			if(match.counterGame === 0) {
				$timeout.cancel(this.timeout);
			} else {
				this.timeout = $timeout(function() {
					self.startCountDownGame(match, runWhenFinished);
				}, 1000);
			}
		},
		
		cancelTimeOut: function() {
			console.info("canceling timeout of game");
			$timeout.cancel(this.timeout);
		}
	}
});