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

/////////////////////////////////




var keyboardHtml = ''


+'<div class="keys_wrapper">'
+'<div class="keys_poser" style="display: none;">'
+'<div class="drag-controls"><span>'
+'	<a href="javascript:;" title="Minimize" class="keys_minimize">&nbsp;_&nbsp;</a> '
+'	<a href="javascript:;" title="Close" class="keys_close">&nbsp;X&nbsp;</a>&nbsp;&nbsp;</span> '
+'</div>'
+'<div class="drag-panel">Virtual keyboard</div>'
+'<div class="k_minimize">'
+'<div class="k_settings">'
+'<a class="k_show_settings set_toopen" href="javascript:;">'
+'<span>Settings:</span>  '
+'</a>'
+'<div class="k_set_options">'
+'<table align="center" style="margin: 0 auto; font-weight: bold" cellpadding="8">'
+'<tr>'
+'<td>Position: '
+'<select style="font-size: 10px" id="k_position">'
+'	<option selected>Auto</option>'
+'	<option>Manual</option>'
+'	<option>Fix to bottom</option>'
+'</select>'
+'</td>'
+'<td>Layout:'
+'<select style="font-size: 10px" id="k_layout">'
+'	<option selected>Standard</option>'
+'	<option>Phonetic</option>'
+'</select>'
+'</td>'
+'<td>Real&nbsp;keyboard: '
+'<select style="font-size: 10px" id="k_use">'
+'	<option selected>Not used</option>'
+'	<option>Used</option>'
+'</select>'
+'</td>'
+'</tr>'
+'</table>'
+'</div>'
+'</div>'
+'<table class="keys_container noselect" border="0" cellspacing="0" >'
+'<tr>'
+'<td style="padding: 15px;">'
+'<table class="virtual_keyboard" border="0" cellpadding="0" cellspacing="0" align="center">'
+'<tr>'
+'<td class="k_81"><div>й</div></td>'
+'<td class="k_87"><div>ц</div></td>'
+'<td class="k_69"><div>у</div></td>'
+'<td class="k_82"><div>к</div></td>'
+'<td class="k_84"><div>е</div></td>'
+'<td class="k_89"><div>н</div></td>'
+'<td class="k_85"><div>г</div></td>'
+'<td class="k_73"><div>ш</div></td>'
+'<td class="k_79"><div>щ</div></td>'
+'<td class="k_80"><div>з</div></td>'
+'<td class="k_219"><div>х</div></td>'
+'<td class="k_221"><div>ъ</div></td>'
+'</tr>'
+'</table>'
+'<table class="virtual_keyboard" border="0" cellpadding="0" cellspacing="0" align="center">'
+'<tr>'
+'<td class="k_192"><div>ё</div></td>'
+'<td class="k_65"><div>ф</div></td>'
+'<td class="k_83"><div>ы</div></td>'
+'<td class="k_68"><div>в</div></td>'
+'<td class="k_70"><div>а</div></td>'
+'<td class="k_71"><div>п</div></td>'
+'<td class="k_72"><div>р</div></td>'
+'<td class="k_74"><div>о</div></td>'
+'<td class="k_75"><div>л</div></td>'
+'<td class="k_76"><div>д</div></td>'
+'<td class="k_59 k_186"><div>ж</div></td>'
+'<td class="k_222"><div>э</div></td>'
+'<td class="k_220"><div>\</div></td>'
+'</tr>'
+'</table>'
+'<table class="virtual_keyboard" border="0" cellpadding="0" cellspacing="0" align="center">'
+'<tr>'
+'<td class="k_caps_lock"><div title="Caps Lock">⇑</div></td>'
+'<td class="k_90"><div>я</div></td>'
+'<td class="k_88"><div>ч</div></td>'
+'<td class="k_67"><div>с</div></td>'
+'<td class="k_86"><div>м</div></td>'
+'<td class="k_66"><div>и</div></td>'
+'<td class="k_78"><div>т</div></td>'
+'<td class="k_77"><div>ь</div></td>'
+'<td class="k_188"><div>б</div></td>'
+'<td class="k_190"><div>ю</div></td>'
+'<td class="k_pl_rt"><div>.</div></td>'
+'<td class="k_l_rt"><div>,</div></td>'
+'</tr>'
+'</table>'
+'<table class="virtual_keyboard" border="0" cellpadding="0" cellspacing="0" align="center">'
+'<tr>'
+'<td class="k_32">'
+'<div class="space">'
+'&nbsp;'
+'</div>'
+'</td>'
+'</tr>'
+'</table>'
+'</td>'
+'</tr>'
+'</table>'
+'</div>'
+'</div>';




