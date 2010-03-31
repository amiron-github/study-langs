

var phoneticResults=new Array();
var readingResults=new Array();
var coursesResults=new Array();
var vocabResults=new Array();

$(document).ready(function(){


showResults();
resultsEvents();

});


function unique(a){
   var r = new Array();
   o:for(var i = 0, n = a.length; i < n; i++) {
      for(var x = i + 1 ; x < n; x++){
         if(a[x]==a[i]) continue o;
      }
     
      r[r.length] = i;
   }
   return r;
}




function showResults() {



for (var i=0; i<userProgress.length; i++) {
  switch(userProgress[i][0].charAt(0)){
  case 'r': 
  	readingResults.push(userProgress[i]);
  	break;
  case 'p':
  	phoneticResults.push(userProgress[i]);
  	break;
  case 'c':
  	coursesResults.push(userProgress[i]);
  	break;
  case 'v':
  	vocabResults.push(userProgress[i]);
  	break;
  }

}



parseResults(phoneticResults,phoneticDescription);
parseResults(coursesResults,coursesDescription);
parseResults(readingResults,readingDescription);
parseResults(vocabResults,vocabularyDescription);

}

function parseResults(sectionResults, sectionDescription) {


if (sectionResults.length > 0) {

	$("#no_results").remove();
	
	var startHtml='<hr><br><h3>'+sectionDescription[0]+'</h3>';
	$('#results_container').append(startHtml); 
   	
	var taskDone=new Array();
	
	$.each(sectionResults, function(i,obj) {taskDone[i]=obj[0];});
	
  	var uniqueTaskIndex=unique(taskDone);
	var resultsForWork=new Array();
	for (var i=0; i<uniqueTaskIndex.length; i++) {
		resultsForWork[i]=sectionResults[uniqueTaskIndex[i]];
	}
	
	
	var subsectionIndexes=new Array()
	$.each(resultsForWork, function(i,obj){
		var eq=resultsForWork[i][0].slice(1,3);
		subsectionIndexes.push(eq);
	});
	var subsectionIndex=uniqueByLast(subsectionIndexes);
	subsectionIndex.sort();

	if ( (sectionDescription[1].length) > 1 && (subsectionIndex.length != sectionDescription[1].length)) {
		
		var nIndexes= new Array();
		$.each(subsectionIndex, function(i, obj){ nIndexes[i] = eval(obj)-1 });
		var newSIx = new Array();
		
	  x: for (var i=0; i < sectionDescription[1].length; i++) {
	   		
			for (var n=0; n < nIndexes.length; n++) {
			
				if ( nIndexes[n] == i )  {
					newSIx.push( subsectionIndex[0] );
					subsectionIndex.shift();
					continue x;
				}
			}
			newSIx.push(" ");		
		}
	  subsectionIndex =  newSIx	;
	}
	
	var subsectionResults=new Array();
	
	$.each(subsectionIndex, function(i,obj) {
		subsectionResults[i] = new Array();
		for(var n=0; n < resultsForWork.length; n++) {
			var tEq=resultsForWork[n][0].slice(1,3);
			if (tEq == subsectionIndex[i]) {
				subsectionResults[i].push(resultsForWork[n]);
			}
		}
	});
	
	

	for (var c=0; c < subsectionResults.length; c++ ) {
		var tResults=subsectionResults[c].sort();
		var tSubSection=sectionDescription[1][c];
		
		if (tResults.length < 1) {
		   continue;
		}
		
	/// распределяем результаты по урокам/темам
	
		var sectParts=new Array();
		$.each(tResults, function(i,obj) {sectParts.push( obj[0].slice(3,5) );});
		sectParts=uniqueByFirst(sectParts); 
		
		var resultsInPart=new Array();
		
		for (var i=0; i < sectParts.length; i++) {
			 resultsInPart[i]=new Array();
			for (var n=0; n < tResults.length; n++) {
				var tPart = tResults[n][0].slice(3,5);
				if (tPart == sectParts[i]) {
					resultsInPart[i].push( tResults[n] );
				}
			} 
		}
			
		
		
		subsectionHead='<h4>'+ tSubSection[0] +'</h4>' 
                        +'<table class="sound-letter" cellspacing="0" >' 
                        +'<tr>' 
                        +'<th class="page">Page</th>' 
                        +'<th class="results">Results</th>' 
                        +'<th class="thbrd">More info</th>'
		
		
		partBody=new Array();
		
		for (var i=0; i < resultsInPart.length; i++) {  
		
			
			
			var tPartIndex = resultsInPart[i][0][0].slice(3,5);
			var tPartName;
			var tPartEq;
			
			for (var n=0; n < tSubSection[2].length; n++){
				var tIndex = tSubSection[2][n][1];
				
				if (tPartIndex == tIndex) {
					tPartEq=n; 
				}
			}
			
		 	tPartName=tSubSection[2][tPartEq][0]; 
			
			var tTaskType;
			
			if(tSubSection.length > 3) {
				tTaskType= tSubSection[3];
			}else {
				tTaskType='Exercise';
			}
		
			if(tSubSection[1]!= "noname") { 
			
			  	var partTitle=''
                              +'</tr> '    
                              +'<tr class="res_row">' 
                              +'<td style="width: 190px;">'			  	
			  				  +tSubSection[1]+' '+tPartName
                              +'<div class="pr-detail">'
                              +'<div class="pr-detail-block">'
                              +'<div>'
                              +'<table cellpadding="0" cellspacing="0" border="0">'
			  	
			}else {
			
			  var partTitle=''
                              +'</tr> '     
                              +'<tr class="res_row">' 
                              +'<td>'			  	
			  				  +tPartName
                              +'<div class="pr-detail">'
                              +'<div class="pr-detail-block">'
                              +'<div>'
                              +'<table cellpadding="0" cellspacing="0" border="0">'
			}
			
			var tasksBody=new Array();
			
			var partResults=new Array();
			
			for(var n=0; n < resultsInPart[i].length; n++) { 
				var taskName=tTaskType;
				var taskNum=resultsInPart[i][n][0].slice(9);
				var taskResult= Math.round((resultsInPart[i][n][2] / resultsInPart[i][n][1]) * 100);
				
				partResults.push(taskResult);
				
				tasksBody[n]= ' '
                              +'<tr>' 
                              +'<td>'				
							  + taskName +' '+ taskNum
                              +'</td>'
                              +'<td class="res_perc">'							  
							  + taskResult
                              +'% </td>'
                              +'</tr>'		
			}
			
			var partTotal=0;
			
			for (var n=0; n < partResults.length; n ++) {
				partTotal = partTotal + partResults[n];
			}
			
			var tPartTotal = Math.round ( partTotal / ( partResults.length)  ); 
			
			tPartEnd = ''
                        +'</table>'
                        +'</div>'
                        +'</div>'
                        +'</div>'
                        +'</td>' 
                        +'<td> &nbsp;'
                        +tPartTotal+' % </td>' 
                        +'<td><span class="show_det">Show</span></td>'   
                        +'</tr>'  		
			
			partBody[i] = partTitle + tasksBody.join(" ")+tPartEnd;
		}
		
		$('#results_container').append(subsectionHead + partBody.join(" ") +'</table><br><br>');
		
	}
}


}


