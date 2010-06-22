

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

this.shownTrack = -1;
this.currentTrack = 0;

this.status = "ready";

var tObj = this; 


this.start = function () {

$("#d_inf").text("0");

	tObj.container = $("#"+tObj.id);
	tObj.playButton = tObj.container.find("div.dt_play");
	tObj.rewindButton = tObj.container.find("div.dt_rewind");
	tObj.forwardButton = tObj.container.find("div.dt_fast-forward");
	tObj.jplayer = $("#cJp");
	
	tObj.playButton.click(function() {
		if (tObj.status == "ready") {
			tObj.play();
		} else if (tObj.status == "paused") {
			tObj.continuePlay();
		} else {               // if status "playing"
			tObj.pause();
		}
	});
	
	
	
	tObj.rewindButton.click(function() {
	
	
		return false;
		var prevTrack = tObj.currentTrack -1;
		var prevStart = tObj.tracks[prevTrack];
		var prevEnd = tObj.tracks[tObj.currentTrack];
		
		
	
		tObj.jplayer.jPlayer("playHeadTime", prevStart);
		
		//alert(prevStart);
		
		tObj.getCurrentPlayed();
		tObj.showPlayingTrack();
		
		
	
	
	});


}
	
this.play = function () {
	
	tObj.status = "playing";
	tObj.container.find(".jp_control").css({visibility: "hidden"});
	tObj.jplayer.jPlayer("setFile", tObj.file ).jPlayer("play").jPlayer("onProgressChange", function(lp,ppr,ppa,pt,tt) {
		
		tObj.getCurrentPlayed();
		tObj.showPlayingTrack();
		
		$("#d_inf").text(pt);
	}).jPlayer( "onSoundComplete", function() {  
		tObj.container.find(".current_track").removeClass("current_track");
		tObj.status = "ready";
		tObj.container.find(".jp_control").css({visibility: "visible"});
	} );
}

this.continuePlay = function () {
	tObj.status = "playing";
	tObj.jplayer.jPlayer("play");
}

this.pause = function () {
	tObj.status = "paused";
	tObj.jplayer.jPlayer("pause");
}


this.showPlayingTrack = function ()  {

	var current = tObj.currentTrack;
	if (tObj.shownTrack != current ) {
		tObj.shownTrack = current;
		tObj.container.find(".current_track").removeClass("current_track");
		
		tObj.container.find("tr.trow").filter(":eq("+current+")").addClass("current_track")
	}
}



this.getCurrentPlayed = function() {

	var pt = tObj.jplayer.jPlayer("getData", "diag.playedTime");
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


/*

// Local copy of jQuery selectors, for performance.
	var jpPlayTime = $("#jplayer_play_time");
	var jpTotalTime = $("#jplayer_total_time");
	var jpStatus = $("#demo_status"); // For displaying information about jPlayer's status in the demo page
 
	$("#jquery_jplayer").jPlayer({
		ready: function() {
			displayPlayList();
			playListInit(true); // Parameter is a boolean for autoplay.
			demoInstanceInfo(this.element, $("#demo_info")); // This displays information about jPlayer's configuration in the demo page
		},
		oggSupport: true
	})
	.jPlayer("onProgressChange", function(loadPercent, playedPercentRelative, playedPercentAbsolute, playedTime, totalTime) {
		jpPlayTime.text($.jPlayer.convertTime(playedTime));
		jpTotalTime.text($.jPlayer.convertTime(totalTime));
 
		demoStatusInfo(this.element, jpStatus); // This displays information about jPlayer's status in the demo page
	})
	.jPlayer("onSoundComplete", function() {
		playListNext();
	});
 
	$("#jplayer_previous").click( function() {
		playListPrev();
		$(this).blur();
		return false;
	});
 
	$("#jplayer_next").click( function() {
		playListNext();
		$(this).blur();
		return false;
	});
 
	function displayPlayList() {
		$("#jplayer_playlist ul").empty();
		for (i=0; i < myPlayList.length; i++) {
			var listItem = (i == myPlayList.length-1) ? "<li class='jplayer_playlist_item_last'>" : "<li>";
			listItem += "<a href='#' id='jplayer_playlist_item_"+i+"' tabindex='1'>"+ myPlayList[i].name +"</a></li>";
			$("#jplayer_playlist ul").append(listItem);
			$("#jplayer_playlist_item_"+i).data( "index", i ).click( function() {
				var index = $(this).data("index");
				if (playItem != index) {
					playListChange( index );
				} else {
					$("#jquery_jplayer").jPlayer("play");
				}
				$(this).blur();
				return false;
			});
		}
	}
 
	function playListInit(autoplay) {
		if(autoplay) {
			playListChange( playItem );
		} else {
			playListConfig( playItem );
		}
	}
 
	function playListConfig( index ) {
		$("#jplayer_playlist_item_"+playItem).removeClass("jplayer_playlist_current").parent().removeClass("jplayer_playlist_current");
		$("#jplayer_playlist_item_"+index).addClass("jplayer_playlist_current").parent().addClass("jplayer_playlist_current");
		playItem = index;
		$("#jquery_jplayer").jPlayer("setFile", myPlayList[playItem].mp3, myPlayList[playItem].ogg);
	}
 
	function playListChange( index ) {
		playListConfig( index );
		$("#jquery_jplayer").jPlayer("play");
	}
 
	function playListNext() {
		var index = (playItem+1 < myPlayList.length) ? playItem+1 : 0;
		playListChange( index );
	}
 
	function playListPrev() {
		var index = (playItem-1 >= 0) ? playItem-1 : myPlayList.length-1;
		playListChange( index );
	}
});




*/

















