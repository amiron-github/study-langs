/*
 * jQuery plugin: fieldSelection - v0.1.0 - last change: 2006-12-16
 * (c) 2006 Alex Brem <alex@0xab.cd> - http://blog.0xab.cd
 */
 
(function(){var c={getSelection:function(){var e=this.jquery?this[0]:this;return(('selectionStart'in e&&function(){var l=e.selectionEnd-e.selectionStart;return{start:e.selectionStart,end:e.selectionEnd,length:l,text:e.value.substr(e.selectionStart,l)}})||(document.selection&&function(){e.focus();var r=document.selection.createRange();if(r==null){return{start:0,end:e.value.length,length:0}}var a=e.createTextRange();var b=a.duplicate();a.moveToBookmark(r.getBookmark());b.setEndPoint('EndToStart',a);return{start:b.text.length,end:b.text.length+r.text.length,length:r.text.length,text:r.text}})||function(){return{start:0,end:e.value.length,length:0}})()},replaceSelection:function(){var e=this.jquery?this[0]:this;var a=arguments[0]||'';return(('selectionStart'in e&&function(){e.value=e.value.substr(0,e.selectionStart)+a+e.value.substr(e.selectionEnd,e.value.length);return this})||(document.selection&&function(){e.focus();document.selection.createRange().text=a;return this})||function(){e.value+=a;return this})()}};jQuery.each(c,function(i){jQuery.fn[i]=this})})();


var acStyle = '<style>'
+'.ac_edit_panel {background-color: #fff;font-family: Verdana; font-size: 12px;}'
+'.ac_edit_panel td {padding: 0;}'
+'.ac_edit_panel td a {outline: none;display: block;}'
+'.ac_edit_panel td a {font-weight: bold;font-size: 12px;color: #000;text-decoration: none;padding: 1px 3px 2px;border: 1px solid #555;}'
+'.ac_edit_panel td a:active {border: 1px solid #555;background-color: #fff;}'
+'.ac_edit_panel td a:visited {border: 1px solid #555;background-color: #fff;}'
+'.ac_edit_panel td a:hover {border: 1px solid #000;background-color: #efefef;}'
+'.ac_edit_panel td a:active {border: 1px solid #000;background-color: #333;color: #fff;}'
+'</style>'


var acPanel = '<table class="ac_edit_panel" cellpadding="1">'
+'<tr>'
+'<td><a href="javascript:;" >ä</a></td>'
+'<td><a href="javascript:;" >Ä</a></td>'
+'<td><a href="javascript:;" >ö</a></td>'
+'<td><a href="javascript:;" >Ö</a></td>'
+'<td><a href="javascript:;" >ü</a></td>'
+'<td><a href="javascript:;" >Ü<\/a><\/td>'
+'<td><a href="javascript:;" >ß<\/a><\/td>'
+'</tr>'
+'</table>'



$(document).ready(function() {

$(".back").append('| <span id="new-layout-link" style="color: blue; text-decoration: underline; cursor: pointer"><b>New layout</b></span>')

$("#new-layout-link").click(function(){
	newLayout();
})



if ($("#candidate option:eq(0)").val()=="RedSpell DE") {
	$("body").append(acStyle)
	$(".editor").each(function(i,el){
		$(el).prepend(acPanel)
	})

}

$(".ac_edit_panel a").click(function(){
	var tField = $(this).parent("td").parent("tr").parent().parent(".ac_edit_panel").next("textarea")
	insertInTextArea($(this),tField);
})

})

function insertInTextArea(jElem, target) {
	var text = jElem.text();
	var selection = target.getSelection();
	var startOn = selection.start+text.length
	target.replaceSelection(text, true)
	setCaretPosition (target.get(0), startOn)
}
function setCaretPosition (oField, iCaretPos) {
if (document.selection) { 
	oField.focus();
	var oSel = document.selection.createRange ();
	oSel.moveStart ('character', -oField.value.length);
	oSel.moveStart ('character', iCaretPos);
	oSel.collapse(true);
	oSel.select ();
}
// Firefox support
else if (oField.selectionStart || oField.selectionStart == '0') {
	oField.selectionStart = iCaretPos;
	oField.selectionEnd = iCaretPos;
	oField.focus ();
}

}


function inSize() {
	var topW= $(".text_wrapper").offset().top;
	alH = $(window).height() - topW - 50
	$(".text_wrapper").height(alH)
}


function newLayout() {

	$("div.text_wrapper").before('<div  style="clear: both"></div>')
	$("div.text_wrapper").wrapInner('<div class="text-holder"></div>')
	$("body .top table:first").addClass("p-navig")
	$("body table:last").hide();
	$("div.top br:last").remove();

if ($("#desc_switcher option:selected").text()=="Description") {
	$(".text-holder ").addClass("with-desc ");
	$(".top").addClass("t-with-desc");
}

inSize();

$("#new-layout-link").remove()

$(window).resize(function() {
 inSize()
})

$("head").append('<link href="http://study-languages-online.com/hosp-style.css" media="screen" rel="stylesheet" type="text/css" />')


}