function resultsEvents() { 

var detZIndex=1000;

$("div.pr-detail-block").each(function(i) {
	$(this).css({zIndex: (1000-i)})
	}
);

$(".show_det").hover(function(){
		$(this).css({textDecoration: "underline"});
	}, function(){
		$(this).css({textDecoration: "none"});
	}
);

$("table.sound-letter").each(function () {
	$(this).find("tr.res_row:odd").css({backgroundColor: "#EFF3FF"});
});


$("span.show_det").toggle(

 function() {
   
   $(this).parent("td").parent("tr").parent().find(".open_det").click();
   
 	$(this).addClass("open_det").text("Hide");
 	var parentRow=$(this).parent("td").parent("tr");
 	parentRow.css({fontWeight: "bold"}).find("div.pr-detail-block").css({fontWeight: "normal"});
	parentRow.find("div.pr-detail-block").css({display: "block"});
	var detHeight=parentRow.find("div.pr-detail-block").height();
	parentRow.find("div.pr-detail").animate({height: detHeight+5});
 	parentRow.find("div.pr-detail-block div").css({marginLeft: "0px", marginTop: -(detHeight+5)}).animate({marginTop: "1px"}, "normal")
 },
 function() {
 
 	$(this).removeClass("open_det").text("Show");
	var parentRow=$(this).parent("td").parent("tr");
	parentRow.css({fontWeight: "normal"});
 	var detHeight=parentRow.find("div.pr-detail-block").height();
 	parentRow.find("div.pr-detail").animate({height: "0px"});
 	parentRow.find("div.pr-detail-block div").animate({marginTop: -(detHeight+5)}, "normal", function(){
 		parentRow.find("div.pr-detail-block").css({display: "none"});
 		parentRow.find("div.pr-detail-block div").css({marginLeft: "-500px", marginTop: "0px"});
 	});
 }

);

}