function findPos(obj) {

	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		return [curleft,curtop];
	}	
}
 
	
var activeInput = false;
var caretPosition = 0;
var autoposition = true;

	


function doGetCaretPosition (oField) {


var iCaretPos = 0;

if (document.selection) { 

oField.focus ();

var oSel = document.selection.createRange ();

oSel.moveStart ('character', -oField.value.length);

iCaretPos = oSel.text.length;
}

else if (oField.selectionStart || oField.selectionStart == '0')
iCaretPos = oField.selectionStart;

return (iCaretPos);
}


function doSetCaretPosition (oField, iCaretPos) {


if (document.selection) { 

oField.focus ();

var oSel = document.selection.createRange ();

oSel.moveStart ('character', -oField.value.length);
oSel.moveStart ('character', iCaretPos);
oSel.collapse(true);

oSel.select ();
}

// Firefox support
else if (oField.selectionStart || oField.selectionStart == '0') {
oField.selectionStart = iCaretPos;
oField.selectionEnd = iCaretPos;
oField.focus ();
}

//oField.blur().focus();

}	
	
var keyboardCodes = new Array();

keyboardCodes = [

[['81'],['й'],['я']],
[['87'],['ц'],['ш']],
[['69'],['у'],['е']],
[['82'],['к'],['р']],
[['84'],['е'],['т']],
[['89'],['н'],['ы']],
[['85'],['г'],['у']],
[['73'],['ш'],['и']],
[['79'],['щ'],['о']],
[['80'],['з'],['п']],
[['219'],['х'],['ю']],
[['221'],['ъ'],['щ']],
[['65'],['ф'],['а']],
[['83'],['ы'],['с']],
[['68'],['в'],['д']],
[['70'],['а'],['ф']],
[['71'],['п'],['г']],
[['72'],['р'],['ч']],
[['74'],['о'],['й']],
[['75'],['л'],['к']],
[['76'],['д'],['л']],
[['59'],['ж'],['ь']],
[['222'],['э'],['ж']],
[['90'],['я'],['з']],
[['88'],['ч'],['х']],
[['67'],['с'],['ц']],
[['86'],['м'],['в']],
[['66'],['и'],['б']],
[['78'],['т'],['н']],
[['77'],['ь'],['м']],
[['188'],['б'],[',']],
[['190'],['ю'],['.']],
[['pl_rt'],['.'],['-']],
[['l_rt'],[','],['ъ']],
[['220'],['\\'],['э']],
[['192'],['ё'],['ё']]
//[['32'],[' ']]

]


function phoneticLayout() {
  for (var i = 0; i < keyboardCodes.length ; i++ ) {
	var keyCode = keyboardCodes[i] [0];
	var tLetter = keyboardCodes[i] [2];
	$(".virtual_keyboard td.k_" + keyCode +" div"  ).text(""+tLetter+"");
 }
}

function standardLayout() {
  for (var i = 0; i < keyboardCodes.length ; i++ ) {
	var keyCode = keyboardCodes[i] [0];
	var tLetter = keyboardCodes[i] [1];
	$(".virtual_keyboard td.k_" + keyCode +" div"  ).text(""+tLetter+"");
 }
}
 
 


