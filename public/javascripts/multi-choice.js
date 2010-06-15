
/////////////////////////////////////////////////// перемешиваем варианты  

function shuffle () {
    len = shuffle.arguments[0] || this.length;
    var sA = new Array();
    for (var i=0; i < this.length; i++) {
        sA[sA.length]=this[i];
    }
    var newArray = new Array();
    for (var i=0; i<len; i++) {
        var t = Math.round(Math.random()*(sA.length-1));
        newArray.push(sA[t]);
        sA.splice(t,1);
    }
    return newArray;
}

Array.prototype.shuffle = shuffle;

///////////////////////////////////////////



function mcTest(hash) {

var tasks = hash['tasks'];
this.id = hash['buildId'];
this.buildId = hash['buildId'];

tForm = this.id;

this.start = function () {
	this.correct = 0;
	$("#" + this.buildId + " .mc_variants").empty();
	this.workTasks = tasks.shuffle();
	this.total = this.workTasks.length;
	this.step(0);
	
	
}

this.step = function (stepNum) {
	
	if (stepNum == this.workTasks.length) {
	
		$("#" + this.buildId + " .mc_question").html('<div>Your results:</div>');
	
		$("#" + this.buildId + " .mc_variants").prepend('<div style="position: relative; margin-top: -12px;"><div class="answer"></div> <div class="mc_results">'+this.correct+" correct from " + this.total+ '</div></div>');
		
		$("#" + this.buildId + " .mc_check ").html('<p><input value="Restart" type="button" onclick="'+this.id+'.start()" /></p>');
		
	}else {
		var toQuest = this.workTasks[stepNum] [0];
		var variants = tVariants (this.workTasks[stepNum] [1], this.buildId, stepNum);
		//var variants = '<table align="center"><tr><td>' + tVariants (this.workTasks[stepNum] [1], this.buildId, stepNum) + '</td></tr></table>';
		
		$("#" + this.buildId + " .mc_question").html('<div>'+toQuest+'</div>');
		$("#" + this.buildId + " .mc_variants").prepend('<div style="position: relative; margin-top: -12px;"><div class="answer"></div>' + variants + '</div>')
		$("#" + this.buildId + " .mc_check").html('<input type="button" value="Check" onclick=\"'+this.id +'.mcCheck('+stepNum+')\"/><span class="goto_next"></span>').data("correct", this.workTasks[stepNum] [2]);
	}
	
	$("#" + this.buildId + " .mc_counter").html('Tasks left: '+(this.total - stepNum))
	
	$("#" + this.buildId + " .mc_variant span").click(function() {
		$(this).parent("div").find("input").click();
	});
}


this.nextAnimation = function (string, color) {

var tHeight=$("#" + tForm + " .mc_variants").height();
var tWidth=$("#" + tForm + " .mc_variants").width();


//$('div.answer').css({backgroundColor: color});

$("#" + tForm + " .mc_variants")
				.css({height: tHeight, position: "relative", overflow: "hidden"})
				.wrapInner('<div id="mc_helper" style="position: absolute; top: 0px; width: '+tWidth+'px; height: '+tHeight+'px;"></div>')
				

setTimeout(function() {

	$("#" + tForm + " .mc_variants")
				.find('#mc_helper')
				.animate({opacity: '0', top: tHeight, left: tWidth/2}, 1000, function() {
			  //	.animate({top: tHeight+40}, 800, function() {
					$('#mc_helper').remove();
					$("#mc_alert").remove();
				});

}, 500);

								

}


this.gotoNext = function (stepNum) {

   	var correctVar = $("#" + this.id + " .mc_check").data("correct");
   	
	$("#" + this.id + " div.mc_variant").eq(correctVar).css({backgroundColor: "#BFFFC8", fontWeight: "bold"});
	
   	$("#" + this.id + " .mc_variant:not(:eq("+ correctVar +"))").css({opacity: "0.6"});
	
		$("#mc_alert").animate({opacity: "0"}, 300, function() {
			$("#mc_alert").remove();
		});

	this.nextAnimation('-----', '#5F5F5F');
	this.step(stepNum);
	

}

this.mcCheck = function(stepNum) {
	var checkedButton = $("#" + this.id + " .mc_variants input").index($("#" + this.id + " .mc_variants input:checked"));
	var correctButton = $("#" + this.id + " .mc_check").data("correct");
	var alreadyChecked = false;
	
	if ( ($("#" + this.buildId + " .goto_next input").length) > 0) alreadyChecked = true;


	if (checkedButton == correctButton) {
	
		$("#" + this.id + " .mc_variants").children("div")
										  .find("input").attr("disabled", "disabled");
										  
	   	$("#" + this.id + " div.mc_variant").eq(checkedButton).css({backgroundColor: "#BFFFC8"});
	
	
	   if(!alreadyChecked)	{
	   	$("#mc_alert").remove();
	   	
	   	$("#" + this.id + " .form-questionaire").prepend('<img id="mc_alert" src="images/form/accept.png" style="position: absolute; right:  5px; top: -5px;"/>');
		this.correct++;
	   }
		
	}else {
	
	   if(!alreadyChecked)	$("#" + this.id + " .form-questionaire").prepend('<img id="mc_alert" src="images/form/error.png" style="position: absolute; right:  5px; top: -5px;"/>');
	    
	    $("#" + this.id + " div.mc_variant").eq(checkedButton).css({backgroundColor: "#FFBFBF"});
	}
	
	if(!alreadyChecked) {
	
		stepNum++;
		
		if (stepNum == this.workTasks.length) {
			$("#" + this.buildId + " .goto_next").html('<input type="button" style="width: 90px;" value="See results" onclick="'+this.id +'.gotoNext('+stepNum+')">')
		}else {
			$("#" + this.buildId + " .goto_next").html('<input type="button" value="Next" onclick="'+this.id +'.gotoNext('+stepNum+')">')
		}

	}
	
}

this.start();

}




function tVariants(variants, id, stepNum) {

var variantsString = new Array();

	for (var i=0; i < variants.length; i++) {
		variantsString[i] = '<div class="mc_variant"><input type="radio" name="'+id+'_'+stepNum+'" /> <span>' + variants[i] + '</span></div>';
	}

return variantsString.join(" ");
}








 

