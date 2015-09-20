var jpc_style =""
+"<style type='text/css'> "
+".jp_control {width: 16px;height: 16px;background-image: url(/images/control_play.png);background-repeat: no-repeat;cursor: pointer;}"
+".jp_control:hover {background-image: url(/images/c_play_hover.png);}"
+".jp_pause {background-image: url(/images/control_pause.png) !important;}"
+"</style>"
$(document).ready(function() { 
	$("head").append(jpc_style);
	$("body").append('<div id="cJp"></div>');
	$("#cJp").jPlayer( {solution: 'html, flash', swfPath:"/javascripts/"});
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
containerJp.unbind($.jPlayer.event.ended+ ".jp-end");
mediaData = containerJp.data('jPlayer')
	if ( tElStatus == "0" || tElStatus == undefined ) {          	
		tEl.attr("status", "1").addClass("jp_pause"); 		
		containerJp.jPlayer("setMedia", {mp3: link})
		containerJp.jPlayer("play");
		containerJp.bind($.jPlayer.event.ended+ ".jp-end", function(event) { 
				tEl.attr("status", "0").removeClass("jp_pause").removeClass("jp_play");
		});
	} else if ( tElStatus == "2") {   					
		tEl.attr("status", "1").addClass("jp_pause"); 
		containerJp.jPlayer("play");
		containerJp.bind($.jPlayer.event.ended+ ".jp-end", function(event) { 
				tEl.attr("status", "0").removeClass("jp_pause").removeClass("jp_play");
		});
	} else {											
		tEl.attr("status", "2").addClass("jp_play");  
		containerJp.jPlayer( "pause" );
	}
}