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
	   var checkedInputs =	tRow.find("input:checked").length ;
			if ( checkedInputs > 0) {
				var totalRes = "good";
				tRow.find("input:checked").each(function (i) {
					if ($(this).attr("class") != "ok") totalRes = "error";
				});
				if ( tRow.find("input:checked").length != tRow.find(".ok").length ) totalRes = "error";
				if (totalRes == "error") {
					tRow.find(".gexv_sign").css({backgroundImage: "url(/images/error1.png)"}); // loose index if error
					errorNum ++;
				}else{
					tRow.find(".gexv_sign").css({backgroundImage: "url(/images/accept1.png)"}); // success index
				}
			} else {
				tRow.find(".gexv_sign").css({backgroundImage: "url(/images/error1.png)"}); // loose index if none
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
	tContainer.find(".gext_task").each(function(i) {
		totalTasks++;
		var userAnswer = $(this).find("input:text").val();
		var tAnswer= $(this).find(".gext_answer").text();
		
		tAnswer=tAnswer.replace(/[.,;]/g, "").replace(/\s\s+/g, " ").toUpperCase().replace(/Ё/g, 'Е');
		tAnswer = $.trim(tAnswer);
		
	    tContainer.append('<span id="extp_help" style="display: none;">'+userAnswer+'</span>');

		userAnswer = String(tContainer.find("#extp_help").html());
		
		tContainer.find("#extp_help").remove();
		                
		userAnswer=userAnswer.replace(/[.,;-]/g, "").replace(/&nbsp;/g, " ").replace(/&nbsp/g, " ").replace(/\s\s+/g, " ").toUpperCase().replace(/Ё/g, 'Е');
		
		userAnswer = $.trim(userAnswer);
		
		//alert("'"+userAnswer+"'");
		
		if( userAnswer.toUpperCase() == tAnswer.toUpperCase() ) {
			$(this).css({backgroundImage: "url(/images/accept1.png)"}).parent().removeAttr("title");
   		}else {
			$(this).css({backgroundImage: "url(/images/error1.png)"}).attr("title", "");
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


function checkExDisplay(elClass) {
	var tContainer = $(elClass).parent(".gr_ex_display");
	var errorNum = 0;
	var tID = tContainer.find("div.gr-ex-testid").text();
	
	tContainer.find(".gexd_task").each(function(i) {
	
	var userAnswer = $(this).find("input:text").val();
		var tAnswer= $(this).find(".d_answer span").text();
		
	    userAnswer = $.trim(userAnswer); 			//needs more checking for double spaces
		tAnswer = $.trim(tAnswer);                //needs more checking for double spaces
		
		
	   //	userAnswer=userAnswer.replace(/[,;]/g, "").replace(/\s\s+/g, " ");
	   
	    tAnswer=tAnswer.replace(/[.,;]/g, "").replace(/\s\s+/g, " ");
		
		userAnswer=userAnswer.replace(/[.,;-]/g, "").replace(/\s\s+/g, " ");
		
		
		if( userAnswer.toUpperCase() == tAnswer.toUpperCase() ) {
		   
			$(this).find("input:text").css({border: "2px solid #9AEF95"}).parent().removeAttr("title");
   		}else {
   		
   		             //alert(userAnswer.toUpperCase() + " - " + tAnswer.toUpperCase() )
			$(this).find("input:text").css({border: "2px solid #E5FF00"}).parent().attr("title", "Please, review the answer");
		}
	
	 $(this).find(".d_answer span").css({opacity: "0", display: "inline"}).animate({opacity: "1"})
	
	
	});
	
	
	
}


