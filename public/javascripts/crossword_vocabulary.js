var wordsPoliteness=new Array(

['Привет','Hi! (informal)'],
['Хорошо','Fine'],
['Неплохо','Not so bad'],
['Прекрасно','Perfectly well'], 
['Пока','Bye-bye!'],
['Удачи','Best of luck!'],
['Простите','Excuse me'],
['Спасибо','Thank you']


)


var wordsTransport=new Array(
['самолёт','plane'],
['посадка','landing'],
['рейс','flight'],
['таможня','customs'],
['багаж','luggage'],


['автобус','bus'],
['трамвай','tramway'],
['билет','ticket'],
['вход','entrance'],
['выход','exit'],
['кондуктор','conductor'],
['маршрут','route'],
['остановка','stop'],
['штраф','penalty'],

['метро','subway'],
['станция','station'],
['пересадка','change'],
['эскалатор','escalator ']
)

var wordsHotel=new Array(
['гостиница','hotel'],
['бронь','confirmation of reservation'],
['номер','hotel room'],
['душ','shower'],
['телефон','phone'],
['лифт','elevator'],
['бар','bar'],
['буфет','lunchroom ']
)


var wordsCity=new Array(
['город','city, town'],
['адрес','address'],
['банк','bank'],
['бар','bar'],
['вокзал','railway station'],
['дом','house'],
['здание','building'],
['квартал','quarter'],
['мост','bridge'],
['памятник','monument'],
['парк','park'],
['переход','pedestrian crossing'],
['площадь','square'],
['почта','post office'],
['проспект','avenue'],
['ресторан','restaurant'],
['светофор','traffic lights'],
['тротуар','sidewalk'],
['туалет','w.c.'],
['улица','street'],
['фонтан','fountain']
)



var wordsSightseeing=new Array(
['дворец','palace'],
['замок','castle'],
['выставка','exhibition'],
['музей','museum'],
['памятник','monument'],
['площадь','square'],
['парк','park'],
['турист','tourist'],
['собор','cathedral'],
['церковь','church'],
['экскурсия','excursion']

)


var wordsMeals=new Array(

['мясо','meat'],
['баранина','lamb'],
['говядина','beef '],
['телятина','veal'],
['свинина ','pork'],
['кролик','rabbit'],
['индейка','turkey'],
['курица ','chicken'],
['утка','duck'],
['корейка','loin'],
['бекон','bacon'],
['бифштекс','beefsteak'],
['отбивная','chop'],
['бульон','clear soup'],
['мясной суп','meat soup'],
['ветчина ','ham'],
['буженина','baked ham'],
['ростбиф','roast beef'],
['колбаса','sausage'],
['сосиска','sausage, frankfurter'],
['яйцо','egg'],
['яичница','fried eggs'],
['омлет','omelet'], 


['овощи','vegetables'],
['бобы','beans'],
['горох','peas'],
['капуста','cabbage'],
['петрушка','parsley'],
['морковь','carrots'],
['салат','lettuce'],
['свёкла','beet'],
['огурец','cucumber'],
['помидор','tomato'],
['редис','radish'],
['перец','pepper'],
['картофель','potatoes'],
['баклажан','egg-plant'],
['щи','cabbage soup'],
['суп','soup'],
['борщ','borsch, red-beet soup'], 


['фрукты','fruit'],
['ягоды','berries'],
['абрикос','apricot'],
['ананас','pine-apple'],
['апельсин','orange'],
['арбуз','water melon'],
['банан','banana'],
['виноград','grapes'],
['вишня','cherry'],
['черешня','sweet cherry'],
['груша','pear'],['дыня','melon'],
['клубника','strawberry'],
['крыжовник','gooseberry'],
['лимон','lemon'],
['малина','raspberry'],
['мандарин','tangerine'],
['персик','peach'],
['слива','plum'],
['смородина','black-currant'],
['яблоко','apple']

)








function getTopic(topic){

switch(topic){

case 0: 
	tasks=wordsPoliteness;
	break;
case 1:
	tasks=wordsTransport;
	break;
case 2:
	tasks=wordsHotel;
	break;

case 3:
	tasks=wordsCity;
	break;
case 4:
	tasks=wordsSightseeing;
	break;
case 5:
	tasks=wordsMeals;
	break;
}

}


