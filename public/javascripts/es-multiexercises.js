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




function ch_exercise(hash) {

this.basicArray = hash['basic_array'];
this.id = hash['id'];
this.autoPlay = hash['auto_play'];
this.variantsNum = hash['variants_num'];

this.randomOrder = hash['random_order'];
this.questType = hash['quest_type'];  // options audio, img, other

this.counter = 0;
this.remain = 0;


this.workArray = new Array();
this.sounds = new Array;
this.translations = new Array();
this.straightOrderAnswers = new Array();

this.wrongAnswers=new Array();
this.wrongAswersNum=0;
this.correctAswersNum=0;

this.questNum = hash['quest_num'];

if (this.questNum == undefined) this.questNum = this.basicArray.length;
if (this.randomOrder == undefined) this.randomOrder = true;
if (this.autoPlay == undefined) this.autoPlay = true; 
if (this.questType == undefined) this.questType = 'html'; 


var tObj = this;

tObj.correctMsg = "CORRECT";
tObj.correctClass = "es-ex-alert-correct";
tObj.wrongClass = "es-ex-alert-wrong";
tObj.wrongMsg = "WRONG";


var toNextInt;


this.parseTest = function() {

	this.container = $("#"+tObj.id);
		tObj.contentHolder = tObj.container.find(".es-ex-content")
		tObj.audioHolder = tObj.container.find(".es-ex-audio-holder");
		tObj.stringHolder = tObj.container.find(".es-ex-string-wrapper");
		tObj.transHolder = tObj.container.find(".yn-trans");
		tObj.buttonsHolder = tObj.container.find(".yn-btn");
		tObj.alertHolder = tObj.container.find(".es-ex-alert");
		tObj.infoHolder = tObj.container.find(".es-ex-info");
		tObj.buttons = tObj.buttonsHolder.find("input");
		tObj.yesButton = tObj.container.find("input.yn-yes");
		tObj.noButton = tObj.container.find("input.yn-no");
		tObj.nextButton = tObj.container.find(".es-ex-next");
		tObj.finalSign = tObj.container.find(".es-ex-final");
		tObj.startButton = tObj.container.find(".yn-start");
		tObj.optionsHolder = tObj.container.find(".es-ex-tasks");
		
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
    	tObj.workArray = tObj.basicArray.shuffle(tObj.questNum);
		
		if (!tObj.randomOrder) tObj.straightOrderAnswer = tObj.getAnswersOrder();
		
		clearTimeout(toNextInt);
		tObj.alertHolder.empty().removeClass(tObj.correctClass);
		tObj.container.removeClass("es-ex-final-bg");
		
		tObj.finalSign.hide();
		tObj.container.find(".es-ex-invisible").removeClass("es-ex-invisible");
		tObj.nextButton.val("NEXT");
		
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
		tObj.container.removeClass("es-ex-final-bg");
		
		tObj.finalSign.hide();
		tObj.container.find(".es-ex-invisible").removeClass("es-ex-invisible");
		tObj.nextButton.val("NEXT");
		tObj.step();
}





this.step = function () {

tObj.alertHolder.empty().removeClass(tObj.correctClass).removeClass(tObj.wrongClass);

  if (this.counter < this.questNum) {
  
	tObj.remain = tObj.questNum - tObj.counter;
	tObj.infoHolder.text("Remaining: " + tObj.remain);
	tObj.alertHolder.empty();
	
	if (tObj.questType == 'audio'){
	
		tObj.makePlayer(tObj.workArray[tObj.counter][0]);
		
	} else if (tObj.questType == 'image') {
		tObj.stringHolder.html('<img src="' + tObj.workArray[tObj.counter][0] +'" />');
	} else {
		tObj.stringHolder.html('' + tObj.workArray[tObj.counter][0] +'');
	}
	
	tObj.getOptions();
			
	if (this.questNum - this.counter == 1) tObj.nextButton.val("See results");		
			
  }else {
	tObj.gotoEnd();
 }
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
	
	//alert(tObj.questNum);
	
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
	tObj.buttonsOff();
	
	tObj.optionsHolder.find("li").unbind("click").each(function(i, elem) {
		if ($(elem).data('correct') != 'true') {
			tObj.highlightWrong($(elem));
		} else {
			$(elem).css({color: "green"}).find("input").attr("disabled", "disabled")
		}
	});
	
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
	tObj.buttonsOff();
	
	tObj.optionsHolder.find("li").unbind("click").each(function(i, elem) {
		if ($(elem).data('correct') != 'true') {
			tObj.highlightWrong($(elem));
		} else {
			$(elem).css({color: "green"}).find("input").attr("disabled", "disabled")
		}
	});
	
	jElem.css({color: "red"});
	
	if (tObj.autoPlay) {
		toNextInt = setTimeout(function() {
				tObj.gotoNext();
		}, 1600);
	}
}


this.gotoNext = function() {
	tObj.buttons.unbind("click");
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
tObj.contentHolder.addClass("es-ex-invisible");
tObj.nextButton.addClass("es-ex-invisible");

var tResults = Math.round((tObj.correctAswersNum / tObj.questNum ) * 100)
tObj.finalSign.html('<div><i> Total questions:</i> '+tObj.questNum+' <br><i>Correct answers:</i> '+ tObj.correctAswersNum +'<br><b><br><i>Your result</i></b>: '+tResults+'%</div>' ).fadeIn();

if (tObj.questType == 'audio') {
	exJpForce = true;
	ex_Jplayer('/sounds/yes.mp3', tObj.audioHolder.get(0),1);
	exJpForce = false;
}


}


this.buttonsOn = function() {
	tObj.yesButton.click(function() {
		tObj.yesAnswer();
	});
	tObj.noButton.click(function() {
		tObj.noAnswer();
	});
}




this.buttonsOff = function() {
	tObj.buttons.unbind("click");
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











