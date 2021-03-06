
new function($) {
    $.fn.testPlaceholder = function() {
        return this.filter(":input").each(function(index) { 
			var tVal = $(this).val();
            $.data(this, 'placehoder', tVal); 
        }).blur(function() {
            if ($.trim($(this).val()) === '')
                $(this).val($.data(this, 'placehoder'));
        })
    };
}(jQuery);



var noTxt = 'No completed tasks'
var gTxt = 'Correct';
var erTxt = 'Errors';
var hideAnswersTxt='Hide answers';
var showAnswersTxt='Display answers';
var noErrorsTxt='No errors';
	
$(document).ready(function() {
	
	if (es_lang == 'ru') {
		noTxt = 'Нет выполненных'; 
		gTxt = 'Правильно'; 
		erTxt = 'Ошибки';
		hideAnswersTxt='Скрыть ответы';
		showAnswersTxt='Показать ответы';
		noErrorsTxt='Ошибок нет';
	}


$("div.gr_exercise_container").each(function(i){
	var tParent = $(this).parent("div");
	tParent.find("div.gr_exercise_dec").attr("id", "ge_e"+i);

});

$(".bl-ex-container input").attr("autocomplete", "off");

$(".gex-init-val").focus(function() {
	$(this).val("").removeClass("gex-init-val").unbind("focus");
})


$(".ex_from_list_check").each(function(i) {
	$(this).addClass("fromList_ex"+i);
	$(this).find("input").click(function() {
		checkExFromList(".fromList_ex"+i);
	});
});



$(".gext_task input").not(".gex-init-val").testPlaceholder()


$(".gext_check").each(function(i) {
	$(this).addClass("gext_ex"+i);
	$(this).find("input.gext_check_btn").click(function() {
		checkExType(".gext_ex"+i);
	});
});

$(".gext_answer_show").each(function(i) {
	$(this).toggle(function() {
		$(".gr_ex_type").eq(i).find(".gext_task input").attr('disabled', 'disabled');
		                                               ////.css({opacity: "0", display: "inline"}).animate({opacity: "1"});
		$(".gr_ex_type").eq(i).find("div.gext_show").slideDown(function() {
		   $(this).find("span").fadeIn();
		   $(".gext_answer_show").eq(i).val(hideAnswersTxt)
		});      
	}, function(){
		$(".gr_ex_type").eq(i).find(".gext_task input").removeAttr('disabled');
		$(".gr_ex_type").eq(i).find("div.gext_show").slideUp(function(){
			$(this).find("span").hide();
			$(".gext_answer_show").eq(i).val(showAnswersTxt)
		} );
	});
});


$(".gexd_check").each(function(i) {
	$(this).addClass("gexd_ex"+i);
	$(this).find("input").click(function() {
		checkExDisplay(".gexd_ex"+i);
	});
});


$(".gr_ex_variants").each(function(i) {
t = $(this);
grExFromVariants(t,i)

});



$(".di_mix_variants").each(function(i, elem) {
	var tStr = $(elem).text();
	
	$(elem).empty();
	
	tStr = tStr.replace(/[!.,;-?]/g, "").replace(/\s\s+/g, " ").split(" ");
	
	if ( $(elem).hasClass("di_not_mix") == false) {
		tStr = tStr.shuffle();
	}
	for (var n=0; n < tStr.length; n ++ ) {
		$(elem).append("<span>" + tStr[n] + "</span> ")
	}
});


});


function grExFromVariants(t, n) {

var tContainer = t;
var tID = tContainer.find("div.gr-ex-testid").text();

 tContainer.find(".gexv_task").each(function(i) {
 	$(this).parent("td").parent("tr").find("input").attr("name", "gexv_" + n + "_"+i );
 })

tContainer.find("input:checkbox").click(function() {
  var tName=$(this).attr("name");
  tContainer.find("input[name='"+ tName +"']").removeAttr("checked");
  $(this).attr("checked", "checked");
});

tContainer.find(".gexv_check").find("input").click(function() {
var errorNum = 0;
var errorString;
var totalTasks = 0;
tContainer.find(".gexv_task").each(function() {
		
		totalTasks++;
	   var tRow = $(this).parent().parent("tr");
	   tRow.find(".gexv_sign").removeClass("gr-ex-error").removeClass("gr-ex-correct");
	   
	   var checkedInputs =	tRow.find("input:checked").length ;
			if ( checkedInputs > 0) {
				var totalRes = "good";
				tRow.find("input:checked").each(function (i) {
					if ($(this).attr("class") != "ok") totalRes = "error";
				});
				if ( tRow.find("input:checked").length != tRow.find(".ok").length ) totalRes = "error";
				if (totalRes == "error") {
					//tRow.find(".gexv_sign").css({backgroundImage: "url(/images/error1.png)"}); // loose index if error
					tRow.find(".gexv_sign").addClass("gr-ex-error");
					errorNum ++;
				}else{
					//tRow.find(".gexv_sign").css({backgroundImage: "url(/images/accept1.png)"}); // success index
					tRow.find(".gexv_sign").addClass("gr-ex-correct");
				}
			} else {
				//tRow.find(".gexv_sign").css({backgroundImage: "url(/images/error1.png)"}); // loose index if none
				tRow.find(".gexv_sign").addClass("gr-ex-error");
				errorNum ++;
			}
	});

	
tContainer.find(".gexv_check").find(".to_notify").remove();

if (errorNum > 0) {
	tContainer.find(".gexv_check").prepend('<span class="to_notify"><span class="check_notify" title="'+erTxt+ ': '+errorNum +'/'+totalTasks+'">'+erTxt+': '+errorNum+'</span></span>');	
}else{
	tContainer.find(".gexv_check").prepend('<span class="to_notify"><span class="check_notify" style="background-image: none; color: green; padding-left: 10px;"> '+noErrorsTxt+'</span></span>');
}
	var correctNum = totalTasks - errorNum;
	sendResults(tID, totalTasks, correctNum);
})

}


