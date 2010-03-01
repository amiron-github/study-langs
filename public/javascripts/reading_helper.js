$(document).ready(function(){


$(".highlight_options").each(function(i){

	$(this).find(".highlight_buttons").find("td").each(function(n,obj) {
		$(this).data("highlight_block",i);
	});

});


/*vizualisation*/
var defaultHighlight = 'Choose a view mode of the following groups of letters';
var stressedString = 'Click to highlight letters denoting stressed vowels';
var reductString = 'Click to highlight letters denoting reduced vowels';
var unvoicedString = 'Click to highlight devocalization cases';
var softString = 'Click to highlight letters denoting soft consonants';

$(".highlight_stressed").hover(
	function() {
		$(this).addClass("stressed_hover");
		$(this).parent("tr").parent().find(".highlight_info").text(stressedString);
	},function() {
		$(this).removeClass("stressed_hover");
		$(this).parent("tr").parent().find(".highlight_info").text(defaultHighlight);
	}
).toggle(
	function() {
		$(this).addClass("stressed_active");
		stressedString = 'Click to remove highlighting from letters denoting stressed vowels';
		$(this).parent("tr").parent().find(".highlight_info").text(stressedString);
		
		var block = $(this).data("highlight_block");
		$(".highlight_options").eq(block).parent().removeClass("hidden_stressed");

	},function() {
		$(this).removeClass("stressed_active");
		stressedString = 'Click to highlight letters denoting stressed vowels';
		$(this).parent("tr").parent().find(".highlight_info").text(stressedString);
		
		var block = $(this).data("highlight_block");
		$(".highlight_options").eq(block).parent().addClass("hidden_stressed");
	}
);

$(".highlight_soft").hover(
	function() {
		$(this).addClass("soft_hover");
		$(this).parent("tr").parent().find(".highlight_info").text(softString);
	},function() {
		$(this).removeClass("soft_hover");
		$(this).parent("tr").parent().find(".highlight_info").text(defaultHighlight);
	}
).toggle(
	function() {
		$(this).addClass("soft_active");
		softString = 'Click to remove highlighting from letters denoting soft consonants';
		$(this).parent("tr").parent().find(".highlight_info").text(softString);
		var block = $(this).data("highlight_block");
		$(".highlight_options").eq(block).parent().removeClass("hidden_soft");
	},function() {
		$(this).removeClass("soft_active");
		softString = 'Click to highlight letters denoting soft consonants';
		$(this).parent("tr").parent().find(".highlight_info").text(softString);
		var block = $(this).data("highlight_block");
		$(".highlight_options").eq(block).parent().addClass("hidden_soft");
	}
);

$(".highlight_unvoiced").hover(
	function() {
		$(this).addClass("unvoiced_hover");
		$(this).parent("tr").parent().find(".highlight_info").text(unvoicedString);
	},function() {
		$(this).removeClass("unvoiced_hover");
		$(this).parent("tr").parent().find(".highlight_info").text(defaultHighlight);
	}
).toggle(
	function() {
		$(this).addClass("unvoiced_active");
		unvoicedString = 'Click to remove highlighting from devocalization cases';
		$(this).parent("tr").parent().find(".highlight_info").text(unvoicedString);
		var block = $(this).data("highlight_block");
		$(".highlight_options").eq(block).parent().removeClass("hidden_unvoiced");
	},function() {
		$(this).removeClass("unvoiced_active");
		unvoicedString = 'Click to highlight devocalization cases';
		$(this).parent("tr").parent().find(".highlight_info").text(unvoicedString);
		var block = $(this).data("highlight_block");
		$(".highlight_options").eq(block).parent().addClass("hidden_unvoiced");
	}
);

$(".highlight_reduct").hover(
	function() {
		$(this).addClass("reduct_hover");
		$(this).parent("tr").parent().find(".highlight_info").text(reductString);
	},function() {
		$(this).removeClass("reduct_hover");
		$(this).parent("tr").parent().find(".highlight_info").text(defaultHighlight);
	}
).toggle(
	function() {
		$(this).addClass("reduct_active");
		reductString = 'Click to remove highlighting from letters denoting reduced vowels';
		$(this).parent("tr").parent().find(".highlight_info").text(reductString);
		var block = $(this).data("highlight_block");
		$(".highlight_options").eq(block).parent().removeClass("hidden_reduct");
	},function() {
		$(this).removeClass("reduct_active");
		reductString = 'Click to highlight letters denoting reduced vowels';
		$(this).parent("tr").parent().find(".highlight_info").text(reductString);
		var block = $(this).data("highlight_block");
		$(".highlight_options").eq(block).parent().addClass("hidden_reduct");
	}
);
/*end of vizualisation*/









});


