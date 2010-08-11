/*
requires: 
-jquery.js
-jPlayer.js
-stylesheet - es-exercise.css
example: super-ex.html
*/
/////////////////////////////////////////////////// 



$(document).ready(function() { 
	$("body").append('<div id="cJp"></div>');

	$("#cJp").jPlayer( {swfPath: "/javascripts/", nativeSupport: false}); //
	
	$(".diction ").find(".trow:odd").addClass("odd-dict");
	
	
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





function shuffle () {
    len = shuffle.arguments[0] || this.length;
    var sA = new Array();
    for (var i=0; i < this.length; i++) {
        sA[sA.length]=this[i];
    }
    var newArray = new Array();
    for (var i=0; i<len; i++) {
        var t = Math.round(Math.random()*(sA.length-1));
        newArray.push(sA[t]);
        sA.splice(t,1);
    }
    return newArray;
}

Array.prototype.shuffle = shuffle;

///////////////////////////////////////////


$(document).ready(function() {

$("body").append('<div id="exJp"></div>');
$("#exJp").jPlayer( {swfPath: "/javascripts/", nativeSupport: false});


$(".es-ex-audio-holder").mousedown(
	function() {
		$(this).addClass("ex-audio-holder-hover");
		return false;
	}).mouseup(function() {
		//$(this).removeClass("ex-audio-holder-hover");
	}
);

$(".es-ex-buttons input").hover(
	function(event) {
		$(this).addClass("ex-btn-hover");
		event.preventDefault();
	}, function(event) {
		$(this).removeClass("ex-btn-hover").removeClass("ex-btn-down");
	}).mousedown(function(event) {
		$(this).addClass("ex-btn-down");
		event.preventDefault();
	}).mouseup(function(event) {
		$(this).removeClass("ex-btn-down");
		event.preventDefault();
});
	
$(".es-ex-next").hover(
	function() {
		$(this).addClass("es-ex-next-hover");
	}, function() {
		$(this).removeClass("es-ex-next-hover");
	}).mousedown(function() {
		$(this).addClass("es-ex-next-down");
	}).mouseup(function() {
		$(this).removeClass("es-ex-next-down");
});

});


var exJplayer=false;
var exJpForce = false;

function ex_Jplayer(link,el,notPlay) {
	var prevEl = exJplayer;
	var curEl = el;
	if ( curEl != prevEl) {
		$(prevEl).attr("status", 0).removeClass("ex-audio-holder-hover");
	}
	exJplayer = el;
	var tEl = $(el);
	var tElStatus = $(el).attr("status");
	var containerJp = $("#exJp");
	if ( tElStatus == "0" || tElStatus == undefined || exJpForce) { // start sound if sound is not in progress ()
		tEl.attr("status", "0").removeClass("ex-audio-holder-hover").attr("title", "Click to Play");
		containerJp.jPlayer("setFile", link ).jPlayer("onProgressChange", function() { return false}).jPlayer( "onSoundComplete", function() {  // start sound 
			tEl.attr("status", "0").removeClass("ex-audio-holder-hover").attr("title", "Click to Play");  										// reset status at the end of sound, show 'play'
		} );
		if (notPlay != 1) {
			tEl.attr("status", "1").addClass("ex-audio-holder-hover").removeAttr("title"); // show or not that sound is in progress 
			containerJp.jPlayer("play");
		}
	} else {							
		return false;
	}
}



function ch_exercise(hash) {

this.basicArray = hash['basic_array'];
this.id = hash['id'];	
this.testID = hash['test_id'];				
this.autoPlay = hash['auto_play'];			// default - true, option: false
this.variantsNum = hash['variants_num'];	// default - 4
this.randomOrder = hash['random_order'];    // default - true, option: false
this.questType = hash['quest_type'];  		// default - html, options audio, image
this.answerType = hash['answer_type'];  	// default - variants, option: yn
this.texts = hash['texts'];					// default - english
this.questNum = hash['quest_num'];			// default - basic array length
this.mixBasic = hash['mix_basic'];			// default - false

var tObj = this;

if (this.questNum == undefined || this.questNum > this.basicArray.length ) this.questNum = this.basicArray.length;
if (this.randomOrder == undefined) this.randomOrder = true;
if (this.autoPlay == undefined) this.autoPlay = true;
if (this.mixBasic == undefined) this.mixBasic = true;  
if (this.questType == undefined) this.questType = 'html'; 
if (this.variantsNum == undefined) this.variantsNum = 4; 
if (this.variantsNum > this.questNum ) this.variantsNum = this.questNum;

if (tObj.texts == undefined) {
	tObj.correctMsg = "CORRECT";
	tObj.wrongMsg = "WRONG";
	tObj.nextButtonVal = "NEXT";
	tObj.seeResultsTxt = "See results";
	tObj.remainingTxt = "Remaining";
	tObj.totalQuestionsTxt = "Total questions";
	tObj.correctAnswersTxt = "Correct answers";
	tObj.yourResultTxt = "Your result";
} else {
	tObj.correctMsg = tObj.texts[0];
	tObj.wrongMsg = tObj.texts[1];
	tObj.nextButtonVal = tObj.texts[2];
	tObj.seeResultsTxt = tObj.texts[3];
	tObj.remainingTxt = tObj.texts[4];
	tObj.totalQuestionsTxt = tObj.texts[5];
	tObj.correctAnswersTxt = tObj.texts[6];
	tObj.yourResultTxt = tObj.texts[7];
}

this.counter = 0;
this.remain = 0;
this.workArray = new Array();
this.sounds = new Array;
this.translations = new Array();
this.straightOrderAnswers = new Array();
this.wrongAnswers=new Array();
this.wrongAswersNum=0;
this.correctAswersNum=0;

tObj.correctClass = "es-ex-alert-correct";
tObj.wrongClass = "es-ex-alert-wrong";

var toNextInt;
this.prevYnVariant = -1;

this.parseTest = function() {

	this.container = $("#"+tObj.id);
		tObj.contentHolder = tObj.container.find(".es-ex-content")
		tObj.audioHolder = tObj.container.find(".es-ex-audio-holder");
		tObj.stringHolder = tObj.container.find(".es-ex-string-wrapper");
		tObj.alertHolder = tObj.container.find(".es-ex-alert");
		tObj.infoHolder = tObj.container.find(".es-ex-info");
		
		tObj.nextButton = tObj.container.find(".es-ex-next");
		tObj.finalSign = tObj.container.find(".es-ex-final");
		tObj.startButton = tObj.container.find(".es-ex-start");
		tObj.optionsHolder = tObj.container.find(".es-ex-tasks");
		tObj.autoPlayBox = tObj.container.find(".es-ex-autoplay");
		tObj.autoPlayBoxContainer = tObj.container.find(".es-ex-autoplay-wrapper");
		
		tObj.ynContainer = tObj.container.find(".yn-answer-type");
			tObj.transHolder = tObj.container.find(".yn-trans");
			tObj.ynButtonsHolder = tObj.container.find(".yn-btns");
			tObj.ynButtons = tObj.ynButtonsHolder.find("input");
			tObj.yesButton = tObj.container.find("input.yn-yes");
			tObj.noButton = tObj.container.find("input.yn-no");
		
		if (tObj.answerType == 'yn') {
			tObj.ynContainer.show();
		}
		
		if (tObj.variantsNum > 4 || !tObj.randomOrder ) tObj.optionsHolder.addClass("es-ex-tasks-more-than-4");
		if (tObj.questType == 'audio') tObj.container.addClass("es-audio-ex");
		tObj.jplayer = $("#exJp");
		tObj.start();
}



this.start = function () {

		if( !tObj.autoPlay) tObj.nextButton.css({visibility: "visible"});
		
    	tObj.counter=0;
    	tObj.wrongAnswers=new Array();
    	tObj.wrongAswersNum=0;
    	tObj.correctAswersNum = 0;
		
		if (tObj.mixBasic) {
			tObj.workArray = tObj.basicArray.shuffle(tObj.questNum);
		}else{
			for (i = 0; i<tObj.questNum; i++ ) {
				tObj.workArray[i] = tObj.basicArray[i];
			}
		}
		
		if (!tObj.randomOrder) tObj.straightOrderAnswer = tObj.getAnswersOrder();
		
		clearTimeout(toNextInt);
		tObj.alertHolder.empty().removeClass(tObj.correctClass);
		tObj.container.removeClass("es-ex-final-bg");
		
		tObj.finalSign.hide();
		tObj.container.find(".es-ex-invisible").removeClass("es-ex-invisible");
		tObj.nextButton.val(tObj.nextButtonVal);
		
    	tObj.startButton.click(function() {
			tObj.restart();
			if (tObj.questType == 'audio') { 
				exJpForce = true;
				tObj.audioHolder.mousedown();
				exJpForce = false;
			}
		});
		
		tObj.nextButton.unbind("click").click(function() {
			tObj.gotoNext();
		});
		
		if (tObj.answerType == "type") {
			var kb_link = tObj.optionsHolder.find(".show_keyboard"); 
			if (kb_link.length > 0 ) {
				kb_link.click(function() {
					if (autoposition) {
						autoposition = false;
						tObj.optionsHolder.find("input.for_keyb").click();
						autoposition = true
					} else {
						tObj.optionsHolder.find("input.for_keyb").click();
					}
				});
			}
		}
		
		if (tObj.autoPlay) tObj.autoPlayBox.attr("checked", "checked");
		else  tObj.autoPlayBox.removeAttr("checked", "checked");
		
		tObj.autoPlayBox.click(function() {
			if ( tObj.autoPlayBox.is(":checked") ) {
				if ( ! tObj.alertHolder.is(":empty")) tObj.nextButton.click();
				tObj.nextButton.css({visibility: "hidden"});
				tObj.autoPlay = true;
			}else {
				tObj.nextButton.css({visibility: "visible"});
				tObj.autoPlay = false;
			}
		});
		tObj.step();
}

this.restart = function() {
		if( !tObj.autoPlay) tObj.nextButton.css({visibility: "visible"});
    	tObj.counter=0;
    	tObj.wrongAnswers=new Array();
    	tObj.wrongAswersNum=0;
    	tObj.correctAswersNum = 0;
    	if (tObj.mixBasic) {
			tObj.workArray = tObj.basicArray.shuffle(tObj.questNum);
		}else{
			for (i = 0; i<tObj.questNum; i++ ) {
				tObj.workArray[i] = tObj.basicArray[i];
			}
		}
		if (!tObj.randomOrder) tObj.straightOrderAnswer = tObj.getAnswersOrder();
		clearTimeout(toNextInt);
		tObj.alertHolder.empty().removeClass(tObj.correctClass);
		tObj.container.removeClass("es-ex-final-bg");
		tObj.finalSign.hide();
		tObj.container.find(".es-ex-invisible").removeClass("es-ex-invisible");
		tObj.nextButton.val(tObj.nextButtonVal);
		tObj.step();
}


this.step = function () {
tObj.alertHolder.empty().removeClass(tObj.correctClass).removeClass(tObj.wrongClass);

  if (this.counter < this.questNum) {
	tObj.remain = tObj.questNum - tObj.counter;
	tObj.infoHolder.text(tObj.remainingTxt + ": " + tObj.remain);
	tObj.alertHolder.empty();
	
	if (tObj.questType == 'audio'){
		tObj.makePlayer(tObj.workArray[tObj.counter][0]);
	} else if (tObj.questType == 'image') {
			tObj.stringHolder.html('<img src="' + tObj.workArray[tObj.counter][0] +'" />');
	} else {
			tObj.stringHolder.html('' + tObj.workArray[tObj.counter][0] +'');
	}
	
	if (tObj.answerType == 'yn') {
		tObj.getYnAnswers();
	} else if ( tObj.answerType == 'type') {
		tObj.getTypeAnswers();
	}else {
		tObj.getOptions();
	}
	if (this.questNum - this.counter == 1) tObj.nextButton.val(tObj.seeResultsTxt);			
  }else {
	tObj.gotoEnd();
 }
}


this.getYnAnswers = function() {
	if ( (tObj.counter == tObj.prevYnVariant) || (Math.random() < .5) ) {
		var wrongVariantIndex;
		while (true) {
			wrongVariantIndex = Math.round(Math.random() * (tObj.questNum-1));
			if (wrongVariantIndex != tObj.counter && wrongVariantIndex != tObj.prevYnVariant ) {
				break;
			}
		}
		tObj.prevYnVariant = wrongVariantIndex;
		tObj.transHolder.html(""+tObj.workArray[wrongVariantIndex][1]+"");
		tObj.yesButton.click(function() {tObj.wrongAnswer();});
		tObj.noButton.click(function() {tObj.correctAnswer();});

	} else {
		tObj.prevYnVariant = tObj.counter;
		tObj.transHolder.html(""+tObj.workArray[tObj.counter][1]+"");
		tObj.yesButton.click(function() {tObj.correctAnswer();});
		tObj.noButton.click(function() {tObj.wrongAnswer();});
	}
}

this.getTypeAnswers = function() {
	tObj.optionsHolder.find(".es-ex-type-field").val("");
	tObj.optionsHolder.find(".es-ex-type-elements").html('<a href="javascript:;" class="es-ex-show-type">Show the answer</a>');
	tObj.optionsHolder.find(".es-ex-show-str-type").text(tObj.workArray[tObj.counter][1]);
	
	
	
	tObj.optionsHolder.find(".es-ex-check-type").removeClass("es-ex-invisible").unbind("click").click(function() {
		var userAnswer = tObj.optionsHolder.find(".es-ex-type-field").val();
		
		userAnswer=userAnswer.replace(/[!.,;-?]/g, "").replace(/\s\s+/g, " ").replace(/\s/g, " ");
		
		userAnswer = $.trim(userAnswer);
		
		if ( userAnswer.toUpperCase() == tObj.workArray[tObj.counter][1].toUpperCase() ) {
			tObj.alertHolder.empty().removeClass(tObj.correctClass).removeClass(tObj.wrongClass);
			if (tObj.autoPlay) tObj.optionsHolder.find(".es-ex-check-type").unbind("click");
			tObj.correctAnswer();
		} else {
			tObj.alertHolder.empty().removeClass(tObj.correctClass).removeClass(tObj.wrongClass);
			if (tObj.autoPlay) tObj.optionsHolder.find(".es-ex-check-type").unbind("click");
			tObj.wrongAnswer();
		}
		
		if ($(".keys_poser").is(":visible")) {
			tObj.optionsHolder.find(".es-ex-type-field").click();
		}
		
	});
	
	tObj.optionsHolder.find(".es-ex-show-type").click(function() {
		$(this).remove(); 
		tObj.optionsHolder.find(".es-ex-type-elements").html('<span class="es-ex-show-str-type" style="display: none">'+tObj.workArray[tObj.counter][1]+'</span>');
		tObj.optionsHolder.find(".es-ex-show-str-type").fadeIn(200, function() {
		
			if (tObj.autoPlay) {
				tObj.optionsHolder.find(".es-ex-type-elements").append('<a href="javascript:;" class="es-ex-show-type">Go to next</a>');
				tObj.optionsHolder.find(".es-ex-show-type").click(function() {
					tObj.gotoNext();
				})
			}
			
		});
		tObj.optionsHolder.find(".es-ex-check-type").addClass("es-ex-invisible");
	});
	
}

this.getOptions = function() {

	var startOptions = '<ul class="es-ex-tasks-list">';
	var endOptions = '<ul class="no-list">';
	var optionsList = '';
	var correctIndex;

	if (tObj.randomOrder)	{
		var option = new Array();
		var currentQuestIndex = tObj.counter;
		var allIndexes = new Array();
		var addIndexes = new Array();
	
		for (var i=0; i < tObj.questNum; i ++ ) { // create array of all indexes
			allIndexes[i] = i;
		}
	
		allIndexes.splice(currentQuestIndex, 1); // remove the current index
		addIndexes = allIndexes.shuffle( tObj.variantsNum - 1 ); // get random options
		addIndexes.push(currentQuestIndex) // add the current 
		option = addIndexes.shuffle() // mix the array 
	
		for (var i = 0; i < option.length; i ++ ) {
			var tOption = '<li><input type="radio"> ' + tObj.workArray[option[i]][1] + '</li>';
			
			if (option[i] == currentQuestIndex) {
				correctIndex = i;
			}
			optionsList = optionsList + tOption;
		}
	} else {
		for (var i = 0; i < tObj.workArray.length; i ++ ) {
			var tOption = '<li><input type="radio"> ' + tObj.workArray[tObj.straightOrderAnswer[i] ][1] + '</li>';
			optionsList = optionsList + tOption;
		}
		for (var i = 0; i < tObj.straightOrderAnswer.length; i ++ ) {
			if ( tObj.straightOrderAnswer[i] == tObj.counter) {
				correctIndex = i;
			} 
		}
	}
	
	tObj.optionsHolder.html("" + startOptions + optionsList + endOptions +"");
	tObj.optionsHolder.find("li").eq(correctIndex).data("correct", "true");
	tObj.optionsHolder.find("li").each(function(i,elem){
	
		$(elem).click(function() {
			$(elem).find("input").attr("checked", "checked")
			if ($(elem).data('correct') == "true") {
				tObj.correctAnswer();
			} else {
				tObj.wrongAnswer($(elem));
			}
		})
	})
}


this.getAnswersOrder = function() {
	var answersOrder = new Array();
	for (var i = 0; i < tObj.workArray.length; i ++) {
		answersOrder[i] = i;
	}
	answersOrder = answersOrder.shuffle();
	return answersOrder;
}

this.correctAnswer = function () {
	tObj.alertHolder.html("" + tObj.correctMsg + "").addClass(tObj.correctClass);
	tObj.correctAswersNum ++;
	
	if (tObj.answerType != 'yn' && tObj.answerType != 'type') {
		tObj.optionsHolder.find("li").unbind("click").each(function(i, elem) {
			if ($(elem).data('correct') != 'true') {
				tObj.highlightWrong($(elem));
			} else {
				$(elem).css({color: "green"}).find("input").attr("disabled", "disabled")
			}
		});
	} else {
		tObj.ynButtons.unbind("click");
	}
	
	if (tObj.autoPlay) {
		toNextInt = setTimeout(function() {
				tObj.gotoNext();
		}, 1600);
	}
}

this.wrongAnswer = function (jElem) {
	tObj.alertHolder.html("" + tObj.wrongMsg + "").addClass(tObj.wrongClass);
	tObj.wrongAnswers.push(tObj.workArray[tObj.counter][1]);
	tObj.wrongAswersNum++;

	if (tObj.answerType != 'yn' && tObj.answerType != 'type') {
		tObj.optionsHolder.find("li").unbind("click").each(function(i, elem) {
			if ($(elem).data('correct') != 'true') {
				tObj.highlightWrong($(elem));
			} else {
				$(elem).css({color: "green"}).find("input").attr("disabled", "disabled")
			}
		});
		jElem.css({color: "red"});
	} else {
		tObj.ynButtons.unbind("click");
	}
	
	if (tObj.autoPlay) {
		toNextInt = setTimeout(function() {
				tObj.gotoNext();
		}, 1600);
	}
}


this.gotoNext = function() {
	if (tObj.answerType == 'yn') {
		tObj.ynButtons.unbind("click");
	}
	tObj.counter++;
	tObj.step();
	
	if (tObj.questType == 'audio') { 
		exJpForce = true;
		tObj.audioHolder.mousedown();
		exJpForce = false;
	}
}

this.highlightWrong = function(jElem) {
	 jElem.css({textDecoration: "line-through", color: "#999", backgroundImage: "none", backgroundColor: "#dfdfdf"}).find("input").attr("disabled", "disabled");
}

this.gotoEnd = function() {
	tObj.audioHolder.unbind("mousedown");
	tObj.alertHolder.empty();
	tObj.infoHolder.empty();
	tObj.container.addClass("es-ex-final-bg");
	tObj.autoPlayBoxContainer.addClass("es-ex-invisible");
	tObj.contentHolder.addClass("es-ex-invisible");
	tObj.nextButton.addClass("es-ex-invisible");

	var tResults = Math.round((tObj.correctAswersNum / tObj.questNum ) * 100)
	tObj.finalSign.html('<div><i> '+tObj.totalQuestionsTxt+':</i> '+tObj.questNum+' <br><i>'+tObj.correctAnswersTxt+':</i> '+ tObj.correctAswersNum +'<br><b><br><i>'+tObj.yourResultTxt+'</i></b>: '+tResults+'%</div>' ).fadeIn();

	if (tObj.questType == 'audio') {
		exJpForce = true;
		ex_Jplayer('/sounds/yes.mp3', tObj.audioHolder.get(0),1);
		exJpForce = false;
	}
	
	var totalTasks = tObj.questNum;
	var tID = tObj.testID;
	var correctNum = tObj.correctAswersNum;
	//alert(tID +" "+totalTasks+" "+correctNum);
	if (tID != undefined) sendResults(tID, totalTasks, correctNum);
	
	
	
}


this.makePlayer = function(soundLink) {
	var tDom = tObj.audioHolder.get(0);
	exJpForce = true;
	ex_Jplayer(soundLink, tDom,1);
	exJpForce = false;
tObj.audioHolder.unbind("mousedown").mousedown( function() {
	ex_Jplayer(soundLink, tDom);
	tObj.audioHolder.addClass("ex-audio-holder-hover");
});

}


$(document).ready(function() {
	tObj.parseTest();
})

}



// end of choice exercises 




/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}

			fx.elem.style[attr] = "rgb(" + [
				Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
			].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}
	
	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break; 

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};
	
	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/

	var colors = {
		aqua:[0,255,255],
		azure:[240,255,255],
		beige:[245,245,220],
		black:[0,0,0],
		blue:[0,0,255],
		brown:[165,42,42],
		cyan:[0,255,255],
		darkblue:[0,0,139],
		darkcyan:[0,139,139],
		darkgrey:[169,169,169],
		darkgreen:[0,100,0],
		darkkhaki:[189,183,107],
		darkmagenta:[139,0,139],
		darkolivegreen:[85,107,47],
		darkorange:[255,140,0],
		darkorchid:[153,50,204],
		darkred:[139,0,0],
		darksalmon:[233,150,122],
		darkviolet:[148,0,211],
		fuchsia:[255,0,255],
		gold:[255,215,0],
		green:[0,128,0],
		indigo:[75,0,130],
		khaki:[240,230,140],
		lightblue:[173,216,230],
		lightcyan:[224,255,255],
		lightgreen:[144,238,144],
		lightgrey:[211,211,211],
		lightpink:[255,182,193],
		lightyellow:[255,255,224],
		lime:[0,255,0],
		magenta:[255,0,255],
		maroon:[128,0,0],
		navy:[0,0,128],
		olive:[128,128,0],
		orange:[255,165,0],
		pink:[255,192,203],
		purple:[128,0,128],
		violet:[128,0,128],
		red:[255,0,0],
		silver:[192,192,192],
		white:[255,255,255],
		yellow:[255,255,0]
	};
	
})(jQuery);


