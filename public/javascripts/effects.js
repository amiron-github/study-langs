var gContent;
var preloadFiles = new Array();
var currentSection;

function startDragTest(arr) {
        for (var i=0; i<arr.length; i++) {
                $(".target").eq(i).data("for", arr[i]);
        }
}

$(document).ready(function(){
gContent = $("#content").html();

// menu hover
$("div.menu-item").mouseover(function(){  
	var t=$(this);
	//t.css({backgroundPosition: "100% -49px"}).find("div.menu-item-front").css({backgroundPosition: "0px -143px"});
	
	t.addClass("current").next("div.sub").addClass("current_sub");
	}).mouseout(function(){
	var t=$(this);
	//t.css({backgroundPosition: "100% -1px"}).find("div.menu-item-front").css({backgroundPosition: "0px -95px"})
     	 t.removeClass("current").next("div.sub").removeClass("current_sub");
	});

//menu slide
$("div.list").click(function () {  
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


//wrapTbTest();

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
	};
if($("span.accent_on").hasClass("checked")) {
	$("#accent_adjust").slideDown();
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
setCookie('accent_on', 'yes');
delCookie('accent_un');
changeContent();
}

function accentAdjustClick() {
$("div#content").html(gContent);
if($("#accent_adjust").hasClass("adjusted")) {
		$("#accent_adjust").removeClass("adjusted");
		delCookie('accent_adjust');
		}else{
		$("#accent_adjust").addClass("adjusted");
		setCookie('accent_adjust', 'yes');
	};
changeContent();
$("#accent_adjust").fadeOut().fadeIn();
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
		$(this).html($(this).text() + "&#769;");
	});
}

function accentAdjust() {
$("span.acco").each(function(){
	$(this).html("&#769;" + $(this).text());
	});
}

function backAccent() {
	$("span.acco").each(function(){
		$(this).html($(this).text() + "&#769;");
	});
}

function accentUn() {
	$("span.acco").each(function(){
		$(this).replaceWith("<u>" + $(this).text() + "</u>");
	});
}

function accentOff() {
	$("span.acco").each(function(){
		$(this).html($(this).text());
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
setCookie('preload', 'on');
gP = 1;
var html = document.getElementById("contfield").innerHTML;
var rE = new RegExp("playSound\\('[0-9a-zA-Z/]+\\.mp3","g");
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

rE = new RegExp("cJplayer\\('[0-9a-zA-Z/]+\\.mp3","g");
mp3 = html.match(rE);
if (mp3) {
    for (var i = 0; i < mp3.length; i++) {
        mp3[i] = mp3[i].replace(/cJplayer\('/,"");
		//alert(mp3[i]);
        mp3g.push(mp3[i])
 }}
 
rE = new RegExp("playTestSound\\('\\w+\\.mp3","g");
mp3 = html.match(rE);
if (mp3) {
    for (var i = 0; i < mp3.length; i++) {
        mp3[i] = mp3[i].replace(/playTestSound\('/,"");
        mp3g.push(mp3[i])
 }}	
	
if (preloadFiles.length) {
    for (var i = 0; i < preloadFiles.length; i++) {
        mp3g.push(preloadFiles[i])
    }
}

if (mp3g.length) {
    loadMp3(0);
}
}

function prUp(c) {
    	$("#loading").show();
        $("#progress").html("Audio files loading: "+ Math.round(gP/mp3g.length*100)+ "%");
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

//// for index
$(document).ready(function(){

$("div.sect-link a").click(function(){
	var toUrl=$(this).attr("href");
	location.href=toUrl;
});

$("#section1").toggle(function () {
		var t=$(this);
		
	  $("#sections .just").css({zIndex: "100"}).removeClass("just");
	  $("div.section-block").css({zIndex: "100"}); 
      t.css({position: "absolute", zIndex: "500"})
      	.animate({width: "400px", marginTop: "15px", marginLeft: "15px",fontSize: "14px", opacity: "0.9"});
      t.find("div.section-content").animate({height: "318px"}); 
      t.find("div.zoom").css({backgroundPosition: "100% -18px"}).find("span").text("Click to reduce");
      $("#sections .big")
        .click()
      	.removeClass("big");
      t.addClass("big");
		},function () {
		var t=$(this);
		$("#sections .just").css({zIndex: "100"}).removeClass("just");
        t.animate({width: "200px", marginTop: "0px", marginLeft: "0px", fontSize: "10px", opacity: "1.0"}) 
      	.css({zIndex: "150"});
      	t.find("div.section-content").animate({height: "121px"}); 
      	t.find("div.zoom").css({backgroundPosition: "100% 0px"}).find("span").text("Click to read more");
      	t.removeClass("big")
      	 .addClass("just");
      }
);

$("#section2").toggle(function () { 
	var t=$(this);
	  $("#sections .just").css({zIndex: "100"}).removeClass("just");
	  $("div.section-block").css({zIndex: "100"});
      t.css({position: "absolute", zIndex: "500"})
      	.animate({marginLeft: "-215px", width: "400px", marginTop: "15px", marginRight: "-15px", fontSize: "14px", opacity: "0.9"}); 
      t.find("div.section-content").animate({height: "330px"});
      t.find("div.zoom").css({backgroundPosition: "100% -18px"}).find("span").text("Click to reduce");
      $("#sections .big")
        .click()
      	.removeClass("big");
      t.addClass("big");
		},function () {
		var t=$(this);
		$("#sections .just").css({zIndex: "100"}).removeClass("just");
        t.animate({marginLeft: "0px", width: "200px", marginTop: "0px", fontSize: "10px", opacity: "1.0"}) 
      	 .css({zIndex: "150"})
      	t.find("div.section-content").animate({height: "133px"}); 
      	t.find("div.zoom").css({backgroundPosition: "100% 0px"}).find("span").text("Click to read more");
      	t.removeClass("big")
      	.addClass("just");
      }
);

$("#section3").toggle(function () { 
		var t=$(this);
	  $("#sections .just").css({zIndex: "100"}).removeClass("just");
	  $("div.section-block").css({zIndex: "100"});
      t.css({position: "absolute", zIndex: "500"})
      	.animate({width: "400px", marginTop: "-215px", marginLeft: "15px", fontSize: "14px", opacity: "0.9"}); 
      t.find("div.section-content").animate({height: "330px"});
      t.find("div.zoom").css({backgroundPosition: "100% -18px"}).find("span").text("Click to reduce");
      $("#sections .big")
        .click()
      	.removeClass("big");
      t.addClass("big");
		},function () {
		var t=$(this);
		$("#sections .just").css({zIndex: "100"}).removeClass("just");
        t.animate({marginLeft: "0px", width: "200px", marginTop: "0px", fontSize: "10px", opacity: "1.0"}) 
      	 .css({zIndex: "150"})
      	t.find("div.section-content").animate({height: "133px"}); 
      	t.find("div.zoom").css({backgroundPosition: "100% 0px"}).find("span").text("Click to read more");
      	t.removeClass("big")
      	 .addClass("just");
      }
);

$("#section4").toggle(function () { 
	  var t=$(this);
	  $("#sections .just").css({zIndex: "100"}).removeClass("just");
	  $("div.section-block").css({zIndex: "100"});
      t.css({position: "absolute", zIndex: "500"})
      	.animate({marginLeft: "-215px", width: "400px", marginTop: "-215px", fontSize: "14px", opacity: "0.9"});
      t.find("div.section-content").animate({height: "330px"});
      t.find("div.zoom").css({backgroundPosition: "100% -18px"}).find("span").text("Click to reduce");
      $("#sections .big")
        .click()
      	.removeClass("big");
      t.addClass("big"); 
		},function () {
		var t=$(this);
	  	$("#sections .just").css({zIndex: "100"}).removeClass("just");
        t.animate({marginLeft: "0px", width: "200px", marginTop: "0px", fontSize: "10px", opacity: "1.0"}) 
		 .css({zIndex: "150"})
		t.find("div.section-content").animate({height: "133px"}); 
		t.find("div.zoom").css({backgroundPosition: "100% 0px"}).find("span").text("Click to read more");
      	t.removeClass("big")
      	 .addClass("just");
      }
);

$("div.zoom").show();

});

//////////// end of for index

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
		default: 
		   	$("#menu_body .menu-item a").css({color: "#183A87"});
	}
}

function pageMenuItem(eq) {
	$("#nav"+eq).css({backgroundPosition: "100% -49px"}).find("div.menu-item-front").css({backgroundPosition: "0px -143px"});
	$("#menu_body .menu-item a").css({color: "#183A87"});
	$("#nav"+eq+" a").css({color: "#0F2862"});
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
	setCookie("voc", '01');
	$(".pBlock").hide();
	$("#for_tab01").show();
});

$("#tab02").click(function(){
	setCookie("voc", '02');
	$(".pBlock").hide();
	$("#for_tab02").show();
});

$("#tab03").click(function(){
	setCookie("voc", '03');
	$(".pBlock").hide();
	$("#for_tab03").show();
});

$("#tab04").click(function(){
	setCookie("voc", '04');
	
	$(".pBlock").hide();
	$("#for_tab04").show();
});

$("#tab05").click(function(){
	setCookie("voc", '05');
	
	$(".pBlock").hide();
	$("#for_tab05").show();
});

//openTab();

activeTab();

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

////////////////////// text in input for login 

$(document).ready(function(){

if ( $("#navigation input#email").length==1) {
	//InputHelperCreate( $( "input#email" ).get(0), ' email address' );
	//InputHelperCreate( $( "input#password" ).get(0), 'password' );
	
}else {
return false;
}


});


function InputHelperCreate(obj, text){
		$( obj )
			.bind( 'focus', function () {
				InputHelperIn(this, text);
			} )
			.bind('blur', function () {
				InputHelperOut(this, text);
			} );
		InputHelperOut(obj, text);
}

function InputHelperIn(obj, text) {
		if (obj.value == text) {
		    $( obj )
		        .css({color: '#000'})
		        .val('');
		}
	}
	
function InputHelperOut(obj, text) {
		if ( obj.value == '' || obj.value == text ) {
		    $( obj )
		        .css({color: '#666'})
		        .val(text);
		}
}


//////////////////////// end of text in input for login


function sendResults(id, total, right) {
    if (!id || !total) {
		return false;
	}else{
	
    if (!right) right = 0;
    $.get("/set_stat?test_id="+id+"&total="+ total+"&correct="+right ); 
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
/if the url is on the same page, bind onClick event/
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





