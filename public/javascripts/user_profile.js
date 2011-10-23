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

var btns = {"cancel": "Cancel", "save": "Save", "delete": "Delete", "del_acc": "Delete account"}
$(document).ready(function() { 

updateUserWords();
updateUserResults();


$(".edit-userpic").click(function() {
		$("#pictures").dialog({
			dialogClass: 'userpic-dial',
			height: 'auto',
			width: 560,
			modal: true
		}).dialog( "option", "buttons", [
			{text:btns['save'], click: function() { changeUserpic( $("#used-userpic img").attr("src"))  }}, 
			{text:btns['cancel'], click: function() { $(this).dialog("close"); }} 
			] );
		//$(".userpic-dial").find(".ui-dialog-buttonset button:first").button( "option", "disabled", true );
			
 })

$(".userpics-list li").click(function(){
	var src = $(this).find("img:first").attr("src");
	$("#used-userpic").find("img:first").attr("src", src);
	var txt = $(this).find("div:first").html();
	$("#used-txt").html(txt);
})


 $("#edit-userpass").click(function() {
		$( "#userpass" ).dialog({
			dialogClass: 'userpass-dial',
			height: 'auto',
			width: 500,
			open: function () { $(this).find(".userinfo-edit input").blur();  },
			modal: true
		}).dialog( "option", "buttons", [{ text: btns['save'], click: function() {changeUserPass (); }}, {text: btns['cancel'], click: function() { $(this).dialog("close"); } }] )
		.dialog({close: function(event, ui) { 
			$("#userpass .err-block, #userpass .pass-error-msg").hide();
			$("#userpass .userinfo-edit input").val("");
		}});
 })
 
$(".edit-username").click(function() {
		$( "#username" ).dialog({
			dialogClass: 'username-dial',
			height: 'auto',
			width: 500,
			open: function () {  $(this).find(".userinfo-edit input").val($("#current_name").text()).blur();  },
			modal: true
		}).dialog( "option", "buttons", [
			{text: btns['save'], click: function() { changeNickname ()  }}, 
			{text: btns['cancel'], click: function() { $(this).dialog("close"); } }
		] )
		.dialog({close: function(event, ui) { 
			$("#username .err-block, #userpass .nick-error-msg").hide();
			$("#username .userinfo-edit input").val("");
		}});
})

$("#nick-blank-save").click(function() {changeNick ()});

$("#del-results-btn").click(function() {
		$( "#del-results" ).dialog({
			dialogClass: 'delres-dial',
			height: 'auto',
			width: 500,
			open: function () {  $(this).find(".userinfo-edit input").val('').blur();  },
			modal: true
		}).dialog( "option", "buttons", [{text: btns['delete'], click: function() { deleteResults ()  }},{ text: btns['cancel'], click: function() { $(this).dialog("close"); } }] )
		.dialog({close: function(event, ui) { 
			$("#del-results .err-block, #del-results .delres-error-msg").hide();
			$("#del-results .userinfo-edit input").val("");
		}});
}) 


$("#del-user-btn").click(function() {
		$( "#del-user" ).dialog({
			dialogClass: 'deluser-dial',
			height: 'auto',
			width: 500,
			open: function () {  $("#del-user input").blur().val('').removeAttr("checked");  },
			modal: true
		}).dialog( "option", "buttons", [{text: btns['del_acc'], click: function() { deleteUser ()  }},{text: btns['cancel'], click: function() { $(this).dialog("close"); } }] )
		.dialog({close: function(event, ui) { 
			$("#del-user .err-block, #del-user .deluser-error-msg").hide();
			$("#del-user .userinfo-edit input").val("");
		}});
})


});



function changeNickname ()  {
		var userName = $("#us-nickname").val();
		$.post("/update_nick", { user_name: userName} );
}

function deleteResults ()  {
		var password = $("#delres_pass").val();
		$(".delres-dial .ui-dialog-buttonset").prepend('<img class="up-loader" src="/images/load.gif" style="position: relative; top: 5px; left: -20px">');
		$.post("/del_stat", { password: password} );
}

function deleteUser ()  {
		var password = $("#deluser_pass").val();
		if ($.trim(password)!='' && $("#deluser-check").is(":checked") ) {
			$(".deluser-dial .ui-dialog-buttonset").prepend('<img class="up-loader" src="/images/load.gif" style="position: relative; top: 5px; left: -20px">');
			$.post("/userd", { password: password} );
		}
}

function userDelEr() {
	$("#del-user .err-block, #del-user .deluser-error-msg").hide();
	$(".deluser-dial .ui-dialog-buttonset img.up-loader").remove();
	$("#deluser-error-msg").show();
	$("#del-user .err-block").fadeIn();
}

function changeNick ()  {
		var userName = $("#nick-blank").val();
		if (userName.length < 2){
			alertWrongNick(2);
		} else if (userName.length >50){
			alertWrongNick(3);
		} else {
			$.post("/update_nick", { user_name: userName} );
		}
}

function alertWrongNick(status) {
			var msg = '';
			if (status==1) msg = $('#nick-error-msg1').text();
			if (status==2) msg = $('#nick-error-msg2').text();
			if (status==3) msg = $('#nick-error-msg3').text();
			$('<div title="Invalid nickname" style="padding: 30px 60px; font-size: 12px;"><b>'+msg+'</b></div>').dialog({modal:true}).dialog( "option", "buttons", {"Ok": function() { $(this).dialog("close"); } } );
}

