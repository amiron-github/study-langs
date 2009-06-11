

function Test(hash) {
    var dictArr = hash['dict'];
    var dictHide = hash['hide'];
    var id = hash['id'];
    var type = hash['type'];
    var how_questions = hash['how_questions'];
    var how_show = hash['how_show'];
    
    //Init
    this.dictArr  = dictArr;
    this.dictHide = id + '_'+dictHide;
    this.answersArr = new Array;
    this.questArr = new Array;
    this.id = id;
    this.currentQuest = 0;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.wrongFlag = 0;
    this.done = 0;
    //this.remain = dictArr.length;
    this.enableChecking = 1;
    this.how_questions = dictArr.length;
    this.how_show = dictArr.length;
    this.before = '';
    this.after = '';
    if (how_questions) {this.how_questions = how_questions};
    if (how_show) {this.how_show = how_show};
    
    this.remain = this.how_questions;

	if (type) { 
        if (type == 'audio') {
            this.before = '<object type="application/x-shockwave-flash" data="player.swf" width="90" height="18" style="visibility: visible;"><param name="movie" value="player.swf"/><param name="FlashVars" value="mp3=';
            this.after = '&amp;autoplay=0&amp;configxml=config_maxi.xml"/></object>';
        }
        if (type == 'img') {
            this.before = 'img_before_';
            this.after  = '_img_after';
        }
        for (var i = 0; i<this.dictArr.length; i++) {
           this.dictArr[i][0] = this.before + this.dictArr[i][0] + this.after;
        }
    }
    


    //end of Init

    this.show = function() {
	// create temporary question array
	var dictArr = [].concat(this.dictArr);
	//var z = dictArr.length;
	var z = this.how_questions;
	for (var i = 0; i<z; i++) {
	    var t = Math.round(Math.random()*(dictArr.length-1));
	    this.questArr.push(dictArr[t]);
	    dictArr.splice(t,1);
	}
	var answersArr = new Array;
	for (var i = 0; i<this.questArr.length; i++) {
	    answersArr.push(new Array(this.questArr[i][1], i));
	}
	z = answersArr.length;
	for (var i = 0; i<z; i++) {
	    var t = Math.round(Math.random()*(answersArr.length-1));
	    this.answersArr.push(answersArr[t]);
	    answersArr.splice(t,1);
	}

	var answersList = '';	
	for (var i = 0; i<this.answersArr.length; i++) {
	    answersList +='<div><input type="radio" name="q1" value="'+this.answersArr[i][1]+'" onclick="javascript:'+this.id+'.check(this.value,'+i+')"><span id="text_'+this.id+'_'+i+'">'+this.answersArr[i][0]+'</span></div>'; 
	}
	// show test form
	var html = ''
		+'<form name="form_'+this.id+'">'
		+'<table cellpadding="0" cellspacing="0" border="0" class="test-container">'
		+'<tr>'
		+'<td align="center"  class="quest">'
		+'<div class="quest-p"><div class="task-string" id="quest_'+this.id+'">'+this.questArr[this.currentQuest][0]+'</div>'
		+'<input type="button" value="next" id="next_'+this.id+'" onclick="javascript:'+this.id+'.next()"/></div>'
		+'</td>'
		+'<td class="variants">'
		+answersList
		+'</td>'
		+'<td align="center" class="checking">'
		+'<div class="answer" id="info_'+this.id+'"></div>'
		+'</td>'
		+'</tr>'
		+'<tr>'
		+'<td align="center" style="padding-top: 15px;" valign="top">'
		+'<input type="button" value="Stop and Restart" id="restart_'+this.id+'" onclick="javascript:'+this.id+'.restart()"/><br><br>'
		+'</td>'
		+'<td style="padding-top: 15px; padding-left: 30px;" colspan="2">'
		+'<p><strong>Current result:</strong> <br><br>'
		+'<i>Correct answers:</i>  <span id="correct_answers_'+this.id+'">'+this.correctAnswers+'</span>;<br>'
		+'<i>Wrong answers:</i>  <span id="wrong_answers_'+this.id+'">'+this.wrongAnswers+'</span>;<br>'
		+'<span style="display: none;"><i>Done:</i> <span  id="done_'+this.id+'">'+this.done+'</span><br></span>'
		+'<i>Remain:</i>  <span id="remain_'+this.id+'">'+this.remain+'</span></p>'
		+'<p><strong><span id="total_'+this.id+'" style="visibility:hidden">Total</span></strong></p>'
		+'</td>'
		+'</tr>'
		+'</table>'
		+'</form>';

	document.getElementById(this.id).innerHTML = html;
    }

    this.restart = function() {
    //this.dictArr  = dictArr;
    //this.dictHide = dictHide;
	this.answersArr = new Array;
	this.questArr = new Array;
    //this.id = id;
	this.currentQuest = 0;
	this.correctAnswers = 0;
	this.wrongFlag = 0;
	this.wrongAnswers = 0;
	this.done = 0;
	//this.remain = dictArr.length;
	this.remain = this.how_questions;
	this.enableChecking = 1;
	this.show();
	this.showDict();
    }

    //Dictionary
    this.hideDict = function() {
	var span = document.body.getElementsByTagName('p');
	if (span.length > 0) {
	    for (var i=0; i < span.length; i++) {
		if (span[i].className == this.dictHide) {
		    span[i].style.visibility = "hidden";
		}
	    }
	}
    }

    this.showDict = function() {
	var span = document.body.getElementsByTagName('p');
	if (span.length > 0) {
	    for (var i=0; i < span.length; i++) {
		if (span[i].className == this.dictHide) {
		    span[i].style.visibility = "visible";
		}
	    }
	}

    }
    //end of Dictionary
    
    this.next = function() {
	document.getElementById('info_'+this.id).innerHTML = "";
	this.hideDict();
	for (var i = 0; i<this.answersArr.length; i++) {
	    document.getElementById('text_'+this.id+'_'+i).style.textDecoration="none";
	}

	this.remain--;
	if (this.enableChecking == 1) {
	    if (!this.wrongFlag) {
		this.wrongAnswers++;
	    }
	    this.wrongFlag = 0;
	}
	this.enableChecking = 1;
	x = document.forms['form_'+this.id];
	for (var i=0;i<x.length;i++) {
	    if (x.elements[i].type == 'radio') {
		x.elements[i].checked=false;
		x.elements[i].disabled=false;
	    }
	}
	for (var i = 0; i<this.answersArr.length; i++) {
	    document.getElementById('text_'+this.id+'_'+i).style.color="black";
	}
	this.currentQuest++;
	if (this.currentQuest+1 >= this.questArr.length) {
	    document.getElementById('next_'+this.id).style.display='none';
	} 
	document.getElementById('quest_'+this.id).innerHTML=this.questArr[this.currentQuest][0];
	this.status();
    }

    this.total = function() {
	var total = "Total: <span class='norm_txt'> "+ this.correctAnswers + " correct and "+ this.wrongAnswers +" wrong answers </span>";
	document.getElementById('total_'+this.id).style.visibility="visible";
	document.getElementById('total_'+this.id).innerHTML=total;
    }

    this.check = function(answer, order) {
	this.hideDict();
	if (this.enableChecking) {
	    if (answer == this.currentQuest) {
		document.getElementById('info_'+this.id).innerHTML = "Correct";
		if (!this.wrongFlag) {
		    this.correctAnswers++;
		}
		this.done++;
		if (this.currentQuest + 1 == this.answersArr.length) {
		//    document.getElementById('restart_'+this.id).style.display="block";
		    this.remain--;
		    this.total();
		}
		this.enableChecking = 0;
		for (var i = 0; i<this.answersArr.length; i++) {
		    if (order != i) document.getElementById('text_'+this.id+'_'+i).style.color="gray";
		}
		x = document.forms['form_'+this.id];
		for (var i=0;i<x.length;i++) {
		    if (x.elements[i].type == 'radio') {
		    	if (x.elements[i].value != answer) x.elements[i].disabled=true;
		    }
		}
		this.wrongFlag = 0;
	    } else {
		for (var i = 0; i<this.answersArr.length; i++) {
		    if (order == i) document.getElementById('text_'+this.id+'_'+i).style.textDecoration="line-through";
		}

		if (!this.wrongFlag) { 
		    document.getElementById('info_'+this.id).innerHTML = "<span id=wrong>Wrong</span>";
		    this.wrongAnswers++;
		    this.wrongFlag = 1;
		}
	    }
	    this.status();
	}
    }

    this.status = function() {
	document.getElementById('correct_answers_'+this.id).innerHTML=this.correctAnswers;
	document.getElementById('wrong_answers_'+this.id).innerHTML=this.wrongAnswers;
	document.getElementById('done_'+this.id).innerHTML=this.done;
	document.getElementById('remain_'+this.id).innerHTML=this.remain;
    }

    this.show();
}


