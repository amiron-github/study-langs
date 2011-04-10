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


function mobile_test(hash) {

var tObj = this;
tObj.basicArray = hash['basic_array'];
tObj.questNum = hash['quest_num'];
tObj.counter=0;
tObj.questType = hash['quest_type'];  		// default - html, options audio, image
tObj.correctAswersNum = 0;
tObj.texts = hash['texts'];
tObj.callback = hash['callback'];

if (this.questNum == undefined || this.questNum > this.basicArray.length ) this.questNum = this.basicArray.length;
if (this.questType == undefined) this.questType = 'html';
if (this.callback == undefined) this.callback = function() {return false};

tObj.nextButtonTxt = tObj.texts['next'];
tObj.seeResultsTxt = tObj.texts['result'];
tObj.playTxt = tObj.texts['play'];
tObj.playedTxt = tObj.texts['played'];
tObj.finalTxt = tObj.texts['final'];
if (tObj.texts['next']==undefined) tObj.nextButtonTxt = 'Next'; 
if (tObj.texts['result']==undefined) tObj.seeResultsTxt = "Results";
if (tObj.texts['play']==undefined) tObj.playTxt = "Play";
if (tObj.texts['played']==undefined) tObj.playedTxt = "Playng";
if (tObj.texts['final']==undefined) tObj.finalTxt = "Test complete";

this.parseTest = function() {
	tObj.container = $(".ui-page-active").find(".m-test-container");
	tObj.optionsHolder = tObj.container.find(".mt-options");
	tObj.options = tObj.optionsHolder.find("label .ui-btn-text");
	tObj.optionsRadio = tObj.optionsHolder.find("input[type='radio']");
	tObj.quest = tObj.container.find(".mt-quest");
	tObj.questHolder = tObj.container.find(".mt-quest-container");
	tObj.indicatorHolder = tObj.container.find(".mt-indicator");
	tObj.statusIndicator = tObj.container.find(".mt-status")
	tObj.checkButton = tObj.container.find(".mt-check-btn");
	tObj.nextButton = tObj.container.find(".mt-next-btn");
	tObj.restartButton = tObj.container.find(".mt-restart-btn");
	tObj.variantsNum = tObj.options.length;
	tObj.workHolder = tObj.container.find(".mt-work");
	tObj.endHolder = tObj.container.find(".mt-testend");
	tObj.resCorrectTxt = tObj.container.find(".mt-res-correct");
	tObj.resTotalTxt = tObj.container.find(".mt-res-total");
	tObj.resMarkTxt = tObj.container.find(".mt-res-mark");
	tObj.justBuilt = true;
	
	tObj.restartButton.unbind("click").click(function() {
		tObj.start();
	});
		tObj.start()
}

this.callAfter = function() {
	tObj.callback();
}

this.start = function () {
	tObj.workArray = tObj.basicArray.shuffle(tObj.questNum);
	tObj.counter = 0;
	tObj.correctAswersNum = 0;
	tObj.endHolder.hide()
	tObj.container.removeClass("mt-show-end").removeClass("mt-preend");
	tObj.nextButton.unbind("click").click(function() {
			tObj.gotoNext();
	});
	tObj.checkButton.unbind("click").click(function() {
		tObj.checkOptions();
	});
	tObj.step()
}

this.step = function () {
tObj.nextButton.parent().find(".ui-btn-text").text(tObj.nextButtonTxt)
tObj.optionsHolder.find(".ui-radio").removeClass('mt-option-correct').removeClass('mt-option-wrong');
tObj.optionsRadio.removeData("correct").removeAttr("checked").removeAttr("disabled").checkboxradio("refresh");
tObj.indicatorHolder.removeClass("mt-show-wrong").removeClass("mt-show-correct");

  if (this.counter < this.questNum) {
	var variantsData = tObj.getOptionsData(tObj.counter)
	tObj.statusIndicator.text( (tObj.counter+1) + "/"+tObj.questNum)
	
	if (tObj.questType == 'audio') {
		tObj.quest.html('<div class="jp_control" onclick="cJplayer(\''+variantsData['options'][variantsData['correct']]['sound_url']+'\', this)"><span class="mt-sound"></span><span class="mt-play">'+tObj.playTxt+'</span><span class="mt-played">'+tObj.playedTxt+'</span></div>');
		if(tObj.justBuilt) {
			tObj.justBuilt=false;
		} else {
			tObj.quest.find(".jp_control").click();
		}

	}else{
		tObj.quest.html(variantsData['options'][variantsData['correct']]['quest'])
	}
	tObj.options.each(function(i,elem){
		var content = variantsData['options'][i]['answer'];
		if (i == variantsData['correct'] ) {
			tObj.optionsRadio.eq(i).data('correct','true')
		}
		$(elem).html(content)
	})
	if (tObj.questNum - tObj.counter == 1) {
		tObj.container.addClass("mt-preend");
		tObj.nextButton.parent().find(".ui-btn-text").text(tObj.seeResultsTxt)
	}
  }else {
	tObj.gotoEnd();
 }	
}

this.getOptionsData = function(counter) {
	var optionsData = {options: [], correct: 0}
	var option = new Array();
	var currentQuestIndex = counter;
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
			optionsData['options'].push(tObj.workArray[option[i]]);
			if (option[i] == currentQuestIndex) {
				optionsData['correct'] = i;
			}
	}	
	return optionsData;
}

this.checkOptions = function() {
	var checked = tObj.optionsRadio.filter(":checked");
			if ( checked.data('correct') == "true") {
				tObj.correctAnswer(checked)
			} else {
				tObj.wrongAnswer(checked)
			}
	tObj.optionsRadio.attr("disabled", "disabled")
}

this.correctAnswer = function (jElem) {
	tObj.correctAswersNum++;
	jElem.parent().addClass("mt-option-correct");
	tObj.indicatorHolder.addClass("mt-show-correct");
	if ( tObj.workArray[tObj.counter]['id']!=undefined ) {
			var studied = tObj.workArray[tObj.counter]['id']
			sendWordsResults(studied)
	}
}

this.wrongAnswer = function (jElem) {
	jElem.parent().addClass("mt-option-wrong");
	tObj.indicatorHolder.addClass("mt-show-wrong");
}

this.gotoNext = function() {
	tObj.counter++;
	tObj.step();
}

this.gotoEnd = function() {
	tObj.resCorrectTxt.text(tObj.correctAswersNum);
	tObj.resTotalTxt.text(tObj.questNum);
	tObj.resMarkTxt.text(Math.round((tObj.correctAswersNum / tObj.questNum ) * 100)+"%")
	tObj.quest.html(tObj.finalTxt)
	tObj.endHolder.show();
	tObj.container.addClass("mt-show-end");
	tObj.callAfter();
}

$('div').one('pageshow',function(event, ui){
  tObj.parseTest()
});

}











