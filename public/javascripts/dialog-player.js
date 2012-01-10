var msie9_style =""
+"<style type='text/css'> "
+".dt_controls td .jp_pause {background-image: url(/images/icons/icons-24/pause.png) !important;}"
+"</style>"

function msie9() {
	if ($.support.leadingWhitespace && $.browser.msie) {
return true
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

this.msie9Sucks = function () {
	tObj.container = $("#"+tObj.id);
	tObj.playButton = tObj.container.find("div.dt_play");
	tObj.buttons = tObj.container.find(".dt_controls td div");
	tObj.buttons.not(tObj.playButton).css({visibility: "hidden"});

	tObj.playButton.click(function(){
		cJplayer(tObj.file, this)
	})
	
	tObj.container.addClass("dt_ready");
	$("head").append(msie9_style);
	tObj.playButton.after('<div style="position: absolute; margin: -25px 0 0 30px; padding: 2px 3px; font-size:9px; white-space:nowrap">Limited functionality in IE9<br>Use Chrome, FF, Safari or Opera')
}
 
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
	tObj.status = "playing"; 
	tObj.container.removeClass("dt_ready").removeClass("dt_paused");
	tObj.playButton.addClass("dt_pause");
	tObj.jplayer.jPlayer("playHeadTime", time ).jPlayer("onProgressChange", function(lp,ppr,ppa,pt,tt) {
		tObj.playedTime = pt;
		tObj.getCurrentPlayed();
		tObj.showPlayingTrack();
		//tObj.container.find("div.dt_inf").text(pt);
	}).jPlayer( "onSoundComplete", function() {
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
		tObj.container.find("tr.drow").filter(":eq("+current+")").addClass("current_track");
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
	if (msie9() )  {
		tObj.msie9Sucks();
	}else {
		tObj.start();
    }
})

}



















