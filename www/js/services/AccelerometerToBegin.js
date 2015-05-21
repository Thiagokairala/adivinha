services.factory('AccelerometerToBegin', function($cordovaDeviceMotion) {
	return {
		accelerometer: null,
		whenToStart: function(executeWhenIsOK) {
			const errorSpace = 2.0;

			const xToBegin = 9.8;
			const yToBegin = 0;
			const zToBegin = 0;
			
			var options = {frequency: 500};
			console.info("Starting to watch acceleration for begining");
			this.acellerometer = $cordovaDeviceMotion.watchAcceleration(options);
			var internalAcellerometer = this.acellerometer;
			internalAcellerometer.then(null, 
				function(error) {
					console.error(error.message);
				}, function(result) {
					var x = result.x;
					var y = result.y;
					var z = result.z;
					if(y > yToBegin - errorSpace && y < yToBegin + errorSpace) {
						console.info("Starting for y");
						if(z > zToBegin - errorSpace && z < zToBegin + errorSpace) {
							console.info("Starting for z");
							if(x < 0) {
								x = -x;
							} else {
								x = x;
							}
							if(x  > xToBegin - errorSpace && x < xToBegin + errorSpace) {
								console.info("Game should start now");
								internalAcellerometer.clearWatch();;
								executeWhenIsOK();
							}
						}
					}
				}
			);
		},

		clearWatch: function() {
			console.info("Canceling accelerometer to begin");
			this.acellerometer.clearWatch();
		}
	}
});