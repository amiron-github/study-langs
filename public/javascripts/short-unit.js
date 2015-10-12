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
	$(".tb_settings").toggle(function(){
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
