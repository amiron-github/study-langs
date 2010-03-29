var T = new Object();
var res     = "r"; //image result id suffix
var good    = "yes.gif";
var wrong   = "no.gif";
var empty   = "pixel.gif";
function check_test(Form, test_number, tId) {
	var answers = T[test_number];
	var otv = new Array();
	var hash = new Object();
	var l = Form.length;
	var rightAnswers=new Array();
	var gloabalId=tId;
	i = 0;
	var e = Form.elements;
	while (i < l) {
		if (e[i].type=="radio") {
			var name = e[i].name;
			var col = eval("Form."+name);
			var vn = col.length;
			if (!hash[name]) {
				var net_otveta = true;
				for (vi = 0; vi< vn; vi++) {
					if (col[vi].checked) {
						otv.push(vi+1);
						net_otveta = false;
					}
				}
				if (net_otveta ){
					otv.push('0');
				}
				hash[name]=1;
			}
		}
		if (e[i].type=="text") {
			if (e[i].value) {
				otv.push(e[i].value);
			} else {
				otv.push('0');
			}
		}
		i++;
	}
	for (i = 0; i < otv.length; i++) {
		var myi = i +1;
		var imageName = res +""+test_number+myi;
		if (otv[i]==answers[i]) {
			document.getElementById(imageName).src = good;
			rightAnswers.push(i);
		} else {
			if (otv[i]!='0') {
				document.getElementById(imageName).src = wrong;
			} else {
				document.getElementById(imageName).src = empty;
			}
		}
	}
	
	sendResults(gloabalId, otv.length, rightAnswers.length);
	
	return false;
}

