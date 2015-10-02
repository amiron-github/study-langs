var gContent;
var preloadFiles = new Array();
var currentSection;
var wrapTests = true;
var es_lang=false;

function startDragTest(arr) {
        for (var i=0; i<arr.length; i++) {
                $(".target").eq(i).data("for", arr[i]);
        }
}

$(document).ready(function(){

contentList();
gContent = $("#content").html();

if ($("#contfield").width() < 600) {
	$("#contentcell").addClass("show-menu-remover");
}

$("#header_remover").click( function() {
	if ( $("body").hasClass("m-header-hidden") ) {
		$("#fixWidh").animate({top: "0px"}, function() {
			$("body").removeClass("m-header-hidden");
		});		
		delCookie('no_header')
	} else{
		$("#fixWidh").css({position: "relative"}).animate({top: "-84px"}, function() {
			$("body").addClass("m-header-hidden");
		});
		setCookie('no_header', 'yes')
	}
});

$("#body_widther").click( function() {
	if ( $("body").hasClass("m-wide-body") ) {
		$("body").removeClass("m-wide-body");		
		delCookie('wide_body')
	} else{
		$("body").addClass("m-wide-body");
		setCookie('wide_body', 'yes')
	}
});

$("#menu_remover").click( function() {
	if ( $("#nav-pos").is(":hidden") ) {
		$("div#contentcell").animate({marginLeft: "200px"}, function() {
			$("#nav-pos").fadeIn(300);
			$("#menu_content").removeClass("m-menu-hidden");
		});		
		delCookie('no_menu')
	} else {
		setCookie('no_menu', 'yes');
		if (sendData) {
			$("#nav-pos").fadeOut(200, function() {
				$("div#contentcell").animate({marginLeft: "30px"});
				$("#menu_content").addClass("m-menu-hidden");
			});			
		} else {
			window.location.reload();
		}
	}
});


//menu slide
$("div.list").click(function () {  
		var t=$(this);
		var current_sub = $(this).parent().parent().next(".sub");

     if (current_sub.is(":hidden")) {
        $("div.open").slideUp("slow");
        $("div.list").removeClass("up").addClass("down");
        $("div.open").removeClass("open");
        current_sub.slideDown("slow").addClass("open");
        t.addClass("up").removeClass("down");
      } else {
        current_sub.slideUp("slow");
        t.addClass("down").removeClass("up");
     	 }
});

sectionHighlight();

//settings_list hover
$("div.hint").mouseover(function(){ 
	$(this).addClass("current").next("div.sub_hint").addClass("current_sub");
	}).mouseout(function(){
      $(this).removeClass("current").next("div.sub_hint").removeClass("current_sub");
});
//settings_list open
$("div.hint").toggle( 
  function () {
        $(this).css({backgroundPosition: "0px -138px"}).parent("div.hint_button").animate({left: 1, top: 1}, 1).css({backgroundPosition: "100%  -48px"});
        $("div.current_sub").show("slow");
        $(this).toggleClass("active").children("div.hint_list").toggleClass("hup");
  },
  function () {
        $(this).css({backgroundPosition: "0px -91px"}).parent("div.hint_button").animate({left: 0, top: 0}, 1).css({backgroundPosition: "100%  -1px"});
        $("div.current_sub").hide("slow");
        $(this).toggleClass("active").children("div.hint_list").toggleClass("hup");
});

//drop_list 1st level open

$(".drop_1").hover(
      function () {
        $(this).next(".drop_2").children(".drop_2bl").show();
         $(this).addClass("d_act");
        $(this).addClass("opened");
      }, 
      function () {
        $(this).next(".drop_2").children(".drop_2bl").hide();
         $(this).removeClass("d_act");
       $(this).removeClass("opened");
      }
);
    
$(".drop_2bl").hover(
      function () {
        $(this).show();
        $(this).parent(".drop_2").prev(".drop_1").addClass("d_act");
        $(this).parent(".drop_2").prev(".drop_1").addClass("opened");
      }, 
      function () {
        $(this).hide();
        $(this).parent(".drop_2").prev(".drop_1").removeClass("d_act");
        $(this).parent(".drop_2").prev(".drop_1").removeClass("opened");
      }
);
    

$(".drop_2x").hover(
      function () {
        $(this).addClass("d_act");
        $(this).addClass("opened");
        $(this).next(".drop_3").children(".drop_3bl").show();
      }, 
      function () {
        $(this).removeClass("d_act");
        $(this).removeClass("opened");
       $(this).next(".drop_3").children(".drop_3bl").hide();
      }
 );

$(".drop_3bl").hover(
      function () {
        $(this).show();
        $(this).parent(".drop_3").prev(".drop_2x").addClass("d_act");
        $(this).parent(".drop_3").prev(".drop_2x").addClass("opened");
      }, 
      function () {
        $(this).hide();
        $(this).parent(".drop_3").prev(".drop_2x").removeClass("d_act");
        $(this).parent(".drop_3").prev(".drop_2x").removeClass("opened");
      }
);

$(".drop_3x").hover(
      function () {
        $(this).addClass("d_act");
      }, 
      function () {
        $(this).removeClass("d_act");
      }
);

$("#preload_off").click(function () {
	delCookie('preload');
	$("#preload_on").removeClass("checked");
	$("#preload_off").addClass("checked");
	});

$("#preload_on").click(function () {
	$("#preload_off").removeClass("checked");
	$("#preload_on").addClass("checked");
	});

$("span#nOrder").click(function() {
	newOrderClick();
	});

$("span#cOrder").click(function() {
	columnOrderClick();
	});

$("span.accent_un").click(function() {
	accentUnClick();
	});

$("span.accent_on").click(function() {
	accentOnClick();
	});

$("#accent_adjust").click(function() {
	accentAdjustClick();
	});

$("span.accent_off").click(function() {
	accentOffClick();
	});

$("span#soft_on").click(function() {
	softOnClick();
	});
	
$("span#soft_off").click(function() {
	softOffClick();
	});

if(getCookie('n_order')) {
if($("span#cOrder").hasClass("checked")) {
	$("span#cOrder").removeClass("checked");
	};
$("span#nOrder").addClass("checked");
};

if(getCookie('accent_un')) {
if($("div#accents").find("span.tcheck").hasClass("checked")){
	$("div#accents").find("span.tcheck").removeClass("checked");
	};
$("span.accent_show").addClass("checked");
$("span.accent_un").addClass("checked");
};

if(getCookie('accent_on')) {
if($("div#accents").find("span.tcheck").hasClass("checked")){
	$("div#accents").find("span.tcheck").removeClass("checked");
	};
$("span.accent_show").addClass("checked");
$("span.accent_on").addClass("checked");
};

if(getCookie('accent_adjust')) {
	$("#accent_adjust").addClass("adjusted");
};

if(getCookie('softness')) {
if($("div#softs").find("span.tcheck").hasClass("checked")){
		$("div#softs").find("span.tcheck").removeClass("checked");
		};
$("span#soft_on").addClass("checked");
};

$(".egt").prepend("'").append("'")

changeContent();

if(getCookie('preload')) {
	preloadSound();
	$("#preload_off").removeClass("checked");
	$("#preload_on").addClass("checked");
};

if (wrapTests) {
wrapTbTest();
}


});
////////////////////////////// end of downloading
//events for Content
function effectsContent() { 

$("div.player_swf").each(function(){
	var plink=$(this).text();
	var before='<object type="application/x-shockwave-flash" data="player.swf" width="90" height="18"><param name="movie" value="player.swf"/><param name="FlashVars" value="mp3=';
	var after='&amp;configxml=config_maxi.xml" /><param name="wmode" value="opaque"/></object>';
	str=before+plink+after;
	$(this).replaceWith(str);
});

/*
$("span.ry").each(function(){
		$(this).replaceWith("<s>"+$(this).html() + "</s>");
});

$("span.acct").each(function(){
	$(this).replaceWith("<b>"+$(this).html() + "</b>");
});
*/

$(".sound").mouseover(function(){
	$(this).addClass("preplay");
	}).mouseout(function(){
      $(this).removeClass("preplay");
});

$(".play_tip").hover(function(){
  tooltip(this,'Click&nbsp;to&nbsp;listen');},
  function(){hide_info(this)});

$(".key").mousedown(function(){
      $(this).addClass('key_act');
    }).mouseup(function(){
      $(this).removeClass('key_act');
});

$(".tbtest .sound").click(function () {
	$(".tbtest div.key").removeClass("key_curr");
	$(this).parent("div").parent("div.key").addClass("key_curr");
	});

$(".trow").hover(function(){
  $(this).addClass("trow_act");},
  function(){$(this).removeClass("trow_act");
  });

$(".more_info").hover(function(){
  $(this).addClass("m_info_act");},
  function(){$(this).removeClass("m_info_act");
});


$("table.audiotrans").hover(function(){
  	$(this).addClass("preplay");
	$(this).find("div.sdict").css({backgroundPosition: "100% -23px"});
	},
  function(){
	$(this).removeClass("preplay");
	$(this).find("div.sdict").css({backgroundPosition: "100% 3px"});
	});

$(".open_popup_link").hover(function(){
  	$(this).addClass("pphover");
	},
  function(){
	$(this).removeClass("pphover");
	});


if($(".dragit").length){
 $.getScript("/javascripts/draggable.js");
}

}