function checkExFromList(elClass) {
	var tContainer = $(elClass).parent(".gr_ex_from_list");
	var errorNum = 0;
	var errorString = ' errors'
	var totalTasks = 0;
	var tID = tContainer.find("div.gr-ex-testid").text();
	tContainer.find(".gr_ex_unit").each(function(i) {
	totalTasks++;
	var userAnswer = $(this).find("select").find("option:selected").attr("class");
	
	$(this).removeClass("gex-correct").removeClass("gex-error");
	if(userAnswer == "ok") {
		$(this).addClass("gex-correct");
	}else {
		$(this).addClass("gex-error");
		errorNum ++;
	}
	});
	
	tContainer.find(".ex_from_list_check").find(".to_notify").remove();

	if (errorNum > 0) {
		if (errorNum == 1)	{
			errorString = ' error'
		}
		tContainer.find(".ex_from_list_check").prepend('<span class="to_notify"><span class="check_notify" title="'+ erTxt+': '+errorNum +'/'+totalTasks+'">'+erTxt+': '+errorNum+'</span></span>');	
	}else{
	tContainer.find(".ex_from_list_check").prepend('<span class="to_notify"><span class="check_notify" style="background-image: none; color: green; padding-left: 10px;"> '+noErrorsTxt+'</span></span>');
	}
	
	var correctNum = totalTasks - errorNum;
	sendResults(tID, totalTasks, correctNum);
}


function checkExType(elClass) {
	var tContainer = $(elClass).parent(".gr_ex_type");
	var tID = tContainer.find("div.gr-ex-testid").text();
	var errorNum = 0;
	var errorString = ' errors'
	var totalTasks = 0;
	
	$("#t_inf").empty();
	
	tContainer.find(".gext_task").each(function(i) {
		totalTasks++;
		var userAnswer = $(this).find("input:text").val();
		var tAnswer= $(this).find(".gext_answer").text();
		
		tAnswer=tAnswer.replace(/[!.,;-?]/g, "").replace(/\s\s+/g, " ").replace(/ё/g, "е").replace(/\s/g, " ");
		userAnswer=userAnswer.replace(/[!.,;-?]/g, "").replace(/\s\s+/g, " ").replace(/ё/g, "е").replace(/\s/g, " ");
		
		userAnswer = $.trim(userAnswer); 			
		tAnswer = $.trim(tAnswer); 
		
		$(this).removeClass("gex-correct").removeClass("gex-error");
		
		if( userAnswer.toUpperCase() == tAnswer.toUpperCase() ) {
			$(this).addClass("gex-correct");
   		}else {
			$(this).addClass("gex-error");

			errorNum++;
		}

	});
	
	//tContainer.find("div.gext_show span").css({opacity: "0", display: "inline"}).animate({opacity: "1"});

	tContainer.find(".gext_check").find(".to_notify").remove();
	
	if (errorNum > 0) {
		if (errorNum == 1)	{
			errorString = ' error'
		}
		tContainer.find(".gext_check").prepend('<span class="to_notify"><span class="check_notify" title="'+ erTxt+': '+errorNum+'/'+totalTasks+'">'+erTxt+': '+errorNum+'</span></span>');	
	}else{
		tContainer.find(".gext_check").prepend('<span class="to_notify"><span class="check_notify" style="background-image: none; color: green; padding-left: 10px;"> '+noErrorsTxt+'</span></span>');
	}
	
	var correctNum = totalTasks - errorNum;
	//alert (tID +" "+ totalTasks+" "+ correctNum)
	sendResults(tID, totalTasks, correctNum);	
	
}




