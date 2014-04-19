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

$(".ps-audio-holder").mousedown(
	function() {
		$(this).addClass("ps-audio-holder-hover");
		return false;
	}).mouseup(function() {
		//$(this).removeClass("ps-audio-holder-hover");
	}
);

$(".l-test-container").css("min-height", $(".l-test-container").height())

$(".pt-test-closer").toggle(function() {
		$(this).parent().next(".pt-holder").slideUp();
		$(this).addClass("pt-hidden");
	}, function() {
		$(this).parent().next(".pt-holder").slideDown();
		$(this).removeClass("pt-hidden");
	}
)

$(".ps-buttons input").hover(
	function(event) {
		$(this).addClass("ps-btn-hover");
		event.preventDefault();
	}, function(event) {
		$(this).removeClass("ps-btn-hover");
	}).mousedown(function(event) {
		$(this).addClass("ps-btn-down");
		event.preventDefault();
	}).mouseup(function(event) {
		$(this).removeClass("ps-btn-down");
		event.preventDefault();
});
	
$(".ps-next").hover(
	function() {
		$(this).addClass("ps-next-hover");
	}, function() {
		$(this).removeClass("ps-next-hover");
	}).mousedown(function() {
		$(this).addClass("ps-next-down");
	}).mouseup(function() {
		$(this).removeClass("ps-next-down");
});

});


var exJplayer=false;
var exJpForce = false;

function ps_Jplayer(link,el,notPlay) {
	var prevEl = exJplayer;
	var curEl = el;
	if ( curEl != prevEl) {
		$(prevEl).attr("status", 0).removeClass("ps-audio-holder-hover");
	}
	exJplayer = el;
	var tEl = $(el);
	var tElStatus = $(el).attr("status");
	var containerJp = $("#exJp");
	if ( tElStatus == "0" || tElStatus == undefined || exJpForce) { // start sound if sound is not in progress ()
		tEl.attr("status", "0").removeClass("ps-audio-holder-hover").attr("title", "Play");
		containerJp.jPlayer("setFile", link ).jPlayer("onProgressChange", function() { return false}).jPlayer( "onSoundComplete", function() {  // start sound 
			tEl.attr("status", "0").removeClass("ps-audio-holder-hover").attr("title", "Play");  										// reset status at the end of sound, show 'play'
		} );
		if (notPlay != 1) {
			tEl.attr("status", "1").addClass("ps-audio-holder-hover").removeAttr("title"); // show or not that sound is in progress 
			containerJp.jPlayer("play");
		}
	} else {							
		return false;
	}
}



