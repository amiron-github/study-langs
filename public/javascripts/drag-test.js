/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}

			fx.elem.style[attr] = "rgb(" + [
				Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
			].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}
	
	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break; 

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};
	
	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/

	var colors = {
		aqua:[0,255,255],
		azure:[240,255,255],
		beige:[245,245,220],
		black:[0,0,0],
		blue:[0,0,255],
		brown:[165,42,42],
		cyan:[0,255,255],
		darkblue:[0,0,139],
		darkcyan:[0,139,139],
		darkgrey:[169,169,169],
		darkgreen:[0,100,0],
		darkkhaki:[189,183,107],
		darkmagenta:[139,0,139],
		darkolivegreen:[85,107,47],
		darkorange:[255,140,0],
		darkorchid:[153,50,204],
		darkred:[139,0,0],
		darksalmon:[233,150,122],
		darkviolet:[148,0,211],
		fuchsia:[255,0,255],
		gold:[255,215,0],
		green:[0,128,0],
		indigo:[75,0,130],
		khaki:[240,230,140],
		lightblue:[173,216,230],
		lightcyan:[224,255,255],
		lightgreen:[144,238,144],
		lightgrey:[211,211,211],
		lightpink:[255,182,193],
		lightyellow:[255,255,224],
		lime:[0,255,0],
		magenta:[255,0,255],
		maroon:[128,0,0],
		navy:[0,0,128],
		olive:[128,128,0],
		orange:[255,165,0],
		pink:[255,192,203],
		purple:[128,0,128],
		violet:[128,0,128],
		red:[255,0,0],
		silver:[192,192,192],
		white:[255,255,255],
		yellow:[255,255,0]
	};
	
})(jQuery);


/////////////////////////////////////////////////////////////////////////////////////////////////////




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



	
	
	

$(".clear_placed_text").click(function() {

t = $(this).parent();

if (t.find(".drag_text_place").attr('value')) {
	t.find(".drag_text_place").val('');
}else{
	t.find(".drag_text_place").empty();
};

var toRestore = t.data("to_restore");

if(t.data("to_restore")) {
	restoreText(toRestore);
	t.removeData("to_restore");
}

}).mouseover(function() {
	$(this).css({color: "#fff", backgroundColor: "red"},100);
}).mouseout(function() {
	$(this).css({backgroundColor: "transparent", color: "#444444"});
});

$(".target textarea").val("")

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

	t.clone().css({left: "0", top: "0", position: "relative"}).appendTo("#dragHelper").end().css({visibility: "hi_dden"}).removeData("intarget");
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
						toTarget=1; 
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
					
	   		/*	$(".dragit").eq(elEq)
					.css({visibility: "hidden"}).addClass("int")
					.data("intarget", hit)*/

	  			 $("#dragHelper").replaceWith("<div id=\"dragHelper\" style=\"position: absolute\"><\/div>");
				 
				  placeText(elEq,hit);

		}else{
			if($.browser.msie){
				//$("#dragHelper").css({zIndex: inZ, left: prevPosX, top: prevPosY});
				$(".dragit").eq(elEq).css({left: "auto", top: "auto", visibility: "visible"}).removeClass("int");
	   			$("#dragHelper").replaceWith("<div id=\"dragHelper\" style=\"position: absolute\"><\/div>");
			}else{
				$("#dragHelper").animate({zIndex: inZ, left: prevPosX, top: prevPosY}, "fast", function(){
					$(".dragit").eq(elEq).css({left: "auto", top: "auto", visibility: "visible"}).removeClass("int");
	   				$("#dragHelper").replaceWith("<div id=\"dragHelper\" style=\"position: absolute\"><\/div>");
				});
			};	
		}
	  	toTarget=0;
	});
}


function placeText(el,hitted) {

jObj = $(".dragit").eq(el);
jTarg = $(".target").eq(hitted);
var addValue= jObj.text();
var domEl = jTarg.find('.drag_text_place').get(0);

if (domEl.tagName == "INPUT" || domEl.tagName == "TEXTAREA") {
	var currentValue =jTarg.find('.drag_text_place').val();
	var tValue = currentValue +" " + addValue;
	tValue = $.trim(tValue)
	jTarg.find('.drag_text_place').val(tValue);
}else{
	var currentValue =jTarg.find('.drag_text_place').html();
	var tValue = currentValue +" " + addValue;
	tValue = $.trim(tValue)
	jTarg.find('.drag_text_place').html(tValue);

}



if (jObj.hasClass('multidrag')) {

}else{
jObj.css({visibility: "hidden"});
}

var inTarget = new Array();
if (jTarg.data("to_restore")) {
inTarget = jTarg.data("to_restore")
}
inTarget.push(el);
jTarg.data("to_restore", inTarget)

}



function restoreText(arr) {

for (var i=0; i < arr.length; i++) {
	$(".dragit").eq(arr[i]).css({display: 'block', visibility: 'visible'});
}

}


$(document).ready(function() {

$(".gext_check").each(function(i) {
	$(this).addClass("gext_ex"+i);
	$(this).find("input").click(function() {
		checkExType(".gext_ex"+i);
	});
});

});


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
			$(this).css({backgroundImage: "url(/images/accept.png)"}).parent().removeAttr("title");
   		}else {
			$(this).css({backgroundImage: "url(/images/error.png)"}).attr("title", "");
		}
	});

}





