///////////////////////////////////////////////////////////////////


var ds_style =""
+"<style type='text/css'> "
+".ds_dragHelper {left: 0; top: 0; position: absolute;}"
+".ds_ondrag { cursor: default; border: 1px dotted #000; position: absolute; background-color: #fff}"
+".ds_noImage { background-image: none !important}"
+"</style>"





$(document).ready(function() {
	$("head").append(ds_style);
});


function dragsort_test(hash) {

var tObj = this;
var dragHelper;

this.targetsClass = hash['targets'];
this.answersClass = hash['answer_elem'];
this.variantsClass = hash['variant_elem'];
this.autoCheck = hash['auto_check'];
this.id = hash['id'];
this.answerBColor = hash['answer_color'];
this.checkClass="ds-rt";
this.signClass="ds-sign";
this.correctClass = "ds-correct-answer";
this.errorClass = "ds-error-answer";
this.testID = hash['test_id'];


this.targetsData = new Array();


this.start = function() {

	this.container = $('#'+this.id);
	this.targets = this.container.find("." + this.targetsClass );			// jquery elements to put the variants in, wrappers of answers
	this.answers = this.container.find("." + this.answersClass);             // jquery elements with answers to check
	this.variants = this.container.find("."+ tObj.variantsClass);          // jquery elements with variants which will be dragged and checked as answers
	
	this.checkButton = tObj.container.find(".ds-check-button"); 
	
	this.targets.css({cursor: "default"});
	this.variants.css({cursor: "default"});
	
	$("body").append('<div id="'+ this.id +'_dragHelper" class="ds_dragHelper noselect"></div>');
	dragHelper = $('#'+ this.id +'_dragHelper');
	this.targets.attr("taken", "-1");
	
	this.checkButton.click(function() {
		tObj.checkAnswers();
	}).mousedown(function() {
		tObj.checkButton.css({left: "1px", top: "1px"});
	}).mouseup(function() {
		tObj.checkButton.css({left: "0px", top: "0px"})
	});
	
	this.variants.mousedown(function(e) {
		$("body").addClass("noselect");
		var t = $(this);
		var fromVariant = tObj.variants.index(t);
		var tHtml = t.html();
		var x = t.offset().left;
		var y = t.offset().top;
		var l= t.width();
		var difX=e.pageX-x;
		var difY=e.pageY-y;
		
		tObj.targetTable();               // shot of targets
		t.css({visibility: "hidden"});
		dragHelper.addClass("ds_ondrag").html(tHtml).css({left: x, top: y, maxWidth: l, opacity: "0.8"});
		tObj.dragging(difX, difY);
		tObj.dropping(fromVariant);
		e.preventDefault();
		return false;
	});
	
	this.answers.mousedown(function(e){
		if ( $(this).parent().attr("taken") != "-1" ) {
			$("body").addClass("noselect");
			var t = $(this);
			var x = t.offset().left;
			var y = t.offset().top;
			var l= t.width();
			var difX=e.pageX-x;
			var difY=e.pageY-y;
			var fromVariant = t.parent().attr("taken");
			var tHtml = t.html();
			t.parent().attr("taken", "-1");
			t.html("&nbsp;");
			tObj.targetTable();  // shot of the targets
			dragHelper.addClass("ds_ondrag").html(tHtml).css({left: x, top: y, maxWidth: l, opacity: "0.8"});
			tObj.dragging(difX, difY);
			tObj.dropping(fromVariant);
			e.preventDefault();
			return false;
	}
	
	});
}


this.dragging = function (difX, difY) {
	$("body").bind("mousemove",function(e){
		dragHelper.css({left: e.pageX-difX, top: e.pageY-difY});
		e.preventDefault();
		return false;
	});
}

this.targetTable = function() {
		this.targetsData = new Array();
		this.targets.each(function(i,elem) {
			var loc = $(elem).offset();
			loc.right = loc.left + $(elem).width();
			loc.bottom = loc.top + $(elem).height();
			loc.html = $(elem).children().html();
			loc.elem = elem;
			loc.taken = $(elem).attr("taken");
			tObj.targetsData.push(loc);
		});
}


this.collision = function (x,y) {
	for (var i = 0; i < tObj.targetsData.length; i++) {
		if ( tObj.targetsData[i].left < x && tObj.targetsData[i].right > x && tObj.targetsData[i].top < y && tObj.targetsData[i].bottom > y)
			return i;
		}
	return -1;
}

this.dropping = function (fromVariant) {

	$("body").one("mouseup", function(e) {
		var hitTarget = tObj.collision(e.pageX,e.pageY);   // determine if a target is hitted
		dragHelper.removeClass("ds_ondrag").empty();       // remove drag helper
		$("body").unbind("mousemove");
		
		if ( hitTarget > -1) {
			tObj.hittedTarget(fromVariant, hitTarget);
		}
		else {
			tObj.variants.filter(":eq("+fromVariant+")").css({visibility: "visible"});
		}
		
		tObj.container.find("."+tObj.signClass).removeClass(tObj.correctClass).removeClass(tObj.errorClass);
		if (tObj.autoCheck == true) {
			tObj.checkAnswers();
		}
		
		$("body").removeClass("noselect");
		e.preventDefault();
		return false;
	});
}



this.hittedTarget = function (fromVariant, hitted) {
	if ( tObj.targetsData[hitted].taken == "-1") {
		var tVariantHtml = tObj.variants.filter(":eq("+fromVariant+")").html();
		tObj.targets.eq(hitted).attr("taken", fromVariant ).children().html(" " + tVariantHtml + " ");
		tObj.hittedAnimation(hitted);
	}else {
		var firstFreeItem;
		var freeTargets = new Array();
		for (var i=0; i < tObj.targetsData.length; i++) {	
			if (tObj.targetsData[i].taken == "-1") {
				freeTargets.push(i);
			}
		}
		if ( freeTargets.length == 0 ) {
			tObj.variants.filter(":eq("+fromVariant+")").css({visibility: "visible"});
			
		} else {
		
			freeTargets.reverse();
			var nearest = -1;
			var bestDistanceFoundYet=1000;
			for (var i=0; i < freeTargets.length; i++) {
		
				var d = Math.abs(hitted - freeTargets[i]);
				if (d < bestDistanceFoundYet) {
					bestDistanceFoundYet = d;
					nearest = freeTargets[i];
				}
			}
			for (var i=0; i < tObj.targetsData.length; i++) {	
				if (tObj.targetsData[i].taken == "-1") {
					firstFreeItem = i;
					break;
				} 
			}
			var helpItem = tObj.targetsData[nearest]          //tObj.targetsData[firstFreeItem];
			tObj.targetsData.splice(nearest, 1);		//tObj.targetsData.splice(firstFreeItem, 1);
			helpItem.html = tObj.variants.filter(":eq("+fromVariant+")").html();
			helpItem.taken = fromVariant;
			tObj.targetsData.splice(hitted, 0, helpItem);
			tObj.answers.each(function(i, elem) {
					$(elem).html("" + tObj.targetsData[i].html + "" ).parent().attr("taken", tObj.targetsData[i].taken);
			});
			
			tObj.hittedAnimation(hitted);
		}
	}
}

this.hittedAnimation = function(hitted) {
			if (tObj.answerBColor == undefined) {
				var tColor = tObj.targets.eq(hitted).css("background-color");
			} else {
				var tColor = tObj.answerBColor;
			}
			tObj.targets.eq(hitted).addClass("ds_noImage").stop().css({backgroundColor: "#feff8f"}).animate({backgroundColor: tColor},500, function () {
				tObj.targets.eq(hitted).css({backgroundColor: tColor}).removeClass("ds_noImage");
			});
}

this.checkAnswers = function() {

var correctNum = 0;

  tObj.answers.each(function(i, elem) {
	if ( $(elem).find("."+tObj.checkClass).length > 0 ) {
		var tValue = $(elem).find("."+tObj.checkClass).text();
		if (tValue == (i +1)) {
			tObj.container.find("."+tObj.signClass).filter(":eq("+i+")").addClass(tObj.correctClass);
			correctNum++;
		} else {
			tObj.container.find("."+tObj.signClass).filter(":eq("+i+")").addClass(tObj.errorClass);
		}
	}
  });
  
  
 var totalTasks = tObj.answers.length;
 var tID = tObj.testID;
	//alert(tID +" "+totalTasks+" "+correctNum)
	
if (tID != undefined) sendResults(tID, totalTasks, correctNum); 
	
  
}

$(document).ready(function() {
	tObj.start();
});


}