function useKeys() {

$(document).keydown(function(event){

switch (event.keyCode) {

case 81: 
	
	vKeyPress(81);
	return false;
	break;
case 87: 
	vKeyPress(87);
	return false;
	break;	
case 69: 
	vKeyPress(69);
	
	return false;
	break;	
case 82: 
	vKeyPress(82);
	return false;
	break;
case 84: 
	vKeyPress(84);
	return false;
	break;	
case 89: 
	vKeyPress(89);
	return false;
	break;
case 85: 
	vKeyPress(85);
	return false;
	break;
case 73: 
	vKeyPress(73);
	return false;
	break;	
case 79: 
	vKeyPress(79);
	return false;
	break;	
case 80: 
	vKeyPress(80);
	return false;
	break;
case 219: 
	vKeyPress(219);
	return false;
	break;
case 221: 
	vKeyPress(221);
	return false;
	break;
	
case 65: 
	vKeyPress(65);
	return false;
	break;
case 83: 
	vKeyPress(83);
	return false;
	break;
case 68: 
	vKeyPress(68);
	return false;
	break;
case 70: 
	vKeyPress(70);
	return false;
	break;
case 71: 
	vKeyPress(71);
	return false;
	break;
case 72: 
	vKeyPress(72);
	return false;
	break;
case 74: 
	vKeyPress(74);
	return false;
	break;
case 75: 
	vKeyPress(75);
	return false;
	break;	
case 76: 
	vKeyPress(76);
	return false;
	break;	
case 59: //186 "j"
	vKeyPress(59);
	return false;
	break;
case 186: //186 "j"
	vKeyPress(186);
	return false;
	break;
case 222: 
	vKeyPress(222);
	return false;
	break;
	
case 90: 
	vKeyPress(90);
	return false;
	break;
case 88: 
	vKeyPress(88);
	return false;
	break;
case 67: 
	vKeyPress(67);
	return false;
	break;
case 86: 
	vKeyPress(86);
	return false;
	break;
case 66: 
	vKeyPress(66);
	return false;
	break;
case 78: 
	vKeyPress(78);
	return false;
	break;
case 77: 
	vKeyPress(77);
	return false;
	break;
case 188: 
	vKeyPress(188);
	return false;
	break;	
case 190: 
	vKeyPress(190);
	return false;
	break;
case 32: 
	vKeyPress(32);
	return false;
	break;
case 220: 
	vKeyPress(220);
	return false;
	break;	
case 192: 
	vKeyPress(192);
	return false;
	break;
case 20: 
	vKeyPress("caps_lock");
	return false;
	break;
default:
	
}

});

}

function stopUseKeys() {

$(document).unbind('keydown');

}

function vKeyPress(code) {

$(".k_" + code).mousedown().mouseup()
	.find("div").
	css({backgroundColor: "#BFBFBF"})
	.animate({backgroundColor: "#ffffff"}, 100, function() {
		$(".k_" + code + " div").removeAttr('style');
	});

}



var curPosX;
var curPosY;
var difX;
var difY;
var dragging = false;


function dragKeyboard(item, panel) {

	$("body").append('<div class="draggerClone" ><\/div>');
	
	panel.mousedown(function(e) {
	
	if (itsFixed) return false;
	
	dragging = true;
	$("body").addClass("noselect");
	
	var t=item;
	t.addClass("toDrag");
	
	curPosX=t.offset().left;
	curPosY=t.offset().top;	
	difX=e.pageX-curPosX;
   	difY=e.pageY-curPosY;
		
	var tHtml = t.clone().css({position: "relative", left: '0', top: '0'});  
	
	$(".draggerClone").html(tHtml);

	t.css({visibility: 'hidden'});	
	
	$("body").bind("mousemove",function(e){
	 if(dragging){
		$(".draggerClone").css({left: e.pageX-difX, top: e.pageY-difY, opacity: "0.6"});
 		e.preventDefault();
		return false;
		};
	});
  
	stopDragging(item, panel);
	
}).mousemove(function(e) {

}).mouseup(function(e) {

	if (itsFixed) return false;
	dragging = false;
	$("body").removeClass("noselect");
	item.css({left: e.pageX-difX, top: e.pageY-difY}).css({visibility: "visible"});
	$(".draggerClone").empty();
	item.removeClass("toDrag");
});

		
}


function stopDragging(item, panel) {
$("body").one("mouseup", function(e) {

		$("body").unbind("mousemove").removeClass("noselect");
		dragging = false;
		$("body").removeClass("noselect");
		$(".draggerClone").empty();
		var toX = e.pageX-difX;
		var toY =  e.pageY-difY;
		item.css({left: toX, top: toY}).css({visibility: "visible"});
		item.removeClass("toDrag");
				
});

}


$(function () {
    if ($.browser.msie) {
        $('input:checkbox').click(function () {
            this.blur();
            this.focus();
        });
    }
});



