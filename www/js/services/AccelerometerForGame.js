services.factory('AccelerometerForGame', function($cordovaDeviceMotion, $ionicLoading, $timeout) {
	return {
		accelerometer: null,
		wasSetBack: true,
		startGameAccelerometer: function(medias, match) {
			var options = {frequency: 250};
			console.info("Starting to watch acceleration of game");
			this.accelerometer = $cordovaDeviceMotion.watchAcceleration(options);
			var self = this;
			self.accelerometer.then(null, 
				function(error) {
					console.error(error.message);
				},
				function(result) {
					z = result.z;
					if(self.wasSetBack === true) {
						if( z < -4.0 ) {
							medias.wrong();
							console.info("wrong answer");
							self.showLoading('templates/wrong.html');
							self.wasSetBack = false;
							self.setStatus(match, false);
						} else if(z > 4.0) {
							medias.correct();
							console.info("correct answer");

							self.showLoading('templates/correct.html');
							self.wasSetBack = false;
							self.setStatus(match, true);
						}
					} else if(z > -2.0 && z < 2.0) {
						self.wasSetBack = true;
					}
				}
			);
		},
		showLoading: function(path) {
			$ionicLoading.show(
				{
					templateUrl: path,
					duration: 1000
				}
			);
		},
		setStatus: function(match, answer) {
			timeout = $timeout(function() {
				match.currentWordIndex++;
				match.wordsUsed.push(
					{
						word: match.currentWord,
						answer: answer
					}
				);
				match.currentWord = match.words[match.currentWordIndex];
				$timeout.cancel(timeout);
			}, 500);
		},
		clearWatch: function() {
			console.info("canceling accelerometer for game");
			if(this.accelerometer) {
				this.accelerometer.clearWatch();
			}
		}
	}
});