phoneticDescription=new Array('Section: Russian Pronunciation',
[
['Phonetics course', 'Lesson', [['1. <br> Vowel sounds','01'],['2.<br> Hard consonants', '02'], ['3.<br> Soft consonants', '03'],['4. <br> Difficult sounds', '04']], 'Exercise']
]);


vocabularyDescription=new Array('Section: Vocabulary', 
[

['Exercises', 
'Topic: ',    
[['Politeness','01'],['Acquaintance', '02'],['Transport: Aiport', '03'],['Transport: Bus, Trolley, Tram ','04'],
['Transport: Subway', '05'],['Transport: Taxi', '06'], ['Hotel', '07'], ['Services', '08'], 
['City', '09'],['Sightseeing', '10'], ['Meals: Bread and confectionery', '11'], ['Meals: Gruels and porridges', '12'], ['Meals: Meat dishes', '13'],
['Meals: Fish, fish dishes', '14'], ['Meals: Dairy produce', '15'], ['Meals: Vegetables', '16'], ['Meals: Fruit, berries', '17'],
['Meals: Confectionery', '18'],['Meals: Beverages, soft and strong drinks', '19'],['Shopping: Outdoor clothing', '20'],['Shopping: Lingerie and nightwear', '21'],
['Shopping: Sportswear', '22'],['Shopping: Shoes', '23'],['Shopping: Accessories', '24'],['Shopping: Perfumery', '25'],
['Shopping: Jewelry', '26'],['Shopping: Audio, video and photo', '27'],['Numbers from 0 to 100', '28'],['Numbers more than 100', '29']]
], 

['Tests', 
'Topic: ',      
[['Politeness','01'],['Acquaintance', '02'],['Transport: Aiport', '03'],['Transport: Bus, Trolley, Tram ','04'],
['Transport: Subway', '05'],['Transport: Taxi', '06'], ['Hotel', '07'], ['Services', '08'], 
['City', '09'],['Sightseeing', '10'], ['Meals: Bread and confectionery', '11'], ['Meals: Gruels and porridges', '12'], ['Meals: Meat dishes', '13'],
['Meals: Fish, fish dishes', '14'], ['Meals: Dairy produce', '15'], ['Meals: Vegetables', '16'], ['Meals: Fruit, berries', '17'],
['Meals: Confectionery', '18'],['Meals: Beverages, soft and strong drinks', '19'],['Shopping: Outdoor clothing', '20'],['Shopping: Lingerie and nightwear', '21'],
['Shopping: Sportswear', '22'],['Shopping: Shoes', '23'],['Shopping: Accessories', '24'],['Shopping: Perfumery', '25'],
['Shopping: Jewelry', '26'],['Shopping: Audio, video and photo', '27'],['Numbers from 0 to 100', '28'],['Numbers more than 100', '29']],
'Test'
]

]);

coursesDescription = new Array('Section: Course of Russian',
[
['Everyday Russian Course', 'Lesson', 
[
[' 1. <br>In the airport','01'],[' 2. <br>Transport', '02'], [' 3. <br>At the hotel', '03'],[' 4. <br>In the street', '04'],
[' 5. <br>Sightseeings','05'],[' 6. <br>Shopping', '06'], [' 7. <br>At the restaurant', '07'],[' 8. <br>At the drugstore', '08'],
[' 9. <br>Currency exchange','09'],[' 10. <br>Internet and Phone', '10']

], 
'Exercise'],

['Russian Course for Beginners', 'Lesson', 
[
[' 1. <br>Greetings and Farewells','01'],[' 2. <br>Introducing yourself', '02'], [' 3. <br>Where are you from?', '03'],[' 4. <br>Professions and Occupations', '04'],
[' 5. <br>Languages skills','05']

], 
'Exercise']

]);

readingDescription=new Array('Section: Reading in Russian',
[
['Training Exercises', 'Part', [['1','01'],['2', '02'], ['3', '03'],['4', '04']], 'Exercise']
]);






function uniqueByFirst(a){
   var r = new Array();
   o:for(var i = 0, n = a.length; i < n; i++){
      for(var x = 0, y = r.length; x < y; x++){
         if(r[x]==a[i]) continue o;
      }
      r[r.length] = a[i];
   }
   return r;
}

function uniqueByLast(a)
{
   var r = new Array();
   o:for(var i = 0, n = a.length; i < n; i++) {
      for(var x = i + 1 ; x < n; x++)
      {
         if(a[x]==a[i]) continue o;
      }
      r[r.length] = a[i];
   }
   return r;
}






