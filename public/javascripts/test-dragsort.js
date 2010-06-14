
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
	
	
})(jQuery);




$(document).ready(function() {

var ds_style =""
+"<style type='text/css'> "
+"#ds_dragHelper {left: 0; top: 0; position: absolute;}"
+".ds_ondrag { cursor: default; border: 1px dotted #000; position: absolute; background-color: #fff}"
+"</style>"

$("head").append(ds_style);

$("div.ds_input").mousedown(function() {
	$(this).focus();
	return false;
})


$("body").append('<div id="ds_dragHelper" class="noselect"></div>');

ds_drag($("div.ds_sort_item"));
//ds_drag($(".ds-test li"));

});


var ds_pos;
var ds_cont = new Array();


function ds_init(item) {

ds_pos = new Array();
item.each(function(i,elm) {
	var loc = $(elm).offset();
	loc.right = loc.left + $(elm).width();
	loc.bottom = loc.top + $(elm).height();
	loc.elm = elm;
	ds_pos.push(loc);
});

ds_cont = new Array();

item.each(function (i, elm) {
	var tcontent = $(elm).html();
	ds_cont.push(tcontent);
})


}






function ds_drag(item) {

item.css({cursor: "default"})

item.mousedown(function(e) {


$("body").addClass("noselect");

$(".ds_input").click(function() {
	$(this).focus();
})




var t = $(this)

var tHtml = t.html();
var x = t.offset().left;
var y = t.offset().top;
var l= t.width();

var difX=e.pageX-x;
var difY=e.pageY-y;

$(this).css({visibility: "hidden"});
$("#ds_dragHelper").addClass("ds_ondrag").html(tHtml).css({left: x, top: y, width: l, opacity: "0.8"});



ds_dragging($("#ds_dragHelper"), difX, difY, item);
ds_stopDragging($("#ds_dragHelper"), $(this), item);

ds_init(item);


e.preventDefault();
	return false;

}) 

}


function ds_dragging(dragHelper, difX, difY, item, l) {

$("body").bind("mousemove",function(e){
	dragHelper.css({left: e.pageX-difX, top: e.pageY-difY});
	e.preventDefault();
	return false;
});

}


function ds_stopDragging(dragHelper, jObj, item) {

$("body").one("mouseup", function(e) {
	dragHelper.empty().removeClass("ds_ondrag");
	
	var target = ds_collision(e.pageX,e.pageY); 
	
	$("body").unbind("mousemove");
	
	
	if (target > -1) {
	var tIndex = item.index(jObj);
	 jObj.css({visibility: "visible"});
	 
	 ds_interchange(tIndex, target,item);
	 
	 item.eq(target).css({backgroundColor: "#DCFF4F"}).animate({backgroundColor: "#ffffff"}, 800, function() {
		item.eq(target).css({backgroundColor: "transparent"});
	 })
	 
	 item.eq(target).find(".ds_input").val(target+1)
	 
	} else {
		jObj.css({visibility: "visible"});
	}
	
	
	
	$("body").removeClass("noselect");
	e.preventDefault();
	return false;
	
});


}

function ds_collision(x,y) {
for (var i = 0; i < ds_pos.length; i++) {
	if ( ds_pos[i].left < x && ds_pos[i].right > x && ds_pos[i].top < y && ds_pos[i].bottom > y)
		return i;
	}
return -1;
}


function ds_interchange(t, target,item) {
	var tEl = ds_cont.splice(t,1);
	ds_cont.splice(target, 0, tEl);
	item.each(function(i,obj) {
		$(obj).html(" " + ds_cont[i] + " ");
	})
}




/*   ds_init($(".dst-test div"))     

	ds_drag($(".dst-test div"))

    */


























