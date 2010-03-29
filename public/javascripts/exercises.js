
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


///////////////////////////////////////////// start of test together 

var inZ_tog=500;
var testHTML;
var boxTogetherHeight;



$(document).ready(function(){
  testHTML=$(".box_together").html();
  boxTogetherHeight=$(".box_together").get(0).clientHeight;
  boxTogetherWidth=$(".box_together").get(0).clientWidth;
  
  $(".box_together").wrap("<div style=\"position: absolute; overflow: hidden; height: 410px; width: "+(boxTogetherWidth+5)+"px \"><\/div>");
  startOn();
  $("div.variant_tog").click().eq(0).click();
});


function startTogTest1(arr_arg) {

    var variantLen=$("div.variant_tog").length;
    
    //перемешали массив
    
    tA = arr_arg.shuffle(variantLen);

    var arr = new Array();
    var variants = new Array();
    var answersTog = new Array();

    for (var i = 0; i < tA.length; i++) {
        variants.push(tA[i][0]);
    }
    
    //вопросы готовы (уже перемешаны)

    var l = tA.length;
    var tM = new Array();     //вспомогательный временный обект для перемешивания ответов
    for (var i = 0; i < l; i++) {
        tM[i] = {index: i, data: tA[i]} //index = нужно запомнить для соответсвий вопрос-ответ
    }

    for (var i = 0; i < l; i++) {
        var t = Math.round(Math.random()*(tM.length-1));
        answersTog.push(tM[t]['data'][1]);
        arr.push(tM[t]['index']);
        tM.splice(t,1);
    }
    
    //ответы перемешали, соответсвия расставили

    for (var i=0; i<arr.length; i++) {
        $(".target_tog").eq(i).data("for", arr[i]);
        $("div.variant_tog").eq(i).html("<div>"+variants[i]+"<\/div>");
        $(".task_tog").eq(i).text(answersTog[i]);
    }
}

function restart() {
    var curBox=$(".box_together").html();
    $(".box_together").animate({marginTop: (-boxTogetherHeight-10)}, 600,
    	function(){
    		$(".box_together").html(testHTML).css({marginTop: boxTogetherHeight+10}).animate({marginTop: "0"}, 600);
    		startOn();
    	}
    );
}


function startOn() {

startTogTest1(ttMassive); // готовим задания из основного массива

$(".task_tog").each(function(i){
	$(this).attr("id", "task_tog"+i);
});

$("div.variant_tog").mouseover(function() {
	 $(this).addClass("var_tog_on");
	}).mouseout( function(){
	$(this).removeClass("var_tog_on");
});

$(".target_tog").hover(function() {
	$(this).addClass("target_tog_on");
	}, function(){
	$(this).removeClass("target_tog_on");
})

$("div.variant_tog").click(function(){
	if($("#act_var").length) {
		return false
	}else{
	$("div.variant_tog").removeClass("var_tog_act");
 	$(this).addClass("var_tog_act");
	}
})

$(".target_tog").each(function(i){
 var targTop=$(this).get(0).offsetTop;
});


/////////////////////////////////////////// основное действие

$(".target_tog").click(function(){

if($(".target_tog_act").length){
	return false;
}else{
	var t=$(this);
	if($("div.var_tog_act").length) {
	
		t.addClass("target_tog_act");

		var targPosX=t.get(0).offsetLeft;
		var targPosY=t.get(0).offsetTop;
		inZ_tog=inZ_tog+1;

		$("div.var_tog_act").attr("id", "act_var");
		
		var prX=$("div.var_tog_act").get(0).offsetLeft;
		var prY=$("div.var_tog_act").get(0).offsetTop;
		var varTo=(t).data("for");
		var varEq=$("div.variant_tog").index($("div#act_var"))
		var targEq=$(".target_tog").index(t);
 
		if(varTo==varEq) {
			$("#act_var").css({zIndex: inZ_tog, left: prX, top: prY}).animate({left: targPosX, top: targPosY}, 
				function(){

   					$("#task_tog"+targEq).animate({opacity: "0"}, 400,
   						function(){
    						var curBl=$("#task_tog"+targEq);
       						$("#task_tog"+targEq).remove().appendTo("#act_var").animate({opacity: "1"}, 800, function(){
       							$("table.table_tog tr").eq(targEq).find("td.correct_tog").css({textAlign: "center", color: "blue", fontWeight: "bold", fontStyle: "italic"}).text("correct");
    							//curBl.removeAttribute('filter');
    							//curBl.css({border: "1px solid blue"})
    						});
       						$("#act_var").removeAttr("id").removeClass("var_tog_act").unbind("click").unbind("mouseover");
       						t.removeClass("target_tog_act");
   						}
   					)
				}
			);
		}else {
			$("#act_var").css({zIndex: inZ_tog, left: prX, top: prY}).animate({left: targPosX, top: targPosY}, 
				function(){
        				$("#act_var").append("<div id=\"wrong_tog\">wrong!<\/div>");
        				setTimeout(function(){
        						$("#act_var").animate({left: prX, top: prY}, 400, function(){
        				   			t.removeClass("target_tog_act");
        				   			$("#act_var").removeAttr("id")//.removeClass("var_tog_act");
        				   			$("#wrong_tog").remove();
        			   			});
        				},1400); 
				}
			);

		}
	}
}

});

}

