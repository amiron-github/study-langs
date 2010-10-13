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

(function($) {
	$.fn.customFadeIn = function(speed, callback) {
		$(this).fadeIn(speed, function() {
			if(!$.support.opacity)
				$(this).get(0).style.removeAttribute('filter');
			if(callback != undefined)
				callback();
		});
	};
	$.fn.customFadeOut = function(speed, callback) {
		$(this).fadeOut(speed, function() {
			if(!$.support.opacity)
				$(this).get(0).style.removeAttribute('filter');
			if(callback != undefined)
				callback();
		});
	};
	$.fn.customFadeTo = function(speed,to,callback) {
		return this.animate({opacity: to}, speed, function() {
			if (to == 1 && jQuery.browser.msie)
				this.style.removeAttribute('filter');
			if (jQuery.isFunction(callback))
				callback();
		});
	};
})(jQuery);

///////////////////////////////////////////

$(document).ready(function() {

	$(".fl-btn").mousedown(function(){
		$(this).addClass("fl-btn-down");
	}).mouseup(function(){
		$(this).removeClass("fl-btn-down");
	})

$("body").append('<div id="cJp"></div>');
$("#cJp").jPlayer( {swfPath: "/javascripts/"});


	
});


var tJplayer=false;

function cJplayer(link,el) {

var prevEl = tJplayer;
var curEl = el;

if ( curEl != prevEl) {
	$(prevEl).attr("status", 0).removeClass("jp_play").removeClass("jp_pause");;
}

tJplayer = el;
var tEl = $(el);
var tElStatus = $(el).attr("status");
var containerJp = $("#cJp");
tEl.removeClass("jp_play").removeClass("jp_pause");
	if ( tElStatus == "0" || tElStatus == undefined ) { // start sound if sound is not in progress (0,2)
		tEl.attr("status", "1").addClass("jp_pause"); // show that sound is in progress 
		containerJp.jPlayer("setFile", link ).jPlayer("play").jPlayer("onProgressChange", function() { return false}).jPlayer( "onSoundComplete", function() {  // start sound 
			tEl.attr("status", "0").removeClass("jp_pause").removeClass("jp_play");  										// reset status at the end of sound, show 'play'
		} )
	} else if ( tElStatus == "2") {   					// if this sound is paused  (2)
		tEl.attr("status", "1").addClass("jp_pause"); 	// show that sound is in progress 
		containerJp.jPlayer("play");
	} else {											// if sound is in progress (1)
		tEl.attr("status", "2").addClass("jp_play");  		
		containerJp.jPlayer( "pause" );
	}
}


function flashcard(hash) {

this.basicArray = hash['basic_array'];
this.id = hash['id'];
						
this.autoPlay = hash['auto_play'];			// default - true, option: false
this.variantsNum = hash['variants_num'];	// default - 4
this.randomOrder = hash['random_order'];    // default - true, option: false
this.texts = hash['texts'];					// default - english
this.questNum = hash['quest_num'];			// default - basic array length
this.trainSpell = hash['train_spell']; // default - true,
this.transBracket = hash['trans_bracket']; // default true
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
this.learnedItems = new Array();

this.usersArray = new Array();

var activeEl;
var cicleLen;
var knowInCicle;
var toNextInt;

this.straightOrderAnswers = new Array();

if (this.questNum == undefined || this.questNum > this.basicArray.length ) this.questNum = this.basicArray.length;
if (this.variantsNum == undefined) this.variantsNum = 4; 
if (this.randomOrder == undefined) this.randomOrder = true;
if (this.autoPlay == undefined) this.autoPlay = true;
if (this.trainSpell == undefined) this.trainSpell = true;
if (this.transBracket == undefined) this.transBracket = true;

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
	tObj.endContainer = tObj.container.find(".fl-end");
	tObj.spellHolder = tObj.container.find(".fl-spell");
	tObj.spellField = tObj.container.find(".fl-spell-field");
	tObj.spellCheckButton = tObj.container.find(".fl-spell-check");
	
	tObj.nextButton = tObj.container.find(".fl-next");
	tObj.startButton = tObj.container.find(".fl-start");
	tObj.stopButton = tObj.container.find(".fl-stop");
	tObj.cancelButton = tObj.container.find(".fl-cancel");
	tObj.cancelSpellButton = tObj.container.find(".fl-cancel-spell");
	
	tObj.verifyButton = tObj.container.find(".fl-verify");
	tObj.spellButton = tObj.container.find(".fl-spell-btn");
	
	tObj.wordListContainer = tObj.container.find(".fl-prestart");
	tObj.initContainer = tObj.container.find(".fl-init");
	tObj.workContainer = tObj.container.find(".fl-work");
	if (!tObj.trainSpell) tObj.contentHolder.addClass("fl-nospell")
	
	tObj.startButton.click(function() {
		tObj.start();
	});
	
	tObj.cancelButton.click(function() {
		tObj.cancelTest();
	});
	
	tObj.cancelSpellButton.click(function() {
		tObj.cancelSpell();
	}); 
	
	tObj.stopButton.click(function() {
		tObj.stop();
	});
	
	if ($.browser.msie) {
		tObj.container.addClass("msie-sucks");
	}
	
	tObj.spellCheckButton.add(tObj.cancelSpellButton).addClass("fl-back");
	
	tObj.container.find(".fl-settings").mouseover(function() {
		$(this).addClass("fl-set-on");
	}).mouseout(function() {
		$(this).removeClass("fl-set-on");
	})
	
var kb_link = tObj.spellHolder.find(".show_keyboard"); 
	if (kb_link.length > 0 ) {
			kb_link.click(function() {
				if (autoposition) {
					autoposition = false;
					tObj.spellHolder.find("input.for_keyb").click().focus();
					autoposition = true
				} else {
					tObj.spellHolder.find("input.for_keyb").click().focus();
					}
				});
	}	
	
	
	
	tObj.prestart();
}


