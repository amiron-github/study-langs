function jp_player(hash) {
	var t = this;
	t.id = hash['id'];
	t.files = hash['files'];
	t.tracks = hash['tracks'];
	t.interfaceId = t.id + "_container";
	t.itemsClass = hash['items_class'];
	t.currentClass = hash['current_class'];
	t.supplied = hash['supplied'];
	t.solution = hash['solution'];

	if (t.currentClass == undefined) {
		t.currentClass = "current_track"
	};
	if (t.itemsClass == undefined) {
		t.itemsClass = "jsp_item"
	};
	if (t.supplied == undefined) {
		t.supplied = "m4a, mp3"
	};

	if (t.tracks == undefined) {
		t.tracks = [0]
	};

	if (t.solution == undefined) {
		t.solution = "html, flash"
	};

	this.start = function() {
		t.container = $("#" + t.id);
		t.player = t.container.find(".jp-jplayer");
		t.interface = t.container.find(".jp-audio");
		t.interface.attr("id", t.interfaceId);
		t.items = t.container.find("." + t.itemsClass);
		t.player.jPlayer({
			ready: function(event) {
				$(this).jPlayer("setMedia", {
					m4a: t.files['m4a'],
					mp3: t.files['mp3']
				});
			},
			swfPath: "/javascripts/",
			cssSelectorAncestor: "#" + t.interfaceId,
			supplied: t.supplied,
			solution: t.solution,
			timeupdate: function(event) {
				t.showCurrent(event.jPlayer.status.currentTime)
			},
			wmode: "window",
			useStateClassSkin: true
		});

	}

	this.showCurrent = function(time) {
		var currentTrack = -1;
		$.each(t.tracks, function(index, value) {
			if (time >= value) {
				if (index != t.tracks.length - 1) {
					if (time < t.tracks[index + 1]) currentTrack = index;
				} else if (index == t.tracks.length - 1) {
					currentTrack = index;
				};
			}
		})
		$("#track").text(currentTrack + 1);
		$("#info").text(time.toFixed(2));

		t.items.removeClass(t.currentClass);
		if (currentTrack >= 0) t.items.eq(currentTrack).addClass(t.currentClass);
	}

	$(function() {
		t.start();
	});

}

$(function() { 
	$("body").append('<div id="soundJp"></div>');
	$("#soundJp").jPlayer( {solution: 'html, flash', swfPath:"/javascripts/"});
});


function playFile(sound) {
	var containerJp = $("#soundJp");
	containerJp.jPlayer("setMedia", {mp3: sound})
	containerJp.jPlayer("play");
}

function playSound(sound) {
	playFile("/sounds/"+sound)
}

function playAudio(sound) {
	playFile("/audios/"+sound)
}