///////////////////////////////////////////////////// end of test together 

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


////////////////////////////////////////////////// start of choose option 

var cocoQuestNum;
var coCounter;
var coToNextInt;
var coRemain;
var addWrongAnswer=false;
var coWrongAnswers=new Array();
var coWorkArray=new Array();
var coHTML;

$(document).ready(function(){ 
	coHTML=$("#co_place").html();
	startCO();
});

function startCO() {
	$("#co_place").html(coHTML);
	coWrongAnswers=new Array();
	coWorkArray = co_massive.shuffle(coQuestNum);
	coCounter=0;
	coStep();
}

function coStep() {
	coStartEffect();
	$("#co_place div.co_options").removeAttr("style");
	$("#co_correctness").empty();
	addWrongAnswer=false;
	
	coRemain=coQuestNum - coCounter;
	
	$(".co_counter").text("Remaining: " + coRemain);

	if(coCounter < coQuestNum) {
		$("#co_task div").text( coWorkArray[coCounter] [0] );
		coGetOptions() ;
		activateClick(coCounter);
		coCounter++;
	}else {
	coEnd();
	}
}


function coGetOptions() {

    var options = new Array();
    var option= new Array();
    option[0]=coCounter;
    
    while (true) {
    	option[1]=Math.round(Math.random() * (coQuestNum-1) );	
    	if ( option[1] != option[0] ) break;
    }
    while (true) {
    	option[2] =Math.round(Math.random() * (coQuestNum-1));	
    	if  ( (option[2]  !=  option[0]) && (option[2] != option[1]) )  {
    		break;
    	};
    }

    var helpOption=new Array();

    for (var i=0; i < 3; i ++ ) {
    	if(i == 0) {
    		helpOption[i] = { value: option[i], correct: "1"};
    	}else{
    		helpOption[i] = { value: option[i], correct: "0"};
    	}
    }

    var toOptions= helpOption.shuffle();
    for (var i=0; i < 3; i ++ ) {
    	$("#co_option"+ i).data("correct",  toOptions[i] ['correct']).find("div").text ( coWorkArray[ toOptions[i] ['value'] ]  [1]);
    }
}


function activateClick(counter) {

$("#co_place div.co_options")

  .click(function () {

	var thisId=$(this).attr("id")

	if( $(this).data("correct")  == 1) {
		coGoodAnswer(thisId, counter);
	}else {
		coBadAnswer(thisId);
	}

  }).mouseover(function() {
	$(this).css({border: "1px solid black"});
  }).mouseout( function() {

	$(this).css({border: "1px solid gray"});
});

}

function coGoodAnswer(thisId, counter) {
    $("#co_correctness").html("<span class=\"co-right\">correct<\/span>");
    $("#"+thisId).unbind("mouseover").unbind("mouseout").css({color: "blue", borderColor: "blue"});
    $("div.co_options").unbind("click") //.removeAttr("style");
    if(addWrongAnswer) {
     coWrongAnswers.push(coWorkArray[counter] [0]);
    };
    coToNextInt=setTimeout("coStep()", 1000);
}

function coBadAnswer(thisId) {
      addWrongAnswer=true;
      $("#co_correctness").html("<span class=\"co-wrong\">wrong<\/span>");
      $("#"+thisId).unbind("click").unbind("mouseover").unbind("mouseout").css({backgroundColor: "#FFEFEF", color: "red", cursor: "default", borderColor: "red"});
}

function coEnd() {

    var coEndHtml;
    var exerciseCompleted="Exercise completed";
    var wrongAnswersForEnd="";

    for (var i=0; i< coWrongAnswers.length; i++) {
    	var thisWrongAnswer=coWrongAnswers[i];
    	wrongAnswersForEnd += thisWrongAnswer + "<br>";
    }

    switch (  coWrongAnswers.length ) {
    	case (0): 
    		coEndHtml='<p class="co_complete">' + exerciseCompleted + '<\/p>' 
    				+ '<p>Great! You have made no mistakes!<\/p>'
    		break;
    	case (1):
    		coEndHtml='<p class="co_complete">' + exerciseCompleted + '<\/p>'
    				+ '<p>You have made only 1 mistake.<\/p>'
    				+ '<p>Please, revise the translation of the following word: <\/p>'
    				+ wrongAnswersForEnd;
    		break;
    	default: 
    				coEndHtml='<p class="co_complete">' + exerciseCompleted + '<\/p>'
    				+ '<p>You have made '+ coWrongAnswers.length +'  mistakes.<\/p>'
    				+ '<p>Please, revise the translation of the following words: <\/p>'
    				+ wrongAnswersForEnd;
    }

    
	$("#co_place").html("<div id=\"co_info\">" + coEndHtml + " <\/div>");   
      
}

function coStartEffect() {
	var coPlaceHTML=$("#co_place").html();
	$("#co_copy").html(coPlaceHTML);
	$("#co_copy div[id]").attr("id", function() { 
         		 return  this.id+"-1"; 
       	 });
	$("#co_copy").show().fadeOut(1000);
}


/////////////////////////////////////////////////// end of choose option 




 
