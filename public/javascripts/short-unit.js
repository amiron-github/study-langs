$(document).ready(function() {
$(".trans-display").change(function(){
	if ($(this).is(":checked")) {
		$(".original div.ru-transcript").show();
	}else{
		$(".original div.ru-transcript").hide();
	}
}).change();
});