$(document).ready(function() {

$("div.gr_e_xercise_container").each(function(i){


   //	$(this).parent("div").css({border: "1px solid red"});
	
	var tParent = $(this).parent("div");
	
	tParent.find("div.gr_exercise_dec").attr("id", "ge_e"+i);
	
	var tHeight=tParent.get(0).clientHeight;
	//alert(tHeight)
	var tWidth = tParent.find("div.gr_exercise_dec").get(0).clientWidth;
	//alert(tWidth)
	
   //	tHeight = 200;
	
   	tParent.find("div.gr_exercise_dec").css({height: tHeight}); //tHeight
   	
    var r = Raphael("ge_e"+i, tWidth+7, tHeight+7);
 	var rect1 =r.rect(1, 1, tWidth, tHeight, 10).attr({gradient: "90-#DFDFDF-#fff:50", opacity: .5, stroke: "#BFBFBF", "stroke-width": 1});

});



$(".ex_from_list_check").each(function(i) {
	$(this).addClass("fromList_ex"+i);
	$(this).find("input").click(function() {
		checkExFromList(".fromList_ex"+i);
	});
});


$(".gext_check").each(function(i) {
	$(this).addClass("gext_ex"+i);
	$(this).find("input").click(function() {
		checkExType(".gext_ex"+i);
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

 tContainer.find(".gexv_task").each(function(i) {
 	$(this).parent("td").parent("tr").find("input").attr("name", "gexv_" + n + "_"+i );
 })


tContainer.find("input:checkbox").click(function() {
  var tName=$(this).attr("name");
  tContainer.find("input[name='"+ tName +"']").removeAttr("checked");
  $(this).attr("checked", "checked");
});



tContainer.find(".gexv_check").find("input").click(function() {

tContainer.find(".gexv_task").each(function() {
	
	   var tRow = $(this).parent().parent("tr");
	   var checkedInputs =	tRow.find("input:checked").length ;
			if ( checkedInputs > 0) {
				var totalRes = "good";
				tRow.find("input:checked").each(function (i) {
					if ($(this).attr("class") != "ok") totalRes = "error";
				});
				if ( tRow.find("input:checked").length != tRow.find(".ok").length ) totalRes = "error";
				if (totalRes == "error") {
					tRow.find(".gexv_sign").css({backgroundImage: "url(kids/error.png)"}); // loose index if error
				}else{
					tRow.find(".gexv_sign").css({backgroundImage: "url(kids/accept.png)"}); // success index
				}
			} else {
				tRow.find(".gexv_sign").css({backgroundImage: "url(kids/error.png)"}); // loose index if none
			}
	});

})

}


function checkExFromList(elClass) {
	var tContainer = $(elClass).parent(".gr_ex_from_list");
	tContainer.find(".gr_ex_unit").each(function(i) {
	var userAnswer = $(this).find("select").find("option:selected").attr("class");
	if(userAnswer == "ok") {
		$(this).css({backgroundImage: "url(kids/accept.png)"}).attr("title", "")
	}else {
		$(this).css({backgroundImage: "url(kids/error.png)"}).attr("title", "");
	}
	});
}


function checkExType(elClass) {
	var tContainer = $(elClass).parent(".gr_ex_type");
	tContainer.find(".gext_task").each(function(i) {
	
		var userAnswer = $(this).find("input:text").val();
		var tAnswer= $(this).find(".gext_answer").text();
		
	    userAnswer = $.trim(userAnswer); 			
		tAnswer = $.trim(tAnswer);                
		
		tAnswer=tAnswer.replace(/[.,;]/g, "").replace(/\s\s+/g, " ");
		
		userAnswer=userAnswer.replace(/[.,;-]/g, "").replace(/\s\s+/g, " ");
		
		if( userAnswer.toUpperCase() == tAnswer.toUpperCase() ) {
			$(this).css({backgroundImage: "url(kids/accept.png)"}).parent().removeAttr("title");
   		}else {
			$(this).css({backgroundImage: "url(kids/error.png)"}).attr("title", "");
		}
	});

}


function checkExDisplay(elClass) {
	var tContainer = $(elClass).parent(".gr_ex_display");
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


