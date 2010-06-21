

$(document).ready(function() {
	$("#jpId").jPlayer( {swfPath: "/javascripts/"});
});


/* example playJplayer('/sounds/sound101.mp3')    */


function startJplayer(link) {
	$("#s-inf").text("Song Start");
	$("#jpId").jPlayer("setFile", link ).jPlayer("play").jPlayer( "onSoundComplete", function() { $("#s-inf").text("End of song")} )
}

function pauseJplayer() {
	$("#s-inf").text("Song Paused");
	$("#jpId").jPlayer( "pause" );
}



function playJplayer(link,el) {

//alert( $(el).attr("status") )

	if ($(el).attr("status") == "0" || $(el).attr("status") == undefined ) { // start sound if sound is not in progress (0,2)
	

	
		$(el).attr("status", "1").val("pause"); // show that sound is in progress 
		$("#s-inf").text("Playing");
		
		$("#jpId").jPlayer("setFile", link ).jPlayer("play").jPlayer( "onSoundComplete", function() {  // start sound 
			
			$(el).attr("status", "0").val("play");  // reset status at the end of sound
			$("#s-inf").text("End of song");
			
		} )
	} else if ($(el).attr("status") == "2") {   // if this sound is paused  (2)
	

	
		$(el).attr("status", "1").val("pause"); // show that sound is in progress 
		$("#s-inf").text("Playing");            // restart the sound
		
		$("#jpId").jPlayer("play");
	} else {									// if sound is in progress (1)

		$(el).attr("status", "2").val("play");  // 
		$("#s-inf").text("Song Paused");
		$("#jpId").jPlayer( "pause" );
	}
	


}