//end of events for Content

/////////// Content building 

function changeContent() {

if($("span#nOrder").hasClass("checked")) {
	newOrder();
}

if($("span.accent_on").hasClass("checked")) {

	$("#accent_adjust").slideDown();
	
	if($("#accent_adjust").hasClass("adjusted")) {
	accentAdjust();
	}else{
	accentOn();
	}
}
 
if($("span.accent_un").hasClass("checked")) {
	accentUn();
}
 
if($("span#soft_on").hasClass("checked")) {
	softOn();
}
 
effectsContent();
}
/////////// End of Content building

/////////// Settings Clicks
function newOrderClick() {
newOrder();
if($("span#cOrder").hasClass("checked")) {
	$("span#cOrder").removeClass("checked");
	$("span#nOrder").addClass("checked");
	};
setCookie('n_order','yes');
effectsContent();
}

function columnOrderClick() {
columnOrder();
if($("span#nOrder").hasClass("checked")) {
	$("span#nOrder").removeClass("checked");
	$("span#cOrder").addClass("checked");
	};
delCookie('n_order');
effectsContent();
}

function accentUnClick() {
if($("div#accents").find("span.tcheck").hasClass("checked")){
	$("div#accents").find("span.tcheck").removeClass("checked");
	};
$("#accent_adjust").slideUp();
$("span.accent_show").addClass("checked");
$("span.accent_un").addClass("checked");
setCookie('accent_un', 'yes');
delCookie('accent_on');
if (getCookie("accents")) {
	adjustView();
} else {
	setCookie('accents', '1');
	window.location.reload();
}
accentUn();
}

