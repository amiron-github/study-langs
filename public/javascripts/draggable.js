
var inZ=500;
var difX;
var difY;
var elEq;
var hit;
var toTarget;
var bEq;

var drugboxLeft;
var drugboxTop;
var iElPosX=new Array();
var iElPosY=new Array();

var targH=new Array();
var targW=new Array();
var targX=new Array();
var targY=new Array();
var targX1=new Array();
var targY1=new Array();

var targetLen=new Array();
var targetSize;


$(document).ready(function(){

$(".dragit").each( function(i){
	iElPosX[i]=$(this).get(0).offsetLeft;
	iElPosY[i]=$(this).get(0).offsetTop;
});


$(".drugbox").each(function(i) {
 $(this).attr("id", "drugbox"+i);
 targetLen[i]=$(this).find(".target").length;
});

$(".target").each(function(i){
	targH[i]=$(this).get(0).clientHeight;
	targW[i]=$(this).get(0).clientWidth;
	targX[i]=$(this).get(0).offsetLeft;
	targY[i]=$(this).get(0).offsetTop;
	targX1[i]=targX[i]+targW[i];
	targY1[i]=targY[i]+targH[i];
});

$("body").append("<div id=\"dragHelper\" style=\"position: absolute;\"><\/div>");

$("div#dragHelper").css({opacity: "0.8"});


$(".dragit").mousedown(function(e){
	$("body").addClass("noselect");

	var t=$(this);
	inZ=inZ+1
	elEq=$("div.dragit").index(this);

	bEq=$("div.drugbox").index(t.parents(".drugbox"));
	var drugbEq=$("#drugbox"+bEq);

	drugboxLeft=drugbEq.get(0).offsetLeft;
	drugboxTop=drugbEq.eq(bEq).get(0).offsetTop;

	curPosX=t.get(0).offsetLeft;
	curPosY=t.get(0).offsetTop;

	targetSize=targetLen[bEq];
	
   	difX=e.pageX-curPosX-drugboxLeft;
   	difY=e.pageY-curPosY-drugboxTop;
	var intarget=t.data("intarget");

	t.clone().css({left: "0", top: "0", position: "relative"}).appendTo("#dragHelper").end().css({visibility: "hidden"}).removeData("intarget");
	$("#dragHelper").css({left: curPosX+drugboxLeft, top: curPosY+drugboxTop, zIndex: inZ, opacity: "0.8"});

	$("#drugbox"+bEq+" div.target").eq(intarget).removeClass("already");
	$("#drugbox"+bEq+" span.correct").eq(intarget).empty();

	dragger(elEq,difX,difY);
	draggerStop(elEq,difX,difY);

 	e.preventDefault();
	return false;
});


});


function dragger(elEq,difX,difY) {
    $("body").bind("mousemove",function(e){
	 if($("#dragHelper div").length ){

  		$("#dragHelper").css({left: e.pageX-difX, top: e.pageY-difY});
			for (var n= 0; n < targetSize; n++) {
			        if ((targX[n]+drugboxLeft < e.pageX) && 
				(targX1[n]+drugboxLeft > e.pageX) &&
        				(targY[n]+drugboxTop < e.pageY) && 
        				(targY1[n]+drugboxTop > e.pageY)) {
					hit= n;
					if($(".target").eq(hit).hasClass("already")){
						toTarget=0
					}else{
						toTarget=1; 
					
					}
			       break;
			       }else{
			       toTarget=0; 
			      }
  			}
 		e.preventDefault();
		return false;
	};
  });
}


function draggerStop(elEq,difX,difY){
	$("body").one("mouseup", function(e) {
		$(this).unbind("mousemove").removeClass("noselect");
		var prevPosX=iElPosX[elEq]+drugboxLeft;
		var prevPosY=iElPosY[elEq]+drugboxTop

		if(toTarget==1){  
			if($.browser.msie){
	   			$(".dragit").eq(elEq)
					.css({zIndex: inZ, left: targX[hit], top: targY[hit]}).css({visibility: "visible"}).addClass("int")
					.data("intarget", hit);

	  			 $("#dragHelper").replaceWith("<div id=\"dragHelper\" style=\"position: absolute\"><\/div>");
			}else{

				$("#dragHelper").animate({ left: targX[hit]+drugboxLeft, top: targY[hit]+drugboxTop}, 150, function(){
	   				$(".dragit").eq(elEq)
						.css({zIndex: inZ, left: targX[hit], top: targY[hit]}).css({visibility: "visible"}).addClass("int")
						.data("intarget", hit);
	  				 $("#dragHelper").replaceWith("<div id=\"dragHelper\" style=\"position: absolute\"><\/div>");
				});
			}

			$(".target").eq(hit).addClass("already");

			if(($(".target").eq(hit).data("for"))==elEq){
				$("#drugbox"+bEq+" span.correct").eq(hit).text("Correct!").css({color: "blue"});

			    }else{
				$("#drugbox"+bEq+" span.correct").eq(hit).text("Try another one").css({color: "red"});
			   }
		}else{
			if($.browser.msie){
				//$("#dragHelper").css({zIndex: inZ, left: prevPosX, top: prevPosY});
				$(".dragit").eq(elEq).css({left: iElPosX[elEq], top: iElPosY[elEq], visibility: "visible"}).removeClass("int");
	   			$("#dragHelper").replaceWith("<div id=\"dragHelper\" style=\"position: absolute\"><\/div>");
			}else{
				$("#dragHelper").animate({zIndex: inZ, left: prevPosX, top: prevPosY}, "fast", function(){
					$(".dragit").eq(elEq).css({left: iElPosX[elEq], top: iElPosY[elEq], visibility: "visible"}).removeClass("int");
	   				$("#dragHelper").replaceWith("<div id=\"dragHelper\" style=\"position: absolute\"><\/div>");
				});
			};	
		}
	  	toTarget=0;
	});
}