function ph_exercise(hash) {

this.basicArray = hash['basic_array'];
this.id = hash['id'];			
this.testID = hash['test_id'];			
this.autoPlay = hash['auto_play'];			// default - true, option: false
this.variantsNum = hash['variants_num'];	// default - 4
this.randomOrder = hash['random_order'];    // default - true, option: false
this.shuffleQuest = hash['shuffle_quest'];   // default - true, option: false
this.questType = hash['quest_type'];  		// default - html, options audio, image
this.answerType = hash['answer_type'];  	// default - variants, option: yn
this.inputType = hash['input_type'];  	// default - html, option - input
this.texts = hash['texts'];					// default - english
this.questNum = hash['quest_num'];			// default - basic array length
this.virtKeys = hash['virt_keys'];			// default - false
this.tpNoSpace = hash['tp_no_space'];			// default - false
this.specSigns = hash['spec_signs'];			// default - !?.,
this.toNextTime = hash['next_time'];			// default - 1600
this.randLetters = hash['rand_letters'];		// default - false
this.intextInput = hash['intext_input'];		// default - false
this.intextReplace = hash['intext_replace'];    // default - false
this.helperStay = hash['helper_stay'];          // default - false
this.addImg = hash['add_img'];				// default - false
this.noSpacer = hash['no_spacer'];          // default - false
this.callback = hash['callback'];

var tObj = this;

if (this.questNum == undefined || this.questNum > this.basicArray.length ) this.questNum = this.basicArray.length;
if (this.randomOrder == undefined) this.randomOrder = true;
if (this.shuffleQuest == undefined) this.shuffleQuest = true;
if (this.autoPlay == undefined) this.autoPlay = true; 
if (this.questType == undefined) this.questType = 'html'; 
if (this.inputType == undefined) this.inputType = 'html'; 
if (this.variantsNum == undefined) this.variantsNum = 4; 
if (this.variantsNum > this.questNum ) this.variantsNum = this.questNum;
if (this.virtKeys == undefined) this.virtKeys = false; 
if (this.tpNoSpace == undefined) this.tpNoSpace = false;
if (this.specSigns == undefined) this.specSigns = ["!","?",".",","];
if (this.toNextTime == undefined) this.toNextTime = 1600;
if (this.randLetters == undefined) this.randLetters = false;
if (this.intextInput == undefined) this.intextInput = false;
if (this.callback == undefined) this.callback = function() {return false};
if (this.intextReplace == undefined && this.inputType == 'input' && this.randLetters == true ) this.intextReplace = true;
if (this.intextReplace == undefined) this.intextReplace = false;
if (this.noSpacer == undefined) this.noSpacer = false;
if (this.addImg == undefined) this.addImg = false;
if (this.helperStay == undefined && this.intextInput==true) {this.helperStay = true;
}else if (this.helperStay == undefined) {this.helperStay = false;} 

if (tObj.texts == undefined) {
	tObj.correctMsg = "Great! This is correct";
	tObj.wrongMsg = "Wrong answer";
	tObj.nextButtonVal = "NEXT »";
	tObj.seeResultsTxt = "See results";
	tObj.remainingTxt = "<b>Remaining</b>";
	tObj.totalQuestionsTxt = "Total questions";
	tObj.correctAnswersTxt = "Correct answers";
	tObj.yourResultTxt = "Your result";	
	tObj.showAnswerTxt = "Show the answer";
	tObj.goToNextTxt ="Go to next";
} else {
	tObj.correctMsg = tObj.texts[0];
	tObj.wrongMsg = tObj.texts[1];
	tObj.nextButtonVal = tObj.texts[2];
	tObj.seeResultsTxt = tObj.texts[3];
	tObj.remainingTxt = tObj.texts[4];
	tObj.totalQuestionsTxt = tObj.texts[5];
	tObj.correctAnswersTxt = tObj.texts[6];
	tObj.yourResultTxt = tObj.texts[7];
	tObj.showAnswerTxt = tObj.texts[8];
	tObj.goToNextTxt = tObj.texts[9];
}

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
tObj.correctClass = "ps-alert-correct";
tObj.wrongClass = "ps-alert-wrong";
var toNextInt;
this.prevYnVariant = -1;

this.parseTest = function() {

	this.container = $("#"+tObj.id);
		tObj.contentHolder = tObj.container.find(".ps-content")
		tObj.audioHolder = tObj.container.find(".ps-audio-holder");
		tObj.stringHolder = tObj.container.find(".ps-string-wrapper");
		tObj.alertHolder = tObj.container.find(".ps-alert");
		tObj.infoHolder = tObj.container.find(".ps-info");
		
		tObj.nextButton = tObj.container.find(".ps-next");
		tObj.finalSign = tObj.container.find(".ps-final");
		tObj.startButton = tObj.container.find(".ps-start");
		tObj.optionsHolder = tObj.container.find(".ps-tasks");
		tObj.autoPlayBox = tObj.container.find(".ps-autoplay");
		tObj.autoPlayBoxContainer = tObj.container.find(".ps-autoplay-wrapper");
		
		tObj.checkTypeBtn = tObj.container.find(".ps-check-type");
		
		if (tObj.answerType == 'type') {
			tObj.container.addClass("ps-answer-type");
		}else{
			tObj.container.addClass("ps-not-type");
		}
				
		if (tObj.variantsNum > 4 || !tObj.randomOrder ) tObj.optionsHolder.addClass("ps-tasks-more-than-4");
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
		if (tObj.shuffleQuest) {
			tObj.workArray = tObj.basicArray.shuffle(tObj.questNum);
		}else {
			tObj.workArray = tObj.basicArray 
		}
		
		if (!tObj.randomOrder) tObj.straightOrderAnswer = tObj.getAnswersOrder();
		clearTimeout(toNextInt);
		tObj.alertHolder.empty().removeClass(tObj.correctClass);
		tObj.container.find(".ps-wrapper").removeClass("ps-final-bg");
		tObj.finalSign.hide();
		tObj.container.find(".ps-invisible").removeClass("ps-invisible");
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
			if (!tObj.randLetters) tObj.container.addClass("ps-type-no-options");
			if (tObj.intextInput)  tObj.optionsHolder.addClass("ps-type-inline");
			tObj.optionsHolder.find(".ps-type-field").keypress(function(e){
				if (e.which == 13) {
					tObj.checkTypeBtn.click()
					if (tObj.autoPlay) {
						tObj.noMouseCheck = true;
						tObj.checkTypeBtn.mouseover().mousedown()
					} else {
						tObj.checkTypeBtn.mouseover().mousedown()
						setTimeout(function(){
							tObj.checkTypeBtn.mouseout().mouseup()
						},100)
					}
				}
			})
		
			if (tObj.inputType== "input") {
				tObj.optionsHolder.find("input.ps-type-field").show();
				if (tObj.virtKeys) tObj.optionsHolder.css({paddingTop: "0"}).find(".kb-sh-ow-wrapper").show()
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
			}else {
				tObj.optionsHolder.find("div.ps-txt-letters").show();
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
    	if (tObj.shuffleQuest) {
			tObj.workArray = tObj.basicArray.shuffle(tObj.questNum);
		}else {
			tObj.workArray = tObj.basicArray 
		}
		if (!tObj.randomOrder) tObj.straightOrderAnswer = tObj.getAnswersOrder();
		clearTimeout(toNextInt);
		tObj.alertHolder.empty().removeClass(tObj.correctClass);
		tObj.container.find(".ps-wrapper").removeClass("ps-final-bg");
		tObj.finalSign.hide();
		tObj.container.find(".ps-invisible").removeClass("ps-invisible");
		tObj.nextButton.val(tObj.nextButtonVal);
		tObj.step();
}

this.step = function () {
tObj.alertHolder.empty().removeClass(tObj.correctClass).removeClass(tObj.wrongClass);
if (tObj.noMouseCheck) tObj.checkTypeBtn.mouseout().mouseup()

  if (this.counter < this.questNum) {
	tObj.remain = tObj.questNum - tObj.counter;
	tObj.infoHolder.html(tObj.remainingTxt + ": " + tObj.remain);
	tObj.alertHolder.empty();
	
	if (tObj.questType == 'audio'){
		tObj.makePlayer(tObj.workArray[tObj.counter]["quest"]);
	} else if (tObj.questType == 'image') {
			tObj.stringHolder.html('<img src="' + tObj.workArray[tObj.counter]["quest"] +'" />');
	} else {
			tObj.stringHolder.html('' + tObj.workArray[tObj.counter]["quest"] +'');
	}
	
	if (tObj.answerType == 'yn') {
		tObj.getYnAnswers();
	} else if ( tObj.answerType == 'type') {
		tObj.getTypeAnswers();
	}else {
		tObj.getOptions();
	}
	if (tObj.addImg) tObj.container.find(".ps-add-img").html('<img src="'+tObj.workArray[tObj.counter]["image"]+'">')
	if (this.questNum - this.counter == 1) tObj.nextButton.val(tObj.seeResultsTxt);			
  }else {
	tObj.gotoEnd();
 }
}


this.getTypeAnswers = function() {
	tObj.optionsHolder.find(".ps-type-field").val("").removeClass("ps-untyped").removeClass("ps-typed");
	tObj.optionsHolder.find("div.ps-txt-letters").html("").removeClass("ps-untyped").removeClass("ps-typed");
	tObj.optionsHolder.find(".ps-type-rand").empty();
	tObj.optionsHolder.find(".ps-type-elements").html('<a href="javascript:;" class="ps-show-type">'+tObj.showAnswerTxt+'</a>');
	tObj.optionsHolder.find(".ps-show-str-type").text(tObj.workArray[tObj.counter]["answer"]);
	if (tObj.autoPlay) tObj.nextButton.css({visibility: "hidden"});
	if (tObj.intextInput) {
		tObj.optionsHolder.find(".ps-inline-txt").remove();
		var inlineData = tObj.workArray[tObj.counter]["inline"]
		var strings = inlineData["string"]
		tObj.optionsHolder.find(".ps-type-content").prepend('<span class="ps-inline-txt">'+strings[0]+'</span>').append('<span class="ps-inline-txt">'+strings[1]+'</span>');
		tObj.optionsHolder.find(".ps-type-field").css({width: inlineData["width"]})
		if ( inlineData["holder"]!=undefined||inlineData["holder"]!=="") tObj.optionsHolder.find(".ps-type-field").val(inlineData["holder"])
	}
	
	if (tObj.randLetters) {lt_randomWords(tObj.workArray[tObj.counter]["forms"],tObj.optionsHolder.find(".ps-type-rand"), tObj.optionsHolder.find(".ps-type-field"),tObj.optionsHolder.find("div.ps-txt-letters"),tObj.specSigns, tObj.helperStay, tObj.intextReplace,tObj.noSpacer);}
	
	tObj.checkTypeBtn.show().removeClass("ps-invisible").unbind("click").click(function() {
		var userAnswer = tObj.optionsHolder.find(".ps-type-field").val();
		tObj.optionsHolder.append('<span class="tp_helper" style="display: none;">'+userAnswer+'</span>')
		userAnswer = String( tObj.optionsHolder.find("span.tp_helper").html() )
		userAnswer=userAnswer.replace(/[.,;?!]/g, "").replace(/-/g, " ").replace(/&nbsp;/g, " ").replace(/&nbsp/g, " ").replace(/\s\s+/g, " ").toUpperCase().replace(/Ё/g, 'Е').replace(/[。、！？]/g, "");	
		userAnswer = $.trim(userAnswer);
		tObj.optionsHolder.find("span.tp_helper").remove();
		var tWord = tObj.workArray[tObj.counter]["correct"]
		tWord=tWord.replace(/[.,;?!]/g, "").replace(/-/g, " ").replace(/&nbsp;/g, " ").replace(/&nbsp/g, " ").replace(/\s\s+/g, " ").toUpperCase().replace(/Ё/g, 'Е').replace(/[。、！？]/g, "");	
		
		if (tObj.tpNoSpace) {
			tWord=tWord.replace(/&nbsp;/g, "").replace(/\s\s+/g, "").replace(/\s+/g, "")
			userAnswer = userAnswer.replace(/&nbsp;/g, "").replace(/\s\s+/g, "").replace(/\s+/g, "")
		}
		//alert(" '" + userAnswer.toUpperCase()+"' - '"+tWord.toUpperCase()+"'")
		if ( $.trim(userAnswer.toUpperCase()) == $.trim(tWord.toUpperCase()) ) {
			tObj.alertHolder.empty().removeClass(tObj.correctClass).removeClass(tObj.wrongClass);
			if (tObj.autoPlay) tObj.checkTypeBtn.unbind("click");
			tObj.optionsHolder.find(".ps-type-field").addClass("ps-typed");
			tObj.optionsHolder.find("div.ps-txt-letters").addClass("ps-typed");
			tObj.correctAnswer();
		} else {
			tObj.alertHolder.empty().removeClass(tObj.correctClass).removeClass(tObj.wrongClass);
			if (tObj.autoPlay) tObj.checkTypeBtn.unbind("click");
			tObj.optionsHolder.find(".ps-type-field").addClass("ps-untyped");
			tObj.optionsHolder.find("div.ps-txt-letters").addClass("ps-untyped");
			
			tObj.wrongAnswer();
		}
		
		setTimeout(function() {
			tObj.optionsHolder.find(".ps-type-field").removeClass("ps-untyped").removeClass("ps-typed");
			tObj.optionsHolder.find("div.ps-txt-letters").removeClass("ps-untyped").removeClass("ps-typed");
			
		}, tObj.toNextTime)
		if ($(".keys_poser").is(":visible")) {
			tObj.optionsHolder.find(".ps-type-field").click();
		}
	});
	
	tObj.optionsHolder.find(".ps-show-type").click(function() {
		$(this).remove(); 
		tObj.optionsHolder.find(".ps-type-rand").html('<span class="ps-t-ans">'+tObj.workArray[tObj.counter]["answer"]+'</span>');
			if (tObj.autoPlay) {
				tObj.checkTypeBtn.addClass("ps-invisible").hide();
				tObj.nextButton.css({visibility: "visible"});
			} else {
				tObj.checkTypeBtn.addClass("ps-invisible");
			}
	});
}

this.getOptions = function() {

	var startOptions = '<ul class="ps-tasks-list">';
	var endOptions = '<ul class="no-list">';
	var optionsList = '';
	var correctIndex;
  if (tObj.answerType == "options") {
		var tItem = tObj.workArray[tObj.counter]["options"]
		tObj.container.removeClass("ps-3-options")
		if (tItem.length < 4) tObj.container.addClass("ps-3-options");
  
		for (var i = 0; i < tItem.length; i ++ ) {
			var tOption = '<li><input type="radio"> ' + tItem[i] + '</li>';
			optionsList = optionsList + tOption;
		}
		correctIndex = tObj.workArray[tObj.counter]["correct"]-1;
	
  } else {
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
			var tOption = '<li><input type="radio"> ' + tObj.workArray[option[i]]["answer"] + '</li>';
			
			if (option[i] == currentQuestIndex) {
				correctIndex = i;
			}
			optionsList = optionsList + tOption;
		}
	} else {
		for (var i = 0; i < tObj.workArray.length; i ++ ) {
			var tOption = '<li><input type="radio"> ' + tObj.workArray[tObj.straightOrderAnswer[i] ]["answer"] + '</li>';
			optionsList = optionsList + tOption;
		}
		for (var i = 0; i < tObj.straightOrderAnswer.length; i ++ ) {
			if ( tObj.straightOrderAnswer[i] == tObj.counter) {
				correctIndex = i;
			} 
		}
	}
	
  }
	
	
	tObj.optionsHolder.html("" + startOptions + optionsList + endOptions +"");
	tObj.optionsHolder.find("li").eq(correctIndex).data("correct", "true");
	tObj.optionsHolder.find("li").each(function(i,elem){
	
		$(elem).click(function() {
			$(elem).find("input").attr("checked", "checked");
			if (tObj.answerType == "options") {
				var strAn = $(elem).text();
				if ($(elem).find("span.ps-nothin").length > 0) strAn="";
				tObj.stringHolder.find(".ps-miss-ans").text(strAn);
			}
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
	if (tObj.checkTypeBtn.data("checked") != "1" ) {tObj.correctAswersNum ++;}
	tObj.checkTypeBtn.data("checked","1");

	if (tObj.answerType != 'yn' && tObj.answerType != 'type') {
		tObj.optionsHolder.find("li").unbind("click").each(function(i, elem) {
			if ($(elem).data('correct') != 'true') {
				tObj.highlightWrong($(elem));
			} else {
				$(elem).css({color: "green"}).addClass("pt-ps-correct").find("input").attr("disabled", "disabled")
			}
		});
	} else {
		//tObj.ynButtons.unbind("click");
	}

	if (tObj.autoPlay) {
		toNextInt = setTimeout(function() {
				tObj.gotoNext();
		}, 1600);
	}
}

this.wrongAnswer = function (jElem) {
	tObj.alertHolder.html("" + tObj.wrongMsg + "").addClass(tObj.wrongClass).css({opacity: '0.8'});
	tObj.wrongAnswers.push(tObj.workArray[tObj.counter]["answer"]);
	tObj.wrongAswersNum++;

	if (tObj.answerType != 'yn' && tObj.answerType != 'type') {
		tObj.optionsHolder.find("li").unbind("click").each(function(i, elem) {
			if ($(elem).data('correct') != 'true') {
				tObj.highlightWrong($(elem));
			} else {
				$(elem).css({color: "green"}).addClass("pt-ps-should").find("input").attr("disabled", "disabled")
			}
		});
		jElem.css({color: "red"}).addClass("pt-ps-wrong");
	} else {
		//tObj.ynButtons.unbind("click");
	}
	
	if (tObj.autoPlay) {
		toNextInt = setTimeout(function() {
				tObj.gotoNext();
		}, tObj.toNextTime);
	}
}


this.gotoNext = function() {
	if (tObj.answerType == 'yn') {
		//tObj.ynButtons.unbind("click");
	}
	tObj.counter++;
	tObj.checkTypeBtn.removeData("checked");
	tObj.step();
	
	if (tObj.questType == 'audio') { 
		exJpForce = true;
		tObj.audioHolder.mousedown();
		exJpForce = false;
	}
}

this.highlightWrong = function(jElem) {
	 jElem.addClass("ps-incorrect").css({textDecoration: "line-through", color: "#999"}).find("input").attr("disabled", "disabled");
}

this.gotoEnd = function() {
	tObj.audioHolder.unbind("mousedown");
	tObj.alertHolder.empty();
	tObj.infoHolder.empty();
	tObj.container.find(".ps-wrapper").addClass("ps-final-bg");
	tObj.autoPlayBoxContainer.addClass("ps-invisible");
	tObj.contentHolder.addClass("ps-invisible");
	tObj.nextButton.addClass("ps-invisible").css({visibility: 'hidden'});

	var tResults = Math.round((tObj.correctAswersNum / tObj.questNum ) * 100)
	tObj.finalSign.html('<div><i> '+tObj.totalQuestionsTxt+':</i> <span id="'+tObj.id+'_total">'+tObj.questNum+'</span> <br><i>'+tObj.correctAnswersTxt+':</i> <span id="'+tObj.id+'_correct">'+ tObj.correctAswersNum +'</span><br><b><br><i>'+tObj.yourResultTxt+'</i></b>: <span id="'+tObj.id+'_result">'+tResults+'</span>%</div>' ).fadeIn();

	if (tObj.questType == 'audio') {
		exJpForce = true;
		ps_Jplayer('/sounds/yes.mp3', tObj.audioHolder.get(0),1);
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
	ps_Jplayer(soundLink, tDom,1);
	exJpForce = false;
tObj.audioHolder.unbind("mousedown").mousedown( function() {
	ps_Jplayer(soundLink, tDom);
	tObj.audioHolder.addClass("ps-audio-holder-hover");
});

}


$(document).ready(function() {
	tObj.parseTest();
})


}


function lt_randomWords(word,container,target,html_target,spec_signs,hider,replacer,no_spacer) {

	var tStr = word;
	container.empty();
	tStr = tStr.replace(/[!.,;?]/g, "").replace(/\s\s+/g, " ").split(" ");
	tStr = tStr.shuffle();
	for (var n=0; n < tStr.length; n ++ ) {
		container.append("<span>" + tStr[n] + "</span> ")
	}
	if (spec_signs.length!=0&&spec_signs!=0) container.append("<nobr><span>"+spec_signs.join("</span><span>")+"</span></nobr>");
	var variants = container.find("span");
	variants.click(function(e) {
		t = $(this)
		var tVal = target.val();
		var newVal;
		var tText = t.text();
		if (no_spacer == true || tText=="!"||tText=="?"||tText==","||tText=="."){
			newVal= tVal +t.text();
		}else{
			newVal= tVal +" "+t.text();
		}
		if (replacer != undefined && replacer == true) newVal = t.text();
		if (hider!= undefined && hider == false)   t.addClass('ps-var-hidden'); // t.css({visibility: "hidden"}); // hide the element
		target.val(newVal);              // - space for words is added 
		html_target.text( newVal );
		target.removeClass("ps-untyped").removeClass("ps-typed")
	});
	
	target.parent().find(".pt-type-reset").remove();
	target.after('<a href="javascript:;" class="pt-type-reset" title="Восстановить">X</a>');
	
	target.parent().find(".pt-type-reset").click(function() {
		target.val("");
		html_target.text("");
		target.removeClass("ps-untyped").removeClass("ps-typed")
		variants.each(function(i,elem) {
				if ($(elem).hasClass("ps-var-hidden")==true) {
						$(elem).removeClass("ps-var-hidden");
				}
		});
	});
}