$(document).ready(function(){

$("body").append(keyboardHtml);

dragKeyboard( $("div.keys_poser"), $("div.drag-panel") );


if ($.browser.msie && $.browser.version < 7 ) {
	$("#k_position option").eq(2).remove();
}

if ($.browser.opera) {
	$("#k_use").attr("disabled", "disabled").attr("title", "Not available in Opera")
}


$("#k_position option:eq(0)").attr("selected", "selected");
$("#k_position").change(function () {
var posNum = $("#k_position option").index($("#k_position option:selected"));
	if (posNum == 1 ) {
		keyBoardUnfix();
		autoposition = false;
	} else if (posNum == 2 ) {
		keyboardFixToBottom();
	} else {
		keyBoardUnfix();
		autoposition = true;
	}
}).change();


$("#k_layout").change(function () {
var layoutNum = $("#k_layout option").index($("#k_layout option:selected"));
	if (layoutNum == 1 ) phoneticLayout();
	else standardLayout();
}).change();


$("#k_use option:eq(0)").attr("selected", "selected");

$("#k_use").change(function () {
var useNum = $("#k_use option").index($("#k_use option:selected"));
	if (useNum == 1 ) useKeys();
	else stopUseKeys();
}).change();


$(".show_keyboard").click(function() {
	var elWidth = $(".keys_poser").width();
	var toX = ( $(document).width()) * .5 - elWidth * .5;
	var toY = $(this).offset().top;
	var distance;
	
	if ($(this).find(".kb_offset_top").length > 0 ) distance = parseInt ( $(this).find(".kb_offset_top").text());
	else distance = 30;
	
	if (!itsFixed) {
		if( $(".active_input").length == 0 ) {                   //|| $(".active_input").offset().top < toY ) {
			$(".keys_poser").add(".draggerClone").css({left: toX}, 200)
		}
		$(".keys_poser").add(".draggerClone").animate({top: toY + distance}, 200);
	}
	$(".keys_poser").show();
	
});


$(".keys_minimize").toggle(function() {
	$(".k_minimize").slideUp();
	$(this).html('&nbsp;+&nbsp;').attr("title", "Expand");
}, function() {
	$(".k_minimize").slideDown();
	$(this).html('&nbsp;_&nbsp;').attr("title", "Minimize");
});

$(".keys_close").click(function() {
	$(".keys_poser").slideUp();
});


$(".k_show_settings").toggle(function() {
		$(".k_set_options").show();
		$(this).addClass("set_opened");
	}, function() {
		$(".k_set_options").hide();
		$(this).removeClass("set_opened");
});


$("#use_keyboard").toggle(function() {
		useKeys();
		$(this).val("Stop Use Keyboard")
	}, function() {
		stopUseKeys();
		$(this).val("Use Keyboard")
});

$(document).keyup(function() {

if ( $(".active_input").length > 0 ) {
	var activeEl = $(".active_input").get(0);
	caretPosition = doGetCaretPosition (activeEl)
	$("#caret").text(caretPosition);
}

});


$(".virtual_keyboard td").mousedown(function() {


	if ( $(".active_input").length == 0 ) {
		alert("Click the field to type in");
		return false;
	}
	if ( $(this).hasClass("k_32")) {
		insertFromKeyboard(" ")
	} else if ( $(this).hasClass("k_caps_lock") ) {
		operateCaps();
	}else {
		var str = $(this).text();
		str=$.trim(str);
		insertFromKeyboard(str);
	}
	
	$(this).addClass("k_active_key");

	
}).mouseup(function() {
	$(this).removeClass("k_active_key");
	var activeEl = $(".active_input").get(0);
	doSetCaretPosition (activeEl, caretPosition);
}).mouseout(function() {
	$(this).removeClass("k_active_key");
});


$(".for_keyb").one("click", function() {
	if ( $(".keys_poser").is(":hidden") ) {
		var elWidth = $(".keys_poser").width();
		var toX = ( $(document).width() ) * .5 - elWidth * .5;
		$(".keys_poser").add(".draggerClone").css({left: toX})
	}

});


$(".for_keyb").click(function() {

	var tDom = $(this).get(0);
	activeInput = $(this);
	activateInput($(this));
	$("#caret").text(caretPosition);

}).keypress(function() {
	
	$("#caret").text(caretPosition);

})


}); ///// end of document ready function 

