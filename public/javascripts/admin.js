/*
requires: 
-jquery.js
-jPlayer.js
-stylesheet - es-exercise.css
example: super-ex.html
*/

$(document).ready(function() { 
	$("body").append('<div id="cJp"></div>');
	$("#cJp").jPlayer( {swfPath: "/javascripts/"}); //, nativeSupport: false
});



var tJplayer=false;

function cJplayer(link,el) {

var prevEl = tJplayer;
var curEl = el;

if ( curEl != prevEl) {
	$(prevEl).attr("status", 0).removeClass("jp_play").removeClass("jp_pause");;
}

tJplayer = el;
var tEl = $(el);
var tElStatus = $(el).attr("status");
var containerJp = $("#cJp");
tEl.removeClass("jp_play").removeClass("jp_pause");
	if ( tElStatus == "0" || tElStatus == undefined ) { // start sound if sound is not in progress (0,2)
		tEl.attr("status", "1").addClass("jp_pause"); // show that sound is in progress 
		containerJp.jPlayer("setFile", link ).jPlayer("play").jPlayer("onProgressChange", function() { return false}).jPlayer( "onSoundComplete", function() {  // start sound 
			tEl.attr("status", "0").removeClass("jp_pause").removeClass("jp_play");  										// reset status at the end of sound, show 'play'
		} )
	} else if ( tElStatus == "2") {   					// if this sound is paused  (2)
		tEl.attr("status", "1").addClass("jp_pause"); 	// show that sound is in progress 
		containerJp.jPlayer("play");
	} else {											// if sound is in progress (1)
		tEl.attr("status", "2").addClass("jp_play");  		
		containerJp.jPlayer( "pause" );
	}
}