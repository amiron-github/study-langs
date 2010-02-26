$(document).ready(function(){



$(".highlight_soft_letter").toggle(

	function() {
		$(this).val('Hide softness').parent().removeClass("hidden_soft")
	},
	function() {
		$(this).val('Highlight softness').parent().addClass("hidden_soft")
	}
);


$(".highlight_stressed_letter").toggle(

	function() {
		$(this).val('Hide stresses').parent().removeClass("hidden_stressed")
	},
	function() {
		$(this).val('Highlight stresses').parent().addClass("hidden_stressed")
	}
);

$(".highlight_unvoiced_letter").toggle(

	function() {
		$(this).val('Hide unvoiced').parent().removeClass("hidden_unvoiced")
	},
	function() {
		$(this).val('Highlight unvoiced').parent().addClass("hidden_unvoiced")
	}
);

$(".highlight_reduct_letter").toggle(

	function() {
		$(this).val('Hide reduction').parent().removeClass("hidden_reduct")
	},
	function() {
		$(this).val('Highlight reduction').parent().addClass("hidden_reduct")
	}
);



});


