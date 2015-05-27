services.factory('AccelerometerToBegin', function($cordovaDeviceMotion, $timeout) {
	const errorSpace = 2.0;

	const xToBegin = 9.8;
	const yToBegin = 0;
	const zToBegin = 0;

	var timeOut = null;

	var stop = true;

	var functionToExecute = null;

	function success(result) {
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
				if(x  > xToBegin - errorSpace && x < xToBegin + errorSpace && stop == false) {
					console.info("Game should start now");
					functionToExecute();
					stop = true;
				}
			}
		} else {
			console.info("Game not starting");
		}
	}

	function error(error) {
		console.error(error.message);
	}

	function checkAcceleration() {
		console.info("checking acceleration");
		$cordovaDeviceMotion.getCurrentAcceleration().then(success, error);
		if(stop == false) {
			timeOut = $timeout(checkAcceleration, 250);
		} else {
			$timeout.cancel(timeOut);
			console.log();
		}
	}

	return {
		whenToStart: function(executeWhenIsOK) {	
			console.info("Starting to watch acceleration for begining");
			functionToExecute = executeWhenIsOK;
			timeOut = $timeout(checkAcceleration, 250);
			stop = false;
		},

		clearWatch: function() {
			while(timeOut.$$state.value != 'canceled') {
				console.info("Canceling accelerometer to begin");
				$timeout.cancel(timeOut);
			}
		}
	}
});