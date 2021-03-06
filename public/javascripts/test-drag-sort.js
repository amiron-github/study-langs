
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


///////////////////////////////////////////////////////////////////


var ds_style =""
+"<style type='text/css'> "
+".ds_dragHelper {left: 0; top: 0; position: absolute;}"
+".ds_ondrag { cursor: default; border: 1px dotted #000; position: absolute; background-color: #fff}"
+".ds_noImage { background-image: none !important}"
+".ontarget {background-color: yellow !important;};"
+"</style>"

var mobileBrowser = false;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		mobileBrowser = true;
}



$(document).ready(function() {
	$("head").append(ds_style);
});


function dragsort_test(hash) {

var tObj = this;
var dragHelper;

this.targetsClass = hash['targets'];
this.answersClass = hash['answer_elem'];
this.variantsClass = hash['variant_elem'];
this.autoCheck = hash['auto_check'];
this.id = hash['id'];
this.answerBColor = hash['answer_color'];
this.checkClass="ds-rt";
this.signClass=hash['sign_class'];
this.correctClass = "ds-correct-answer";
this.errorClass = "ds-error-answer";
this.callback = hash['callback'];
this.test_id= hash['test_id'];

this.targetsData = new Array();
if (this.callback == undefined) this.callback = function() {return false};
if (this.signClass == undefined) this.signClass = "ds-sign";


this.start = function() {

	this.container = $('#'+this.id);
	this.targets = this.container.find("." + this.targetsClass );			// jquery elements to put the variants in, wrappers of answers
	this.answers = this.container.find("." + this.answersClass);             // jquery elements with answers to check
	this.variants = this.container.find("."+ tObj.variantsClass);          // jquery elements with variants which will be dragged and checked as answers
	
	this.checkButton = tObj.container.find(".ds-check-button"); 
	this.targets.css({cursor: "default"});
	this.variants.css({cursor: "default"});
	$("body").append('<div id="'+ this.id +'_dragHelper" class="ds_dragHelper noselect"></div>');
	dragHelper = $('#'+ this.id +'_dragHelper');
	this.targets.attr("taken", "-1");
	this.checkButton.click(function() {
		tObj.checkAnswers();
	}).mousedown(function() {
		tObj.checkButton.css({left: "1px", top: "1px"});
	}).mouseup(function() {
		tObj.checkButton.css({left: "0px", top: "0px"})
	});
	
	this.variants.mousedown(function(e) {
		$("body").addClass("noselect");
		var t = $(this);
		var fromVariant = tObj.variants.index(t);
		var tHtml = t.html();
		var x = t.offset().left;
		var y = t.offset().top;
		var l= t.width();
		var difX=e.pageX-x;
		var difY=e.pageY-y;
		
		tObj.targetTable();               // shot of targets
		t.css({visibility: "hidden"});
		dragHelper.addClass("ds_ondrag").html(tHtml).css({left: x, top: y, maxWidth: l, opacity: "0.8"});
		tObj.dragging(difX, difY);
		tObj.dropping(fromVariant);
		e.preventDefault();
		return false;
	});
	
	this.answers.mousedown(function(e){
		if ( $(this).parent().attr("taken") != "-1" ) {
			$("body").addClass("noselect");
			var t = $(this);
			var x = t.offset().left;
			var y = t.offset().top;
			var l= t.width();
			var difX=e.pageX-x;
			var difY=e.pageY-y;
			var fromVariant = t.parent().attr("taken");
			var tHtml = t.html();
			t.parent().attr("taken", "-1");
			t.html("&nbsp;");
			tObj.targetTable();  // shot of the targets
			dragHelper.addClass("ds_ondrag").html(tHtml).css({left: x, top: y, maxWidth: l, opacity: "0.8"});
			tObj.dragging(difX, difY);
			tObj.dropping(fromVariant);
			e.preventDefault();
			return false;
	}
	
	});
}


this.dragging = function (difX, difY) {
	$("body").bind("mousemove",function(e){
		dragHelper.css({left: e.pageX-difX, top: e.pageY-difY});
		e.preventDefault();
		return false;
	});
}

this.targetTable = function() {
		this.targetsData = new Array();
		this.targets.each(function(i,elem) {
			var loc = $(elem).offset();
			loc.right = loc.left + $(elem).width();
			loc.bottom = loc.top + $(elem).height();
			loc.html = $(elem).children().html();
			loc.elem = elem;
			loc.taken = $(elem).attr("taken");
			tObj.targetsData.push(loc);
		});
}


this.collision = function (x,y) {
	for (var i = 0; i < tObj.targetsData.length; i++) {
		if ( tObj.targetsData[i].left < x && tObj.targetsData[i].right > x && tObj.targetsData[i].top < y && tObj.targetsData[i].bottom > y)
			return i;
		}
	return -1;
}

this.dropping = function (fromVariant) {

	$("body").one("mouseup", function(e) {
		var hitTarget = tObj.collision(e.pageX,e.pageY);   // determine if a target is hitted
		dragHelper.removeClass("ds_ondrag").empty();       // remove drag helper
		$("body").unbind("mousemove");
		
		if ( hitTarget > -1) {
			tObj.hittedTarget(fromVariant, hitTarget);
		}
		else {
			tObj.variants.filter(":eq("+fromVariant+")").css({visibility: "visible"});
		}
		
		tObj.container.find("."+tObj.signClass).removeClass(tObj.correctClass).removeClass(tObj.errorClass);
		if (tObj.autoCheck == true) {
			tObj.checkAnswers();
		}
		
		$("body").removeClass("noselect");
		e.preventDefault();
		return false;
	});
}



this.hittedTarget = function (fromVariant, hitted) {
	if ( tObj.targetsData[hitted].taken == "-1") {
		var tVariantHtml = tObj.variants.filter(":eq("+fromVariant+")").html();
		tObj.targets.eq(hitted).attr("taken", fromVariant ).children().html(" " + tVariantHtml + " ");
		tObj.hittedAnimation(hitted);
	}else {
		var firstFreeItem;
		var freeTargets = new Array();
		for (var i=0; i < tObj.targetsData.length; i++) {	
			if (tObj.targetsData[i].taken == "-1") {
				freeTargets.push(i);
			}
		}
		if ( freeTargets.length == 0 ) {
			tObj.variants.filter(":eq("+fromVariant+")").css({visibility: "visible"});
			
		} else {
		
			freeTargets.reverse();
			var nearest = -1;
			var bestDistanceFoundYet=1000;
			for (var i=0; i < freeTargets.length; i++) {
		
				var d = Math.abs(hitted - freeTargets[i]);
				if (d < bestDistanceFoundYet) {
					bestDistanceFoundYet = d;
					nearest = freeTargets[i];
				}
			}
			for (var i=0; i < tObj.targetsData.length; i++) {	
				if (tObj.targetsData[i].taken == "-1") {
					firstFreeItem = i;
					break;
				} 
			}
			var helpItem = tObj.targetsData[nearest]          //tObj.targetsData[firstFreeItem];
			tObj.targetsData.splice(nearest, 1);		//tObj.targetsData.splice(firstFreeItem, 1);
			helpItem.html = tObj.variants.filter(":eq("+fromVariant+")").html();
			helpItem.taken = fromVariant;
			tObj.targetsData.splice(hitted, 0, helpItem);
			tObj.answers.each(function(i, elem) {
					$(elem).html("" + tObj.targetsData[i].html + "" ).parent().attr("taken", tObj.targetsData[i].taken);
			});
			
			tObj.hittedAnimation(hitted);
		}
	}
}

this.hittedAnimation = function(hitted) {
			if (tObj.answerBColor == undefined) {
				var tColor = tObj.targets.eq(hitted).css("background-color");
			} else {
				var tColor = tObj.answerBColor;
			}
			tObj.targets.eq(hitted).addClass("ds_noImage").stop().css({backgroundColor: "#feff8f"}).animate({backgroundColor: tColor},500, function () {
				tObj.targets.eq(hitted).css({backgroundColor: tColor}).removeClass("ds_noImage");
			});
}

this.checkAnswers = function() {

	var errorNum = 0;
	var errorString = ' errors'
	var totalTasks = 0;
	var correctNum=0;
	var tID = tObj.test_id
  
  tObj.answers.each(function(i, elem) {
	totalTasks++;
	if ( $(elem).find("."+tObj.checkClass).length > 0 ) {
		var tValue = $(elem).find("."+tObj.checkClass).text();
		if (tValue == (i +1)) {
			tObj.container.find("."+tObj.signClass).filter(":eq("+i+")").addClass(tObj.correctClass);
			correctNum++;
		} else {
			tObj.container.find("."+tObj.signClass).filter(":eq("+i+")").addClass(tObj.errorClass);
			errorNum ++;
		}
		
		
	}
  });
  
  tObj.container.find(".ds-check-wrapper").find(".to_notify").remove();
	
	var noTxt = 'No completed tasks'
	var gTxt = 'Correct';
	var erTxt = 'Errors';
	if (es_lang == 'ru') {
		noTxt = 'Нет выполненных'; gTxt = 'Правильно'; erTxt = 'Ошибки';
	} else 	if (es_lang == 'fr') {
		noTxt = 'Il n\'y a pas de réponses'; gTxt = 'Correct'; erTxt = 'Erreurs';
	}
	if (correctNum ==  0 && errorNum == 0) {
		tObj.container.find(".ds-check-wrapper").prepend('<span class="to_notify"><span class="check_notify">'+noTxt+'</span></span>');
	
	} else {
	
		if (correctNum == totalTasks) {
		tObj.container.find(".ds-check-wrapper").prepend('<span class="to_notify"><span class="check_notify" style="background-image: none; color: green; padding-left: 10px;"> '+gTxt+': '+correctNum+'/'+totalTasks+' </span></span>');
		} else {
			tObj.container.find(".ds-check-wrapper").prepend('<span class="to_notify"><span class="check_notify" style="line-height: normal;"> <span style="color: #000">'+gTxt+': '+correctNum+'/'+totalTasks+'</span><br>'+erTxt+': '+errorNum+'</span></span>');
		}
  }
  
  tObj.container.find(".ds-check-wrapper").data('total', totalTasks).data('correct', correctNum)
  
  tObj.callback();
  
  //alert (tID +" "+ totalTasks+" "+ correctNum)
  sendResults(tID, totalTasks, correctNum);
  
  
  
}

$(document).ready(function() {
	if (mobileBrowser) {
		hash['test_type'] = "dragsort";
		sortlist_test(hash);
	}else{
		tObj.start();
	}
});


}