this.prestart = function() {

var startList = '<table class="fl-prestart-list" cellspacing="0" width="100%">';
var endList = '</table>';
var wordList = new Array();

$("body").append('<div id="fl-temp" style="display: none; position: absolute">');

for (var i = 0; i< tObj.basicArray.length; i ++) {
	//$("#fl-temp").html(tObj.basicArray[i][0]);
	//var text = $("#fl-temp").text();
	var text = tObj.basicArray[i][0]
	
	var status = new Array;
	status = ['', 'checked']
	if ( tObj.basicArray[i].length > 5) {
		if ( tObj.basicArray[i][5] == '1') status = ['fl-learned', '']
	} else {
	    status = ['', 'checked']
	}
	
	
	wordList[i] = '<tr class="fl-list '+status[0]+'"><td><input type="checkbox" '+status[1]+' class="st"></td><td class="fl-wordlist-origin">'+text+'</td><td>'+tObj.basicArray[i][1]+'</td></tr>'
}

$("#fl-temp").remove();

var wordListHtml = wordList.join('');

tObj.wordListContainer.append(""+startList+wordListHtml+endList+"");

tObj.accents(tObj.wordListContainer);

if (tObj.container.find(".fl-prestart-list").height() > 330) tObj.wordListContainer.addClass('fl-scroll');

tObj.wordListContainer.find(".fl-prestart-list tr:even").css({backgroundColor: "#efefef"});


tObj.container.find(".fl-set-none").click(function() {
	tObj.wordListContainer.find(".fl-prestart-list input[type='checkbox']").removeAttr("checked")
}); 

tObj.container.find(".fl-set-all").click(function() {
	tObj.wordListContainer.find(".fl-prestart-list input[type='checkbox']").attr("checked","checked")
});

tObj.container.find(".fl-set-not-worked").click(function() {
	tObj.wordListContainer.find(".fl-prestart-list input[type='checkbox']").removeAttr("checked")
	tObj.wordListContainer.find(".fl-prestart-list tr:not('.fl-learned') ").find("input[type='checkbox']").attr("checked","checked")
});

tObj.container.find(".fl-set-worked").click(function() {
	tObj.wordListContainer.find(".fl-prestart-list input[type='checkbox']").removeAttr("checked")
	tObj.wordListContainer.find(".fl-prestart-list tr.fl-learned").find("input[type='checkbox']").attr("checked","checked")
});

tObj.container.find(".fl-random").click(function() {
	tObj.randomOrder = true;
	$(this).parent("li").find(".tcheck").removeClass("checked")
	$(this).addClass("checked");
});

tObj.container.find(".fl-direct").click(function() {
	tObj.randomOrder = false;
	$(this).parent("li").find(".tcheck").removeClass("checked")
	$(this).addClass("checked");
});

tObj.container.find(".fl-switch-order").click(function() {
	if (tObj.randomOrder == true) {
		tObj.randomOrder = false;
		$(this).parent("li").find(".tcheck").removeClass("checked")
		tObj.container.find(".fl-direct").addClass("checked");
	} else {
		tObj.randomOrder = true;
		$(this).parent("li").find(".tcheck").removeClass("checked")
		tObj.container.find(".fl-random").addClass("checked");
	}
})

tObj.container.find(".fl-auto-off").click(function() {
	tObj.container.find("input.fl-autoplay").removeAttr("checked")
	$(this).parent("li").find(".tcheck").removeClass("checked")
	$(this).addClass("checked");
});

tObj.container.find(".fl-auto-on").click(function() {
	tObj.container.find("input.fl-autoplay").attr("checked", "checked")
	$(this).parent("li").find(".tcheck").removeClass("checked")
	$(this).addClass("checked");
});

tObj.container.find(".fl-switch-auto").click(function() {
	if ( tObj.container.find(".fl-autoplay").is(":checked") ) {
		tObj.container.find("input.fl-autoplay").removeAttr("checked")
		$(this).parent("li").find(".tcheck").removeClass("checked")
		tObj.container.find(".fl-auto-off").addClass("checked");
	} else {
		tObj.container.find("input.fl-autoplay").attr("checked", "checked")
		$(this).parent("li").find(".tcheck").removeClass("checked")
		tObj.container.find(".fl-auto-on").addClass("checked");
	}
})

tObj.container.find("input.fl-autoplay").change(function() {
	if ( $(this).is(":checked") ) {
		tObj.container.find(".fl-auto-on").parent().find(".tcheck").removeClass("checked")
		tObj.container.find(".fl-auto-on").addClass("checked");
	} else {
		tObj.container.find(".fl-auto-off").parent().find(".tcheck").removeClass("checked")
		tObj.container.find(".fl-auto-off").addClass("checked");
	}
})


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
	
}