function sortlist_test(hash) {

var tObj = this;
var dragHelper;

this.targetsClass = hash['targets'];
this.answersClass = hash['answer_elem'];
this.variantsClass = hash['variant_elem'];
this.autoCheck = hash['auto_check'];
this.id = hash['id'];
this.answerBColor = hash['answer_color'];
this.checkClass="ds-rt";
this.signClass="ds-sign";
this.correctClass = "ds-correct-answer";
this.errorClass = "ds-error-answer";


this.targetsData = new Array();


this.start = function() {

	this.container = $('#'+this.id);
	this.targets = this.container.find("." + this.targetsClass );			// jquery elements to put the variants in, wrappers of answers
	this.answers = this.container.find("." + this.answersClass);             // jquery elements with answers to check
	this.variants = this.container.find("."+ tObj.variantsClass);          // jquery elements with variants which will be dragged and checked as answers
	
	this.checkButton = tObj.container.find(".ds-check-button"); 
	
	this.targets.css({cursor: "default"});
	this.variants.css({cursor: "default"});
	
	$("body").append('<div id="'+ this.id +'_dragHelper" class="ds_dragHelper noselect"></div>');
	dragHelper = $('#'+ this.id +'_dragHelper');
	this.targets.attr("taken", "-1");
	
	this.checkButton.click(function() {
		tObj.checkAnswers();
	}).mousedown(function() {
		tObj.checkButton.css({left: "1px", top: "1px"});
	}).mouseup(function() {
		tObj.checkButton.css({left: "0px", top: "0px"})
	});
	
	this.variants.mousedown(function(e) {
		$("body").addClass("noselect");
		var t = $(this);
		var fromVariant = tObj.variants.index(t);
		var tHtml = t.html();
		var x = t.offset().left;
		var y = t.offset().top;
		var l= t.width();
		var difX=e.pageX-x;
		var difY=e.pageY-y;
		
		tObj.targetTable();               // shot of targets
		t.css({visibility: "hidden"});
		dragHelper.addClass("ds_ondrag").html(tHtml).css({left: x, top: y, maxWidth: l, opacity: "0.8"});
		tObj.dragging(difX, difY);
		tObj.dropping(fromVariant);
		e.preventDefault();
		return false;
	});
	
}


this.dragging = function (difX, difY) {
	$("body").bind("mousemove",function(e){
		dragHelper.css({left: e.pageX-difX, top: e.pageY-difY});
		e.preventDefault();
		return false;
	});
}

this.targetTable = function() {
		this.targetsData = new Array();
		this.targets.each(function(i,elem) {
			var loc = $(elem).offset();
			loc.right = loc.left + $(elem).width();
			loc.bottom = loc.top + $(elem).height();
			loc.html = $(elem).children().html();
			loc.elem = elem;
			loc.taken = $(elem).attr("taken");
			tObj.targetsData.push(loc);
		});
}


this.collision = function (x,y) {
	for (var i = 0; i < tObj.targetsData.length; i++) {
		if ( tObj.targetsData[i].left < x && tObj.targetsData[i].right > x && tObj.targetsData[i].top < y && tObj.targetsData[i].bottom > y)
			return i;
		}
	return -1;
}

this.dropping = function (fromVariant) {

	$("body").one("mouseup", function(e) {
		var hitTarget = tObj.collision(e.pageX,e.pageY);   // determine if a target is hitted
		dragHelper.removeClass("ds_ondrag").empty();       // remove drag helper
		$("body").unbind("mousemove");
		
		if ( hitTarget > -1) {
			tObj.hittedTarget(fromVariant, hitTarget);
		}
		else {
			tObj.variants.filter(":eq("+fromVariant+")").css({visibility: "visible"});
		}
		
		tObj.container.find("."+tObj.signClass).removeClass(tObj.correctClass).removeClass(tObj.errorClass);
		if (tObj.autoCheck == true) {
			tObj.checkAnswers();
		}
		
		$("body").removeClass("noselect");
		e.preventDefault();
		return false;
	});
}


this.hittedTarget = function (fromVariant, hitted) {
		var tVariantHtml = tObj.variants.filter(":eq("+fromVariant+")").html();
		
		tObj.targets.eq(hitted).children().append('<div taken="'+fromVariant+'" class="sl_item">' + tVariantHtml + '</div> ');
		tObj.hittedAnimation(hitted);
		this.answers.find("div.sl_item").mousedown(function(e){

			$("body").addClass("noselect");
			var t = $(this);
			var x = t.offset().left;
			var y = t.offset().top;
			var l= t.width();
			var difX=e.pageX-x;
			var difY=e.pageY-y;
			var fromVariant = t.attr("taken");

			var tHtml = t.html();
			t.parent().attr("taken", "-1");
			t.remove();
			tObj.targetTable();  // shot of the targets
			dragHelper.addClass("ds_ondrag").html(tHtml).css({left: x, top: y, maxWidth: l, opacity: "0.8", textAlign: "left"});
			tObj.dragging(difX, difY);
			tObj.dropping(fromVariant);
			e.preventDefault();
			return false;

	});
		
}

this.hittedAnimation = function(hitted) {
			if (tObj.answerBColor == undefined) {
				var tColor = tObj.targets.eq(hitted).css("background-color");
			} else {
				var tColor = tObj.answerBColor;
			}
			tObj.targets.eq(hitted).find(".sl_item:last").addClass("ds_noImage").stop().css({backgroundColor: "#feff8f"}).animate({backgroundColor: tColor},500, function () {
				tObj.targets.eq(hitted).find(".sl_item:last").css({backgroundColor: tColor}).removeClass("ds_noImage");
			});
}

this.checkAnswers = function() {
	
	var totalVariants = tObj.variants.length;
	var correctLen = 0;
	var errorLen = 0;

  tObj.answers.each(function(i, elem) {
	$(elem).find("."+tObj.checkClass).each(function(a, item) {
		var toCol = $(item).text();
		if (toCol -1 == i) {
			$(item).parent().parent().css({color: "green"});
			correctLen ++;
		}else {
			$(item).parent().parent().css({color: "red", borderColor: "#FF7F7F"});
			errorLen ++;
		}
	
	})
	
  });
  
  var untouch = totalVariants - correctLen - errorLen;
  tObj.container.find('.ds_check_sign').text('Correct: '+ correctLen + ', errors: '+errorLen+ ", untouch: "+ untouch+", total: "+ totalVariants);
}

$(document).ready(function() {
	tObj.start();
});


}