function accentOnClick() {
if($("div#accents").find("span.tcheck").hasClass("checked")){
	$("div#accents").find("span.tcheck").removeClass("checked");
	};
$("span.accent_show").addClass("checked");
$("span.accent_on").addClass("checked");
setCookie('accent_on', 'yes');
delCookie('accent_un');
if (getCookie("accents")) {
	adjustView();
} else {
	setCookie('accents', '1');
	window.location.reload();
}

if($("#accent_adjust").hasClass("adjusted")) {
		accentAdjust();
		}else{
		accentOn();
};
}

function accentAdjustClick() {

$("#accent_adjust").fadeOut().fadeIn();

if($("#accent_adjust").hasClass("adjusted")) {
		$("#accent_adjust").removeClass("adjusted");
		delCookie('accent_adjust');
		accentOn();
		}else{
		$("#accent_adjust").addClass("adjusted");
		setCookie('accent_adjust', 'yes');
		accentAdjust();
};

}

function adjustView() {
if($("span.accent_on").hasClass("checked")) {
	$("#accent_adjust").slideDown();

}
}


function accentOffClick() {
if($("div#accents").find("span.tcheck").hasClass("checked")){
	$("div#accents").find("span.tcheck").removeClass("checked");
	};
$("#accent_adjust").hide();
$("span.accent_off").addClass("checked");
delCookie('accent_on');
delCookie('accent_un');
adjustView();
accentOff();
}

function softOnClick() {
softOn();
if($("div#softs").find("span.tcheck").hasClass("checked")){
	$("div#softs").find("span.tcheck").removeClass("checked");
	};
$("span#soft_on").addClass("checked");
setCookie('softness','on');
}

function softOffClick() {
softOff();
if($("div#softs").find("span.tcheck").hasClass("checked")){
	$("div#softs").find("span.tcheck").removeClass("checked");
	};
$("span#soft_off").addClass("checked");
delCookie('softness');
}
/////////// End of Settings Clicks

////////////// Settings basics
//chages columns to EN-RU
function newOrder() { 
$("tr.trow").each(function(){
	var first=$(this).children("td.original").html();
	var second=$(this).children("td.transcript").html();
	var third=$(this).children("td.translation").html();
	newRow='<td class="translation" valign="top">'+third+'</td><td class="original" valign="top">'+first+'</td><td class="transcript" valign="top">'+second+'</td>';
	$(this).html(newRow);
	});
}
//chages columns to RU-EN
function columnOrder() { 
$("tr.trow").each(function(){
	var first=$(this).children("td.original").html();
	var second=$(this).children("td.transcript").html();
	var third=$(this).children("td.translation").html();
    newRow='<td class="original" valign="top">'+first+'</td><td class="transcript" valign="top">'+second+'</td><td class="translation" valign="top">'+third+'</td>';
    $(this).html(newRow);
	});
}

function accentOn() {
	$("span.acco").each(function(){
		var tVal = $(this).text().replace(/[́]/g, "");
		$(this).html( tVal + "&#769;");
		
	});
}

function accentAdjust() {
$("span.acco").each(function(){
	var tVal = $(this).text().replace(/[́]/g, "");
	$(this).html("&#769;" + tVal);
	
	});
}