this.stop = function () {
	tObj.workContainer.hide();
	tObj.endContainer.hide();
	tObj.initContainer.fadeIn(300);
}


this.start = function () {

	tObj.formArray();
	if (tObj.usersArray.length < 1) {
		tObj.container.find(".fl-start-note").hide().fadeIn(300);
		return false;
	} else {
		tObj.container.find(".fl-start-note").hide();
	}

	tObj.articleWrapper.css({opacity: "1"});
	tObj.articleHolder.find("div").css({opacity: "1"});
	tObj.counter=0;
    tObj.missedItems=new Array();
    tObj.wrongAswersNum=0;
    tObj.correctAswersNum = 0;
	tObj.workArray = new Array();
	if (tObj.randomOrder) {
		tObj.workArray = tObj.usersArray.shuffle();
	} else {
		for (var i=0; i < tObj.usersArray.length; i ++) {
			tObj.workArray[i] = tObj.usersArray[i]
		}
	}
	
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
	
	tObj.spellButton.unbind("click").click(function() {
		tObj.spellPractice();
	});
	
	tObj.initContainer.fadeOut(260, function() {
		tObj.workContainer.show();
		tObj.step();
	});
}


tObj.spellPractice = function() {


tObj.activityHolder.hide();
tObj.spellHolder.show();
tObj.spellCheckButton.add(tObj.cancelSpellButton).addClass("fl-back");
tObj.spellHolder.find("div").not(".fl-spell-cancel-wrapper").show(400);

tObj.spellHolder.find("div.fl-spell-cancel-wrapper").show(400, function() {
	tObj.spellCheckButton.add(tObj.cancelSpellButton).removeClass("fl-back");
})

tObj.launchSpellTest();

}