var di_style =""
+"<style type='text/css'> "
+".di_dragHelper {left: 0; top: 0; position: absolute;}"
+".di_ondrag { cursor: default; border: 1px dotted #000; position: absolute; background-color: #fff}"
+".di_noImage { background-image: none !important}"
+"</style>"


$(document).ready(function() {
	$("head").append(di_style);	
});


function draginput_test(hash) {

var tObj = this;
var dragHelper;

this.targetsClass = hash['targets'];
this.variantsClass = hash['variant_elem'];
this.id = hash['id'];
this.targetBColor = hash['targets_color'];
this.inTargets = hash['in_targets'];
this.clearOption = hash['clear_option'];
this.oneUse = hash['one_use'];

if (this.inTargets == undefined ) this.inTargets = false;
if (this.clearOption == undefined ) this.inTargets = false;
if (this.oneUse == undefined ) this.oneUse = false;

this.targetsData = new Array();

this.start = function() {

	this.container = $('#'+this.id);
	this.targets = this.container.find("." + this.targetsClass );			// jquery elements to put the variants in, wrappers of answers
	this.variants = this.container.find("."+ tObj.variantsClass);          // jquery elements with variants which will be dragged and checked as answers
	
	this.variants.css({cursor: "default"});
	
	$("body").append('<div id="'+ this.id +'_dragHelper" class="di_dragHelper noselect"></div>');
	dragHelper = $('#'+ this.id +'_dragHelper');
	
	if (this.clearOption) {
		if (tObj.inTargets) {				
			tObj.targets.each(function(i,elem) {
				$(elem).find(tObj.inTargets).after('<a href="javascript:;" class="clear_placed_text" title="Reset">X</a>');
			});
		} else {
			tObj.targets.each(function(i,elem) {
				$(elem).after('<a href="javascript:;" class="clear_placed_text" title="Reset">X</a>');
			});
		
		}
	}
	
	this.container.find(".clear_placed_text").click(function() {
		if (tObj.inTargets) {
			$(this).parent().find(tObj.inTargets).val("");
			
		}else {
			$(this).prev(tObj.targetsClass).val("");
		}
		
		if (tObj.oneUse) {
			$(this).parent().find(".di_mix_variants").find(":hidden")
				.css({visibility: "visible", backgroundColor: "#8FE2FF"})
				.animate({backgroundColor: "#ffffff"});
		}
		
	});
	
	
	this.variants.mousedown(function(e) {
		$("body").addClass("noselect");
		var t = $(this);
		var fromVariant = tObj.variants.index(t);
		var tHtml = t.html();
		var x = t.offset().left;
		var y = t.offset().top;
		var l= t.width();
		var difX=e.pageX-x;
		var difY=e.pageY-y;
		
		tObj.targetTable();               // shot of targets
		t.css({visibility: "hidden"});
		dragHelper.addClass("di_ondrag").html(tHtml).css({left: x, top: y, maxWidth: l, opacity: "0.8"});
		tObj.dragging(difX, difY);
		tObj.dropping(fromVariant);
		e.preventDefault();
		return false;
	});
	
}

this.dragging = function (difX, difY) {
	$("body").bind("mousemove",function(e){
		dragHelper.css({left: e.pageX-difX, top: e.pageY-difY});
		e.preventDefault();
		return false;
	});
}

this.targetTable = function() {
		this.targetsData = new Array();
		this.targets.each(function(i,elem) {
			var loc = $(elem).offset();
			loc.right = loc.left + $(elem).width();
			loc.bottom = loc.top + $(elem).height();
			loc.elem = elem;
			tObj.targetsData.push(loc);
		});
}

this.collision = function (x,y) {
	for (var i = 0; i < tObj.targetsData.length; i++) {
		if ( tObj.targetsData[i].left < x && tObj.targetsData[i].right > x && tObj.targetsData[i].top < y && tObj.targetsData[i].bottom > y)
			return i;
		}
	return -1;
}

this.dropping = function (fromVariant) {

	$("body").one("mouseup", function(e) {
	
		var hitTarget = tObj.collision(e.pageX,e.pageY);   // determine if a target is hitted
		dragHelper.removeClass("di_ondrag").empty();       // remove drag helper
		$("body").unbind("mousemove");
		if ( hitTarget > -1) {
			tObj.hittedTarget(fromVariant, hitTarget);
		} 
		
		if (!tObj.oneUse) {
			tObj.variants.filter(":eq("+fromVariant+")")
				.css({visibility: "visible", backgroundColor: "#8FE2FF"})
				.animate({backgroundColor: "#ffffff"});
		} else {
		
			if ( hitTarget < 0) {
				tObj.variants.filter(":eq("+fromVariant+")")
					.css({visibility: "visible", backgroundColor: "#8FE2FF"})
					.animate({backgroundColor: "#ffffff"});
			}
		}
		
		$("body").removeClass("noselect");
		e.preventDefault();
		return false;
	});
}

this.hittedTarget = function (fromVariant, hitted) {
		var tVariantHtml = tObj.variants.filter(":eq("+fromVariant+")").html();
		var addValue= tVariantHtml;
		if (tObj.inTargets) {
			var tIntarget = tObj.targets.eq(hitted).find(tObj.inTargets);
			var inTargetDomEl = tIntarget.get(0);
			
			if (inTargetDomEl.tagName == "INPUT" || inTargetDomEl.tagName == "TEXTAREA") {
				if ( !tIntarget.attr("disabled") ) {
					var currentValue = tIntarget.val();
					var tValue = currentValue +" " + addValue;
					tValue = $.trim(tValue)
					tIntarget.val(tValue);
				}
					
			} else {
				var currentValue =tIntarget.html();
				var tValue = currentValue +" " + addValue;
				tValue = $.trim(tValue)
				tIntarget.html(tValue);
			}
			
			tObj.hittedAnimation(tIntarget);

		} else {

			var targetDomEl = tObj.targetsData[hitted].elem;
			if (targetDomEl.tagName == "INPUT" || targetDomEl.tagName == "TEXTAREA") {
			
				if ( !tObj.targets.attr("disabled") ) {
					var currentValue =tObj.targets.eq(hitted).val();
					var tValue = currentValue +" " + addValue;
					tValue = $.trim(tValue)
					tObj.targets.eq(hitted).val(tValue);
				}
			} else {
				var currentValue =tObj.targets.eq(hitted).html();
				var tValue = currentValue +" " + addValue;
				tValue = $.trim(tValue)
				tObj.targets.eq(hitted).html(tValue);
			}
			
			tObj.hittedAnimation(tObj.targets.eq(hitted));
			
		}	
		
}


this.hittedAnimation = function(hitted) {
			if (tObj.targetBColor == undefined) {
				var tColor = hitted.css("background-color");
				if (tColor == "transparent" || tColor == "rgba(0, 0, 0, 0)" ) {
					var endColor = "#ffffff";
				} else {
					var endColor = tColor;
				}
				
				hitted.addClass("ds_noImage").stop().css({backgroundColor: "#feff8f"}).animate({backgroundColor: endColor},500, function () {
					hitted.css({backgroundColor: tColor}).removeClass("ds_noImage");
				});

			} else {
				var tColor = tObj.targetBColor;
				hitted.addClass("ds_noImage").stop().css({backgroundColor: "#feff8f"}).animate({backgroundColor: tColor},500, function () {
					hitted.css({backgroundColor: tColor}).removeClass("ds_noImage");
				});
				
			}
}

$(document).ready(function() {
	tObj.start();
});

}

	
$(document).ready(function() {

$("div.gr_exercise_container").each(function(i){
	var tParent = $(this).parent("div");
	tParent.find("div.gr_exercise_dec").attr("id", "ge_e"+i);

});

$(".ex_from_list_check").each(function(i) {
	$(this).addClass("fromList_ex"+i);
	$(this).find("input").click(function() {
		checkExFromList(".fromList_ex"+i);
	});
});


$(".gext_check").each(function(i) {
	$(this).addClass("gext_ex"+i);
	$(this).find("input.gext_check_btn").click(function() {
		checkExType(".gext_ex"+i);
	});
});

$(".gext_answer_show").each(function(i) {
	$(this).toggle(function() {
		$(".gr_ex_type").eq(i).find(".gext_task input").attr('disabled', 'disabled').addClass("gr-input-disabled");
		                                               ////.css({opacity: "0", display: "inline"}).animate({opacity: "1"});
		$(".gr_ex_type").eq(i).find("div.gext_show").slideDown(function() {
		   $(this).find("span").fadeIn();
		   $(".gext_answer_show").eq(i).val('Hide answers')
		});      
	}, function(){
		$(".gr_ex_type").eq(i).find(".gext_task input").removeAttr('disabled').removeClass("gr-input-disabled");
		$(".gr_ex_type").eq(i).find("div.gext_show").slideUp(function(){
			$(this).find("span").hide();
			$(".gext_answer_show").eq(i).val('Display answers')
		} );
	});
});


$(".gexd_check").each(function(i) {
	$(this).addClass("gexd_ex"+i);
	$(this).find("input").click(function() {
		checkExDisplay(".gexd_ex"+i);
	});
});


$(".gr_ex_variants").each(function(i) {
t = $(this);
grExFromVariants(t,i)

});



$(".di_mix_variants").each(function(i, elem) {

	var tStr = $(elem).text();
	$(elem).empty();
	tStr = tStr.replace(/[!.,;-?]/g, "").split(" ");
	tStr = tStr.shuffle();
	for (var n=0; n < tStr.length; n ++ ) {
		$(elem).append("<span>" + tStr[n] + "</span>")
	}
});

});