function backAccent() {
	$("span.acco").each(function(){
		var tVal = $(this).text().replace(/[́]/g, "");
		$(this).html(tVal + "&#769;");
	});
}

function accentUn() {
	$("span.acco").each(function(){
		var tVal = $(this).text().replace(/[́]/g, "")
		$(this).html("<u>" + tVal + "</u>");
	});
}

function accentOff() {
	$("span.acco").each(function(){
		var tVal = $(this).text().replace(/[́]/g, "")
		$(this).html("" + tVal + "");
	});
}

function softOn() {
	$("span.sfts").remove();
	$("span.sfty").remove();
	$("span.sftc, span.sftv").after("<span class=\"sfts\">\'<\/span>");
}

function softOff() {
 	$("span.sfts").remove();
 	$("span.sfty").remove();
 	$("span.sftv").after("<span class=\"sfty\">y<\/span>");
}

/////////// End of Settings basics

/////////// Audio Blocks

function playFile(slink) {
        this.before = '<object type="application/x-shockwave-flash" data="/player_norm.swf" width="20" height="20"><param name="movie" value="/player_norm.swf"/><param name="FlashVars" value="mp3=';
        this.after = '&amp;autoplay=1" /></object>';
	this.all=this.before + slink + this.after;
  document.getElementById("audiospan").innerHTML=this.all;
}


function playSound(slink) {
        this.before = '<object type="application/x-shockwave-flash" data="player_norm.swf" width="20" height="20"><param name="movie" value="player_norm.swf"/><param name="FlashVars" value="mp3=/sounds/';
        this.after = '&amp;autoplay=1" /></object>';
	this.all=this.before + slink + this.after;
  document.getElementById("audiospan").innerHTML=this.all;
}

function playAudio(slink) {
        this.before = '<object type="application/x-shockwave-flash" data="player_norm.swf" width="20" height="20"><param name="movie" value="player_norm.swf"/><param name="FlashVars" value="mp3=audios/';
        this.after = '&amp;autoplay=1&amp;vol_ume=50" /></object>';
	this.all=this.before + slink + this.after;
  document.getElementById("audiospan").innerHTML=this.all;
}

function playTestSound(slink) {
        this.before = '<object type="application/x-shockwave-flash" data="player_norm.swf" width="20" height="20"><param name="movie" value="player_norm.swf"/><param name="FlashVars" value="mp3=';
        this.after = '&amp;autoplay=1" /></object>';
	this.all=this.before + slink + this.after;
  document.getElementById("audiospan").innerHTML=this.all;
}
/////////// End of Audio Blocks

function open_comment(link,w,h){

if (!w || w == 0) w=560;
if (!h || h == 0) h=380;

window.open(link,"_blank","toolbar=0, location=0, directories=no, status=0, menubar=0, scrollbars=yes, resizable=yes, titlebar=no, width="+w+", height="+h+", top=20");
}

///////////////// Audio Files Preload

var mp3g;
var gP;

function preloadSound() {
return false;
}

function prUp(c) {
return false;
}

function loadMp3(c) {
return false;
}
///////////////// End of Audio Files Preload


/////////////// Tips 
var d = document;
var offsetfromcursorY=21 // y offset of tooltip
var ie=d.all && !window.opera;
var ns6=d.getElementById && !d.all;
var tipobj,op;
	
function tooltip(el,txt)
{
	tipobj=d.getElementById('mess');
	tipobj.innerHTML = txt;
	op = 0.1;	
	tipobj.style.opacity = op; 
	tipobj.style.visibility="visible";
	el.onmousemove=positiontip;
	appear();
}

function hide_info(el)
{
	d.getElementById('mess').style.visibility='hidden';
	d.getElementById('mess').style.left='-500px';
	el.onmousemove='';
}

function ietruebody(){
return (d.compatMode && d.compatMode!="BackCompat")? d.documentElement : d.body
}

function positiontip(e)
{
	var curX=(ns6)?e.pageX : event.clientX+ietruebody().scrollLeft;
	var curY=(ns6)?e.pageY : event.clientY+ietruebody().scrollTop;
	var winwidth=ie&&!window.opera? ietruebody().clientWidth : window.innerWidth-20
	var winheight=ie&&!window.opera? ietruebody().clientHeight : window.innerHeight-20
	
	var rightedge=ie&&!window.opera? winwidth-event.clientX : winwidth-e.clientX;
	var bottomedge=ie&&!window.opera? winheight-event.clientY-offsetfromcursorY : winheight-e.clientY-offsetfromcursorY;

	if (rightedge<tipobj.offsetWidth)	tipobj.style.left=curX-tipobj.offsetWidth+"px";
	else tipobj.style.left=curX+"px";

	if (bottomedge<tipobj.offsetHeight) tipobj.style.top=curY-tipobj.offsetHeight-offsetfromcursorY+"px"
	else tipobj.style.top=curY+offsetfromcursorY+"px";
}

