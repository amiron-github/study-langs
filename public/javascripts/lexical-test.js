/*
requires: 
-jquery.js
-jPlayer.js
-stylesheet - es-exercise.css
example: super-ex.html
*/
/////////////////////////////////////////////////// 

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

$(".l-test-container").css("min-height", $(".l-test-container").height())

$(".lt-test-closer").toggle(function() {
		$(this).parent().next(".lt-holder").slideUp();
		$(this).addClass("lt-hidden");
	}, function() {
		$(this).parent().next(".lt-holder").slideDown();
		$(this).removeClass("lt-hidden");
	}
)

$(".es-ex-buttons input").hover(
	function(event) {
		$(this).addClass("ex-btn-hover");
		event.preventDefault();
	}, function(event) {
		$(this).removeClass("ex-btn-hover");
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
this.virtKeys = hash['virt_keys'];			// default - false
this.tpNoSpace = hash['tp_no_space'];			// default - false
this.toNextTime = hash['next_time'];			// default - 1600
this.randLetters = hash['rand_letters'];		// default - false
this.callback = hash['callback'];

var tObj = this;

if (this.questNum == undefined || this.questNum > this.basicArray.length ) this.questNum = this.basicArray.length;
if (this.randomOrder == undefined) this.randomOrder = true;
if (this.autoPlay == undefined) this.autoPlay = true; 
if (this.questType == undefined) this.questType = 'html'; 
if (this.variantsNum == undefined) this.variantsNum = 4; 
if (this.variantsNum > this.questNum ) this.variantsNum = this.questNum;
if (this.virtKeys == undefined) this.virtKeys = false; 
if (this.tpNoSpace == undefined) this.tpNoSpace = false;
if (this.toNextTime == undefined) this.toNextTime = 1600;
if (this.randLetters == undefined) this.randLetters = false;
if (this.callback == undefined) this.callback = function() {return false};


if (tObj.texts == undefined) {
	tObj.correctMsg = "Great! This is correct";
	tObj.wrongMsg = "Wrong answer";
	tObj.nextButtonVal = "NEXT";
	tObj.seeResultsTxt = "See results";
	tObj.remainingTxt = "<b>Remaining</b>";
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

tObj.showAnswerTxt = "Show the answer";
tObj.goToNextTxt ="Go to next";

/* see also further for localisation*/

this.counter = 0;
this.remain = 0;
this.workArray = new Array();
this.sounds = new Array;
this.translations = new Array();
this.straightOrderAnswers = new Array();
this.wrongAnswers=new Array();
this.wrongAswersNum=0;
this.correctAswersNum=0;
this.noMouseCheck == false;

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
		
if (es_lang == 'ru') {
	tObj.showAnswerTxt = "Показать ответ"; 
	tObj.goToNextTxt ="Перейти к следующему";
}		
		
		if (tObj.variantsNum > 4 || !tObj.randomOrder ) tObj.optionsHolder.addClass("es-ex-tasks-more-than-4");
		if (tObj.questType == 'audio') tObj.container.addClass("es-audio-ex");
		if ($.browser.msie) tObj.container.addClass("msie-sucks");
		tObj.jplayer = $("#exJp");
		tObj.start();
}

this.callAfter = function() {
	tObj.callback();
}

this.start = function () {

		if( !tObj.autoPlay) tObj.nextButton.css({visibility: "visible"});
		
    	tObj.counter=0;
    	tObj.wrongAnswers=new Array();
    	tObj.wrongAswersNum=0;
    	tObj.correctAswersNum = 0;
    	tObj.workArray = tObj.basicArray.shuffle(tObj.questNum);
		
		if (!tObj.randomOrder) tObj.straightOrderAnswer = tObj.getAnswersOrder();
		
		clearTimeout(toNextInt);
		tObj.alertHolder.empty().removeClass(tObj.correctClass);
		tObj.container.find(".es-ex-wrapper").removeClass("es-ex-final-bg");
		
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
			tObj.optionsHolder.find(".es-ex-type-field").keypress(function(e){
				if (e.which == 13) {
					tObj.optionsHolder.find(".es-ex-check-type").click()
					if (tObj.autoPlay) {
						tObj.noMouseCheck = true;
						tObj.optionsHolder.find(".es-ex-check-type").mouseover().mousedown()
					} else {
						tObj.optionsHolder.find(".es-ex-check-type").mouseover().mousedown()
						setTimeout(function(){
							tObj.optionsHolder.find(".es-ex-check-type").mouseout().mouseup()
						},100)
					}
				}
			})
		
			if (tObj.virtKeys) tObj.optionsHolder.css({paddingTop: "0"}).find(".kb-show-wrapper").show()
			
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
    	tObj.workArray = tObj.basicArray.shuffle(tObj.questNum);
		if (!tObj.randomOrder) tObj.straightOrderAnswer = tObj.getAnswersOrder();
		clearTimeout(toNextInt);
		tObj.alertHolder.empty().removeClass(tObj.correctClass);
		tObj.container.find(".es-ex-wrapper").removeClass("es-ex-final-bg");
		tObj.finalSign.hide();
		tObj.container.find(".es-ex-invisible").removeClass("es-ex-invisible");
		tObj.nextButton.val(tObj.nextButtonVal);
		tObj.step();
}

this.step = function () {
tObj.alertHolder.empty().removeClass(tObj.correctClass).removeClass(tObj.wrongClass);
if (tObj.noMouseCheck) tObj.optionsHolder.find(".es-ex-check-type").mouseout().mouseup()

  if (this.counter < this.questNum) {
	tObj.remain = tObj.questNum - tObj.counter;
	tObj.infoHolder.html(tObj.remainingTxt + ": " + tObj.remain);
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
	tObj.optionsHolder.find(".es-ex-type-field").val("").removeClass("es-ex-untyped").removeClass("es-ex-typed");
	tObj.optionsHolder.find(".es-ex-type-elements").html('<a href="javascript:;" class="es-ex-show-type">'+tObj.showAnswerTxt+'</a>');
	tObj.optionsHolder.find(".es-ex-show-str-type").text(tObj.workArray[tObj.counter][1]);
	
	if (tObj.randLetters) {lt_randomLetters(tObj.workArray[tObj.counter][1],tObj.optionsHolder.find(".es-ex-type-rand"), tObj.optionsHolder.find(".es-ex-type-field"));}
	
	tObj.optionsHolder.find(".es-ex-check-type").removeClass("es-ex-invisible").unbind("click").click(function() {
		var userAnswer = tObj.optionsHolder.find(".es-ex-type-field").val();
		
		tObj.optionsHolder.append('<span class="tp_helper" style="display: none;">'+userAnswer+'</span>')

		userAnswer = String( tObj.optionsHolder.find("span.tp_helper").html() )
		
		userAnswer=userAnswer.replace(/[.,;?!]/g, "").replace(/-/g, " ").replace(/&nbsp;/g, " ").replace(/&nbsp/g, " ").replace(/\s\s+/g, " ").toUpperCase().replace(/Ё/g, 'Е');	
		userAnswer = $.trim(userAnswer);

		tObj.optionsHolder.find("span.tp_helper").remove();
		
		var tWord = tObj.workArray[tObj.counter][1]
		tWord=tWord.replace(/[.,;?!]/g, "").replace(/-/g, " ").replace(/&nbsp;/g, " ").replace(/&nbsp/g, " ").replace(/\s\s+/g, " ").toUpperCase().replace(/Ё/g, 'Е');	
		
		if (tObj.tpNoSpace) {
			tWord=tWord.replace(/&nbsp;/g, "").replace(/\s\s+/g, "").replace(/\s+/g, "")
			userAnswer = userAnswer.replace(/&nbsp;/g, "").replace(/\s\s+/g, "").replace(/\s+/g, "")
		}
		
		if ( userAnswer.toUpperCase() == tWord.toUpperCase() ) {
			tObj.alertHolder.empty().removeClass(tObj.correctClass).removeClass(tObj.wrongClass);
			if (tObj.autoPlay) tObj.optionsHolder.find(".es-ex-check-type").unbind("click");
			tObj.optionsHolder.find(".es-ex-type-field").addClass("es-ex-typed");
			
			tObj.correctAnswer();
		} else {
			tObj.alertHolder.empty().removeClass(tObj.correctClass).removeClass(tObj.wrongClass);
			if (tObj.autoPlay) tObj.optionsHolder.find(".es-ex-check-type").unbind("click");
			tObj.optionsHolder.find(".es-ex-type-field").addClass("es-ex-untyped");
			
			tObj.wrongAnswer();
		}
		
		setTimeout(function() {
			tObj.optionsHolder.find(".es-ex-type-field").removeClass("es-ex-untyped").removeClass("es-ex-typed");
		}, tObj.toNextTime)
		if ($(".keys_poser").is(":visible")) {
			tObj.optionsHolder.find(".es-ex-type-field").click();
		}
	});
	
	tObj.optionsHolder.find(".es-ex-show-type").click(function() {
		$(this).remove(); 
		tObj.optionsHolder.find(".es-ex-type-elements").html('<span class="es-ex-show-str-type" style="display: none">'+tObj.workArray[tObj.counter][1]+'</span>');
		tObj.optionsHolder.find(".es-ex-show-str-type").fadeIn(200, function() {
		
			if (tObj.autoPlay) {
				tObj.optionsHolder.find(".es-ex-type-elements").append('<a href="javascript:;" class="es-ex-show-type">'+tObj.goToNextTxt+'</a>');
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
	tObj.alertHolder.html("" + tObj.correctMsg + "").addClass(tObj.correctClass).css({opacity: '0.8'});
	tObj.correctAswersNum ++;

	
	if (tObj.answerType != 'yn' && tObj.answerType != 'type') {
		tObj.optionsHolder.find("li").unbind("click").each(function(i, elem) {
			if ($(elem).data('correct') != 'true') {
				tObj.highlightWrong($(elem));
			} else {
				$(elem).css({color: "green"}).addClass("lt-ex-correct").find("input").attr("disabled", "disabled")
			}
		});
	} else {
		tObj.ynButtons.unbind("click");
	}
	if ( tObj.workArray[tObj.counter].length > 2 ) {
			var studied = tObj.workArray[tObj.counter][2]
			sendWordsResults(studied)
	}
	if (tObj.autoPlay) {
		toNextInt = setTimeout(function() {
				tObj.gotoNext();
		}, 1600);
	}
}

this.wrongAnswer = function (jElem) {
	tObj.alertHolder.html("" + tObj.wrongMsg + "").addClass(tObj.wrongClass).css({opacity: '0.8'});
	tObj.wrongAnswers.push(tObj.workArray[tObj.counter][1]);
	tObj.wrongAswersNum++;

	if (tObj.answerType != 'yn' && tObj.answerType != 'type') {
		tObj.optionsHolder.find("li").unbind("click").each(function(i, elem) {
			if ($(elem).data('correct') != 'true') {
				tObj.highlightWrong($(elem));
			} else {
				$(elem).css({color: "green"}).addClass("lt-ex-should").find("input").attr("disabled", "disabled")
			}
		});
		jElem.css({color: "red"}).addClass("lt-ex-wrong");
	} else {
		tObj.ynButtons.unbind("click");
	}
	
	if (tObj.autoPlay) {
		toNextInt = setTimeout(function() {
				tObj.gotoNext();
		}, tObj.toNextTime);
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
	 jElem.addClass("es-ex-incorrect").css({textDecoration: "line-through", color: "#999"}).find("input").attr("disabled", "disabled");
}

this.gotoEnd = function() {
	tObj.audioHolder.unbind("mousedown");
	tObj.alertHolder.empty();
	tObj.infoHolder.empty();
	tObj.container.find(".es-ex-wrapper").addClass("es-ex-final-bg");
	tObj.autoPlayBoxContainer.addClass("es-ex-invisible");
	tObj.contentHolder.addClass("es-ex-invisible");
	tObj.nextButton.addClass("es-ex-invisible");

	var tResults = Math.round((tObj.correctAswersNum / tObj.questNum ) * 100)
	tObj.finalSign.html('<div><i> '+tObj.totalQuestionsTxt+':</i> <span id="'+tObj.id+'_total">'+tObj.questNum+'</span> <br><i>'+tObj.correctAnswersTxt+':</i> <span id="'+tObj.id+'_correct">'+ tObj.correctAswersNum +'</span><br><b><br><i>'+tObj.yourResultTxt+'</i></b>: <span id="'+tObj.id+'_result">'+tResults+'</span>%</div>' ).fadeIn();

	if (tObj.questType == 'audio') {
		exJpForce = true;
		ex_Jplayer('/sounds/yes.mp3', tObj.audioHolder.get(0),1);
		exJpForce = false;
	}
	this.callAfter()
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


function lt_randomLetters(word, container, target) {

	var tStr = word;
	container.empty();
	tStr = tStr.replace(/[!.,;?]/g, "").replace(/\s\s+/g, " ").split("");
	tStr = tStr.shuffle();
	for (var n=0; n < tStr.length; n ++ ) {
		container.append("<span>" + tStr[n] + "</span> ")
	}
	var variants = container.find("span");
	variants.click(function(e) {
		t = $(this)
		t.css({visibility: "hidden"});
		tVal = target.val();
		target.val(tVal + t.text() );
		target.removeClass("es-ex-untyped").removeClass("es-ex-typed")
		
	});
	
	target.parent().find(".lt-type-reset").remove();
	target.after('<a href="javascript:;" class="lt-type-reset" title="Восстановить">X</a>');
	
	target.parent().find(".lt-type-reset").click(function() {
		target.val("");
		target.removeClass("es-ex-untyped").removeClass("es-ex-typed")
		variants.each(function(i,elem) {
				if ($(elem).css("visibility")=="hidden") {
						$(elem).css({visibility: "visible"});
				}
		});
	});
}