var toCaps = false;

function operateCaps() {
	if ( $('.virtual_keyboard').hasClass("k_toCaps")) {
		toCaps = false;
		$('.virtual_keyboard').removeClass("k_toCaps");
		$(".k_caps_lock div").text('⇑');
	} else {
		toCaps = true;
		$('.virtual_keyboard').addClass("k_toCaps");
		$(".k_caps_lock div").text('⇓');
	}
}


function insertFromKeyboard(string) {
	var activeInput = $(".active_input");
	var activeEl = $(".active_input").get(0);
	var t = activeEl.value,  s = caretPosition; // s = getSelectionStart(activeEl) //, e = getSelectionEnd(activeEl);
	if (toCaps) string = string.toUpperCase();
	var beforStr = t.substring(0, s).replace(/ /g, '\xa0') || '\xa0';
	var afterStr = t.substring(s).replace(/ /g, '\xa0') || '\xa0';
	activeInput.val( beforStr + string + afterStr  );
	caretPosition = beforStr.length + string.length;
}

var ai_tip;

function activateInput(obj) {

if ( obj.hasClass("active_input") ) {
	$(".for_keyb").removeClass('active_input').removeAttr('title');
	
	obj.addClass("active_input").attr("title", "Text from virtual keyboard goes here");
	
} else {
	$(".for_keyb").removeClass('active_input').removeAttr('title');
	obj.addClass("active_input").attr("title", "Text from virtual keyboard goes here");
	var ai_posY = obj.offset().top;
	if (autoposition && !itsFixed) {
		$(".keys_poser").animate({top: ai_posY + 60}, 200);
		$(".draggerClone").css({top: ai_posY + 60},200);
	}
}
caretPosition = (doGetCaretPosition (obj.get(0)));
}


function getSelectionStart(o) {
	if (o.createTextRange) {
		r.moveEnd('character', o.value.length)
		var r = document.selection.createRange().duplicate()
		if (r.text == '') return o.value.length
		return o.value.lastIndexOf(r.text)
	} else return o.selectionStart
}


function getSelectionEnd(o) {
	if (o.createTextRange) {
		var r = document.selection.createRange().duplicate()
		r.moveStart('character', -o.value.length)
		return r.text.length
	} else return o.selectionEnd
}
	
	
var itsFixed = false;

function keyBoardUnfix() {
  if (itsFixed) {
	itsFixed = false;
	var tPosY =  $(".keys_poser").offset().top;
	var tPosX = $(".keys_poser").offset().left;
	$(".keys_poser").css({position: "absolute", bottom: "auto", top: tPosY, left: tPosX}).removeClass("k_fixed");
	$(".draggerClone").css({top: tPosY, left: tPosX});
  }
}

function keyboardFixToBottom() {
  if (!itsFixed) {
		itsFixed = true;
		var leftMarg = ( $(".keys_poser").width() ) * 0.5;
		var screenCenter = getClientCenterX();
		var tPosX = screenCenter - leftMarg;
		$(".keys_poser").css({position: "fixed", bottom: "10px", top: "auto", left: tPosX}).addClass("k_fixed");
   }
}


function getBodyScrollTop() {
	return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
}

function getBodyScrollLeft() {
	return self.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || (document.body && document.body.scrollLeft);
}

function getDocumentHeight() {
	return (document.body.scrollHeight > document.body.offsetHeight)?document.body.scrollHeight:document.body.offsetHeight;
}

function getDocumentWidth() {
	return (document.body.scrollWidth > document.body.offsetWidth)?document.body.scrollWidth:document.body.offsetWidth;
}

function getClientRight() {
	return parseInt(getClientWidth())+getBodyScrollLeft();
}

function getClientBottom() {
	return parseInt( getClientHeight() )+getBodyScrollTop();
}

function getClientCenterX() {
	return parseInt(getClientWidth()/2)+getBodyScrollLeft();
}

function getClientCenterY() {
	return parseInt(getClientHeight()/2)+getBodyScrollTop();
}


function getClientWidth() {
  return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
}

function getClientHeight() {
  return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
}


	
