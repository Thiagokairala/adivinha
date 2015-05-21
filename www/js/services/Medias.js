services.factory('medias', function($cordovaMedia){
	return {

		correctAudio: null ,
		wrongAudio: null,
		timeRunningOutAudio: null,
		timeOutAudio: null,

		init: function() {
			console.info("Loading Medias");
			var beginOfPath = "audio";
			
			if(device.platform.toLowerCase() == "android") {
				beginOfPath = "/android_asset/www/" + beginOfPath;
			} else {
				beginOfPath = beginOfPath;
			}

			this.correctAudio = new Media(beginOfPath + "correct.mp3");
			this.wrongAudio = new Media(beginOfPath + "wrong.mp3");
			this.timeRunningOutAudio = new Media(beginOfPath + "countdown.mp3");
			this.timeOutAudio= new Media(beginOfPath + "timeup.mp3");

			console.info("medias loaded");
		},

		correct: function() {
			this.correctAudio.play();
		},

		wrong: function() {
			this.wrongAudio.play();
		},

		timeRunningOut: function() {
			this.timeRunningOutAudio.play();
		},

		timeOut: function() {
			this.timeOutAudio.play();
		},

		destroy: function() {
			console.info("Releasing medias");
			this.correctAudio.release();
			this.wrongAudio.release();
			this.timeRunningOutAudio.release();
			this.timeOutAudio.release();
			console.info("Medias released");
		}
	}
});