function appear()  
{	
	if(op < 1) 
	{
		op += 0.2;
		tipobj.style.opacity = op;
		tipobj.style.filter = 'alpha(opacity='+op*100+')';
		t = setTimeout('appear()', 10);
	}
}

/////////////// End of Tips 

//////////////////// Cookies 

var cookies = new Object();
function extractCookies() {
    var name, value;
    var beginning, middle, end;
    for (name in cookies) {
        cookies = new Object();
        break;
    }
    beginning = 0;
    while (beginning < document.cookie.length) {
        middle = document.cookie.indexOf('=', beginning);
        end = document.cookie.indexOf(';', beginning);
        if (end == -1)
            end = document.cookie.length;
        if ( (middle > end) || (middle == -1) ) {
            name = document.cookie.substring(beginning, end);
            value = "";
        } else {
            name = document.cookie.substring(beginning, middle);
            value = document.cookie.substring(middle + 1, end);
        }
        cookies[name] = unescape(value);
        beginning = end + 2;
    }
}

// Main functions
function getCookie(name) {
    extractCookies();
    return cookies[name];
}

function delCookie(name) {
    expires = new Date();
    expires.setTime(expires.getTime()-1);
    document.cookie = name + '=0' + '; expires=' + expires.toGMTString() + '; path=/';
}

function setCookie(name, value) {
    expires = new Date();
    expires.setTime(expires.getTime()+(365*24*60*60*1000));
    document.cookie = name +'='+ value + '; expires=' + expires.toGMTString() + '; path=/';
}

// END of Main functions
/////////////////////// End of Cookies



function sectionHighlight() {
	switch (currentSection) {
		case 'home': 
			pageMenuItem(1);
			break;
		case 'course':
			pageMenuItem(2);
			break;
		case 'words':
			pageMenuItem(3);
			break;
		case 'phonetic':
			pageMenuItem(4);
			break;
		case 'reading':
			pageMenuItem(5);
			break;
		case 'contact':
			pageMenuItem(6);
			break;
		case 'login':
			pageMenuItem(7);
			break;
		case 'grammar':
			pageMenuItem(8);
			break;	
		case 'kids':
			pageMenuItem(9);
			break;
		case 'texts':
			pageMenuItem(10);
			break;
		case 'translation':
			pageMenuItem(11);
			break;
		case 'phrasebook':
			pageMenuItem(12);
			break;
		default: 
		   	$("#menu_body .me-nu-item a").css({color: "#183A87"});
	}
}

function pageMenuItem(eq) {
	$("#nav"+eq).addClass("active-section");
}

//////////////////////////// start for tabs 

$(document).ready(function(){

$("div.ptab div").each(function() {
	var tname=$(this).text();
	$(this).text(tname);

});


$("div.ptab").click(function(){
	$("div.ptab").removeClass("current_ptab");
	$(this).addClass("current_ptab");
});


$("div.ptab").hover(
	function(){$(this).addClass("hon");},
	function(){$(this).removeClass("hon");}
);



$("#tab01").click(function(){
	$(".pBlock").hide();
	$("#for_tab01").show();
	location.href='#tab=1'
});

$("#tab02").click(function(){
	$(".pBlock").hide();
	$("#for_tab02").show();
	location.href='#tab=2'
});

$("#tab03").click(function(){
	$(".pBlock").hide();
	$("#for_tab03").show();
	location.href='#tab=3'
});

$("#tab04").click(function(){
	$(".pBlock").hide();
	$("#for_tab04").show();
	location.href='#tab=4'
});

$("#tab05").click(function(){
	$(".pBlock").hide();
	$("#for_tab05").show();
	location.href='#tab=5'
});

$("#tab06").click(function(){
	$(".pBlock").hide();
	$("#for_tab05").show();
	location.href='#tab=6'
});

//openTab();


});


function activeTab() {
	var ActiveTabTo = getCookie('active_tab');
	if ( getCookie('active_tab') ) {
			$( "#tab0" + ActiveTabTo ).click();;
		    delCookie('active_tab');
	}
}


function nextActiveTab(tab) {
	setCookie('active_tab', tab);
}

var tabToOpen=false;

function openTab() {
  	if (getCookie("voc")) {
  		var thisTab=getCookie("voc");
  		$("#tab"+thisTab).click()
  	}
}


var tabToOpen=false;

function openTab() {
  	if (getCookie("voc")) {
  		var thisTab=getCookie("voc");
  		$("#tab"+thisTab).click()
  	}
  	

}

///////////////////////// end for tabs