function grExFromVariants(t, n) {


var tContainer = t;
var tID = tContainer.find("div.gr-ex-testid").text();

 tContainer.find(".gexv_task").each(function(i) {
 	$(this).parent("td").parent("tr").find("input").attr("name", "gexv_" + n + "_"+i );
 })


tContainer.find("input:checkbox").click(function() {
  var tName=$(this).attr("name");
  tContainer.find("input[name='"+ tName +"']").removeAttr("checked");
  $(this).attr("checked", "checked");
});



tContainer.find(".gexv_check").find("input").click(function() {
var errorNum = 0;
var errorString = ' errors'
var totalTasks = 0;
tContainer.find(".gexv_task").each(function() {
		
		totalTasks++;
	   var tRow = $(this).parent().parent("tr");
	   tRow.find(".gexv_sign").removeClass("gr-ex-error").removeClass("gr-ex-correct");
	   
	   var checkedInputs =	tRow.find("input:checked").length ;
			if ( checkedInputs > 0) {
				var totalRes = "good";
				tRow.find("input:checked").each(function (i) {
					if ($(this).attr("class") != "ok") totalRes = "error";
				});
				if ( tRow.find("input:checked").length != tRow.find(".ok").length ) totalRes = "error";
				if (totalRes == "error") {
					//tRow.find(".gexv_sign").css({backgroundImage: "url(/images/error1.png)"}); // loose index if error
					tRow.find(".gexv_sign").addClass("gr-ex-error");
					errorNum ++;
				}else{
					//tRow.find(".gexv_sign").css({backgroundImage: "url(/images/accept1.png)"}); // success index
					tRow.find(".gexv_sign").addClass("gr-ex-correct");
				}
			} else {
				//tRow.find(".gexv_sign").css({backgroundImage: "url(/images/error1.png)"}); // loose index if none
				tRow.find(".gexv_sign").addClass("gr-ex-error");
				errorNum ++;
			}
	});

	
tContainer.find(".gexv_check").find(".to_notify").remove();

if (errorNum > 0) {
	if (errorNum == 1)	{
		errorString = ' error'
	}
	tContainer.find(".gexv_check").prepend('<span class="to_notify"><span class="check_notify" title="You have '+ errorNum + errorString +' from '+totalTasks+' tasks">'+ errorNum + errorString + '</span></span>');	
}else{
	tContainer.find(".gexv_check").prepend('<span class="to_notify"><span class="check_notify" style="background-image: none; color: green; padding-left: 10px;"> No errors</span></span>');
}
	var correctNum = totalTasks - errorNum;
	sendResults(tID, totalTasks, correctNum);
	
	
})

}


