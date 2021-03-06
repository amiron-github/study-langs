var gContent;
$(document).ready(function(){
gContent = $("#content").html();

// menu hover
$("div.menu-item").mouseover(function(){  
	$(this).addClass("current").next("div.sub").addClass("current_sub");
	}).mouseout(function(){
      $(this).removeClass("current").next("div.sub").removeClass("current_sub");
	});

//menu slide
$("div.list").click(function () {  
  if($.browser.msie) {
     if ($("div.current_sub").is(":hidden")) {
        $("div.sub").slideUp("slow");
        $("div.list").removeClass("up").addClass("down");
        $("div.current_sub").slideDown("slow");
        $(this).addClass("up").removeClass("down");
      } else {
        $("div.current_sub").slideUp();
        $(this).addClass("down").removeClass("up");
     	 }
  }else{
     if ($("div.current_sub").is(":hidden")) {
        $("div.open").slideUp("slow");
        $("div.list").removeClass("up").addClass("down");
        $("div.open").removeClass("open");
        $("div.current_sub").slideDown("slow").addClass("open");
        $(this).addClass("up").removeClass("down");
      } else {
        $("div.current_sub").slideUp("slow");
        $(this).addClass("down").removeClass("up");
     	 }
       }
});

//settings_list hover
$("div.hint").mouseover(function(){ 
	$(this).addClass("current").next("div.sub_hint").addClass("current_sub");
	}).mouseout(function(){
      $(this).removeClass("current").next("div.sub_hint").removeClass("current_sub");
});
//settings_list open
$("div.hint").toggle( 
  function () {
        $(this).parent("div.hint_button").animate({left: 1, top: 1}, 1);
        $("div.current_sub").show("slow");
        $(this).toggleClass("active").children("div.hint_list").toggleClass("hup");
  },
  function () {
        $(this).parent("div.hint_button").animate({left: 0, top: 0}, 1);
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

changeContent();
effectsContent();

if(getCookie('preload')) {
	preloadSound();
	$("#preload_off").removeClass("checked");
	$("#preload_on").addClass("checked");
};

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

$("span.ry").each(function(){
		$(this).replaceWith("<s>"+$(this).html() + "</s>");
});

$("span.acct").each(function(){
	$(this).replaceWith("<b>"+$(this).html() + "</b>");
});

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

}
//end of events for Content

/////////// Content building 

function changeContent() {
if($("span#nOrder").hasClass("checked")) {
	newOrder();
	};
if($("span.accent_on").hasClass("checked")) {
	if($("#accent_adjust").hasClass("adjusted")) {
	accentAdjust();
	}else{
	accentOn();
	}
 };
if($("span.accent_un").hasClass("checked")) {
	accentUn();
 };
if($("span#soft_on").hasClass("checked")) {
	softOn();
 };
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
$("div#content").html(gContent);
if($("div#accents").find("span.tcheck").hasClass("checked")){
	$("div#accents").find("span.tcheck").removeClass("checked");
	};
$("#accent_adjust").slideUp();
$("span.accent_show").addClass("checked");
$("span.accent_un").addClass("checked");
setCookie('accent_un', 'yes');
delCookie('accent_on');
changeContent();
}

function accentOnClick() {
$("div#content").html(gContent);
if($("div#accents").find("span.tcheck").hasClass("checked")){
	$("div#accents").find("span.tcheck").removeClass("checked");
	};
$("span.accent_show").addClass("checked");
$("span.accent_on").addClass("checked");
$("#accent_adjust").slideDown();
setCookie('accent_on', 'yes');
delCookie('accent_un');
changeContent();
}

function accentAdjustClick() {
$("div#content").html(gContent);
$("#accent_adjust").fadeOut();
if($("#accent_adjust").hasClass("adjusted")) {
		$("#accent_adjust").removeClass("adjusted");
		delCookie('accent_adjust');
		}else{
		$("#accent_adjust").addClass("adjusted");
		setCookie('accent_adjust', 'yes');
	};
changeContent();
$("#accent_adjust").fadeIn();
}

function accentOffClick() {
$("div#content").html(gContent);
if($("div#accents").find("span.tcheck").hasClass("checked")){
	$("div#accents").find("span.tcheck").removeClass("checked");
	};
$("#accent_adjust").hide();
$("span.accent_off").addClass("checked");
delCookie('accent_on');
delCookie('accent_un');
changeContent();
}

function softOnClick() {
softOn();
if($("div#softs").find("span.tcheck").hasClass("checked")){
	$("div#softs").find("span.tcheck").removeClass("checked");
	};
$("span#soft_on").addClass("checked");
setCookie('softness','on');
effectsContent();
}

function softOffClick() {
softOff();
if($("div#softs").find("span.tcheck").hasClass("checked")){
	$("div#softs").find("span.tcheck").removeClass("checked");
	};
$("span#soft_off").addClass("checked");
delCookie('softness');
effectsContent();
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
		$(this).replaceWith($(this).text() + "&#769;");
	});
}

function accentAdjust() {
$("span.acco").each(function(){
	$(this).replaceWith("&#769;" + $(this).text());
	});
}

function backAccent() {
	$("span.acco").each(function(){
		$(this).replaceWith($(this).text() + "&#769;");
	});
}

function accentUn() {
	$("span.acco").each(function(){
		$(this).replaceWith("<u>" + $(this).text() + "</u>");
	});
}

function accentOff() {
	$("span.acco").each(function(){
		$(this).replaceWith($(this).text());
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
function playSound(slink) {
            this.before = '<object type="application/x-shockwave-flash" data="player_norm.swf" width="20" height="20"><param name="movie" value="player_norm.swf"/><param name="FlashVars" value="mp3=sounds/';
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

function open_comment(link){
window.open(link,"_blank","toolbar=no, location=0, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, titlebar=no, width=560, height=380, top=20");
}

///////////////// Audio Files Preload

var mp3g;
var gP;

function preloadSound() {
setCookie('preload', 'on');
gP = 1;
var html = document.getElementById("contfield").innerHTML;
var rE = new RegExp("playSound\\('\\w+\\.mp3","g");
var mp3 = html.match(rE);
mp3g = new Array();
if (mp3) {
    for (var i = 0; i < mp3.length; i++) {
    mp3[i] = mp3[i].replace(/playSound\('/,"");
    mp3g.push('sounds/'+ mp3[i])
}
}
rE = new RegExp("playAudio\\('\\w+\\.mp3","g");
mp3 = html.match(rE);
if (mp3) {
    for (var i = 0; i < mp3.length; i++) {
        mp3[i] = mp3[i].replace(/playAudio\('/,"");
        mp3g.push('audios/'+ mp3[i])
}}
if (mp3g.length) {
    loadMp3(0);
}
}

function prUp(c) {
    	$("#loading").show();
        $("#progress").html("Mp3 files loading: "+ Math.round(gP/mp3g.length*100)+ "%");
	$("#progressStatus").css({width: gP/mp3g.length*100+"%"});
    c++
    gP++
    if (mp3g[c]) {
        loadMp3(c)
    }
}

function loadMp3(c) {
    $.ajax({
        type: "GET",
        url: mp3g[c],
        success: function(msg){
            prUp(c)
        },
        error: function(msg){
            prUp(c)
        }
    });
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
	d.getElementById('mess').style.left='-100px';
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

