function sortlist_test(hash) {

var tObj = this;
var dragHelper;

this.targetsClass = hash['targets'];
this.answersClass = hash['answer_elem'];
this.variantsClass = hash['variant_elem'];
this.autoCheck = hash['auto_check'];
this.id = hash['id'];
this.answerBColor = hash['answer_color'];
this.checkClass="ds-rt";
this.signClass= hash['sign_class'];
this.correctClass = "ds-correct-answer";
this.errorClass = "ds-error-answer";
this.test_id= hash['test_id'];
this.totalTasks = hash['total_task'];
this.testType = hash['test_type'];

if (this.testType == undefined) this.testType = "sortlist";
if (this.signClass == undefined) this.signClass = "ds-sign";

this.targetsData = new Array();


this.start = function() {

	this.container = $('#'+this.id);
	this.targets = this.container.find("." + this.targetsClass );			// jquery elements to put the variants in, wrappers of answers
	this.answers = this.container.find("." + this.answersClass);             // jquery elements with answers to check
	this.variants = this.container.find("."+ tObj.variantsClass);          // jquery elements with variants which will be dragged and checked as answers
	
	this.checkButton = tObj.container.find(".ds-check-button"); 
	
	this.targets.css({cursor: "default"});
	this.variants.css({cursor: "default"});
	
	$("body").append('<div id="'+ this.id +'_dragHelper" class="ds_dragHelper noselect"></div>');
	dragHelper = $('#'+ this.id +'_dragHelper');
	this.targets.attr("taken", "-1");
	
	if(tObj.totalTasks == undefined || tObj.totalTasks < 1) {
		var total = tObj.container.find("span.ds-rt").filter(function(){return $(this).text() != '0'});
		tObj.totalTasks = total.length;
	}
	
	this.checkButton.click(function() {
		tObj.checkAnswers();
	}).mousedown(function() {
		tObj.checkButton.css({left: "1px", top: "1px"});
	}).mouseup(function() {
		tObj.checkButton.css({left: "0px", top: "0px"})
	});


	if (mobileBrowser) {
		this.variants.unbind("touchstart").bind("touchstart", function(e) {
			//info('touch start')
			tObj.startDrag($(this),e);
		});
		

	} else {
		this.variants.mousedown(function(e) {
			tObj.startDrag($(this),e);
		});
	}
	
}

this.startDrag = function(el,e) {

		$("body").addClass("noselect");
		var t = el;
		var fromVariant = tObj.variants.index(t);
		var tHtml = t.html();
		var x = t.offset().left;
		var y = t.offset().top;
		var l= t.width();
		var difX=e.pageX-x;
		var difY=e.pageY-y;

			if (mobileBrowser) {
				difX= e.originalEvent.changedTouches[0].pageX-x;
				difY=e.originalEvent.changedTouches[0].pageY-y;
			}

		tObj.targetTable();               // shot of targets
		t.css({visibility: "hidden"});
		dragHelper.addClass("ds_ondrag").html(" "+tHtml+" ").css({left: x, top: y, maxWidth: l, opacity: "0.8"});

		tObj.dragging(difX, difY);
		tObj.dropping(fromVariant);
		e.preventDefault();
		return false;
}


this.dragging = function (difX, difY) {
	if (mobileBrowser) {

		$("body").unbind('touchmove').bind('touchmove', function(event) {
			var cordLeft = Math.round(event.originalEvent.targetTouches[0].pageX)-difX;
			var cordTop = Math.round(event.originalEvent.targetTouches[0].pageY)-40;

			dragHelper.css({left: cordLeft, top: cordTop});

			var tTarg = tObj.collision(event.originalEvent.targetTouches[0].pageX, event.originalEvent.targetTouches[0].pageY);
 			tObj.targets.removeClass("ontarget");
			if ( tTarg > -1) {
				tObj.targets.eq(tTarg).addClass("ontarget");
			}

			event.preventDefault();
			return false;
		});

	}else{
		$("body").bind("mousemove",function(e){
			dragHelper.css({left: e.pageX-difX, top: e.pageY-difY});
			e.preventDefault();
			return false;
		});
	}
}

this.targetTable = function() {
		this.targetsData = new Array();
		this.targets.each(function(i,elem) {
			var loc = $(elem).offset();
			loc.right = loc.left + $(elem).width();
			loc.bottom = loc.top + $(elem).height();
			loc.html = $(elem).children().html();
			loc.elem = elem;
			loc.taken = $(elem).attr("taken");
			tObj.targetsData.push(loc);
		});
}


this.collision = function (x,y) {
	for (var i = 0; i < tObj.targetsData.length; i++) {
		if ( tObj.targetsData[i].left < x && tObj.targetsData[i].right > x && tObj.targetsData[i].top < y && tObj.targetsData[i].bottom > y)
			return i;
		}
	return -1;
}

this.dropping = function (fromVariant) {

	if (mobileBrowser) {

		$("body").unbind("touchend").one("touchend", function(e){
			e.preventDefault();
			tObj.targets.removeClass("ontarget");
			var touch = e.originalEvent.changedTouches [0]
			var hitTarget = tObj.collision(touch.pageX,touch.pageY);
			dragHelper.removeClass("ds_ondrag").empty();       // remove drag helper

			tObj.droppedEvent(fromVariant, hitTarget);

			$("body").unbind("touchmove");

			$("body").unbind("touchend");

			return false;

		});

	}else{

	   $("body").one("mouseup", function(e) {
		var hitTarget = tObj.collision(e.pageX,e.pageY);   // determine if a target is hitted
		dragHelper.removeClass("ds_ondrag").empty();       // remove drag helper
		$("body").unbind("mousemove");
		tObj.droppedEvent(fromVariant, hitTarget);
		e.preventDefault();
		return false;

	   });
	}


}


this.droppedEvent = function (fromVariant, hitTarget) {
		if ( hitTarget > -1 && tObj.testType !="dragsort") {
				tObj.hittedTarget(fromVariant, hitTarget);
		}else if (hitTarget > -1 && tObj.testType=="dragsort" && tObj.targets.eq(hitTarget).children().children().length<1) {

			tObj.hittedTarget(fromVariant, hitTarget);
		}else {
			tObj.variants.filter(":eq("+fromVariant+")").css({visibility: "visible"});
		}
	tObj.container.find("."+tObj.signClass).removeClass(tObj.correctClass).removeClass(tObj.errorClass);
		if (tObj.autoCheck == true) {
			tObj.checkAnswers();
		}
		
		$("body").removeClass("noselect");
}



this.hittedTarget = function (fromVariant, hitted) {
	
		var tVariantHtml = tObj.variants.filter(":eq("+fromVariant+")").html();
		
		if (tObj.testType=="dragsort") {
			tObj.targets.eq(hitted).children().html('<div taken="'+fromVariant+'" class="sl_item">'+tVariantHtml+'</div>');
		}else{
			tObj.targets.eq(hitted).children().append('<div taken="'+fromVariant+'" class="sl_item">'+tVariantHtml+'</div>');
		}

		tObj.hittedAnimation(hitted);
			
		if (mobileBrowser) {

			 this.answers.find("div.sl_item").unbind("touchstart").bind("touchstart", function(e){ 
				e.preventDefault();
				var t = $(this);
				var x = t.offset().left;
				var y = t.offset().top;
				var l= t.width();
				difX= e.originalEvent.changedTouches[0].pageX-x;
				difY=e.originalEvent.changedTouches[0].pageY-y;
				var fromVariant = t.attr("taken");
				t.parent().attr("taken", "-1");
				var tHtml = t.html();
				tObj.targetTable();  // shot of the targets
				dragHelper.addClass("ds_ondrag").html(""+tHtml+"").css({left: x, top: y, maxWidth: l, opacity: "0.8", textAlign: "left"});
				t.hide();
					
		
				$("body").bind("touchmove", function(event){
			 	  e.preventDefault();
				  var cordLeft = Math.round(event.originalEvent.targetTouches[0].pageX)-difX;
				  var cordTop = Math.round(event.originalEvent.targetTouches[0].pageY)-(difY+20);
					dragHelper.css({left: cordLeft, top: cordTop});

					var tTarg = tObj.collision(event.originalEvent.targetTouches[0].pageX, event.originalEvent.targetTouches[0].pageY);
 					tObj.targets.removeClass("ontarget");
					if ( tTarg > -1) {
						tObj.targets.eq(tTarg).addClass("ontarget");
					}					


				});

				$("body").unbind("touchend").bind("touchend", function(e){
					e.preventDefault();

					tObj.targets.removeClass("ontarget");
					var touch = e.originalEvent.changedTouches [0]
					var hitTarget = tObj.collision(touch.pageX,touch.pageY);
					dragHelper.removeClass("ds_ondrag").empty();       // remove drag helper
					tObj.droppedEvent(fromVariant, hitTarget);
					$("body").unbind("touchmove");
					t.remove();

					$("body").unbind("touchend");
				});

			});


			// this.answers.find("div.sl_item").unbind("touchend").bind("touchend", function(e){
			//		e.preventDefault();
			//		$("body").unbind("touchmove");
			//});

		}else{
		   this.answers.find("div.sl_item").unbind("mousedown").mousedown(function(e){
			$("body").addClass("noselect");
			tObj.startDragTaken($(this), e)
			e.preventDefault();
			return false;
		   });
		}
}

this.startDragTaken = function (el, e) {
			var t = el;
			var x = t.offset().left;
			var y = t.offset().top;
			var l= t.width();
			var difX=e.pageX-x;
			var difY=e.pageY-y;

			var fromVariant = t.attr("taken");
			var tHtml = t.html();
			t.parent().attr("taken", "-1");
			t.remove();
			tObj.targetTable();  // shot of the targets
			dragHelper.addClass("ds_ondrag").html(""+tHtml+"").css({left: x, top: y, maxWidth: l, opacity: "0.8", textAlign: "left"});

			tObj.dragging(difX, difY);

			tObj.dropping(fromVariant);

}



this.hittedAnimation = function(hitted) {
			if (tObj.answerBColor == undefined) {
				var tColor = tObj.targets.eq(hitted).css("background-color");
			} else {
				var tColor = tObj.answerBColor;
			}

			if (tObj.testType=="dragsort") {
				tObj.targets.eq(hitted).addClass("ds_noImage").stop().css({backgroundColor: "#feff8f"}).animate({backgroundColor: tColor},500, function () {
				tObj.targets.eq(hitted).css({backgroundColor: tColor}).removeClass("ds_noImage");
			});

			}else{

			 tObj.targets.eq(hitted).find(".sl_item:last").addClass("ds_noImage").stop().css({backgroundColor: "#feff8f"}).animate({backgroundColor: tColor},500, function () {
				tObj.targets.eq(hitted).find(".sl_item:last").css({backgroundColor: tColor}).removeClass("ds_noImage");
			 });
			}
}

this.checkAnswers = function() {

	var errorNum = 0;
	var errorString = ' errors'
	var totalTasks = tObj.totalTasks;
	var correctNum=0;
	var tID = tObj.test_id
	
	var totalVariants = tObj.variants.length;

  tObj.answers.each(function(i, elem) {
	//totalTasks++;
	$(elem).find("."+tObj.checkClass).each(function(a, item) {
		var toCol = $(item).text();
		if (toCol -1 == i) {
			$(item).parent().parent().css({color: "green"});
			if (tObj.testType=="dragsort") {tObj.container.find("."+tObj.signClass).filter(":eq("+i+")").addClass(tObj.correctClass);}
			correctNum ++;
		}else {
			$(item).parent().parent().css({color: "red", borderColor: "#FF7F7F"});
			if (tObj.testType=="dragsort") {tObj.container.find("."+tObj.signClass).filter(":eq("+i+")").addClass(tObj.errorClass);}
			errorNum ++;
		}
	
	})
	
  });
  
  tObj.container.find(".ds-check-wrapper").find(".to_notify").remove();
	
	var noTxt = 'No completed tasks'
	var gTxt = 'Correct';
	var erTxt = 'Errors';
	if (es_lang == 'ru') {
		noTxt = 'Нет выполненных'; 
		gTxt = 'Правильно'; 
		erTxt = 'Ошибки';
	} else if (es_lang == 'fr') {
		noTxt = 'Il n\'y a pas de réponses'; 
		gTxt = 'Correct'; 
		erTxt = 'Erreurs';
	}
	
	if (correctNum ==  0 && errorNum == 0) {
		tObj.container.find(".ds-check-wrapper").prepend('<span class="to_notify"><span class="check_notify">'+noTxt+'</span></span>');
	
	} else {
	
		if (correctNum == totalTasks && errorNum == 0) {
		tObj.container.find(".ds-check-wrapper").prepend('<span class="to_notify"><span class="check_notify" style="background-image: none; color: green; padding-left: 10px;"> '+gTxt+': '+correctNum+'/'+totalTasks+' </span></span>');
		} else {
			tObj.container.find(".ds-check-wrapper").prepend('<span class="to_notify"><span class="check_notify" style="line-height: normal;"> <span style="color: #000">'+gTxt+': '+correctNum+'/'+totalTasks+'</span><br>'+erTxt+': '+errorNum+'</span></span>');
		}
  }
  
  tObj.container.find(".ds-check-wrapper").data('total', totalTasks).data('correct', correctNum)
  
  
  //alert (tID +" "+ totalTasks+" "+ correctNum)
  sendResults(tID, totalTasks, correctNum);
 
}

$(document).ready(function() {
	tObj.start();
});


}

