this.launchSpellTest = function() {
tObj.spellField.val("").focus();

tObj.spellCheckButton.unbind("click").click(function() {
var userAnswer = tObj.spellField.val();

tObj.spellHolder.append('<span class="tp_helper" style="display: none;">'+userAnswer+'</span>');
userAnswer = String( tObj.spellHolder.find("span.tp_helper").html() );

userAnswer=userAnswer.replace(/[.,;?!]/g, "").replace(/-/g, " ").replace(/&nbsp;/g, " ").replace(/&nbsp/g, " ").replace(/\s\s+/g, " ").toUpperCase().replace(/Ё/g, 'Е');	
userAnswer = $.trim(userAnswer);

tObj.spellHolder.find("span.tp_helper").html(tObj.workArray[tObj.missedItems[activeEl]]['data'][0]);

var tWord = String( tObj.spellHolder.find("span.tp_helper").text() )

tWord=tWord.replace(/[.,;?!]/g, "").replace(/-/g, " ").replace(/&nbsp;/g, " ").replace(/&nbsp/g, " ").replace(/\s\s+/g, " ").toUpperCase().replace(/Ё/g, 'Е');	
tWord = $.trim(tWord);
tObj.spellHolder.find("span.tp_helper").remove();

tObj.container.find(".fl-task-spell").hide();
tObj.container.find(".fl-spell-notes").hide();

		if ( userAnswer.toUpperCase() == tWord.toUpperCase() ) {
			tObj.spellHolder.find(".fl-correct-spell").css({display: "block"});
			 setTimeout(function(){
				tObj.spellHolder.find(".fl-task-spell").show();
				tObj.spellHolder.find(".fl-spell-notes").hide();
			},3000)
			
		} else {
			//alert( userAnswer.toUpperCase() + ' - '+ tWord.toUpperCase())
			tObj.container.find(".fl-wrong-spell").css({display: "block"});
			setTimeout(function(){
				tObj.spellHolder.find(".fl-task-spell").show();
				tObj.spellHolder.find(".fl-spell-notes").hide();
			},3000)
		}
})

}


tObj.cancelSpell = function() {
	
	tObj.spellHolder.find(".fl-task-spell").hide(400);
	if ($("div.keys_poser").is(":visible")) $("div.keys_poser").find(".keys_close").click();
	tObj.spellCheckButton.add(tObj.cancelSpellButton).addClass("fl-back");
	tObj.spellHolder.stop().hide(400, function() {
		tObj.spellHolder.find(".fl-spell-cancel-wrapper").hide();
		if (tObj.activityHolder.is(":hidden")) tObj.activityHolder.fadeIn();
		
		//tObj.spellHolder.find(".fl-spell-task").show();
		tObj.spellHolder.find(".fl-task-spell").show();
		tObj.spellHolder.find(".fl-spell-notes").hide();
		tObj.spellHolder.find(".kb-show-wrapper").hide();

	});
}


