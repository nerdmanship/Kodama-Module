var kodama=function(){function e(){a(),t(),o()}function a(){svg=select("#kodama"),layers=svg.getElementsByClassName("layer"),kodama=svg.getElementsByClassName("kodama"),head1=svg.getElementById("kodamaHead1"),head2=svg.getElementById("kodamaHead2"),head3=svg.getElementById("kodamaHead3")}function t(){select("#button").addEventListener("click",n)}function n(){i(),s()}function o(){for(var e=0;e<layers.length;e++)TweenMax.set(layers[e],{y:150*-e})}function i(){var e=m;Modernizr.audio.ogg?(m.src="audio/ambient.ogg",l.src="audio/spin.ogg",g.src="audio/spin.ogg",p.src="audio/spin.ogg"):(m.src="audio/ambient.m4a",l.src="audio/spin.m4a",g.src="audio/spin.m4a",p.src="audio/spin.m4a"),m.volume=.05,m.loop=!0}function s(){r(),c()}function r(){f.add("start").to(layers,15,{y:0,ease:Power3.easeOut}).to(kodama[1],3,{autoAlpha:1,ease:Power3.easeOut},7).to(kodama[2],3,{autoAlpha:1,ease:Power3.easeOut},9.5).to(kodama[0],3,{autoAlpha:1,ease:Power3.easeOut},10.5).call(d,[""],this,18)}function c(){m.play()}function d(){h.add("spin1").to(head1,2,{rotation:90,transformOrigin:"center center"},"spin1").to(head1,2,{rotation:0,ease:Elastic.easeOut.config(1.5,.1),transformOrigin:"center center"},"spin1 =+2").call(u,[l],this,"spin1").add("spin2",2).to(head2,2,{rotation:90,transformOrigin:"center center"},"spin2").to(head2,2,{rotation:0,ease:Elastic.easeOut.config(1.5,.1),transformOrigin:"center center"},"spin2 =+2").call(u,[g],this,"spin2").add("spin3",2.3).to(head3,2,{rotation:90,transformOrigin:"center center"},"spin3").to(head3,2,{rotation:0,ease:Elastic.easeOut.config(1.5,.1),transformOrigin:"center center"},"spin3 =+2").call(u,[p],this,"spin3")}function u(e){e.currentTime=0,e.play()}var m=document.createElement("audio"),l=document.createElement("audio"),g=document.createElement("audio"),p=document.createElement("audio"),f=new TimelineMax,h=new TimelineMax;return e(),{}}();