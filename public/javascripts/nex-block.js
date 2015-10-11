$(function(){

$("#ocom").click(function(){
	var posT = $(this).offset().top - $(window).scrollTop();
	var posL = $("#contentcell").offset().left + $("#contentcell").width()/2-300;
	
	$("#comments").dialog({
		width:600, 
		dialogClass: "nex-comment",
		title:'<span class="com-h-ico"></span> Комментарий!!!',
		position: [posL,posT+30]
	});
})

})

$(document).ready(function() {
	$("#nex-view span").click(function(){
		var t = $(this)
		$("#nex-view span").removeClass("checked");
		t.addClass("checked");
	})
});

function completeNex(block) { // place in array
	var t = $(".nex-check-done").eq(block)
	if (t.hasClass("need-test")) t.removeClass("need-test").removeClass("nex-checked").click().addClass("need-test");
	else t.removeClass("nex-checked").click();
}

function callComment(comment,icon,type) {
	var title = comment.data("title");
	var posT = icon.offset().top - $(window).scrollTop();
	var posL = 'center';
	var tClass = "nex-comment";
	var box = comment.parent().parent();
	
	var btn= icon;
	
	if ($("#menu_content").hasClass("m-menu-hidden")==false) { 
		posL = $("#contentcell").offset().left + $("#contentcell").width()/2-300 - $(window).scrollLeft();
	}
	if (type==2) {tClass="nex-example";}
	comment.dialog({
		width:600, 
		dialogClass: tClass,
		title:'<span class="com-h-ico"></span>'+title,
		position: [posL,posT+30],
		open: function() {btn.addClass('nex-ic-on')},
		close: function() {btn.removeClass('nex-ic-on')}
	});
}

