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
	tObj.testsHolder = tObj.container.find(".fl-tests");
	
	tObj.nextButton = tObj.container.find(".fl-next");
	tObj.startButton = tObj.container.find(".fl-start");
	tObj.stopButton = tObj.container.find(".fl-stop");
	
	tObj.verifyButton = tObj.container.find(".fl-verify");
	
	tObj.wordListContainer = tObj.container.find(".fl-prestart");
	tObj.initContainer = tObj.container.find(".fl-init");
	tObj.workContainer = tObj.container.find(".fl-work");
	
	tObj.startButton.click(function() {
		tObj.start();
	});
	
	tObj.stopButton.click(function() {
		tObj.stop();
	});
	
	tObj.prestart();
}


this.prestart = function() {
if (tObj.basicArray.length > 12) tObj.wordListContainer.addClass('fl-scroll')
for (var i = 0; i< tObj.basicArray.length; i ++) {
	tObj.wordListContainer.append('<span class="fl-list"><input type="checkbox" checked class="st">'+tObj.basicArray[i][1]+'</span><br/>');
	tObj.wordListContainer.find(".fl-list:eq(i)").data("index",i);
}


}

this.formArray = function() {
	tObj.usersArray = new Array();
	tObj.container.find(".fl-prestart span").each(function(i,elem){
		if ( $(elem).find("input").is(":checked") ) {
				var tItemData = new Array();
				tItemData['data'] = tObj.basicArray[i];
				tItemData ['base'] = i;
				tObj.usersArray[i] = tItemData;
		}
	})
}


this.stop = function () {
	tObj.testsHolder.empty();
	tObj.workContainer.hide();
	tObj.initContainer.fadeIn(300);
}



this.start = function () {

	
	tObj.initContainer.fadeOut(260, function() {
		tObj.workContainer.show();
	});
	tObj.articleHolder.find("div").css({opacity: "1"})
	tObj.counter=0;
    tObj.missedItems=new Array();
    tObj.wrongAswersNum=0;
    tObj.correctAswersNum = 0;
	

	
	tObj.formArray();
	
	tObj.workArray = tObj.usersArray.shuffle();
	
	activeEl = 0;
	cicleLen = tObj.workArray.length;
	knowInCicle = new Array();
	$("#gessed").empty();
	
	
	for (var i = 0; i <  tObj.workArray.length; i ++ ) {
	
		tObj.missedItems[i] =   i
	}
	
	//tObj.nextButton.css({border: "1px solid red"})
	
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
	$("#counter").text(activeEl)
	tObj.verifyButton.show();
	
	$("#missed").empty();
	
	for (var i=0; i < tObj.missedItems.length; i++ ) {
		$("#missed").append( "<b>"+tObj.missedItems[i]+"</b>" )
	}
	
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
	tObj.testsHolder.empty();
	//tObj.articleHolder.find("div").css({opacity: "1"})
	tObj.testsHolder.animate({height: 40})
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
	
	tObj.articleHolder.find("div").stop().animate({opacity: 0}, function() {
		tObj.step();
		tObj.articleHolder.find("div").css({opacity: "1"});
	})
		
		
	
	
}


this.verify = function() {
	tObj.testManager(1);
	tObj.verifyButton.hide();
}


this.exclude = function (num) {
	$("#gessed").append(""+tObj.missedItems[num]+"")
	knowInCicle.push(num);
}


this.testManager = function (testOrder) {
	tObj.articleHolder.find("div").css({opacity: "1"})

	if ( testOrder == 1 ) {
		tObj.launchTest('audio');
	} else if (testOrder == 2) {
		tObj.launchTest('translate');
	}else {
		tObj.exclude(activeEl);
		tObj.gotoNext();
	}
	
}

this.launchTest = function(testType) {
	var dataType = 0;
	var nextTextType = 0;
	
	
	if (testType == 'audio') {
		dataType= 1;
		nextTestType = 2;
		var toHide = tObj.originHolder
	} else if (testType == 'translate') {
		dataType= 2;
		nextTestType = 3;
		var toHide = tObj.transcriptHolder
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
	
		var tOption = '<div style="display: none"> <input type="radio" > ' + tObj.basicArray[option[i]][dataType] + '</div>';
			
		if (option[i] == currentQuestIndex) {
				correctIndex = i;
		}
		optionsList = optionsList + tOption;
	}
	
	
	
	tObj.testsHolder.html("" + optionsList + "");
	tObj.testsHolder.find("div").eq(correctIndex).data("correct", "true");
	tObj.testsHolder.animate({height: 140})
	tObj.testsHolder.find("div").show(400);
	toHide.animate({opacity: 0}, 400)
	tObj.testsHolder.find("div").each(function(i,elem){
	
		$(elem).click(function() {
			//$(elem).find("input").attr("checked", "checked")
			if ($(elem).data('correct') == "true") {
				
				$(elem).css({color: "green"}).find("input").attr("disabled", "disabled");
				
				
				
				toNextInt = setTimeout(function() {
					tObj.testManager( nextTestType );
				}, 1600);
				
			} else {
				alert("wrong")	//tObj.wrongAnswer($(elem));
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











































