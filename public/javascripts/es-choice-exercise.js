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
this.variantsNum = hash['variants_num'];
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


var toNextInt;


this.parseTest = function() {

	this.container = $("#"+tObj.id);
		tObj.contentHolder = tObj.container.find(".es-ex-content")
		tObj.audioHolder = tObj.container.find(".es-ex-audio-holder");
		tObj.stringHolder = tObj.container.find(".es-ex-string-wrapper");
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
		tObj.optionsHolder = tObj.container.find(".es-ex-tasks");
		
		if (tObj.variantsNum > 4 ) tObj.optionsHolder.addClass("es-ex-tasks-more-than-4");
 		
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
		clearTimeout(toNextInt);
		

		tObj.alertHolder.empty().removeClass(tObj.correctClass);
		tObj.container.removeClass("yn-final-bg");
		
		tObj.finalSign.hide();
		tObj.container.find(".es-ex-invisible").removeClass("es-ex-invisible");
		tObj.nextButton.val("NEXT");
		
    	tObj.startButton.click(function() {
			tObj.restart();
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

this.restart = function() {

		if( !tObj.autoPlay) tObj.nextButton.css({visibility: "visible"});
	
    	tObj.counter=0;
    	tObj.wrongAnswers=new Array();
    	tObj.wrongAswersNum=0;
    	tObj.correctAswersNum = 0;

    	tObj.workArray = tObj.basicArray.shuffle(tObj.questNum);
		clearTimeout(toNextInt);
		

		tObj.alertHolder.empty().removeClass(tObj.correctClass);
		tObj.container.removeClass("yn-final-bg");
		
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
		
	tObj.stringHolder.html("" + tObj.workArray[tObj.counter][0] +"");
	tObj.getOptions();
			
	if (this.questNum - this.counter == 1) tObj.nextButton.val("See results");		
			
  }else {
	tObj.gotoEnd();
 }
}



this.getOptions = function() {

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


	var startOptions = '<ul class="es-ex-tasks-list">';
	var endOptions = '<ul class="no-list">';
	
	var optionsList = '';
	var correctIndex;
	
	for (var i = 0; i < option.length; i ++ ) {
		var tOption = '<li><input type="radio"> ' + tObj.workArray[option[i]][1] + '</li>'
		if (option[i] == currentQuestIndex) {
			correctIndex = i;
		}
		optionsList = optionsList + tOption;
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
	if (tObj.autoPlay) { 
		exJpForce = true;
		tObj.audioHolder.mousedown();
		exJpForce = false;
	}
}

this.highlightWrong = function(jElem) {
	jElem.css({textDecoration: "line-through", color: "#999", backgroundImage: "none", backgroundColor: "#dfdfdf"}).find("input").attr("disabled", "disabled");

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



this.gotoEnd = function() {

tObj.audioHolder.unbind("mousedown");
tObj.alertHolder.empty();
tObj.infoHolder.empty();
tObj.container.addClass("yn-final-bg");
tObj.contentHolder.addClass("es-ex-invisible");
tObj.nextButton.addClass("es-ex-invisible");
var tResults = Math.round((tObj.correctAswersNum / tObj.questNum ) * 100)
tObj.finalSign.html('<div><i> Total questions:</i> '+tObj.questNum+' <br><i>Correct answers:</i> '+ tObj.correctAswersNum +'<br><b><br><i>Your result</i></b>: '+tResults+'%</div>' ).fadeIn();

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











