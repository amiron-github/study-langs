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

var tObj = this;


var toYes;
var toNo;

var toNextInt;


this.start = function () {


	this.container = $("#"+tObj.id);
	
    	tObj.counter=0;
    	tObj.wrongAnswers=new Array();
    	tObj.wrongAswersNum=0;
    	tObj.correctAswersNum = 0;
    	// берём массив и возращаем рабочий массив (РМ)
    	tObj.workArray = tObj.basicArray.shuffle(tObj.questNum);
		
		tObj.audioHolder = tObj.container.find(".yn-audio");
		tObj.transHolder = tObj.container.find(".yn-trans");
		tObj.buttonsHolder = tObj.container.find(".yn-btn");
		tObj.alertHolder = tObj.container.find(".yn-alert");
		tObj.infoHolder = tObj.container.find(".yn-info");
		tObj.buttons = tObj.buttonsHolder.find("input");
		tObj.yesButton = tObj.container.find("input.yn-yes");
		tObj.noButton = tObj.container.find("input.yn-no");
		
		tObj.startButton = tObj.container.find(".yn-start");
		
    	tObj.startButton.click(function() {
			//alert(tObj.questNum);
		});
		
		tObj.step();
		
		
}


this.step = function () {

  if (this.counter < this.questNum) {
	tObj.audioHolder.empty();
	tObj.remain = tObj.questNum - tObj.counter;
	
	tObj.infoHolder.text("Remaining: " + tObj.remain);
	
		tObj.alertHolder.empty();
		
		tObj.transHolder.html("<div>" + tObj.workArray[tObj.counter][1] + "<\/div>"); 
		

			if (Math.random() < .6) {
				toYes=true;
				tObj.getCorrectSound(tObj.counter);
			}else {
				toYes=false;
				tObj.getWrongSound(tObj.counter);
			}
			
			tObj.buttonsOn();

	
  }else {
	//tObj.gotoEnd();
 }
}


this.getCorrectSound = function (counter) {
	var toSoundDiv = tObj.workArray[counter][0];
	tObj.audioHolder.html("" +toSoundDiv + ""); 
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
	tObj.audioHolder.html("" + toSoundDiv+ "");
}

this.yesAnswer = function() {
	if(toYes) {
		tObj.correctAnswer();
	}else {
		tObj.wrongAnswer();
	}
	tObj.gotoNext();
}

this.noAnswer = function () {
	if(toYes) {
		tObj.wrongAnswer() ;
	}else{
		tObj.correctAnswer();
	}
	tObj.gotoNext();
}

this.gotoNext = function() {
	tObj.buttons.unbind("click");
	tObj.counter++;
	
	toNextInt=setTimeout(function() {
		tObj.step();
	}, 1600);
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
	tObj.alertHolder.html('correct');
	tObj.correctAswersNum ++;
}

this.wrongAnswer = function () {
	tObj.alertHolder.html('wrong');
	tObj.wrongAnswers.push(tObj.workArray[tObj.counter][1]);
	tObj.wrongAswersNum++;
}







$(document).ready(function() {
	tObj.start();
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