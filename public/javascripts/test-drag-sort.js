var ds_style =""
+"<style type='text/css'> "
+".ds_dragHelper {left: 0; top: 0; position: absolute;}"
+".ds_ondrag { cursor: default; border: 1px dotted #000; position: absolute; background-color: #fff}"
+"</style>"





$(document).ready(function() {
	$("head").append(ds_style);
	//$("body").append('<div id="ds_dragHelper" class="noselect"></div>');
		//ds_drag($("div.ds_sort_item"));
		//ds_drag($(".ds_variant"), $(".ds-answer"));
		//ds_dragFromTarget($(".ds_sort_item"),$(".ds_variant"))
});


function dragsort_test(hash) {

var tObj = this;
var dragHelper;

this.targetsClass = hash['targets'];
this.answersClass = hash['answer_elem'];
this.variantsClass = hash['variant_elem'];
this.id = hash['id'];

this.targetsData = new Array();

this.start = function() {
	this.container = $('#'+this.id);
	this.targets = this.container.find("." + this.targetsClass );			// jquery elements to put the variants in, wrappers of answers
	this.answers = this.container.find("." + this.answersClass);             // jquery elements with answers to check
	this.variants = this.container.find("."+ tObj.variantsClass);          // jquery elements with variants which will be dragged and checked as answers

	$("body").append('<div id="'+ this.id +'_dragHelper" class="ds_dragHelper noselect"></div>');
	
	dragHelper = $('#'+ this.id +'_dragHelper');

	this.targets.attr("taken", "-1");
	
	this.variants.mousedown(function(e) {
		$("body").addClass("noselect");
		var t = $(this);
		
		
		var tHtml = t.html();
		var x = t.offset().left;
		var y = t.offset().top;
		var l= t.width();
		var difX=e.pageX-x;
		var difY=e.pageY-y;
		t.css({visibility: "hidden"});
		dragHelper.addClass("ds_ondrag").html(tHtml).css({left: x, top: y, maxWidth: l, opacity: "0.8"});
		tObj.dragging(difX, difY)
		tObj.dropFromVariant(t);
		tObj.targetTable();		
		e.preventDefault();
		return false;
	});
	
	
	this.answers.mousedown(function(e){
		if ( $(this).parent().attr("taken") != "-1" ) {
			$("body").addClass("noselect");
			var t = $(this);
			
			tObj.targetTable();
			
			var fromVariant = t.parent().attr("taken");
			t.parent().attr("taken", "-1");
			var tHtml = t.html();
			var x = t.offset().left;
			var y = t.offset().top;
			var l= t.width();
			var difX=e.pageX-x;
			var difY=e.pageY-y;
			t.html("&nbsp;");
		
			dragHelper.addClass("ds_ondrag").html(tHtml).css({left: x, top: y, maxWidth: l, opacity: "0.8"});
			tObj.dragging(difX, difY);
			
			tObj.dropFromAnswer(t, fromVariant,tHtml);
			
			//tObj.targetTable();
			
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

this.dropFromVariant = function (tVariant) {
	$("body").one("mouseup", function(e) {
		var hitTarget = tObj.collision(e.pageX,e.pageY);
		dragHelper.removeClass("ds_ondrag").empty();
		$("body").unbind("mousemove");
		if ( hitTarget > -1) tObj.hittedTarget(tVariant,hitTarget);
		else tVariant.css({visibility: "visible"});
		$("body").removeClass("noselect");
		e.preventDefault();
		return false;
	});
}


this.hittedTarget = function (tVariant, hitted) {
	if ( tObj.targetsData[hitted].taken == "-1") {
		var tVariantHtml = tVariant.html();
		var takenBy = tObj.variants.index(tVariant);
		tObj.targets.eq(hitted).attr("taken", takenBy ).children().html(" " + tVariantHtml + " ");
	}else {
		tVariant.css({visibility: "visible"});
	}
}

this.dropFromAnswer = function(tAnswer, fromVariant, tHtml) { //jquery object of answer and index of variant
	$("body").one("mouseup", function(e) {
		var hitTarget = tObj.collision(e.pageX,e.pageY); // target hitted
		dragHelper.removeClass("ds_ondrag").empty();
		$("body").unbind("mousemove");
		if ( hitTarget > -1) {
			var hitted = hitTarget;
			var hitter = tObj.answers.index(tAnswer);
			
			tObj.interchange(hitter, hitted, tHtml);
			
			
			/*
			var takenBy = fromVariant;
			var tHtml = tObj.variants.eq(takenBy).html();
			
			if ( tObj.targetsData[hitted].taken == "-1") {
				tObj.targets.eq(hitted).attr("taken", takenBy ).children().html(" " + tHtml + " ");
			} else {
				tAnswer.html(tHtml).parent().attr("taken", takenBy )
			}
			*/
			
			
		} else {
			tObj.variants.filter(":eq("+fromVariant+")").css({visibility: "visible"})
		}
		$("body").removeClass("noselect");
		e.preventDefault();
		return false;
	});
}

this.interchange = function(fromIndex, toIndex, tHtml) {

	//tObj.targetTable();


	
	//var htmlToRemove = tObj.targetsData[toIndex].html;  //remove from
	
	//var htmlToPlace = tHtml;
	
	//tObj.targetsData[toIndex].html = htmlToPlace;
	//tObj.targetsData[fromIndex].html = htmlToRemove;
	
	var tEl = tObj.targetsData.splice(fromIndex, 1);  //remove from
	
	
	     tObj.targetsData.splice(toIndex, 0, tEl);        //place to
	
	/*
	tObj.answers.each (function(i,obj) {
		alert(tObj.targetsData[i].html);
	})
	*/
	
	
	tObj.answers.each (function(i,obj) {
		$(obj).html(" " + tObj.targetsData[i].html + " ");
	})




}



$(document).ready(function() {
	tObj.start();
});


}

function data() {

for (var i=0; i < ds1.targetsData.length; i ++ ) {

	alert( ds1.targetsData[i].html  )
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








