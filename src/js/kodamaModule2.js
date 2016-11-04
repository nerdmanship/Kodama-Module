var kodama = {
	sfx: {
		ambient: document.createElement('audio'),
		spin1: document.createElement('audio'),
		spin2: document.createElement('audio'),
		spin3: document.createElement('audio'),
		setAudio: function() {
			var audio = this.abmient;
			if (Modernizr.audio.ogg) {
				this.ambient.src = 'audio/ambient.ogg';
				this.spin1.src = 'audio/spin.ogg';
				this.spin2.src = 'audio/spin.ogg';
				this.spin3.src = 'audio/spin.ogg';
			} else {
				this.ambient.src = 'audio/ambient.m4a';
				this.spin1.src = 'audio/spin.m4a';
				this.spin2.src = 'audio/spin.m4a';
				this.spin3.src = 'audio/spin.m4a';
			}
			this.ambient.volume = 0.05;
			this.ambient.loop = true;
		},
		playAmbient: function() {
			this.ambient.play();
		}
	},
	timelines: {
		mainTl: new TimelineMax()
	},
	init: function() {
		this.cacheDOM();
		this.bindEvents();
		this.setStartValues();
		this.sfx.setAudio();
		this.start();
	},
	cacheDOM: function() {
		this.svg = select("#kodama");
		this.layers = this.svg.getElementsByClassName("layer");
		this.kodama = this.svg.getElementsByClassName("kodama");
		this.head1 = this.svg.getElementById("kodamaHead1");
		this.head2 = this.svg.getElementById("kodamaHead2");
		this.head3 = this.svg.getElementById("kodamaHead3");
	},
	bindEvents: function() {
		// Add a headSpin button
	},
	setStartValues: function() {
		for (var i = 0; i<this.layers.length; i++) {
			TweenMax.set(this.layers[i], {y: -i*150});			
		}
	},
	start: function() {
			this.mainTl();
			this.sfx.playAmbient();
	},
	mainTl: function() {
		this.timelines.mainTl.add("start")
			// Add bg runners
			.to(this.layers, 15, {y:0, ease: Power3.easeOut})
			.to(this.kodama[1], 3, { autoAlpha: 1, ease: Power3.easeOut}, 7)
			.to(this.kodama[2], 3, { autoAlpha: 1, ease: Power3.easeOut}, 9.5)
			.to(this.kodama[0], 3, { autoAlpha: 1, ease: Power3.easeOut}, 10.5)
			.call(this.spinHeads, [""], this, 18);
			// Add msg reveal
	},
	spinHeads: function() {
		var tl = new TimelineMax();
		tl.add("spin1")
			.to(this.head1, 2, {rotation: 90, transformOrigin: "center center"}, "spin1")
			.to(this.head1, 2, {rotation: 0, ease: Elastic.easeOut.config(1.5, 0.1), transformOrigin: "center center"}, "spin1 =+2")
			.call(this.replayAudio, [this.sfx.spin1], this, "spin1")
		.add("spin2", 2)
			.to(this.head2, 2, {rotation: 90, transformOrigin: "center center"}, "spin2")
			.to(this.head2, 2, {rotation: 0, ease: Elastic.easeOut.config(1.5, 0.1), transformOrigin: "center center"}, "spin2 =+2")
			.call(this.replayAudio, [this.sfx.spin2], this, "spin2")
		.add("spin3", 2.3)
			.to(this.head3, 2, {rotation: 90, transformOrigin: "center center"}, "spin3")
			.to(this.head3, 2, {rotation: 0, ease: Elastic.easeOut.config(1.5, 0.1), transformOrigin: "center center"}, "spin3 =+2")
			.call(this.replayAudio, [this.sfx.spin3], this, "spin3")
			;
	},
	replayAudio: function(audio) {
		audio.currentTime = 0;
		audio.play();
	},
	toggleAudio: function() {
		var now = kodama.timelines.mainTl.time();
		kodama.sfx.ambient.currentTime = now;
		kodama.sfx.ambient.play();
	}
};