function checkExFromList(elClass) {
	var tContainer = $(elClass).parent(".gr_ex_from_list");
	var errorNum = 0;
	var errorString = ' errors'
	var totalTasks = 0;
	var tID = tContainer.find("div.gr-ex-testid").text();
	tContainer.find(".gr_ex_unit").each(function(i) {
	totalTasks++;
	var userAnswer = $(this).find("select").find("option:selected").attr("class");
	if(userAnswer == "ok") {
		$(this).css({backgroundImage: "url(/images/accept1.png)"}).attr("title", "")
	}else {
		$(this).css({backgroundImage: "url(/images/error1.png)"}).attr("title", "");
		errorNum ++;
	}
	});
	
	tContainer.find(".ex_from_list_check").find(".to_notify").remove();

	if (errorNum > 0) {
		if (errorNum == 1)	{
			errorString = ' error'
		}
		tContainer.find(".ex_from_list_check").prepend('<span class="to_notify"><span class="check_notify" title="You have '+ errorNum + errorString +' from '+totalTasks+' tasks">'+ errorNum + errorString + '</span></span>');	
	}else{
	tContainer.find(".ex_from_list_check").prepend('<span class="to_notify"><span class="check_notify" style="background-image: none; color: green; padding-left: 10px;"> No errors</span></span>');
	}
	
	var correctNum = totalTasks - errorNum;
	sendResults(tID, totalTasks, correctNum);
}