this.step = function () {

	if (tObj.activityHolder.is(":hidden")) tObj.activityHolder.fadeIn();

	if (tObj.missedItems.length > 0 ) {
				
		tObj.originHolder.html( tObj.workArray[tObj.missedItems[activeEl]]['data'][0])
		tObj.translateHolder.html( tObj.workArray[tObj.missedItems[activeEl]]['data'][1])
		
		if (tObj.workArray[tObj.missedItems[activeEl]]['data'][3] =='') {
			tObj.transcriptHolder.hide();
		}else{
			tObj.transcriptHolder.show();
			if (tObj.transBracket) {
			tObj.transcriptHolder.html('['+ tObj.workArray[tObj.missedItems[activeEl]]['data'][3]+']')
			} else {
				tObj.transcriptHolder.html(''+ tObj.workArray[tObj.missedItems[activeEl]]['data'][3]+'')
			}
		}
		
		tObj.accents(tObj.originHolder);
		if ( tObj.workArray[tObj.missedItems[activeEl]]['data'][2] == '') {
			tObj.soundHolder.hide()
		}else{
			tObj.soundHolder.show().html( '<div onclick="cJplayer(\''+tObj.workArray[tObj.missedItems[activeEl]]['data'][2]+'\', this)" class="jp_control"></div>' )
		}
		if ( tObj.container.find(".fl-autoplay").is(":checked") ) {
			cJplayer(tObj.workArray[tObj.missedItems[activeEl]]['data'][2], tObj.soundHolder.find(".jp_control").get(0))
		}
		
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
	if (tObj.spellHolder.is(":visible")) tObj.cancelSpell();
	
	tObj.testsHolder.find(".fl-test-task").hide(400);
	tObj.testsHolder.hide(400, function() {
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
		if ( tObj.workArray[ tObj.missedItems[activeEl] ]['data'].length > 4 ) {
			var studied = tObj.workArray[ tObj.missedItems[activeEl] ]['data'][4]
			$.post("/set_word", {words: [studied]} ); 
		}
		
		tObj.wordListContainer.find("tr.fl-list:eq("+currentQuestIndex+")").addClass("fl-learned").find("input").removeAttr("checked");
	}
}

this.launchTest = function(testType) {
	var dataType = 0;
	var nextTextType = 0;
	
	if (testType == 'origin') {
		dataType= 0;
		nextTestType = 2;
		var toHide = tObj.originHolder.add(tObj.transcriptHolder).add(tObj.soundHolder)

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
	
	$("body").append('<div id="fl-temp" style="display: none; position: absolute">');
	
	for (var i = 0; i < option.length; i ++ ) {
	
		$("#fl-temp").html(tObj.basicArray[option[i]][dataType]);
	
		var text = $("#fl-temp").text();
		
		var tOption = '<div style="display: none" class="fl-test-option"> <input type="radio" > ' + text + '</div>';
		if (option[i] == currentQuestIndex) {
				correctIndex = i;
		}
		optionsList = optionsList + tOption;
	}
	
	$("#fl-temp").remove();	
	
	tObj.testsHolder.find("div.fl-test-option").remove();
	tObj.testsHolder.append("" + optionsList + "");
	tObj.testsHolder.find("div.fl-test-option").eq(correctIndex).data("correct", "true");
	 tObj.cancelButton.addClass("fl-back");
	tObj.testsHolder.animate({height: 170}, function() {
		 tObj.cancelButton.removeClass("fl-back");
	});
	
	tObj.testsHolder.find("div").show(400);
	
	toHide.css({opacity: 0});
	
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

this.accents = function(container) {
		if ( getCookie('accent_on') ) {
			container.find("span.acco").each(function(){
				var tVal = $(this).text().replace(/[́]/g, "");
				$(this).html( tVal + "&#769;");
			});
		}
		
		if (getCookie('accent_adjust')) {
			container.find("span.acco").each(function(){
				var tVal = $(this).text().replace(/[́]/g, "");
				$(this).html("&#769;" + tVal);
			});
		}
		
		if(getCookie('accent_un')) {
			container.find("span.acco").each(function(){
				var tVal = $(this).text().replace(/[́]/g, "")
				$(this).html("<u>" + tVal + "</u>");
			});
		}
		
		if(getCookie('softness')) {
			tObj.transcriptHolder.find("span.sfts").remove();
			tObj.transcriptHolder.find("span.sfty").remove();
			tObj.transcriptHolder.find("span.sftc, span.sftv").after("<span class=\"sfts\">\'<\/span>");
		}

}

this.gotoEnd = function() {

var startList = '<table class="fl-end-wordlist" cellspacing="0" width="100%"><col width="20px"><col><col>';
var endList = '</table>';
var wordList = new Array();

for (var i = 0; i< tObj.usersArray.length; i ++) {

	if ( tObj.usersArray[i]['data'][2] == '') {
		wordList[i] = '<tr class="fl-endlist-row"><td> </td><td class="fl-endlist-origin">'+tObj.usersArray[i]['data'][0]+'</td><td>'+tObj.usersArray[i]['data'][1]+'</td></tr>'
	} else {
		wordList[i] = '<tr class="fl-endlist-row"><td><div onclick="cJplayer(\''+tObj.usersArray[i]['data'][2]+'\', this)" class="jp_control"></div></td><td class="fl-endlist-origin">'+tObj.usersArray[i]['data'][0]+'</td><td>'+tObj.usersArray[i]['data'][1]+'</td></tr>'
	}
	
}
var wordListHtml = wordList.join('');

tObj.container.find(".fl-end-list").html(""+startList+wordListHtml+endList+"");

tObj.container.find(".fl-end-wordlist tr:even").css({backgroundColor: "#efefef"});

	tObj.workContainer.hide();
	 tObj.endContainer.addClass("fl-back");
	tObj.endContainer.fadeIn(300, function() {
		 tObj.endContainer.removeClass("fl-back");
	});
	
	
tObj.accents(tObj.container.find(".fl-end-list"))

if ( tObj.container.find(".fl-end-wordlist").height() > 330) {
	tObj.container.find(".fl-end-list").addClass('fl-scroll');
}

}



$(document).ready(function() {
	tObj.parseTest();
})


}











































