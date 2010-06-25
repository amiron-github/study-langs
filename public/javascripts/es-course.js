

$(document).ready(function() {

$("#jpId").jPlayer( {swfPath: "/javascripts/"});

$("body").append('<div id="cJp"></div>');

$("#cJp").jPlayer( {swfPath: "/javascripts/"});


$(".jp_controls").toggle(function() {
	$(this).addClass("jp_paused")
		}, function() {
	$(this).removeClass("jp_paused")
});



});



$(document).ready(function() { 
    $("table.es-words-list").tablesorter({ headers: {0:{sorter: false}}, widgets: ['zebra'] });
});


/* example playJplayer('/sounds/sound101.mp3')    */



function startJplayer(link,time) {
	//if (tJplayer) tJplayer.attr("status", 0 );

	$("#s-inf").text("Song Start");
	$("#jpId").jPlayer("setFile", link ).jPlayer("play").jPlayer("pause").jPlayer("playHeadTime", time).jPlayer( "onSoundComplete", function() {return false;} )
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
	$(prevEl).attr("status", 0).removeClass("jp_play").removeClass("jp_pause");;
}

tJplayer = el;
var tEl = $(el);
var tElStatus = $(el).attr("status");
var containerJp = $("#cJp");
tEl.removeClass("jp_play").removeClass("jp_pause").attr("title", "Click to Play");
	if ( tElStatus == "0" || tElStatus == undefined ) { // start sound if sound is not in progress (0,2)
		tEl.attr("status", "1").addClass("jp_pause").attr("title", "Click to Pause"); // show that sound is in progress 
		containerJp.jPlayer("setFile", link ).jPlayer("play").jPlayer("onProgressChange", function() { return false}).jPlayer( "onSoundComplete", function() {  // start sound 
			tEl.attr("status", "0").removeClass("jp_pause").removeClass("jp_play").attr("title", "Click to Play");  										// reset status at the end of sound, show 'play'
		} )
	} else if ( tElStatus == "2") {   					// if this sound is paused  (2)
		tEl.attr("status", "1").addClass("jp_pause").attr("title", "Click to Play"); 	// show that sound is in progress 
		containerJp.jPlayer("play");
	} else {											// if sound is in progress (1)
		tEl.attr("status", "2").addClass("jp_play").attr("title", "Click to Pause");  		
		containerJp.jPlayer( "pause" );
	}
}








