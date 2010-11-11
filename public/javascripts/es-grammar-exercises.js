$(document).ready(function() {

$("div.gr_exercise_container").each(function(i){
	var tParent = $(this).parent("div");
	tParent.find("div.gr_exercise_dec").attr("id", "ge_e"+i);

});



$(".ex_from_list_check").each(function(i) {
	$(this).addClass("fromList_ex"+i);
	$(this).find("input").click(function() {
		checkExFromList(".fromList_ex"+i);
	});
});


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
		   $(".gext_answer_show").eq(i).val('Hide answers')
		});      
	}, function(){
		$(".gr_ex_type").eq(i).find(".gext_task input").removeAttr('disabled');
		$(".gr_ex_type").eq(i).find("div.gext_show").slideUp(function(){
			$(this).find("span").hide();
			$(".gext_answer_show").eq(i).val('Display answers')
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
var errorString = ' errors'
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
	if (errorNum == 1)	{
		errorString = ' error'
	}
	tContainer.find(".gexv_check").prepend('<span class="to_notify"><span class="check_notify" title="You have '+ errorNum + errorString +' from '+totalTasks+' tasks">'+ errorNum + errorString + '</span></span>');	
}else{
	tContainer.find(".gexv_check").prepend('<span class="to_notify"><span class="check_notify" style="background-image: none; color: green; padding-left: 10px;"> No errors</span></span>');
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
	if(userAnswer == "ok") {
		$(this).css({backgroundImage: "url(/images/accept1.png)"}).attr("title", "")
	}else {
		$(this).css({backgroundImage: "url(/images/error1.png)"}).attr("title", "");
		errorNum ++;
	}
	});
	
	tContainer.find(".ex_from_list_check").find(".to_notify").remove();

	if (errorNum > 0) {
		if (errorNum == 1)	{
			errorString = ' error'
		}
		tContainer.find(".ex_from_list_check").prepend('<span class="to_notify"><span class="check_notify" title="You have '+ errorNum + errorString +' from '+totalTasks+' tasks">'+ errorNum + errorString + '</span></span>');	
	}else{
	tContainer.find(".ex_from_list_check").prepend('<span class="to_notify"><span class="check_notify" style="background-image: none; color: green; padding-left: 10px;"> No errors</span></span>');
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
		
		if( userAnswer.toUpperCase() == tAnswer.toUpperCase() ) {
			$(this).css({backgroundImage: "url(/images/accept1.png)"}).parent().removeAttr("title");
			//$("#t_inf").append( " <pre>|" + userAnswer.toUpperCase() +"| - |"+ tAnswer.toUpperCase() + "|</pre><br>");
			
   		}else {
			$(this).css({backgroundImage: "url(/images/error1.png)"}).attr("title", "");
			
			//$("#t_inf").append( " <pre>|" + userAnswer.toUpperCase() +"| - |"+ tAnswer.toUpperCase() + "|</pre><br>");
			
			
			errorNum++;
		}

		
	});
	
	//tContainer.find("div.gext_show span").css({opacity: "0", display: "inline"}).animate({opacity: "1"});

	tContainer.find(".gext_check").find(".to_notify").remove();
	
	if (errorNum > 0) {
		if (errorNum == 1)	{
			errorString = ' error'
		}
		tContainer.find(".gext_check").prepend('<span class="to_notify"><span class="check_notify" title="You have '+ errorNum + errorString +' from '+totalTasks+' tasks">'+ errorNum + errorString + '</span></span>');	
	}else{
		tContainer.find(".gext_check").prepend('<span class="to_notify"><span class="check_notify" style="background-image: none; color: green; padding-left: 10px;"> No errors</span></span>');
	}
	
	var correctNum = totalTasks - errorNum;
	//alert (tID +" "+ totalTasks+" "+ correctNum)
	sendResults(tID, totalTasks, correctNum);	
	
}