var sendData = false
function sendResults(id, total, right) {
  if (sendData) {
    if (!id || !total) {
		return false;
	}else{
    if (!right) right = 0;
		$.ajax({type: 'post', url: "/set_stat", data: {test_id: id, correct: right, total: total}} ); 
	}
  }
}

function sendWordsResults(word) {
  if (sendData) {
	if (word) {
		$.ajax({dataType: 'script', type: 'post', url: "/set_word", data: {words: word}}); 
	}
  }
}


function wrapTbTest() {
var beforeTest = '<div class="block-clt"><div class="block-crt"><div class="block-top"></div></div></div>'  
var afterTest = '<div class="block-clb"> <div class="block-crb"> <div class="block-btm"> </div> </div></div> ';

$(".tbtest").each(function(i, obj) {
	$(obj).wrap('<table align="center"><tr><td><div class="block"><div class="block-center"></div></div></td></tr></table>');
	$(obj).parent().parent().prepend(beforeTest).append(afterTest);
});

}

function searchOnPage() {
$.getScript("/javascripts/page_search.js");
}

function findTabInUrl() {
	var lastPart = window.location.toString().split("#").pop();
	var idString = lastPart.split("=");
	if (idString[0] == 'tab') {
		var tabId = parseInt(idString.pop());
	} else {
		var tabId = 'no';
	}
	return tabId;
}

function openTabFromUrl(tab) {
//if the url is on the same page, bind onClick event/
	if (tab) {
		var tabToOpen = tab;
	} else {
		var tabToOpen = findTabInUrl();
	}
	if (tabToOpen == "no" ) return false;
	$(function() {
		$(".ptab").eq(tabToOpen-1).click();
	});
	
}

function goToUrl(link) {
	var toUrl=$(this).attr("href");
	location.href=toUrl;
}



var messTime;
function messageIt(html,type) {
$("#alert_mess").remove();
clearTimeout(messTime);
var content;
if (type==undefined || type==1) {
	if (es_lang!=undefined && es_lang=='ru') {
		content='Открыта новая тема в словаре:<b>'+html[1]+'</b> <span>Пройденные слова можно посмотреть <br>в своем <i>Аккаунте</i></span>'
	} else if (es_lang!=undefined && es_lang=='fr') {
		content='Une nouvelle rubrique est decouverte:<b>'+html[2]+'</b> <span>Vous pouvez voir les mots appris <br>dans votre <i>Profil</i></span>'
	} else {
		content='A new topic in your vocabulary:<b>'+html[0]+'</b> <span>You can review studied items<br> in your <i>Account</i></span>'
	}
	
} else {
	content = html;
}
$("body").append('<div id="alert_mess" title="Click to close" style="cursor: pointer"><div>'+content+'</div></div>');
$("#alert_mess").fadeIn().click(function() {
	$("#alert_mess").fadeOut(200)
	clearTimeout(messTime);
});
messTime = setTimeout(function(){
	$("#alert_mess").fadeOut()
},8000)
}



/////////////////////// jquery backgroundPosition Plugin 
/**
 * @author Alexander Farkas
 * v. 1.02
 */
(function($) {
	$.extend($.fx.step,{
	    backgroundPosition: function(fx) {
            if (fx.state === 0 && typeof fx.end == 'string') {
                var start = $.curCSS(fx.elem,'backgroundPosition');
                start = toArray(start);
                fx.start = [start[0],start[2]];
                var end = toArray(fx.end);
                fx.end = [end[0],end[2]];
                fx.unit = [end[1],end[3]];
			}
            var nowPosX = [];
            nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
            nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];           
            fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];
            
           function toArray(strg){
               strg = strg.replace(/left|top/g,'0px');
               strg = strg.replace(/right|bottom/g,'100%');
               strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");
               var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
               return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
           }
        }
	});
})(jQuery);

/////////////////////////////////////////////////
/*
$(document).ready(function(){
	$(".head-dec").css({backgroundPosition: "0px 0px"}).animate({backgroundPosition: "(0px 130px)"}, 11000)
})
*/


function smallBox(container) {

container.find(".sb-details").toggle(function(){
		$(this).parent().find(".sb-topic-details").slideDown(function() {
					$(this).parent().find(".sb-details-content").animate({opacity: 1},200);
		})
		$(this).parent().removeClass("details-hidden");
	},function(){
		$(this).parent().find(".sb-details-content").animate({opacity: 0},200, function() {
			$(this).parent(".sb-topic-details").slideUp();
		})
		$(this).parent().addClass("details-hidden");
});

}