function dialog_controls(hash) {

this.tracks = hash['tracks'];
this.file = hash['file'];
this.id = hash['id'];
this.playedTracks = new Array();
var tObj = this;

this.shownTrack = -1;
this.currentTrack = 0;
this.playedTime = 0;
this.status = "ready";
 
this.start = function () {

  $("body").append('<div id="'+tObj.id + '_player">');

	tObj.container = $("#"+tObj.id);
	tObj.playButton = tObj.container.find("div.dt_play");
	tObj.rewindButton = tObj.container.find("div.dt_rewind");
	tObj.forwardButton = tObj.container.find("div.dt_fast-forward");
	tObj.repeatButton = tObj.container.find("div.dt_repeat");
	tObj.stopButton = tObj.container.find("div.dt_stop");
	tObj.jplayer = $("#"+tObj.id + "_player");

 tObj.container.addClass("dt_ready");
	
	
tObj.jplayer.jPlayer( {
	ready: function () {
		tObj.jplayer.jPlayer("setFile", tObj.file );
	}, 
	swfPath: "/javascripts/",
	nativeSupport: false
});
	tObj.playButton.click(function() {
		if (tObj.status == "playing") tObj.pause();
		else tObj.play();         
	});
	tObj.stopButton.click(function() {
		tObj.stop();         
	});
	tObj.rewindButton.click(function() {
		tObj.rewind(); 
	});
	tObj.forwardButton.click(function() {
		tObj.forward();
	});
	tObj.repeatButton.click(function() {
		tObj.repeat();
	});


}
	
this.play = function (time) {
	if (!time) var time = tObj.playedTime;
	tObj.status = "playing"; tObj.container.removeClass("dt_ready").removeClass("dt_paused");
	tObj.playButton.addClass("dt_pause");
	tObj.jplayer.jPlayer("playHeadTime", time ).jPlayer("onProgressChange", function(lp,ppr,ppa,pt,tt) {
		tObj.playedTime = pt;
		tObj.getCurrentPlayed();
		tObj.showPlayingTrack();
		tObj.container.find("div.dt_inf").text(pt);
	})
	.jPlayer( "onSoundComplete", function() {
		tObj.stop();
	} );
	
}

this.playOneTrack = function (track) {
	tObj.status = "playing"; tObj.container.removeClass("dt_ready").removeClass("dt_paused");
	tObj.playButton.addClass("dt_pause");
	tObj.jplayer.jPlayer("playHeadTime", tObj.tracks[track] ).jPlayer("onProgressChange", function(lp,ppr,ppa,pt,tt) {
		tObj.playedTime = pt;
		if ( pt >= tObj.tracks[track + 1]) {
			tObj.pause();
			tObj.playedTime = tObj.playedTime - 100;
		}
	}).jPlayer( "onSoundComplete", function() {
		return false
		
	} );
}

this.rewind = function() {
	if ( tObj.currentTrack == 0) {
		return false;
	} else {
	tObj.jplayer.jPlayer("onProgressChange",function(lp,ppr,ppa,pt,tt){return false}).jPlayer("pause");
	tObj.playedTime = tObj.tracks[tObj.currentTrack - 1]
	tObj.playOneTrack( tObj.currentTrack - 1 );
	tObj.getCurrentPlayed();
	tObj.showPlayingTrack();
	}
}

this.forward = function() {
	if ( tObj.currentTrack == tObj.tracks.length - 1) {
		return false;
	} else {
		tObj.jplayer.jPlayer("onProgressChange",function(lp,ppr,ppa,pt,tt){return false}).jPlayer("pause");
		if (tObj.status == "ready") {
			tObj.playedTime = 0;
			tObj.playOneTrack( 0 );
		} else {
			tObj.playedTime = tObj.tracks[tObj.currentTrack + 1];
			tObj.playOneTrack( tObj.currentTrack + 1 );
		}
		tObj.getCurrentPlayed();
		tObj.showPlayingTrack();
	}
}

this.stop = function () {
	tObj.jplayer.jPlayer("onProgressChange", function(lp,ppr,ppa,pt,tt) {return false}).jPlayer("stop");
	tObj.playedTime = 0;
	tObj.shownTrack = -1;
	tObj.currentTrack = 0;
	tObj.container.find(".current_track").removeClass("current_track");
	tObj.status = "ready"; tObj.container.addClass("dt_ready").removeClass("dt_no_next").removeClass("dt_no_prev");
	tObj.playButton.removeClass("dt_pause");
}

this.pause = function () {
	tObj.status = "paused"; tObj.container.addClass("dt_paused");
	tObj.jplayer.jPlayer("pause");
	tObj.playButton.removeClass("dt_pause");
}

this.repeat = function() {
	if (tObj.status == "ready") {
		return false;
	} else {
		tObj.playOneTrack(tObj.currentTrack);
	}
}


this.showPlayingTrack = function ()  {
	var current = tObj.currentTrack;
	if (tObj.shownTrack != current ) {
		tObj.shownTrack = current;
		tObj.container.find(".current_track").removeClass("current_track");
		tObj.container.find("tr.trow").filter(":eq("+current+")").addClass("current_track");
		if (tObj.shownTrack == 0 ) {
			tObj.container.addClass("dt_no_prev");
		} else if ( tObj.shownTrack == tObj.tracks.length -1 ) {
			tObj.container.addClass("dt_no_next");
		} else {
			tObj.container.removeClass("dt_no_prev").removeClass("dt_no_next");
		}
	}
}


this.getCurrentPlayed = function() {
	var pt = tObj.playedTime;
	tObj.playedTracks = new Array();
	for (var i = 0; i < tObj.tracks.length; i ++) {
		if (pt >= tObj.tracks[i]) {
			tObj.playedTracks.push(i);
		}
	}
	tObj.currentTrack = tObj.playedTracks.pop();
}

$(document).ready(function() {
	tObj.start();
})

}



















