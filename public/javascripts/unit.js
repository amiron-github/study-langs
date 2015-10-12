/* unit js */
$(function() {
	$(".trans-display").attr("autocomplete", "off").click(function(){
		if ($(this).is(":checked")) {
			$(this).parent().parent().parent().parent().parent().find(".original div.ru-transcript").show();
		}else{
			$(this).parent().parent().parent().parent().parent().find(".original div.ru-transcript").hide();
		}
	});
	$(".dt_transc  input").attr("autocomplete", "off").click(function(){
		if ($(this).is(":checked")) {
			$(this).parent().parent().parent().parent().parent().find("td .d-transc").show();
		}else{
			$(this).parent().parent().parent().parent().parent().find("td .d-transc").hide();
		}
	});
	$(".come-more-display").toggle(function(){
			$(this).text("Hide details").parent().find(".com-more-in").show();
		},function(){
			$(this).text("Read more").parent().find(".com-more-in").hide();
	});
	$(".unit-title .tb_settings").toggle(function(){
			$(this).addClass("tb_set_on").parent().find(".tb_settings-wrap").show(400)
		},function(){
			$(this).removeClass("tb_set_on").parent().find(".tb_settings-wrap").hide(400)
	})
	$(".has-settings .tb_settings").toggle(function(){
			$(this).addClass("tb_set_on").parent().find(".tb_settings-wrap").show(400)
		},function(){
			$(this).removeClass("tb_set_on").parent().find(".tb_settings-wrap").hide(400)
	})	
});

function openNextStep(tab) {
	openTabFromUrl(tab)
	location.href="#tab="+tab
	window.scrollTo(0,100);
}
/* end of unit js */

/* nex block js, requires jqury ui dialog for comments */

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
		'comment': "Комментарий",
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

$(function() {tObj.start();});

}

/* end of nex block js */

/* flash simple js, requires jplayer for sounds */

$(function() {
	$(".fs-btn").mousedown(function(){
		$(this).addClass("fs-btn-down");
	}).mouseup(function(){
		$(this).removeClass("fs-btn-down");
	})
	$(".fs-container .tb_settings").toggle(function(){
			$(this).addClass("tb_set_on").parent().find(".tb_settings-wrap").show(400)
		},function(){
			$(this).removeClass("tb_set_on").parent().find(".tb_settings-wrap").hide(400)
	})
	$(".fs-container .opt-autoplays div span").click(function() {
		$(this).parent("div").parent("div").find(".checked").removeClass("checked");
		$(this).addClass("checked");
	});


});