function nex_block(hash) {
var tObj = this;
this.id = hash['id'];
this.need_test = hash['need_test'];
this.tests_id = hash['need_test'];
this.texts = hash['texts'];
this.layout = hash['layout'];

if (tObj.texts == undefined) {
	tObj.texts = {
		'comment': "Comment",
		'done':"Готово",
		'example':"Пример",
		'must_do': "Нужно выполнить упражнение!"
	}
}
if (tObj.layout == undefined) tObj.layout = 1

this.start = function() {
	this.container = $('#'+this.id);
	this.mainTab = $("#tab01");
	this.nextButton = this.container.find(".nex-open-next");
	this.prevButton = this.container.find(".nex-open-prev");
	this.navButtons = this.container.find(".nex-f-button")
	this.tabsButtons = this.container.find(".nex-tabs li");
	this.nexWrapper = this.container.find(".nex-wrapper");
	this.nexBlocks = this.container.find(".nex-block");
	this.nexHeaders = this.container.find(".nex-header");
	this.nexContainers = this.container.find(".nex-container");
	this.helperBlock = this.container.find(".nex-helper");
	this.hHelperBlock = this.container.find(".nex-h-helper");
	this.swButtons = this.container.find(".nex-sw li");
	this.compactButton = this.swButtons.eq(0);
	this.expandButton = this.swButtons.eq(1);
	this.nexContainers.each(function(i,el) {
		 $(el).prepend('<div class="nex-inf noselect"><div class="nex-check-done">&#10004; '+tObj.texts["done"]+'</div></div>');
		 var tCheckBtn = $(el).find(".nex-check-done");
		if (tObj.need_test!= undefined && tObj.need_test[i]==1) tCheckBtn.addClass('need-test');
		if ( $(el).find('.nex-comment-box').length > 0) {
			var cId='c_'+tObj.id+'_'+i;
			var comment = $(el).find('.nex-comment-box:eq(0)')
			comment.attr('id', cId).data('title', comment.attr("title"));
			$(el).find(".nex-inf").append('<div class="nex-com-icon" title="'+tObj.texts["comment"]+'"></div>');
			$(el).find(".nex-com-icon").click(function(){ 
				callComment(comment,$(this),1);
			});
		}
		if ( $(el).find('.nex-ex-box').length > 0) {
			var example = $(el).find('.nex-ex-box:eq(0)')
			example.data('title', example.attr("title"));
			$(el).find(".nex-inf").append('<div class="nex-ex-icon" title="'+tObj.texts["example"]+'"></div>');
			$(el).find(".nex-ex-icon").add($(el).parent().find(".nex-ex-link")).click(function(){ 
				callComment(example,$(this),2);
			});
		}
	});
	
	this.checkButtons = this.container.find(".nex-check-done");
	tObj.checkButtons.click(function(e){             // show the exercise is done
		var parent = $(this).parent().parent();
		if ($(this).hasClass("nex-checked")) {
			$(this).removeClass("nex-checked");
			var tIndex = tObj.nexContainers.index(parent);
			tObj.tabsButtons.eq(tIndex).removeClass("nex-t-done")
			parent.removeClass("nex-b-done")
		} else {
		   if ($(this).hasClass("need-test")) {
			messageIt("<b>"+tObj.texts["must_do"]+"</b>", 0) /*general functuib*/
		   } else {
			$(this).addClass("nex-checked");
			var tIndex = tObj.nexContainers.index(parent);
			tObj.tabsButtons.eq(tIndex).addClass("nex-t-done");
			parent.addClass("nex-b-done");
			}
		}
	})
	
	tObj.tabsButtons.click(function() {            // go to an exercise
		tObj.tabsButtons.removeClass("nex-t-active");
		$(this).addClass("nex-t-active");
	 	var tIndex = tObj.tabsButtons.index($(this));
		tObj.openEx(tIndex);
		if (tObj.nexWrapper.hasClass("nex-expanded")) {
			tObj.unbindShowAct();
			tObj.swButtons.removeClass("nex-sw-active");
			tObj.compactButton.addClass("nex-sw-active");
		}
		tObj.prevNextDisable(tIndex);
	});
	
	tObj.nextButton.click(function(e) {
		var a = tObj.nexAnimation();
		if (a != 1) tObj.nextEx();
		e.preventDefault;
		return false;
	});
	tObj.prevButton.click(function(e) {
		var a = tObj.nexAnimation();
		if (a != 1) tObj.prevEx();
		e.preventDefault;
		return false;
	});

tObj.swButtons.click(function(){
	var t = $(this)
	tObj.swButtons.removeClass("nex-sw-active");
	t.addClass("nex-sw-active");
	if (t.hasClass("nex-sw-last")) {
		tObj.expandEx();
		tObj.nexWrapper.addClass("nex-expanded");
		tObj.nexBlocks.bind("click", function () {tObj.showActiveEx($(this)) })
	} else {
		tObj.tabsButtons.filter(".nex-t-active").click();
		tObj.unbindShowAct();
	}
})

if (tObj.layout == 2) tObj.swButtons.eq(1).click()

tObj.mainTab.click(function() {
	//if (!tObj.nexWrapper.hasClass("nex-expanded")) tObj.tabsButtons.filter(".nex-t-active").click();
});
	
}

this.unbindShowAct = function() {
	tObj.nexWrapper.removeClass("nex-expanded");
	tObj.nexBlocks.unbind("click");
}

this.showActiveEx = function(clicked) {
	var tInd = tObj.nexBlocks.index(clicked);
	if (!tObj.tabsButtons.eq(tInd).hasClass("nex-t-active") ) {
		 tObj.tabsButtons.removeClass("nex-t-active").eq(tInd).addClass("nex-t-active");
	}
}

this.expandEx = function() {
	tObj.helperBlock.css({top: 0});
	tObj.hHelperBlock.css({height: "auto", maxHeight:"none"});
}

this.showActiveEx = function(clicked) {
	var tInd = tObj.nexBlocks.index(clicked);
	if (!tObj.tabsButtons.eq(tInd).hasClass("nex-t-active") ) {
		 tObj.tabsButtons.removeClass("nex-t-active").eq(tInd).addClass("nex-t-active");
	}
}

this.nexAnimation = function() {
	if (tObj.helperBlock.is(":animated") || tObj.hHelperBlock.is(":animated")) {
		return 1;
	} else { return 0}
}

this.activeEx = function() {
	var exArray = tObj.tabsButtons;
	var activeEx = exArray.index(exArray.filter(".nex-t-active"));
	return activeEx;
}

this.prevNextDisable = function(active) {
	tObj.navButtons.removeClass("nex-btn-disable");
	if (active > tObj.tabsButtons.length-2 ) {
		tObj.nextButton.addClass("nex-btn-disable");
	} else if (active < 1 ) {
		tObj.prevButton.addClass("nex-btn-disable");
	}
}

this.nextEx = function() {
	var active = tObj.activeEx();
	if (active+1 <  tObj.tabsButtons.length ) {
		tObj.tabsButtons.eq(active+1).click();
		tObj.prevNextDisable(active+1)
	}
}

this.prevEx = function () {
	var active = tObj.activeEx();
	if (active > 0) {
		tObj.tabsButtons.eq(active-1).click();
		tObj.prevNextDisable(active-1)
	}
}


this.openEx = function(num) {
var tBlock = tObj.nexBlocks.eq(num);
var helper = tObj.helperBlock;
var hHelper = tObj.hHelperBlock;
if ( tBlock.position() ) {
	tObj.nexBlocks.removeClass("nex-block-active");
	var pos = tBlock.position();
	var h=tBlock.height();
	var helperH = hHelper.height();
	if (h<helperH) {
		hHelper.animate({height: h},100, function(){
			helper.animate({top: "-"+pos.top+"px"});
		});
	} else if (h>helperH){
		helper.animate({top: "-"+pos.top+"px"}, function(){
			hHelper.animate({height: h},150);
		});
	} else {
		helper.animate({top: "-"+pos.top+"px"});
	}
	tBlock.addClass("nex-block-active");
}
}





$(document).ready(function() {
	tObj.start();
});



}