/////////////////////////////////////////////

function Test2(hash) {
    var dictArr = hash['dict'];
    var dictHide = hash['hide'];
    var id = hash['id'];
    var type = hash['type'];
    var how_questions = hash['how_questions'];
    var how_show = hash['how_show'];
    
    //Init
    this.dictArr  = dictArr;
    this.dictHide = id + '_'+dictHide;
    this.answersArr = new Array;
    this.questArr = new Array;
    this.id = id;
    this.currentQuest = 0;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.wrongFlag = 0;
    this.done = 0;
    //this.remain = dictArr.length;
    this.enableChecking = 1;
    this.how_questions = dictArr.length;
    this.how_show = dictArr.length;
    this.before = '';
    this.after = '';
    if (how_questions) {this.how_questions = how_questions};
    if (how_show) {this.how_show = how_show};
    
    this.remain = this.how_questions;

	if (type) { 
        if (type == 'audio') {
            this.before = '<embed width="90" height="20" flashvars="file=';
            this.after = '&repeat=false&showdigits=false&showdownload=false&width=90&height=20" quality="high" name="line" id="line" style="" src="mp3player.swf" type="application/x-shockwave-flash"/>';
        }
        if (type == 'img') {
            this.before = 'img_before_';
            this.after  = '_img_after';
        }
        for (var i = 0; i<this.dictArr.length; i++) {
           this.dictArr[i][0] = this.before + this.dictArr[i][0] + this.after;
        }
    }
    


    //end of Init

    this.show = function() {
	// create temporary question array
	var dictArr = [].concat(this.dictArr);
	//var z = dictArr.length;
	var z = this.how_questions;
	for (var i = 0; i<z; i++) {
	    var t = Math.round(Math.random()*(dictArr.length-1));
	    this.questArr.push(dictArr[t]);
	    dictArr.splice(t,1);
	}
	var answersArr = new Array;
	for (var i = 0; i<this.questArr.length; i++) {
	    answersArr.push(new Array(this.questArr[i][1], i));
	}
	z = answersArr.length;
	for (var i = 0; i<z; i++) {
	    var t = Math.round(Math.random()*(answersArr.length-1));
	    this.answersArr.push(answersArr[t]);
	    answersArr.splice(t,1);
	}

	var answersList = '';	
	for (var i = 0; i<this.answersArr.length; i++) {
	    answersList +='<div><input type="radio" name="q1" value="'+this.answersArr[i][1]+'" onclick="javascript:'+this.id+'.check(this.value,'+i+')"><span id="text_'+this.id+'_'+i+'">'+this.answersArr[i][0]+'</span></div>'; 
	}
	// show test form
	var html = ''
		+'<form name="form_'+this.id+'">'
		+'<table cellpadding="0" cellspacing="0" border="0" class="test-container">'
		+'<tr>'
		+'<td align="center"  class="quest">'
		+'<div class="quest-p"><div class="task-string" id="quest_'+this.id+'">'+this.questArr[this.currentQuest][0]+'</div>'
		+'<input type="button" value="next" id="next_'+this.id+'" onclick="javascript:'+this.id+'.next()"/></div>'
		+'</td>'
		+'<td class="variants">'
		+answersList
		+'</td>'
		+'<td align="center" class="checking">'
		+'<div class="answer" id="info_'+this.id+'"></div>'
		+'</td>'
		+'</tr>'
		+'<tr>'
		+'<td align="center" style="padding-top: 15px;" valign="top">'
		+'<input type="button" value="Stop and Restart" id="restart_'+this.id+'" onclick="javascript:'+this.id+'.restart()"/><br><br>'
		+'</td>'
		+'<td style="padding-top: 15px; padding-left: 30px;" colspan="2">'
		+'<p><strong>Current result:</strong> <br><br>'
		+'<i>Correct answers:</i>  <span id="correct_answers_'+this.id+'">'+this.correctAnswers+'</span>;<br>'
		+'<i>Wrong answers:</i>  <span id="wrong_answers_'+this.id+'">'+this.wrongAnswers+'</span>;<br>'
		+'<span style="display: none;"><i>Done:</i> <span  id="done_'+this.id+'">'+this.done+'</span><br></span>'
		+'<i>Remain:</i>  <span id="remain_'+this.id+'">'+this.remain+'</span></p>'
		+'<p><strong><span id="total_'+this.id+'" style="visibility:hidden">Total</span></strong></p>'
		+'</td>'
		+'</tr>'
		+'</table>'
		+'</form>';

	document.getElementById(this.id).innerHTML = html;
    }

    this.restart = function() {
    //this.dictArr  = dictArr;
    //this.dictHide = dictHide;
	this.answersArr = new Array;
	this.questArr = new Array;
    //this.id = id;
	this.currentQuest = 0;
	this.correctAnswers = 0;
	this.wrongFlag = 0;
	this.wrongAnswers = 0;
	this.done = 0;
	//this.remain = dictArr.length;
	this.remain = this.how_questions;
	this.enableChecking = 1;
	this.show();
	this.showDict();
    }

    //Dictionary
    this.hideDict = function() {
	var span = document.body.getElementsByTagName('span');
	if (span.length > 0) {
	    for (var i=0; i < span.length; i++) {
		if (span[i].className == this.dictHide) {
		    span[i].style.visibility = "hidden";
		}
	    }
	}
    }

    this.showDict = function() {
	var span = document.body.getElementsByTagName('span');
	if (span.length > 0) {
	    for (var i=0; i < span.length; i++) {
		if (span[i].className == this.dictHide) {
		    span[i].style.visibility = "visible";
		}
	    }
	}

    }
    //end of Dictionary
    
    this.next = function() {
	document.getElementById('info_'+this.id).innerHTML = "";
	this.hideDict();
	for (var i = 0; i<this.answersArr.length; i++) {
	    document.getElementById('text_'+this.id+'_'+i).style.textDecoration="none";
	}

	this.remain--;
	if (this.enableChecking == 1) {
	    if (!this.wrongFlag) {
		this.wrongAnswers++;
	    }
	    this.wrongFlag = 0;
	}
	this.enableChecking = 1;
	x = document.forms['form_'+this.id];
	for (var i=0;i<x.length;i++) {
	    if (x.elements[i].type == 'radio') {
		x.elements[i].checked=false;
		x.elements[i].disabled=false;
	    }
	}
	for (var i = 0; i<this.answersArr.length; i++) {
	    document.getElementById('text_'+this.id+'_'+i).style.color="black";
	}
	this.currentQuest++;
	if (this.currentQuest+1 >= this.questArr.length) {
	    document.getElementById('next_'+this.id).style.display='none';
	} 
	document.getElementById('quest_'+this.id).innerHTML=this.questArr[this.currentQuest][0];
	this.status();
    }

    this.total = function() {
	var total = "Total: <span class='norm_txt'> "+ this.correctAnswers + " correct and "+ this.wrongAnswers +" wrong answers </span>";
	document.getElementById('total_'+this.id).style.visibility="visible";
	document.getElementById('total_'+this.id).innerHTML=total;
    }

    this.check = function(answer, order) {
	this.hideDict();
	if (this.enableChecking) {
	    if (answer == this.currentQuest) {
		document.getElementById('info_'+this.id).innerHTML = "Correct";
		if (!this.wrongFlag) {
		    this.correctAnswers++;
		}
		this.done++;
		if (this.currentQuest + 1 == this.answersArr.length) {
		//    document.getElementById('restart_'+this.id).style.display="block";
		    this.remain--;
		    this.total();
		}
		this.enableChecking = 0;
		for (var i = 0; i<this.answersArr.length; i++) {
		    if (order != i) document.getElementById('text_'+this.id+'_'+i).style.color="gray";
		}
		x = document.forms['form_'+this.id];
		for (var i=0;i<x.length;i++) {
		    if (x.elements[i].type == 'radio') {
		    	if (x.elements[i].value != answer) x.elements[i].disabled=true;
		    }
		}
		this.wrongFlag = 0;
	    } else {
		for (var i = 0; i<this.answersArr.length; i++) {
		    if (order == i) document.getElementById('text_'+this.id+'_'+i).style.textDecoration="line-through";
		}

		if (!this.wrongFlag) { 
		    document.getElementById('info_'+this.id).innerHTML = "<span id=wrong>Wrong</span>";
		    this.wrongAnswers++;
		    this.wrongFlag = 1;
		}
	    }
	    this.status();
	}
    }

    this.status = function() {
	document.getElementById('correct_answers_'+this.id).innerHTML=this.correctAnswers;
	document.getElementById('wrong_answers_'+this.id).innerHTML=this.wrongAnswers;
	document.getElementById('done_'+this.id).innerHTML=this.done;
	document.getElementById('remain_'+this.id).innerHTML=this.remain;
    }

    this.show();
}


