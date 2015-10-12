/*
requires: 
for sounds:
- jquery.jplayer.min.js
- jp-control.js

skin: 
- flash-simple.css

*/

$(function() {
	$(".fs-btn").mousedown(function(){
		$(this).addClass("fs-btn-down");
	}).mouseup(function(){
		$(this).removeClass("fs-btn-down");
	})
	$(".fs-container .tb_settings").toggle(function(){
			$(this).addClass("tb_set_on").parent().find(".tb_settings-wrap").show(400)
		},function(){
			$(this).removeClass("tb_set_on").parent().find(".tb_settings-wrap").hide(400)
	})
	$(".fs-container .opt-autoplays div span").click(function() {
		$(this).parent("div").parent("div").find(".checked").removeClass("checked");
		$(this).addClass("checked");
	});


});


function flash_show(hash) {

var tObj = this;
this.basicArray = hash['basic_array'];
this.id = hash['id']; 
this.origSize = hash['orig_size']; // options "big" / "small"
this.images = hash['images'];      // default - 0, no images
this.sounds = hash['sounds'];	   // default - 1, with sounds
this.transcribe = hash['transcribe'];
this.autoPlayData = hash['autoplay'];
this.counter = 0;
this.autoPlay = 0;
this.callback = hash['callback'];

if (this.images == undefined) this.images = 0;
if (this.sounds == undefined) this.sounds = 1;
if (this.transcribe == undefined) this.transcribe = 1;
if (this.autoPlayData == undefined) this.autoPlayData = 1;
if (this.callback == undefined) this.callback = function() {return false};

this.parseTest = function() {
	tObj.container = $("#"+tObj.id);
	tObj.contentHolder = tObj.container.find(".fs-container");
	tObj.originHolder = tObj.container.find(".fs-original");
	tObj.soundHolder = tObj.container.find(".fs-sound");
	tObj.transcriptHolder = tObj.container.find(".fs-transcript");
	tObj.translateHolder = tObj.container.find(".fs-translate");
	tObj.pictureHolder = tObj.container.find(".fs-picture");	
	tObj.articleHolder = tObj.container.find(".fs-article-wrapper");
	tObj.nextButton = tObj.container.find(".fs-next");
	tObj.prevButton = tObj.container.find(".fs-prev");
	tObj.controlBtns=tObj.nextButton.add(tObj.prevButton);
	tObj.showCount = tObj.container.find(".fs-show-count");
	tObj.autoPlayOn = tObj.container.find(".opt-autoplay_on");
	tObj.autoPlayOff = tObj.container.find(".opt-autoplay_off");
	tObj.transcribeOn = tObj.container.find(".opt-transcribe_on");
	tObj.transcribeOff = tObj.container.find(".opt-transcribe_off");
	tObj.transcribeButtons = tObj.transcribeOn.add(tObj.transcribeOff);
	tObj.vocLen = tObj.basicArray.length
	tObj.prevButton.click(function() {
		tObj.prev();
	});	
	
	if ($.browser.msie) {
		tObj.container.addClass("msie-sucks"); 
		if ($.browser.version < 8) tObj.container.addClass("msie7-sucks");
		if ($.browser.version < 9) tObj.container.addClass("msie8-sucks");
	}
	
	tObj.nextButton.click(function() {
		tObj.next();
	});	
	
	tObj.transcribeButtons.click(function(){
		tObj.transcribeButtons.removeClass("checked");
		$(this).addClass("checked");
		if (tObj.transcribeOn.hasClass("checked")) {
			tObj.transcriptHolder.show();
		} else {
			tObj.transcriptHolder.hide();
		}
	});	
	
	if (tObj.transcribe==0) {
		tObj.transcribeOff.click();
	}else{
		tObj.transcribeOn.click();
	}
	
	if (tObj.origSize == "small") tObj.originHolder.addClass("fs-original-small");
	if (tObj.origSize == "big") tObj.originHolder.addClass("fs-original-big");
	if (tObj.images!=0) tObj.container.addClass("fs-with-img");
	if (tObj.sounds==0) tObj.container.addClass("fs-no-sound");
	
	tObj.passage();
	
	tObj.autoPlay = tObj.autoPlayData;
	if (tObj.autoPlay==1) {
		tObj.autoPlayOn.click();
	} else {
		tObj.autoPlayOff.click();
	}

	if (tObj.images!=0) {
	    for (var i=0; i < tObj.basicArray.length; i++) {
			var img_url  = $.trim(tObj.basicArray[i]["img"])
			if ( img_url!=undefined && img_url!="") {
				$.get(img_url);
			}
		}
	}	
}


this.passage = function() {

	if ( tObj.autoPlayOn.hasClass("checked")) {
		tObj.autoPlay = 1;
	} else {
			tObj.autoPlay = 0;
	}
	tObj.originHolder.html(tObj.basicArray[tObj.counter]["origin"]);
	tObj.translateHolder.html(tObj.basicArray[tObj.counter]["translate"]);
	var trans = $.trim(tObj.basicArray[tObj.counter]["transcript"]);
	tObj.transcriptHolder.html("["+trans+"]");
	if (tObj.images!=0) {
		var img_url = $.trim(tObj.basicArray[tObj.counter]["img"]);
		if (img_url!=undefined && img_url!="") {
			//alert("'"+img_url+"'")
			tObj.pictureHolder.html('<img src="'+tObj.basicArray[tObj.counter]["img"]+'"/>');
		} else {
			tObj.pictureHolder.html('no image :(');
		}
	}
	if (tObj.sounds!=0) {
		var sound_url = $.trim(tObj.basicArray[tObj.counter]["sound"]);
		if (sound_url!=undefined && sound_url!="") {
			tObj.soundHolder.html('<div onclick="cJplayer(\''+tObj.basicArray[tObj.counter]["sound"]+'\', this)" class="jp_control"><\/div>')
		} else {
			tObj.soundHolder.empty()
		}
		if (tObj.autoPlay == 1) tObj.soundHolder.find(".jp_control").click();
	}
	tObj.showCount.html(tObj.counter+1+"/"+tObj.vocLen)
	fixAccents(tObj.articleHolder)
}

this.next = function() {
	tObj.controlBtns.removeClass("fs-btn-disabled");
	if (tObj.counter < tObj.vocLen-1) {
		tObj.counter = tObj.counter +1
		tObj.passage();		
	} 
	if (tObj.counter > tObj.vocLen-2) {
		tObj.nextButton.addClass("fs-btn-disabled");
		tObj.callback();
	}
}

this.prev = function() {
	tObj.controlBtns.removeClass("fs-btn-disabled");	
	
	if (tObj.counter > 0) {
		tObj.counter = tObj.counter -1
		tObj.passage();	
	} 
	if (tObj.counter < 1) {
		tObj.prevButton.addClass("fs-btn-disabled");
	}
}

$(document).ready(function() {
	tObj.parseTest();
});

}

function fixAccents(container) {
		if ( getCookie('accent_on') ) {
			if (getCookie('accent_adjust')) {
				container.find("span.acco").each(function(){
					var tVal = $(this).text().replace(/[?]/g, "");
					$(this).html("&#769;" + tVal);
				});
			} else {
			container.find("span.acco").each(function(){
				var tVal = $(this).text().replace(/[?]/g, "");
				$(this).html( tVal + "&#769;");
			});
			}
		}
		if(getCookie('accent_un')) {
			container.find("span.acco").each(function(){
				var tVal = $(this).text().replace(/[?]/g, "")
				$(this).html("<u>" + tVal + "<\/u>");
			});
		}
		if(getCookie('softness')) {
			container.find("span.sfts").remove();
			container.find("span.sfty").remove();
			container.find("span.sftc, span.sftv").after("<span class=\"sfts\">\'<\/span>");
		}
}