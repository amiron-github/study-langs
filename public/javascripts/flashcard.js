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

	$(".fl-next").mousedown(function(){
		$(this).addClass("fl-next-down");
	}).mouseup(function(){
		$(this).removeClass("fl-next-down");
	})
	
});



function flashcard(hash) {

this.basicArray = hash['basic_array'];
this.id = hash['id'];						
this.autoPlay = hash['auto_play'];			// default - true, option: false
this.variantsNum = hash['variants_num'];	// default - 4
this.randomOrder = hash['random_order'];    // default - true, option: false
this.questType = hash['quest_type'];  		// default - html, options audio, image
this.answerType = hash['answer_type'];  	// default - variants, option: yn
this.texts = hash['texts'];					// default - english
this.questNum = hash['quest_num'];			// default - basic array length

var tObj = this;


this.counter = 0;
this.remain = 0;
this.workArray = new Array();
this.sounds = new Array;
this.translations = new Array();
this.transcriptions = new Array();
this.missedItems=new Array();
this.wrongAswersNum=0;
this.correctAswersNum=0;


this.usersArray = new Array();

var activeEl;
var cicleLen;
var knowInCicle;
var toNextInt;

this.straightOrderAnswers = new Array();

if (this.questNum == undefined || this.questNum > this.basicArray.length ) this.questNum = this.basicArray.length;
if (this.variantsNum == undefined) this.variantsNum = 4; 


this.parseTest = function() {

	this.container = $("#"+tObj.id);
	tObj.contentHolder = tObj.container.find(".fl-container");
		
	tObj.originHolder = tObj.container.find(".fl-original");
	tObj.transcriptHolder = tObj.container.find(".fl-transcript");
	tObj.translateHolder = tObj.container.find(".fl-translate");
	tObj.soundHolder = tObj.container.find(".fl-sound");
	tObj.articleHolder = tObj.container.find(".fl-article-wrapper");
	tObj.articleWrapper = tObj.container.find(".fl-article-list");
	tObj.testsHolder = tObj.container.find(".fl-tests");
	tObj.activityHolder = tObj.container.find(".fl-activity-wrapper");
	
	tObj.nextButton = tObj.container.find(".fl-next");
	tObj.startButton = tObj.container.find(".fl-start");
	tObj.stopButton = tObj.container.find(".fl-stop");
	tObj.cancelButton = tObj.container.find(".fl-cancel");
	
	tObj.verifyButton = tObj.container.find(".fl-verify");
	
	tObj.wordListContainer = tObj.container.find(".fl-prestart");
	tObj.initContainer = tObj.container.find(".fl-init");
	tObj.workContainer = tObj.container.find(".fl-work");
	
	tObj.startButton.click(function() {
		tObj.start();
	});
	
	tObj.cancelButton.click(function() {
		tObj.cancelTest();
	});
	
	tObj.stopButton.click(function() {
		tObj.stop();
	});
	
	tObj.prestart();
}


this.prestart = function() {
//if (tObj.basicArray.length > 11) tObj.wordListContainer.addClass('fl-scroll');


var startList = '<table class="fl-prestart-list" cellspacing="0" width="100%">';
var endList = '</table>';
var wordList = new Array();

for (var i = 0; i< tObj.basicArray.length; i ++) {
	wordList[i] = '<tr class="fl-list"><td><input type="checkbox" checked class="st"></td><td class="fl-wordlist-origin">'+tObj.basicArray[i][0]+'</td><td>'+tObj.basicArray[i][1]+'</td></tr>'
	//tObj.wordListContainer.append('<span class="fl-list"><input type="checkbox" checked class="st">'+tObj.basicArray[i][1]+'</span><br/>');
	tObj.wordListContainer.find(".fl-list:eq(i)").data("index",i);
}
var wordListHtml = wordList.join('');

tObj.wordListContainer.append(""+startList+wordListHtml+endList+"");

if (tObj.container.find(".fl-prestart-list").height() > 330) tObj.wordListContainer.addClass('fl-scroll');

tObj.wordListContainer.find(".fl-prestart-list tr:even").css({backgroundColor: "#efefef"}) 


}

this.formArray = function() {
	tObj.usersArray = new Array();
	
	tObj.container.find(".fl-prestart tr.fl-list").each(function(i,elem){
	
		if ( $(elem).find("input[type='checkbox']").is(":checked") ) {
				var tItemData = new Array();
				tItemData['data'] = tObj.basicArray[i];
				tItemData ['base'] = i;
				tObj.usersArray.push(tItemData);
		}
		
	})
	
	//alert(tObj.usersArray.length);
}


this.stop = function () {
	tObj.workContainer.hide();
	tObj.initContainer.fadeIn(300);
}




this.start = function () {

	
	tObj.initContainer.fadeOut(260, function() {
		tObj.workContainer.show();
	});
	tObj.articleWrapper.css({opacity: "1"});
	tObj.articleHolder.find("div").css({opacity: "1"});
	tObj.counter=0;
    tObj.missedItems=new Array();
    tObj.wrongAswersNum=0;
    tObj.correctAswersNum = 0;
	
	tObj.formArray();
	
	tObj.workArray = tObj.usersArray.shuffle();
	
	activeEl = 0;
	cicleLen = tObj.workArray.length;
	knowInCicle = new Array();

	for (var i = 0; i <  tObj.workArray.length; i ++ ) {
	
		tObj.missedItems[i] =   i
	}
	
	
	tObj.nextButton.unbind("click").click(function() {
		tObj.gotoNext();
	});
	
	tObj.container.find(".ex").unbind("click").click(function() {
		tObj.exclude(activeEl);
	});
	
	tObj.verifyButton.unbind("click").click(function() {
		tObj.verify();
	});

	tObj.step();
}

this.step = function () {

	if (tObj.activityHolder.is(":hidden")) tObj.activityHolder.fadeIn();

	if (tObj.missedItems.length > 0 ) {
				
		tObj.originHolder.html( tObj.workArray[tObj.missedItems[activeEl]]['data'][0])
		tObj.translateHolder.html( tObj.workArray[tObj.missedItems[activeEl]]['data'][1])
		tObj.transcriptHolder.html('['+ tObj.workArray[tObj.missedItems[activeEl]]['data'][3]+']')
		
		tObj.soundHolder.html( tObj.workArray[tObj.missedItems[activeEl]]['data'][2])
		
	}else {
		tObj.gotoEnd();
	}
}



this.gotoNext = function() {
	
	activeEl++;
	 
	if (activeEl >=cicleLen ) {
	 
		var newMissed = new Array();
		
		for (var i = 0; i < tObj.missedItems.length; i ++ )	 { 
			var knowThis = false;
			
			for (var n =0; n < knowInCicle.length; n ++ ) {
				if  (knowInCicle[n] == i ) {
					knowThis = true;
				}
			}
			if (!knowThis) {
				newMissed.push(tObj.missedItems[i]) 
			}
		}
		
		tObj.missedItems = new Array();
		
		for (var i = 0; i < newMissed.length; i ++ ) {
			tObj.missedItems[i] = newMissed[i];
		}
		
		knowInCicle = new Array();
		activeEl = 0;
		cicleLen = tObj.missedItems.length;
	}
	
	clearTimeout(toNextInt);
	tObj.testsHolder.find(".fl-test-task").hide(400);
	tObj.testsHolder.stop().hide(400, function() {
		tObj.container.find(".fl-task-string").show();
		tObj.container.find(".fl-notes").hide();
	});
	tObj.articleWrapper.stop().animate({opacity: 0}, function() {
		tObj.testsHolder.find(".fl-test-option").remove().end().find(".fl-cancel-wrapper").hide();
		
		tObj.step();
		tObj.articleWrapper.css({opacity: "1"});
		tObj.articleHolder.find("div").css({opacity: "1"});
		tObj.testsHolder.find(".fl-test-task").show();
	})
		
}

this.cancelTest = function () {

	clearTimeout(toNextInt);
	
	tObj.testsHolder.find(".fl-test-task").hide(400);
	tObj.testsHolder.stop().hide(400, function() {
		tObj.testsHolder.find(".fl-test-option").remove().end().find(".fl-cancel-wrapper").hide();
		if (tObj.activityHolder.is(":hidden")) tObj.activityHolder.fadeIn();
		tObj.articleWrapper.css({opacity: "1"});
		tObj.articleHolder.find("div").css({opacity: "1"});
		tObj.testsHolder.find(".fl-test-task").show();
		tObj.container.find(".fl-task-string").show();
		tObj.container.find(".fl-notes").hide();
		
	});
}


this.verify = function() {
	tObj.testManager(1);
	tObj.activityHolder.hide();
}


this.exclude = function (num) {
	knowInCicle.push(num);
}


this.testManager = function (testOrder) {
	tObj.articleWrapper.css({opacity: "1"})
	tObj.articleHolder.find("div").css({opacity: "1"});
	
	if ( testOrder == 1 ) {
		tObj.launchTest('origin');
	} else if (testOrder == 2) {
		tObj.launchTest('translate');
	}else {
		tObj.exclude(activeEl);
		
		
		tObj.container.find(".fl-exclude-note").css({display: "block"});
		tObj.cancelButton.hide();
		
		toNextInt = setTimeout(function() {
			tObj.container.find(".fl-exclude-note").fadeOut(200, function() {
				tObj.container.find(".fl-task-string").show();
				tObj.cancelButton.show();
			});
			
			tObj.gotoNext();
		}, 2500);
		
		
		
	
		var currentQuestIndex = tObj.workArray[ tObj.missedItems[activeEl] ]['base'];
		tObj.wordListContainer.find("tr.fl-list:eq("+currentQuestIndex+")").addClass("fl-learned").find("input").removeAttr("checked");
	}
	
}

this.launchTest = function(testType) {
	var dataType = 0;
	var nextTextType = 0;
	
	if (testType == 'origin') {
		dataType= 0;
		nextTestType = 2;
		var toHide = tObj.originHolder
	} else if (testType == 'translate') {
		dataType= 1;
		nextTestType = 3;
		var toHide = tObj.translateHolder
	}

	var correctIndex;
	var option = new Array();
	var optionsList = '';
	var currentQuestIndex = tObj.workArray[ tObj.missedItems[activeEl] ]['base']; // index in the basic array
	var allIndexes = new Array();
	var addIndexes = new Array();
	
	for (var i=0; i < tObj.basicArray.length; i ++ ) {          // create array of all indexes from basic array
			allIndexes[i] = i;
	}
	
	allIndexes.splice(currentQuestIndex, 1); // remove the current index
	addIndexes = allIndexes.shuffle( tObj.variantsNum - 1 ); // get random options
	addIndexes.push(currentQuestIndex) // add the current 
	option = addIndexes.shuffle() // mix the array of indexes from basic array
	
	for (var i = 0; i < option.length; i ++ ) {
	
		var tOption = '<div style="display: none" class="fl-test-option"> <input type="radio" > ' + tObj.basicArray[option[i]][dataType] + '</div>';
			
		if (option[i] == currentQuestIndex) {
				correctIndex = i;
		}
		optionsList = optionsList + tOption;
	}
	
	
	tObj.testsHolder.find("div.fl-test-option").remove();
	tObj.testsHolder.append("" + optionsList + "");
	tObj.testsHolder.find("div.fl-test-option").eq(correctIndex).data("correct", "true");
	tObj.testsHolder.animate({height: 170})
	tObj.testsHolder.find("div").show(400);
	
	toHide.css({opacity: 0}, 400);
	
	tObj.testsHolder.find("div.fl-test-option").each(function(i,elem){
	
		$(elem).click(function() {
			tObj.testsHolder.find("div.fl-test-option").each(function (n, inel) {
				$(inel).unbind("click").find("input").attr("disabled", "disabled");
				
				if ( $(inel).data('correct') == "true") {
					$(inel).css({color: "green"})
				}else {
					$(inel).addClass("fl-not-answer");
				}
			})
			
			tObj.container.find(".fl-task-string").hide();
			
			$(elem).find("input").attr("checked", "checked")
			if ($(elem).data('correct') == "true") {
				
				tObj.container.find(".fl-correct-note").css({display: "block"});
				toNextInt = setTimeout(function() {
					
					if (nextTestType == 3) {
						tObj.container.find(".fl-correct-note").hide();
						tObj.testManager( nextTestType );
					} else {
						tObj.container.find(".fl-correct-note").fadeOut(200, function() {
							tObj.container.find(".fl-task-string").show();
						});
						tObj.testManager( nextTestType );
					
					}

				}, 1600);
				
			} else {
				
				$(elem).css({color: "red"});
				tObj.container.find(".fl-wrong-note").css({display: "block"});
				toNextInt = setTimeout(function() {
					
					tObj.container.find(".fl-wrong-note").fadeOut(200, function() {
					tObj.container.find(".fl-task-string").show();
					});
					tObj.testManager( nextTestType -1);//tObj.cancelTest();
				}, 1600);
				
			}
		})
	})
	
	
}




this.gotoEnd = function() {
	alert("end");
	tObj.stop();
}



$(document).ready(function() {
	tObj.parseTest();
})


}











