function flash_show(hash) {

var tObj = this;
this.basicArray = hash['basic_array'];
this.id = hash['id']; 
this.origSize = hash['orig_size']; // options "big" / "small"
this.images = hash['images'];      // default - 0, no images
this.sounds = hash['sounds'];	   // default - 1, with sounds
this.transcribe = hash['transcribe'];
this.autoPlayData = hash['autoplay'];
this.counter = 0;
this.autoPlay = 0;
this.callback = hash['callback'];

if (this.images == undefined) this.images = 0;
if (this.sounds == undefined) this.sounds = 1;
if (this.transcribe == undefined) this.transcribe = 1;
if (this.autoPlayData == undefined) this.autoPlayData = 1;
if (this.callback == undefined) this.callback = function() {return false};

this.parseTest = function() {
	tObj.container = $("#"+tObj.id);
	tObj.contentHolder = tObj.container.find(".fs-container");
	tObj.originHolder = tObj.container.find(".fs-original");
	tObj.soundHolder = tObj.container.find(".fs-sound");
	tObj.transcriptHolder = tObj.container.find(".fs-transcript");
	tObj.translateHolder = tObj.container.find(".fs-translate");
	tObj.pictureHolder = tObj.container.find(".fs-picture");	
	tObj.articleHolder = tObj.container.find(".fs-article-wrapper");
	tObj.nextButton = tObj.container.find(".fs-next");
	tObj.prevButton = tObj.container.find(".fs-prev");
	tObj.controlBtns=tObj.nextButton.add(tObj.prevButton);
	tObj.showCount = tObj.container.find(".fs-show-count");
	tObj.autoPlayOn = tObj.container.find(".opt-autoplay_on");
	tObj.autoPlayOff = tObj.container.find(".opt-autoplay_off");
	tObj.transcribeOn = tObj.container.find(".opt-transcribe_on");
	tObj.transcribeOff = tObj.container.find(".opt-transcribe_off");
	tObj.transcribeButtons = tObj.transcribeOn.add(tObj.transcribeOff);
	tObj.vocLen = tObj.basicArray.length
	tObj.prevButton.click(function() {
		tObj.prev();
	});	
	
	if ($.browser.msie) {
		tObj.container.addClass("msie-sucks"); 
		if ($.browser.version < 8) tObj.container.addClass("msie7-sucks");
		if ($.browser.version < 9) tObj.container.addClass("msie8-sucks");
	}
	
	tObj.nextButton.click(function() {
		tObj.next();
	});	
	
	tObj.transcribeButtons.click(function(){
		tObj.transcribeButtons.removeClass("checked");
		$(this).addClass("checked");
		if (tObj.transcribeOn.hasClass("checked")) {
			tObj.transcriptHolder.show();
		} else {
			tObj.transcriptHolder.hide();
		}
	});	
	
	if (tObj.transcribe==0) {
		tObj.transcribeOff.click();
	}else{
		tObj.transcribeOn.click();
	}
	
	if (tObj.origSize == "small") tObj.originHolder.addClass("fs-original-small");
	if (tObj.origSize == "big") tObj.originHolder.addClass("fs-original-big");
	if (tObj.images!=0) tObj.container.addClass("fs-with-img");
	if (tObj.sounds==0) tObj.container.addClass("fs-no-sound");
	
	tObj.passage();
	
	tObj.autoPlay = tObj.autoPlayData;
	if (tObj.autoPlay==1) {
		tObj.autoPlayOn.click();
	} else {
		tObj.autoPlayOff.click();
	}

	if (tObj.images!=0) {
	    for (var i=0; i < tObj.basicArray.length; i++) {
			var img_url  = $.trim(tObj.basicArray[i]["img"])
			if ( img_url!=undefined && img_url!="") {
				$.get(img_url);
			}
		}
	}	
}


this.passage = function() {

	if ( tObj.autoPlayOn.hasClass("checked")) {
		tObj.autoPlay = 1;
	} else {
			tObj.autoPlay = 0;
	}
	tObj.originHolder.html(tObj.basicArray[tObj.counter]["origin"]);
	tObj.translateHolder.html(tObj.basicArray[tObj.counter]["translate"]);
	var trans = $.trim(tObj.basicArray[tObj.counter]["transcript"]);
	tObj.transcriptHolder.html("["+trans+"]");
	if (tObj.images!=0) {
		var img_url = $.trim(tObj.basicArray[tObj.counter]["img"]);
		if (img_url!=undefined && img_url!="") {
			tObj.pictureHolder.html('<img src="'+tObj.basicArray[tObj.counter]["img"]+'"/>');
		} else {
			tObj.pictureHolder.html('no image :(');
		}
	}
	if (tObj.sounds!=0) {
		var sound_url = $.trim(tObj.basicArray[tObj.counter]["sound"]);
		if (sound_url!=undefined && sound_url!="") {
			tObj.soundHolder.html('<div onclick="cJplayer(\''+tObj.basicArray[tObj.counter]["sound"]+'\', this)" class="jp_control"><\/div>')
		} else {
			tObj.soundHolder.empty()
		}
		if (tObj.autoPlay == 1) tObj.soundHolder.find(".jp_control").click();
	}
	tObj.showCount.html(tObj.counter+1+"/"+tObj.vocLen)
	fixFlashAccents(tObj.articleHolder)
}

this.next = function() {
	tObj.controlBtns.removeClass("fs-btn-disabled");
	if (tObj.counter < tObj.vocLen-1) {
		tObj.counter = tObj.counter +1
		tObj.passage();		
	} 
	if (tObj.counter > tObj.vocLen-2) {
		tObj.nextButton.addClass("fs-btn-disabled");
		tObj.callback();
	}
}

this.prev = function() {
	tObj.controlBtns.removeClass("fs-btn-disabled");	
	
	if (tObj.counter > 0) {
		tObj.counter = tObj.counter -1
		tObj.passage();	
	} 
	if (tObj.counter < 1) {
		tObj.prevButton.addClass("fs-btn-disabled");
	}
}

$(document).ready(function() {
	tObj.parseTest();
});

}

function fixFlashAccents(container) {
		if ( getCookie('accent_on') ) {
			if (getCookie('accent_adjust')) {
				container.find("span.acco").each(function(){
					var tVal = $(this).text().replace(/[?]/g, "");
					$(this).html("&#769;" + tVal);
				});
			} else {
			container.find("span.acco").each(function(){
				var tVal = $(this).text().replace(/[?]/g, "");
				$(this).html( tVal + "&#769;");
			});
			}
		}
		if(getCookie('accent_un')) {
			container.find("span.acco").each(function(){
				var tVal = $(this).text().replace(/[?]/g, "")
				$(this).html("<u>" + tVal + "<\/u>");
			});
		}
		if(getCookie('softness')) {
			container.find("span.sfts").remove();
			container.find("span.sfty").remove();
			container.find("span.sftc, span.sftv").after("<span class=\"sfts\">\'<\/span>");
		}
}

/* end of flash simple js */