function changeUserPass ()  {
	var pass=$("#cur-pass").val()
	var npass=$("#new-pass").val()
	var conf_pass=$("#confirm-pass").val()
	if  ($.trim(npass)!= '' ) {
		$(".userpass-dial .ui-dialog-buttonset").prepend('<img class="up-loader" src="/images/load.gif" style="position: relative; top: 5px; left: -20px">')
		$.post("/psedit", { password: pass, new_password: npass, confirm_password: conf_pass} );
	}
}

function userStatDeleting(status) {
	$("#del-results .err-block, #del-results .delres-error-msg").hide();
	$(".delres-dial .ui-dialog-buttonset img.up-loader").remove();
	if (status == 0) {
		$("#del-results").dialog("close");
		$("#delres-success").show();
		setTimeout(function() {
			$("#delres-success").fadeOut(800, function() {$("#delres-success").hide()});
		}, 1000)
		updateUserResults();
		updateUserWords();
	} else {
		if (status==1) {
			$("#delres-error-msg").show();
			$("#del-results .err-block").fadeIn();
		} else {
			$("#delres-error-msg1").show();
			$("#userpass .err-block").fadeIn();
		}
	}
}

function userNameChanging(status,name) {
	$("#username .err-block, #username .nick-error-msg").hide();
	$(".username-dial .ui-dialog-buttonset img.up-loader").remove();
	if (status == 0) {
		var to_show = $("#un-success")
		if ($("#nick-blank-save").is(":visible")) {var to_show = $("#un-success1")}
		$("#current_name").text(name);
		$("#us-nickname").val(name)
		$("#username").dialog("close");
		$("#nick-blank").val(name); 
		$("#us-username").html(name)
		to_show.show();
		setTimeout(function() {
			to_show.fadeOut(800, function() {to_show.hide()});
		}, 1000)
	} else {
		$("#username .err-block").fadeIn();
		if (status==1) {
			if ($("#nick-blank-save").is(":visible"))  {alertWrongNick(1); $("#username .err-block").hide();}
			else {$("#nick-error-msg1").show();}
		} else if (status==3) {
			$("#nick-error-msg3").show();
		} else {
			$("#nick-error-msg2").show();
		}
	}
}


function userPassChanging(status) {
	$("#userpass .err-block, #userpass .pass-error-msg").hide();
	$(".userpass-dial .ui-dialog-buttonset img.up-loader").remove();
	if (status == 0) {
		$("#userpass").dialog("close");
		$("#upass-success").show();
		setTimeout(function() {
			$("#upass-success").fadeOut(800, function() {$("#upass-success").hide()});
		}, 1000)
	} else {
		if (status==1) {
			$("#pass-error-msg1").show();
			$("#userpass .err-block").fadeIn();
		} else {
			$("#pass-error-msg2").show();
			$("#userpass .err-block").fadeIn();
		}
	}
}

function changeUserpic (url)  {
	$(".userpic-dial .ui-dialog-buttonset").prepend('<img class="up-loader" src="/images/load.gif" style="position: relative; top: 5px; left: -20px">')
	$.post("/users/change_userpic", { userpic: url} );
}

function userPicChanged(url) {
	$("#pictures").dialog("close");
	$("#userpic-img").attr("src", url)
	if ($("#userpic-img").is(":hidden")==false) {
		$("#userpic-img").css({backgroundColor: "#F0E805"}).animate({backgroundColor: "#fffff"},800);
	}
	
	$("#up-success").show();
	setTimeout(function() {
		$("#up-success").fadeOut(800, function() {$("#up-success").hide()});
	}, 1000)
	
}


function loadedEvents(container) {

container.find(".voc-details-content").css({opacity: 0})

container.find(".voc-words-list").each(function(i,elem){
	$(elem).find("tr:even").addClass("voc-list-even");
}); 

container.find(".tab-in-tab-list a").click(function() {
	container.find(".tab-in-tab-list a").removeClass("tab-in-current");
	$(this).addClass("tab-in-current");
});

container.find(".tab-in-tab-list a").not(".all-in-tab").click(function() {
	var tMinHeight = $(this).parent().parent().height()
	$(this).parent().parent().css({minHeight:  tMinHeight});
	container.find(".tab-in-tab").hide();
	tInd = $(".tab-in-tab-list a").index($(this));
	container.find(".tab-in-tab:eq("+(tInd-1)+")").fadeIn(300);
});

container.find(".tab-in-tab-list a.all-in-tab").click(function(){
	var tMinHeight = $(this).parent().parent().height()
	$(this).parent().parent().css({minHeight:  tMinHeight});
	container.find(".tab-in-tab").hide().show()
})

container.find(".voc-details").toggle(function(){
		$(this).parent().find(".voc-topic-details").slideDown(function() {
					$(this).parent().find(".voc-details-content").animate({opacity: 1},200);
		})
		$(this).parent().removeClass("details-hidden");
	},function(){
		$(this).parent().find(".voc-details-content").animate({opacity: 0},200, function() {
			$(this).parent(".voc-topic-details").slideUp();
		})
		$(this).parent().addClass("details-hidden");
});

container.find(".myvoc-wrapper").css({minHeight: ($(".myvoc-wrapper").height()+600) });
}