function contentList() {
 if ($('div.content-list').length > 0) {
    var content = new Array();
	$('h3.page-p').each(function(i,obj){
			var item = new Object(); 
			var id = $(obj).attr('id');
			if (id=='') {
				id = 'p-'+i;
				$(obj).attr('id', id);
			}
			item.id = id;
			item.text = $(obj).text();
			item.children = new Array();
			var children = $('h3.page-p:eq('+i+')').nextUntil('h3.page-p', ".page-pp");
			children.each(function(n,el){
				var textc = $(el).text();
				var idc = $(el).attr('id');
				if (idc=='') {
					idc = id+n;
					$(el).attr('id', idc);
				}
				var itemc = {text: textc, id: idc};
				item.children.push(itemc);
			})
			content.push(item);
	});
	if (content.length>0) {
		var html = '<div class="content-list-title">&nbsp;</div><div class="cont-l-cont"><ul>';
		$.each(content, function(i, item) {
			html= html + '<li><b><a href="#'+item['id']+'">'+(i+1)+'. '+item['text']+'</b></a>';
			if (item['children'].length > 0) {
				chtml = '<ul>';
				$.each(item['children'], function(n,t){
					chtml = chtml + '<li><a href="#'+t['id']+'">'+(i+1)+'.'+(n+1)+'. '+t['text']+'</li>';
				})
				chtml = chtml + '</ul>';
				html = html + chtml;
			}
			html = html + '</li>'
		})
		html = html + '</ul></div>';
		$('div.content-list').each(function(i,obj){
			var title = $(obj).attr("title")
			if (title== '' && es_lang=="ru") {title = "Содержание"} else {title = "Contents"}
			$(obj).html(html).show().find(".content-list-title").text(title)
		})
	}
 }
}

function info(txt) {
	if ($("#alert_mess").length < 1) {
		$("body").append('<div id="alert_mess" ><div></div></div>');
	}
	$("#alert_mess div").html(txt);
	$("#alert_mess").show().click(function() {$("#alert_mess").hide(30)});
}

/* carousel and slide show */

function coverflow_show(hash) {

var tObj = this;
this.id = hash['id'];
var playS;

this.start = function() {

tObj.container = $('#'+tObj.id);
tObj.nextBtn = tObj.container.find(".cvf-next");
tObj.prevBtn = tObj.container.find(".cvf-prev");
tObj.listItems = tObj.container.find("ul li");
tObj.first = tObj.container.find("ul li:first");

tObj.last = tObj.container.find("ul li:last");
tObj.controlBtns = tObj.nextBtn.add(tObj.prevBtn);
tObj.activeControls();
tObj.controlBtns.addClass("noselect");


tObj.listItems.hover(function(){
	$(this).stop().animate({opacity: 1},300)
},function(){
	$(this).stop().animate({opacity: 0.5},300)
})

var timer

tObj.container.mouseout(function() {
timer = setTimeout(function() {
	tObj.scrollToAct();
}, 10000)
}).mouseover(function() {
	clearTimeout(timer)
})

setTimeout(function() {
tObj.listItems.animate({opacity: 0.5}, 100);
tObj.scrollToAct();
},3000)


}


this.activeControls = function() {
	tObj.nextBtn.click(function(){
		tObj.forward();
	})
	tObj.prevBtn.click(function(){
		tObj.rewind();
	});
}


this.forward = function() {

var genW = tObj.container.find(".coverflow-wrap").width();
var liW = tObj.listItems.width()
var totalLiW = liW * tObj.listItems.length;
var actPos = tObj.container.find("ul").position().left

var slide;

if ( Math.abs(actPos - genW) >=  totalLiW ) {
	slide = totalLiW - genW
	if (slide > totalLiW - genW) slide = totalLiW - genW
	tObj.container.find("ul").stop().animate({left: -slide});
} else {
	slide = genW - (genW % liW)
	
	if (slide > totalLiW - genW) {
		slide = totalLiW - genW
		tObj.container.find("ul").stop().animate({left: -slide});
	}else{
		tObj.container.find("ul").stop().animate({left: "-="+slide});
	}
}



}


this.rewind = function() {

var genW = tObj.container.find(".coverflow-wrap").width();
var liW = tObj.listItems.width()
var totalLiW = liW * tObj.listItems.length;
var actPos = tObj.container.find("ul").position().left

var slide;

if ( actPos + genW >= 0 ) {
	slide = 0
	if (slide < 0) slide = 0
	tObj.container.find("ul").stop().animate({left: slide});
} else {
	slide = (actPos + genW) - (actPos + genW)%liW
	if (slide < 0) slide = 0
	tObj.container.find("ul").stop().animate({left: -slide});
}

}

this.scrollToAct = function () {

var genW = tObj.container.find(".coverflow-wrap").width();
var liW = tObj.listItems.width()
var totalLiW = liW * tObj.listItems.length;

var active = tObj.container.find("li.cvf-act");

var actPos = tObj.container.find(".cvf-act").position().left

var scroll = actPos - (genW/2 - liW/2);

if  (scroll > totalLiW - genW ) scroll = totalLiW - genW
if  (scroll < 0 ) scroll = 0

tObj.container.find("ul").stop().animate({left: -scroll});

}


$(document).ready(function() {
	tObj.start();
});

}




