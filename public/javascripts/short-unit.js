$(document).ready(function() {
$(".trans-display").change(function(){
	if ($(this).is(":checked")) {
		$(".original div.ru-transcript").show();
	}else{
		$(".original div.ru-transcript").hide();
	}
}).change();
});


function openNextStep(tab) {
openTabFromUrl(tab)
location.href="#tab="+tab
window.scrollTo(0,100);
}
