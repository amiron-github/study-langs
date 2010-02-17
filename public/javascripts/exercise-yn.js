/////////////////////////////////////////////////// перемешиваем варианты  

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
}

function ynMakePlayer(mp3File) {
	beginPlayer='<div class="play" onMouseDown="(this.style.backgroundPosition=\'0px 0px\')" onMouseUp="(this.style.backgroundPosition=\'0px -70px\')" onclick="playTestSound(\'';
    endPlayer  = '\')"><\/div>';
	allPlayer = beginPlayer + mp3File + endPlayer;
	return allPlayer;
}


////////////////////////////////////////////////// end of yes/no 
