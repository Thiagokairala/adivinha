services.factory('CountDownGame', function($timeout, medias) {
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
				medias.timeOut();
				$timeout.cancel(this.timeout);
				runWhenFinished();
			} else {
				if(match.counterGame <= 5) {
					medias.timeRunningOut();
				}
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