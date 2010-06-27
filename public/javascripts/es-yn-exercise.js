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




function yn_exercise(hash) {



this.basicArray = hash['basic_array'];
this.id = hash['id'];
this.autoPlay = hash['auto_play'];

this.counter = 0;
this.remain = 0;


this.workArray = new Array();
this.sounds = new Array;
this.translations = new Array();

this.wrongAnswers=new Array();
this.wrongAswersNum=0;
this.correctAswersNum=0;

this.questNum = hash['quest_num'];
if (this.questNum == undefined) this.questNum = this.basicArray.length;

if (this.autoPlay == undefined) this.autoPlay = true; 

var tObj = this;

tObj.correctMsg = "CORRECT";
tObj.correctClass = "es-ex-alert-correct";
tObj.wrongClass = "es-ex-alert-wrong";
tObj.wrongMsg = "WRONG";

var toYes;
var toNo;

var toNextInt;


this.parseTest = function() {

	this.container = $("#"+tObj.id);
		tObj.contentHolder = tObj.container.find(".es-ex-content")
		tObj.audioHolder = tObj.container.find(".es-ex-audio-holder");
		tObj.transHolder = tObj.container.find(".yn-trans");
		tObj.buttonsHolder = tObj.container.find(".yn-btn");
		tObj.alertHolder = tObj.container.find(".yn-alert");
		tObj.infoHolder = tObj.container.find(".yn-info");
		tObj.buttons = tObj.buttonsHolder.find("input");
		tObj.yesButton = tObj.container.find("input.yn-yes");
		tObj.noButton = tObj.container.find("input.yn-no");
		tObj.nextButton = tObj.container.find(".es-yn-next");
		tObj.finalSign = tObj.container.find(".es-ex-final");
		tObj.startButton = tObj.container.find(".yn-start");
		tObj.jplayer = $("#exJp");
		
		tObj.start();
}



this.start = function () {

		if( !tObj.autoPlay) tObj.nextButton.css({visibility: "visible"});
	
    	tObj.counter=0;
    	tObj.wrongAnswers=new Array();
    	tObj.wrongAswersNum=0;
    	tObj.correctAswersNum = 0;
    	// берём массив и возращаем рабочий массив (РМ)
    	tObj.workArray = tObj.basicArray.shuffle(tObj.questNum);
		clearTimeout(toNextInt);
		

		tObj.alertHolder.empty().removeClass(tObj.correctClass);
		tObj.container.removeClass("yn-final-bg");
		
		tObj.finalSign.hide();
		tObj.container.find(".es-ex-invisible").removeClass("es-ex-invisible");
		tObj.nextButton.val("NEXT");
		
    	tObj.startButton.click(function() {
			tObj.start();
			if (tObj.autoPlay) { 
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


this.step = function () {

tObj.alertHolder.empty().removeClass(tObj.correctClass).removeClass(tObj.wrongClass);

  if (this.counter < this.questNum) {
  
	tObj.remain = tObj.questNum - tObj.counter;
	tObj.infoHolder.text("Remaining: " + tObj.remain);
		tObj.alertHolder.empty();
		tObj.transHolder.html("" + tObj.workArray[tObj.counter][1] + ""); 

			if (Math.random() < .5) {
				toYes=true;
				tObj.getCorrectSound(tObj.counter);
			}else {
				toYes=false;
				tObj.getWrongSound(tObj.counter);
			}
			tObj.buttonsOn();
			
	if (this.questNum - this.counter == 1) tObj.nextButton.val("See results");		
			
  }else {
	tObj.gotoEnd();
 }
}


this.getCorrectSound = function (counter) {
	var toSoundDiv = tObj.workArray[counter][0];
	tObj.makePlayer(toSoundDiv);	
}

this.getWrongSound = function (counter) {
	var wrongSoundIndex;
	while (true) {
		wrongSoundIndex = Math.round(Math.random() * (tObj.questNum-1));
		if (wrongSoundIndex != counter) {
			break;
		}
	}
	var toSoundDiv = tObj.workArray[wrongSoundIndex][0];
	tObj.makePlayer(toSoundDiv);
}

this.yesAnswer = function() {
	if(toYes) {
		tObj.correctAnswer();
	}else {
		tObj.wrongAnswer();
	}
}

this.noAnswer = function () {
	if(toYes) {
		tObj.wrongAnswer() ;
	}else{
		tObj.correctAnswer();
	}
}

this.gotoNext = function() {
	tObj.buttons.unbind("click");
	tObj.counter++;
	tObj.step();
	if (tObj.autoPlay) { 
		exJpForce = true;
		tObj.audioHolder.mousedown();
		exJpForce = false;
	}
}

this.gotoEnd = function() {

tObj.audioHolder.unbind("mousedown");
tObj.alertHolder.empty();
tObj.infoHolder.empty();
tObj.container.addClass("yn-final-bg");
tObj.contentHolder.addClass("es-ex-invisible");
tObj.nextButton.addClass("es-ex-invisible");
var tResults = Math.round((tObj.correctAswersNum / tObj.questNum ) * 100)
tObj.finalSign.html('<div><i> Total questions:</i> '+tObj.questNum+' <br><i>Correct Answers:</i> '+ tObj.correctAswersNum +'<br><b><br><i>Result</i></b>: '+tResults+'%</div>' ).fadeIn();

exJpForce = true;
ex_Jplayer('/sounds/yes.mp3', tObj.audioHolder.get(0),1);
exJpForce = false;

}


this.buttonsOn = function() {
	tObj.yesButton.click(function() {
		tObj.yesAnswer();
	});
	tObj.noButton.click(function() {
		tObj.noAnswer();
	});
}


this.correctAnswer = function () {
	tObj.alertHolder.html("" + tObj.correctMsg + "").addClass(tObj.correctClass);
	tObj.correctAswersNum ++;
	tObj.buttonsOff();
	
	if (tObj.autoPlay) {
		toNextInt = setTimeout(function() {
				tObj.gotoNext();
		}, 1600);
	}
}

this.wrongAnswer = function () {
	tObj.alertHolder.html("" + tObj.wrongMsg + "").addClass(tObj.wrongClass);
	tObj.wrongAnswers.push(tObj.workArray[tObj.counter][1]);
	tObj.wrongAswersNum++;
	tObj.buttonsOff();
	
	if (tObj.autoPlay) {
		toNextInt = setTimeout(function() {
				tObj.gotoNext();
		}, 1600);
	}
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











/*




///////////////////////////////////////////////////// start of yes/no

var ynQuestNum;
var ynCounter;
var toYes;
var ynWrongAswersNum;
var ynCorrectAswersNum;
var ynWrongAnswers;
var ynRemain;
var ynWorkArray = new Array();
var ynTransArray = new Array();
var ynSoundsArray = new Array();
var toNextInt;
var ynHTML;


$(document).ready(function(){ 
	ynHTML= $("#yn_place").html();
	$("#yn_trans").removeAttr("style");
});


function startYN() {

    $("#yn_place").animate({left: "-509"}, "slow", function() {

    	$("#yes_btn").add("#no_btn").unbind("click");
    	$("#yn_info").empty();
    	$("#yn_place").html(ynHTML);
    	$("div.play").hide();
    	ynCounter=0;
    	ynWrongAnswers=new Array();
    	ynWrongAswersNum=0;
    	ynCorrectAswersNum=0;
    	// берём массив и возращаем рабочий массив (РМ)
    	ynWorkArray = massive.shuffle(ynQuestNum);
    	ynStep();
    	$("#yn_place").css({left: "509px"}).animate({left: "0"}, "slow");
    });
	
}

function ynStep() {

  if (ynCounter < ynQuestNum) {
	$("#yn_sound").empty();
	ynRemain=ynQuestNum - ynCounter;
	$("#yn_info").text("Remaining: " + ynRemain);
	$("#yn_trans").css({fontStyle: "normal"}).animate({left: "-160px"}, "slow" , function() {
		$("#show_check").empty();
		$("#yn_trans").html("<div>" + ynWorkArray[ynCounter][1] + "<\/div>").removeAttr("style"); 
		$("#yn_trans").css({left: "160px", fontStyle: "normal"}).animate({left: "-0px"}, "slow", function() {
			$("#yn_trans").css({fontStyle: "normal"}).removeAttr("style"); 
			if (Math.random() < .6) {
				toYes=true;
				getCorrectSound(ynCounter);
			}else {
				toYes=false;
				getWrongSound(ynCounter);
			}
			buttonsOn();
		});
	});
  }else {
	gotoEnd();
 }
}

function getCorrectSound(counter) {
	var toSoundDiv = ynMakePlayer(ynWorkArray[ynCounter][0]);
	$("#yn_sound").html(toSoundDiv).find("div.play").click(); 
}

function getWrongSound(counter) {
	var wrongSoundIndex;
	while (true) {
		wrongSoundIndex = Math.round(Math.random() * (ynQuestNum-1));
		if (wrongSoundIndex != counter) {
			break;
		}
	}
	var toSoundDiv = ynMakePlayer(ynWorkArray[wrongSoundIndex][0]);
	$("#yn_sound").html(toSoundDiv).find("div.play").click(); 
}

function yesAnswer() {
	if(toYes) {
		ynCorrectAnswer();
	}else {
		ynWrongAnswer();
	}
	gotoNext();
}

function noAnswer() {
	if(toYes) {
		ynWrongAnswer() ;
	}else{
		ynCorrectAnswer();
	}
	gotoNext();
}

function gotoNext() {
	$("#yes_btn").add("#no_btn").unbind("click");
	ynCounter++;
	toNextInt=setTimeout("ynStep()", 1600);
}

function buttonsOn() {
	$("#yes_btn").click(function() {
		yesAnswer();
	});
	$("#no_btn").click(function() {
		noAnswer();
	});
}

function ynCorrectAnswer() {
	$("#show_check").html('<span class="yn_right">correct<\/span>');
	ynCorrectAswersNum++;
}

function ynWrongAnswer() {
	$("#show_check").html('<span class="yn_wrong">wrong<\/span>');

	ynWrongAnswers.push(ynWorkArray[ynCounter][1]);
	ynWrongAswersNum++;
}

function gotoEnd() {

$("#yn_place").empty().html("<div id=\"yn_info\"><\/div>");

    var endHtml;
    var exerciseCompleted="Exercise completed";
    var wrongAnswersForEnd="";

    for (var i=0; i< ynWrongAnswers.length; i++) {
    	var thisWrongAnswer=ynWrongAnswers[i];
    	wrongAnswersForEnd += thisWrongAnswer + "<br>";
    }

    switch (  ynWrongAnswers.length ) {
    	case (0): 
    		endHtml='<p class="yn_complete">' + exerciseCompleted + '<\/p>' 
    				+ '<p>Great! You have made no mistakes!<\/p>'
    		break;
    	case (1):
    		endHtml='<p class="yn_complete">' + exerciseCompleted + '<\/p>'
    				+ '<p>You have made only 1 mistake.<\/p>'
    				+ '<p>Please, revise the translation of the following word: <\/p>'
    				+ wrongAnswersForEnd;
    		break;
    	default: 
    				endHtml='<p class="yn_complete">' + exerciseCompleted + '<\/p>'
    				+ '<p>You have made '+ ynWrongAnswers.length +'  mistakes.<\/p>'
    				+ '<p>Please, revise the translation of the following words: <\/p>'
    				+ wrongAnswersForEnd;
    }
    $("#yn_info").css({height: "250px"}).html(endHtml);
	
	var correctToSend = ynQuestNum - ynWrongAnswers.length;
	sendResults(ynIdToSend, ynQuestNum, correctToSend)
}

function ynMakePlayer(mp3File) {
	beginPlayer='<div class="play" onMouseDown="(this.style.backgroundPosition=\'0px 0px\')" onMouseUp="(this.style.backgroundPosition=\'0px -70px\')" onclick="playTestSound(\'';
    endPlayer  = '\')"><\/div>';
	allPlayer = beginPlayer + mp3File + endPlayer;
	return allPlayer;
}


////////////////////////////////////////////////// end of yes/no 

*/