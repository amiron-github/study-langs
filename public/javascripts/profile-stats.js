var stats_text = {
	"error":"Error!",
	"close": "Close",
	"sure_topic": "Are you sure you want to delete this topic from your profile?",
	"sure_lesson": "Are you sure to delete the results of these exercises from your profile?",
	"load": "Loading"
};


function   deleteLesson(ids, container) {
if (confirm(stats_text["sure_lesson"])) {

$.ajax({
  type: 'POST',
  url: "/delete_tests",
  data: {test_ids: ids},
  success: function () { 
	$("#"+container).animate({opacity: 0},100, function() {
		$("#"+container).slideUp(100, function() {
			$("#"+container).remove();
			updateUserWords();
		})
	})},
  error: function () {alert( stats_text["error"])}
});
}
}


function deleteTop(top) {
if (confirm(stats_text["sure_topic"])) {
$.ajax({
  type: 'POST',
  url: "/delete_topic_words_and_tests",
  data: {topic: top},
  success: function () { 
	$("#top_stat_"+top).animate({opacity: 0},100, function() {
		$("#top_stat_"+top).slideUp(100, function() {
			$("#top_stat_"+top).remove();
		})
	})},
  error: function () {alert(stats_text["error"])}
});
}
}

function openTopic(id,title,type,lang) {
$("#vtopic_"+id).html('<br/><br/><center><b style="color: #555">'+stats_text["load"]+'<\/b> <img src="/images/load.gif"\/><\/center>').dialog({
	width: 450, 
	height:450, 
	title:title, 
	dialogClass:"vtopic-popup",
	buttons: [{text: stats_text["close"], click: function() { $(this).dialog("close"); }}]
});
var trans = "default"
if (lang=="fr") {trans="fr"}

$.ajax({
  url: "/get_user_topic",
  data: {voc_id: id, translate: trans},
  success: function(data){  insertTopic(id, user_topic,type) },
  error: function(){ alert(stats_text["error"]) }
})
}

function insertTopic(id,topic,type) {
var html = '<div class="vtopic"><table cellpadding="0" class="vtopic-list"><col width="50%"><col width="50%">'
  $.each(topic, function(i){
	var status = '<b style="color: #fff;">&#10004;</b>'
	if (topic[i]['status']==1) status= '<b style="color: #1E9111;">&#10004;</b>'
	var item = '<tr><td>'+status+' <b>'+topic[i]['text']+'</b></td><td> '+topic[i]['translate']+'</td></tr>'
	if (type==1 && topic[i]['status']==1) {
		html = html+ item
	} else if (type!=1) {
		html = html+ item
	}
  })
   $("#vtopic_"+id).html(html+'</table></div>')
}


function statsCollapsible(container) {
	var lists = container.find(".vu-inner");
	var liItems = container.find(".vu-units-list li");
   container.find(".vu-units-list li h3").click(function() {
	var list = $(this).parent().find(".vu-inner");
	if (list.is(":hidden")) {
		$(this).parent().addClass("vu-li-opened");
	} else {
		$(this).parent().removeClass("vu-li-opened");
	}
    });
    container.find(".vu-colaps").click(function() {
	liItems.removeClass("vu-li-opened");
   });
    container.find(".vu-exp").click(function() {
	liItems.removeClass("vu-li-opened").addClass("vu-li-opened");
   });
}
