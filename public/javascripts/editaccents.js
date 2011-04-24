/*
 * jQuery plugin: fieldSelection - v0.1.0 - last change: 2006-12-16
 * (c) 2006 Alex Brem <alex@0xab.cd> - http://blog.0xab.cd
 */
(function(){var c={getSelection:function(){var e=this.jquery?this[0]:this;return(('selectionStart'in e&&function(){var l=e.selectionEnd-e.selectionStart;return{start:e.selectionStart,end:e.selectionEnd,length:l,text:e.value.substr(e.selectionStart,l)}})||(document.selection&&function(){e.focus();var r=document.selection.createRange();if(r==null){return{start:0,end:e.value.length,length:0}}var a=e.createTextRange();var b=a.duplicate();a.moveToBookmark(r.getBookmark());b.setEndPoint('EndToStart',a);return{start:b.text.length,end:b.text.length+r.text.length,length:r.text.length,text:r.text}})||function(){return{start:0,end:e.value.length,length:0}})()},replaceSelection:function(){var e=this.jquery?this[0]:this;var a=arguments[0]||'';return(('selectionStart'in e&&function(){e.value=e.value.substr(0,e.selectionStart)+a+e.value.substr(e.selectionEnd,e.value.length);return this})||(document.selection&&function(){e.focus();document.selection.createRange().text=a;return this})||function(){e.value+=a;return this})()}};jQuery.each(c,function(i){jQuery.fn[i]=this})})();




function findAndWrapInEditor(jElem, startString, endString) {
	var selection = jElem.getSelection()
	var txt = selection.text
	var newT = startString+txt+endString
	var startOn = selection.start+newT.length
	jElem.replaceSelection(newT, true)
	edSetCaretPosition (jElem.get(0), startOn)
}

function replaceInEditor(jElem, newT) {
	jElem.replaceSelection(newT, true)
}

function edSetCaretPosition (oField, iCaretPos) {

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

function endSpanWrap(start) {
	end = '</span>'
	findAndWrapInEditor($("#t_editor"), start, end)
}
function aRusAcc() {
	start='<span class="acco">'
	endSpanWrap(start)
}
function aTrAcc() {
	start='<span class="acct">'
	endSpanWrap(start)
}
function aTrRy(){
	start='<span class="ry">'
	endSpanWrap(start)
}
function aTrRyAcc() {
	start='<span class="acct"><span class="ry">'
	end = '</span></span>'
	findAndWrapInEditor($("#t_editor"), start, end)
}
function aSoftY() {
	start='<span class="sfty">'
	endSpanWrap(start)
}
function aSoftV() {
	start='<span class="sftv">'
	endSpanWrap(start)
}
function aSoftC() {
	start='<span class="sftc">'
	endSpanWrap(start)
}
function aTrSoftYE() {
	start='<span class="sftv">'
	end = '</span><span class="sfty">y</span><span class="acct">e</span>'
	findAndWrapInEditor($("#t_editor"), start, end)
}
function aTrSoftYA() {
	start='<span class="sftv">'
	end = '</span><span class="sfty">y</span><span class="acct">a</span>'
	findAndWrapInEditor($("#t_editor"), start, end)
}
function aTrSoftYO() {
	start='<span class="sftv">'
	end = '</span><span class="sfty">y</span><span class="acct">o</span>'
	findAndWrapInEditor($("#t_editor"), start, end)
}
function aTrSoftYOO() {
	start='<span class="sftv">'
	end = '</span><span class="sfty">y</span><span class="acct">oo</span>'
	findAndWrapInEditor($("#t_editor"), start, end)
}

function aJapLongO() {
	start='ō'
	end = ''
	findAndWrapInEditor($("#t_editor"), start, end)
}


function aJapLongU() {
	start='ū'
	end = ''
	findAndWrapInEditor($("#t_editor"), start, end)
}

function aCurI() {
	start='<i>'
	end = '</i>'
	findAndWrapInEditor($("#t_editor"), start, end)
}

function addSymb(symb) {
	start=symb
	end = ''
	findAndWrapInEditor($("#t_editor"), start, end)
}


//functions for   	<a title="span sftc" href="javascript:;" onclick="editWrapWith(this)"> i <i class="edwr" char="&lt; o i&gt; i=&quot;fgfg&quot;>" title="<i>"></i></a> 

function editWrapWith(el) {
	var start = $(el).find(".edwr").attr("title")
	var end = $(el).find(".edwr").attr("char")
	findAndWrapInEditor($("#text_editor"), start, end)
}

function editReplaceWith(el) {
	var selection = $("#text_editor").getSelection()
	var newT = $(el).find(".edwr").attr("title");
	var startOn = selection.start+newT.length;
	$("#text_editor").replaceSelection(newT, true)
	edSetCaretPosition ($("#text_editor").get(0), startOn)
}





