alert('2');


$("div.player_swf").each(function(){
	var plink=$(this).text();
	var before='<object type="application/x-shockwave-flash" data="player.swf" width="90" height="18"><param name="movie" value="player.swf"/><param name="FlashVars" value="mp3=';
	var after='&amp;configxml=config_maxi.xml" /><param name="wmode" value="opaque"/></object>';
	
	str=before+plink+after;
        
	$(this).replaceWith(str);
        alert("div.player_swf");
});

if($("span#soft_on").hasClass("checked")){
	$("span.sfts").remove();
	$("span.sfty").remove();
	$("span.sftc, span.sftv").after("<span class=\"sfts\">\'<\/span>");
        alert("span#soft_on");
	};
	


$("span.ry").each(function(){
		$(this).replaceWith("<s>"+$(this).html() + "</s>");
});


$("span.acco").each(function(){
	$(this).replaceWith($(this).text() + "&#769;");

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








