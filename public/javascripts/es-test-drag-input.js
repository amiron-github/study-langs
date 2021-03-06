
var di_style =""
+"<style type='text/css'> "
+".di_dragHelper {left: 0; top: 0; position: absolute;}"
+".di_ondrag { cursor: default; border: 1px dotted #000; position: absolute; background-color: #fff}"
+".di_noImage { background-image: none !important}"
+"</style>"



$(document).ready(function() {
	$("head").append(di_style);	
});


function draginput_test(hash) {

var tObj = this;
var dragHelper;

this.targetsClass = hash['targets'];
this.variantsClass = hash['variant_elem'];
this.id = hash['id'];
this.targetBColor = hash['targets_color'];
this.inTargets = hash['in_targets'];
this.clearOption = hash['clear_option'];
this.oneUse = hash['one_use'];
this.nospace = hash['nospace'];
this.callback = hash['callback'];

if (this.inTargets == undefined ) this.inTargets = false;
if (this.clearOption == undefined ) this.inTargets = false;
if (this.oneUse == undefined ) this.oneUse = false;
if (this.nospace == undefined ) this.nospace = false;
this.targetsData = new Array();
if ($.browser.msie) this.ieSucks = true;
if (this.callback == undefined) this.callback = function() {return false};

this.start = function() {

	this.container = $('#'+this.id);
	this.targets = this.container.find("." + this.targetsClass );			// jquery elements to put the variants in, wrappers of answers
	this.variants = this.container.find("."+ tObj.variantsClass);          // jquery elements with variants which will be dragged and checked as answers
	
	this.variants.css({cursor: "default"});
	
	$("body").append('<div id="'+ this.id +'_dragHelper" class="di_dragHelper noselect"></div>');
	dragHelper = $('#'+ this.id +'_dragHelper');
	
	if (this.clearOption) {
		if (tObj.inTargets) {				
			tObj.targets.each(function(i,elem) {
				$(elem).find(tObj.inTargets).after('<a href="javascript:;" class="clear_placed_text" title="Reset">X</a>');
			});
		} else {
			tObj.targets.each(function(i,elem) {
				$(elem).after('<a href="javascript:;" class="clear_placed_text" title="Reset">X</a>');
			});
		
		}
	}
	
	
	this.container.find(".clear_placed_text").click(function() {
		if (tObj.inTargets) {
			$(this).parent().find(tObj.inTargets).val("");
		}else {
			$(this).prev("." + tObj.targetsClass).val("");
		}
		
		if (tObj.oneUse) {
			$(this).parent().find(".di_mix_variants").find("*").each(function(i,elem) {
				if ($(elem).css("visibility")=="hidden") {
					if (tObj.ieSucks) {
						$(elem).css({visibility: "visible"})
					} else {
						$(elem).css({visibility: "visible", backgroundColor: "#8FE2FF"}).animate({backgroundColor: "#ffffff"}, function(){$(elem).css({backgroundColor: "#ffffff"})});
					}
					
				}
			})
		}
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
		dragHelper.addClass("di_ondrag").html(tHtml).css({left: x, top: y, maxWidth: l, opacity: "0.8"});
		tObj.dragging(difX, difY);
		tObj.dropping(fromVariant);
		e.preventDefault();
		return false;
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
			loc.elem = elem;
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
		dragHelper.removeClass("di_ondrag").empty();       // remove drag helper
		$("body").unbind("mousemove");
		
		if ( hitTarget > -1) {
			tObj.hittedTarget(fromVariant, hitTarget);
		} 
		if (!tObj.oneUse) {
			if (tObj.ieSucks) {
				tObj.variants.filter(":eq("+fromVariant+")").css({visibility: "visible"});
			} else {
				tObj.variants.filter(":eq("+fromVariant+")").css({visibility: "visible", backgroundColor: "#8FE2FF"}).animate({backgroundColor: "#ffffff"});
			}
		} else {
			if ( hitTarget < 0) {
				if (tObj.ieSucks) {
					tObj.variants.filter(":eq("+fromVariant+")").css({visibility: "visible"});
				}else{
					tObj.variants.filter(":eq("+fromVariant+")").css({visibility: "visible", backgroundColor: "#8FE2FF"}).animate({backgroundColor: "#ffffff"});
				}
			}
		}
		
		$("body").removeClass("noselect");
		e.preventDefault();
		return false;
	});
}


this.hittedTarget = function (fromVariant, hitted) {
		var tVariantHtml = tObj.variants.filter(":eq("+fromVariant+")").html();
		var addValue= tVariantHtml;
		if (tObj.inTargets) {
			var tIntarget = tObj.targets.eq(hitted).find(tObj.inTargets);
			var inTargetDomEl = tIntarget.get(0);
			
			if (tIntarget.hasClass("gex-init-val")) tIntarget.val("").removeClass("gex-init-val").unbind("focus")
			
			if (inTargetDomEl.tagName == "INPUT" || inTargetDomEl.tagName == "TEXTAREA") {
				if ( !tIntarget.attr("disabled") ) {
					var currentValue = tIntarget.val();
					
					if (tObj.nospace) {
						var tValue = currentValue + addValue;
					} else {
						var tValue = currentValue +" " + addValue;
					}
					tValue = tValue.replace(/&nbsp;/g, " ")
					tValue = $.trim(tValue)
					tIntarget.val(tValue);
				}
					
			} else {
				var currentValue =tIntarget.html();
					if (tObj.nospace) {
						var tValue = currentValue + addValue;
					} else {
						var tValue = currentValue +" " + addValue;
					}
				tValue = tValue.replace(/&nbsp;/g, " ")
				tValue = $.trim(tValue)
				tIntarget.html(tValue);
			}
			
			if (! tObj.ieSucks) tObj.hittedAnimation(tIntarget);

		} else {

			var targetDomEl = tObj.targetsData[hitted].elem;
			
			if (targetDomEl.tagName == "INPUT" || targetDomEl.tagName == "TEXTAREA") {
			
				if ( !tObj.targets.attr("disabled") ) {
					if (tObj.targets.eq(hitted).hasClass("gex-init-val")) tObj.targets.eq(hitted).val("").removeClass("gex-init-val").unbind("focus")
					var currentValue =tObj.targets.eq(hitted).val();
						
					if (tObj.nospace) {
						var tValue = currentValue + addValue;
					} else {
						var tValue = currentValue +" " + addValue;
					}
					tValue = tValue.replace(/&nbsp;/g, " ")
					tValue = $.trim(tValue)
					tObj.targets.eq(hitted).val(tValue);
				}
			} else {
				if (tObj.targets.eq(hitted).hasClass("gex-init-val")) tObj.targets.eq(hitted).val("").removeClass("gex-init-val").unbind("focus")
				var currentValue =tObj.targets.eq(hitted).html();
				if (tObj.nospace) {
					var tValue = currentValue + addValue;
				} else {
					var tValue = currentValue +" " + addValue;
				}
				tValue = tValue.replace(/&nbsp;/g, " ")
				tValue = $.trim(tValue)
				tObj.targets.eq(hitted).html(tValue);
			}
			
			if (! tObj.ieSucks) tObj.hittedAnimation(tObj.targets.eq(hitted));
		}
}



this.hittedAnimation = function(hitted) {

			if (tObj.answerBColor == undefined) {
				var tColor = hitted.css("background-color");
				
				if (tColor == "transparent" || tColor == "rgba(0, 0, 0, 0)" ) {
					var endColor = "#ffffff";
				} else {
					var endColor = tColor;
				}
				
				hitted.addClass("ds_noImage").stop().css({backgroundColor: "#feff8f"}).animate({backgroundColor: endColor},500, function () {
					hitted.css({backgroundColor: tColor}).removeClass("ds_noImage");
				});
				
			} else {
			
				var tColor = tObj.targetBColor;
				hitted.addClass("ds_noImage").stop().css({backgroundColor: "#feff8f"}).animate({backgroundColor: tColor},500, function () {
					hitted.css({backgroundColor: tColor}).removeClass("ds_noImage");
				});
			}
}



$(document).ready(function() {
	tObj.start();
});


}

