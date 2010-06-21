

$(document).ready(function() {

$("#jpId").jPlayer( {swfPath: "/javascripts/"});

$("body").append('<div id="cJp"></div>');

$("#cJp").jPlayer( {swfPath: "/javascripts/"});

});


/* example playJplayer('/sounds/sound101.mp3')    */



function startJplayer(link) {
	//if (tJplayer) tJplayer.attr("status", 0 );

	$("#s-inf").text("Song Start");
	$("#jpId").jPlayer("setFile", link ).jPlayer("play").jPlayer( "onSoundComplete", function() {return false;} )
}

function pauseJplayer() {
	$("#s-inf").text("Song Paused");
	$("#jpId").jPlayer( "pause" );
}



var tJplayer=false;

function cJplayer(link,el) {

var prevEl = tJplayer;
var curEl = el;

if ( curEl != prevEl) {
	$(prevEl).attr("status", 0).val("play");
}

tJplayer = el;

var tEl = $(el);
var tElStatus = $(el).attr("status");
var containerJp = $("#cJp");

	if ( tElStatus == "0" || tElStatus == undefined ) { // start sound if sound is not in progress (0,2)
		tEl.attr("status", "1").val("pause"); // show that sound is in progress 
		
		containerJp.jPlayer("setFile", link ).jPlayer("play").jPlayer( "onSoundComplete", function() {  // start sound 
			tEl.attr("status", "0").val("play");  														// reset status at the end of sound
		} )
	} else if ( tElStatus == "2") {   					// if this sound is paused  (2)

		tEl.attr("status", "1").val("pause"); 			// show that sound is in progress 
		containerJp.jPlayer("play");
	} else {											// if sound is in progress (1)

		tEl.attr("status", "2").val("play");  				 	
		containerJp.jPlayer( "pause" );
	}
	


}