function checkExType(elClass) {
	var tContainer = $(elClass).parent(".gr_ex_type");
	var tID = tContainer.find("div.gr-ex-testid").text();
	var errorNum = 0;
	var errorString = ' errors'
	var totalTasks = 0;
	$("#t_inf").empty();
	tContainer.find(".gext_task").each(function(i) {
		totalTasks++;
		var userAnswer = $(this).find("input:text").val();
		var tAnswer= $(this).find(".gext_answer").text();
		
		tAnswer=tAnswer.replace(/[!.,;-?]/g, "").replace(/\s\s+/g, " ").replace(/¸/g, "å").replace(/\s/g, " ");
		userAnswer=userAnswer.replace(/[!.,;-?]/g, "").replace(/\s\s+/g, " ").replace(/¸/g, "å").replace(/\s/g, " ");
		userAnswer = $.trim(userAnswer); 			
		tAnswer = $.trim(tAnswer); 
		
		$(this).removeClass("ev-ex-correct").removeClass("ev-ex-error");
		
		if( userAnswer.toUpperCase() == tAnswer.toUpperCase() ) {
			$(this).addClass("ev-ex-correct");
   		}else {
			$(this).addClass("ev-ex-error");
			errorNum++;
		}
	});

	tContainer.find(".gext_check").find(".to_notify").remove();
	
	if (errorNum > 0) {
		if (errorNum == 1)	{
			errorString = ' error'
		}
		tContainer.find(".gext_check").prepend('<span class="to_notify"><span class="check_notify" title="You have '+ errorNum + errorString +' from '+totalTasks+' tasks">'+ errorNum + errorString + '</span></span>');	
	}else{
		tContainer.find(".gext_check").prepend('<span class="to_notify"><span class="check_notify" style="background-image: none; color: green; padding-left: 10px;"> No errors</span></span>');
	}
	
	
	
	var correctNum = totalTasks - errorNum;
	
	//alert(tID+" "+totalTasks+" "+correctNum)
	sendResults(tID, totalTasks, correctNum);	
	
}










