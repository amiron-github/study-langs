

$(document).ready(function() {

var ds_style =""
+"<style type='text/css'> "
+"#ds_dragHelper {left: 0; top: 0; position: absolute;}"
+".ds_ondrag { cursor: move; border: 1px dotted #000; position: absolute; background-color: #fff}"
+"</style>"

$("head").append(ds_style);


$("body").append('<div id="ds_dragHelper" class="noselect"></div>');

//ds_drag($("div.ds_sort_item"));

ds_drag($(".ds_variant"), $(".ds-answer"));
ds_dragFromTarget($(".ds_sort_item"),$(".ds_variant"))

});



function ds_drag(item, targets) {
item.css({cursor: "move"});

item.each(function(i){
	$(this).attr("ds_var",i)
});

item.mousedown(function(e) {

	$("body").addClass("noselect");
		var t = $(this)
		var tHtml = t.html();
		var x = t.offset().left;
		var y = t.offset().top;
		var l= t.width();
		var difX=e.pageX-x;
		var difY=e.pageY-y;

		$(this).css({visibility: "hidden"});
		$("#ds_dragHelper").addClass("ds_ondrag").html(tHtml).css({left: x, top: y, width: l, opacity: "0.8"});
		ds_dragging($("#ds_dragHelper"), difX, difY);
		ds_stopDragging($("#ds_dragHelper"), $(this), item);
		
		if (targets) {
			ds_targetTable(targets);
			//ds_targetHtml(targets);
		}
		
		e.preventDefault();
		return false;
}) 

}


function ds_dragging(dragHelper, difX, difY) {
	$("body").bind("mousemove",function(e){
		dragHelper.css({left: e.pageX-difX, top: e.pageY-difY});
		e.preventDefault();
		return false;
	});
}


function ds_stopDragging(dragHelper, jObj, item) {

$("body").one("mouseup", function(e) {

	
	
	var hitTarget = ds_collision(e.pageX,e.pageY);
	
	dragHelper.removeClass("ds_ondrag").empty();
	$("body").unbind("mousemove");
	
	if ( hitTarget > -1) {
		var tIndex = jObj.attr("ds_var")
		hittedTarget(jObj,hitTarget,tIndex)
	}else {
		jObj.css({visibility: "visible"});
	}
	
	$("body").removeClass("noselect");
	e.preventDefault();
	return false;
	
});

}



var ds_targetPos = new Array();
function ds_targetTable(targets) {
ds_targetPos = new Array();
targets.each(function(i,elem) {
	var loc = $(elem).offset();
	loc.right = loc.left + $(elem).width();
	loc.bottom = loc.top + $(elem).height();
	loc.html = $(elem).html();
	loc.elem = elem;
	if ($(elem).attr("taken") == "taken") {
		loc.taken = true;
	}
	ds_targetPos.push(loc);
});
}



function ds_collision(x,y) {
for (var i = 0; i < ds_targetPos.length; i++) {
	if ( ds_targetPos[i].left < x && ds_targetPos[i].right > x && ds_targetPos[i].top < y && ds_targetPos[i].bottom > y)
		return i;
	}
return -1;
}


function hittedTarget(jObj, target,index) {
	var objHtml = jObj.html();
	if ( ds_targetPos[target].taken ) {
		jObj.css({visibility: "visible"});
	}else {
	
		$( ds_targetPos[target].elem ).attr("taken", "taken").attr("by",index).children().html(" " + objHtml + " ");
	}
}

function ds_dragFromTarget(item, returnTo) {


item.css({cursor: "move"})


item.mousedown(function(e) {

	if ( $(this).parent().attr("taken") == "taken" ) {

		$("body").addClass("noselect");
		
		
		
		$(this).parent().removeAttr("taken");
		

		
		//ds_targetPos[].taken = false;
		
		var t = $(this)
		var tHtml = t.html();
		var x = t.offset().left;
		var y = t.offset().top;
		var l= t.width();
		var difX=e.pageX-x;
		var difY=e.pageY-y;
		$(this).html("&nbsp;");
		
		$("#ds_dragHelper").addClass("ds_ondrag").html(tHtml).css({left: x, top: y, maxWidth: l, opacity: "0.8"});
		
		ds_dragging($("#ds_dragHelper"), difX, difY);
		
		ds_stopDragFromTarget($("#ds_dragHelper"), $(this), item, returnTo,tHtml);
		
		
		
		e.preventDefault();
		return false;
		
	}
})


}


function ds_stopDragFromTarget(dragHelper, jObj, item, returnTo,tHtml) {  //jObj - one of targets, item - targets list, returnTo - variants list

$("body").one("mouseup", function(e) {

	
	
	var hitTarget = ds_collision(e.pageX,e.pageY); // target hitted
	
	dragHelper.empty().removeClass("ds_ondrag");
	$("body").unbind("mousemove");
	
	
	if ( hitTarget > -1) {
	
		var takenFrom = jObj.parent().attr("by"); // taken from variant
		hittedFromTarget(jObj, hitTarget,takenFrom, tHtml);
		
	}else{
		var tReturn = jObj.parent().attr("by")
		returnTo.filter('[ds_var="'+tReturn+'"]').css({visibility: "visible"})
		
	}
	
	
	$("body").removeClass("noselect");
	e.preventDefault();
	return false;
	
});

}


function hittedFromTarget(jObj, target, takenFrom, tHtml) {   // jObj
	
	if ( $( ds_targetPos[target].elem ).attr("taken") == "taken" ) {
		
		jObj.html(tHtml).parent().attr("taken", "taken").attr("by",takenFrom);
		
	}else {
	
		$( ds_targetPos[target].elem ).attr("taken", "taken").attr("by",takenFrom).children().html(" " + tHtml + " ");
	}

}




/* 

 determine target set on each dragstart 
 use a correct and one target table
 make it sortable if all targets are hitted
 define so that several tests can be available on the page
 remove some unnecessary info
 
 
 Plan: 
 
 
 1. Create a common object with: test id, variants class and targets class.
 2. Inner functions that would work only with one test data
 3. All data about the current state are included in one place: 
 
	Target Data:
	- Coordinates
	- Taken or not
	- If taken, the variant
	
Consider the necessity of attributes
 

*/