function slide_show(hash) {

var tObj = this;
this.id = hash['id'];
this.appendTo = hash['append_to'];

var playS;

this.start = function() {

tObj.container = $('#'+tObj.id);
tObj.nextBtn = tObj.container.find(".sc-next");
tObj.prevBtn = tObj.container.find(".sc-prev");
tObj.playBtn = tObj.container.find(".sc-play");
tObj.listItems = tObj.container.find("ul li");
tObj.first = tObj.container.find("ul li:first");
tObj.first.addClass("cs-act");
tObj.last = tObj.container.find("ul li:last");
tObj.controlBtns = tObj.nextBtn.add(tObj.prevBtn);
tObj.activeControls();
tObj.controlBtns.addClass("noselect");

tObj.playBtn.toggle(function() {
		tObj.play();	
	}, function() {
		tObj.pause();
})

if (tObj.appendTo == undefined) {
tObj.container.show();
}else {
tObj.container.appendTo(tObj.appendTo).show();
}

}

this.activeControls = function() {
	tObj.nextBtn.click(function(){
		tObj.pause();
		tObj.goToNext();
	})
	tObj.prevBtn.click(function(){
		tObj.pause();
		tObj.goToPrev();
	});
}

this.goToNext = function() {
	var curItem = tObj.container.find(".cs-act");
	var nextItem;
	if (tObj.last.hasClass("cs-act")) {
		nextItem = tObj.first;
	}else {
		nextItem = curItem.next();
	}
	tObj.passage(curItem,nextItem)
}

this.goToPrev = function() {
	var curItem = tObj.container.find(".cs-act");
	var nextItem;
	if (tObj.first.hasClass("cs-act")) {
		nextItem = tObj.last;
	}else {
		nextItem = curItem.prev();
	}
	tObj.passage(curItem,nextItem);
}

this.passage = function(current, next) {
	tObj.controlBtns.unbind("click")
	next.addClass("cs-next").css({opacity: 1});
	current.stop().animate({opacity: 0},600,function() {
		current.removeClass("cs-act");
		next.removeClass("cs-next").addClass("cs-act");
		tObj.activeControls();
	});
}

this.play = function() {
	tObj.goToNext();
	playS = setInterval(function(){
		tObj.goToNext();
	}, 5000)
	tObj.playBtn.addClass("sc-stop")
}

this.pause = function() {
	clearInterval(playS);
	tObj.playBtn.removeClass("sc-stop")
}

$(document).ready(function() {
	tObj.start();
});

}




function slides_presentation(hash) {
var tObj = this;
this.id = hash['id'];
var playS;

this.start = function() {
	tObj.container = $('#'+tObj.id);
	tObj.navItems = tObj.container.find(".slides-list li");
	tObj.slideItems = tObj.container.find("li.slides-block");
	tObj.actvateBtns();
	tObj.play();
}

this.navItemsW = function() {
  var w=tObj.container.find(".slides-screen").width();
  tObj.slideItems.width(w+4);
}

this.actvateBtns = function() {
	tObj.navItems.click(function() {
		clearInterval(playS);
		if ($(this).hasClass("slide-item-act") == false) {
			tObj.launchGo($(this))
		}
	})
}

this.launchGo = function(jElem) {
		var index = tObj.navItems.index(jElem);
		tObj.container.find(".slide-item-act").removeClass("slide-item-act");
		jElem.addClass("slide-item-act");
		tObj.goTo(index);
}

this.goTo = function(eq) {
	var curItem = tObj.container.find(".sp-block-act");
	var nextItem = tObj.slideItems.filter(":eq("+eq+")");
	tObj.passage(curItem,nextItem)
}

this.play = function() {
	playS = setInterval(function(){
		var act = tObj.container.find(".slide-item-act");
		if (tObj.navItems.index(tObj.container.find(".slide-item-act")) == tObj.navItems.length-1) {
			tObj.launchGo(tObj.navItems.filter(":first"))
		} else {
			tObj.launchGo(tObj.container.find(".slide-item-act").next());
		}
	}, 20000)
}

this.passage = function(current, next) {
	tObj.navItems.unbind("click")
	next.addClass("sp-next").css({opacity: 1});
	current.animate({opacity: 0, left: -600, top: -80},700,function() {
		current.removeClass("sp-block-act").css({left: 0, top: 0});
		next.removeClass("sp-next").addClass("sp-block-act");
		tObj.actvateBtns();
	});
}

$(document).ready(function() {
	tObj.start();
});

}

/* end of slide show */









