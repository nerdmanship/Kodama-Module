var kodamaModal = (function(){
  var ambient = document.createElement('audio'),
  spin1 = document.createElement('audio'),
  spin2 = document.createElement('audio'),
  spin3 = document.createElement('audio'),
  mainTl = new TimelineMax(),
  spinTl = new TimelineMax();
  
  function init() {
    cacheDOM();
    bindEvents();
    setStartValues();
    setAudio();
    if (!Modernizr.touch) {
      playAudioButton.style.display = 'none';
      start();
    }
    if (powerCPU) {
      initBunos();
    }
  }

  function cacheDOM() {
    svg = select("#kodama");
    layers = svg.getElementsByClassName("layer");
    kodama = svg.getElementsByClassName("kodama");
    head1 = svg.getElementById("kodamaHead1");
    head2 = svg.getElementById("kodamaHead2");
    head3 = svg.getElementById("kodamaHead3");
    playAudioButton = select("#button");
  }

  function bindEvents() {
    // Add a headSpin button
    select("#button").addEventListener("click", mobileStart);
  }

  function setStartValues() {
    for (var i = 0; i<layers.length; i++) {
      TweenMax.set(layers[i], {y: -i*150});     
    }
  }

  function setAudio() {
    var audio = ambient;
    
    if (Modernizr.audio.ogg) {
      ambient.src = 'audio/ambient.ogg';
      spin1.src = 'audio/spin.ogg';
      spin2.src = 'audio/spin.ogg';
      spin3.src = 'audio/spin.ogg';
    } else {
      ambient.src = 'audio/ambient.m4a';
      spin1.src = 'audio/spin.m4a';
      spin2.src = 'audio/spin.m4a';
      spin3.src = 'audio/spin.m4a';
    }
      ambient.volume = 0.05;
      ambient.loop = true;
  }

  function start() {
      ambient.play();
      playMainTl();
  }

  function mobileStart() {
    spin1.load();
    spin2.load();
    spin3.load();
    
    ambient.load();
    ambient.loadeddata = start();
  }

  function playMainTl() {
    mainTl.add("start")
      // Add bg runners
      .to(layers, 15, {y:0, ease: Power3.easeOut})
      .to(kodama[1], 3, { autoAlpha: 1, ease: Power3.easeOut}, 7)
      .to(kodama[2], 3, { autoAlpha: 1, ease: Power3.easeOut}, 9.5)
      .to(kodama[0], 3, { autoAlpha: 1, ease: Power3.easeOut}, 10.5)
      .call(spinHeads, [""], this, 18);
      // Add msg reveal
  }

  function spinHeads() {
    spinTl.add("spin1")
      .to(head1, 2, {rotation: 90, transformOrigin: "center center"}, "spin1")
      .to(head1, 2, {rotation: 0, ease: Elastic.easeOut.config(1.5, 0.1), transformOrigin: "center center"}, "spin1 =+2")
      .call(playSpin, [spin1], this, "spin1")
    .add("spin2", 2)
      .to(head2, 2, {rotation: 90, transformOrigin: "center center"}, "spin2")
      .to(head2, 2, {rotation: 0, ease: Elastic.easeOut.config(1.5, 0.1), transformOrigin: "center center"}, "spin2 =+2")
      .call(playSpin, [spin2], this, "spin2")
    .add("spin3", 2.3)
      .to(head3, 2, {rotation: 90, transformOrigin: "center center"}, "spin3")
      .to(head3, 2, {rotation: 0, ease: Elastic.easeOut.config(1.5, 0.1), transformOrigin: "center center"}, "spin3 =+2")
      .call(playSpin, [spin3], this, "spin3")
      ;
  }

  function playSpin(audio) {
    audio.currentTime = 0;
    audio.play();
  }

  function initBonus() {
    console.log("SWEEEET!!");
  }
  
  init();

  return {
    // API

  };

})();
