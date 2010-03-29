
$(document).ready(function(){


$("div.ptab").click(function(){
	$("div.ptab").removeClass("current_ptab");
	$(this).addClass("current_ptab");
	});


$("div.ptab").hover(
	function(){$(this).addClass("hon");},
	function(){$(this).removeClass("hon");}
	);
	
$("div#prof").click(function(){
	$(".pBlock").hide();
	$("#profile").show();
	});

$("div#about").click(function(){
	$(".pBlock").hide();
	$("#aboutme").show();
	});

$("div#set").click(function(){
	$(".pBlock").hide();
	$("#settings").show();
	});



});
