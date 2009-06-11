
var wordsPoliteness=new Array(

['Здравствуйте','Hello'],['Привет!','Hi! (informal)'],
['Как поживаете?','How are you getting on?'],
['Как дела?','How are you? (informal)'],['Хорошо','Fine'],
['Прекрасно','Perfectly well'], ['До свидания','Good bye'],
['Всего хорошего!','All the best!'],['Пока!','Bye-bye!'],
['Простите','Excuse me'],
['Будьте добры','Will you please...'],
['Пожалуйста','Please'],['Спасибо','Thank you'],
['Не за что','Don\'t mention it'], ['Большое спасибо','Thank you very much']

)


var wordsTransport=new Array(
['самолёт','plane'],['посадка','landing'],
['рейс','flight'],['международный рейс','international flight'],
['отправление','departure'],
['пункт назначения','destination'],['прибытие','arrival'],
['задерживается','delayed'],
['отменён','cancelled'],['регистрация','check-in'],
['паспортный контроль','passport control'],['таможня','customs'],['багаж','luggage'],
['выдача багажа','baggage claim area'],['справочная','information office'],

['автобус','bus'],['троллейбус','trolleybus'],
['трамвай','tramway'],['билет','ticket'],['вход','entrance'],
['выход','exit'],['кондуктор','conductor'],['маршрут','route'],
['остановка','stop'],['схема маршрутов','route plan'],['штраф','penalty'],
['конечная остановка','route terminal'],

['метро','subway'],['линия метро','subway line'],
['станция','station'],['пересадка','change'],['план города','city plan'],
['схема метро','subway lines plan'],['эскалатор','escalator '],['конечная станция','terminal station']
)

var wordsHotel=new Array(
['гостиница','hotel'],['бронь','confirmation of reservation'],
['номер','hotel room'],['номер-люкс','luxury suite'],
['кондиционер','air-conditioner'],['душ','shower'],
['ванная комната','bath-room'],['телефон','phone'],
['вентилятор','ventilator'],['холодильник','fridge'],['мини-бар','snack-bar '],
['лифт','elevator'],['регистрация','check-in'],['бар','bar'],['буфет','lunchroom ']
)


var wordsCity=new Array(
['город','city, town'],['автовокзал','bus station'],['автостоянка','car parking'],['адрес','address'],
['банк','bank'],['бар','bar'],['вокзал','railway station'],['дом','house'],
['здание','building'],['квартал','quarter'],['мост','bridge'],['набережная','quay'],
['памятник','monument'],['парк','park'],['перекресток','crossroad'],['переход','pedestrian crossing'],
['площадь','square'],['подземный переход','pedestrian subway'],['почта','post office'],['проспект','avenue'],
['ресторан','restaurant'],['светофор','traffic lights'],['станция метро','subway station'],['тротуар','sidewalk'],
['туалет','w.c.'],['улица','street'],['фонтан','fountain'],['набережная','quay']
)



var wordsSightseeing=new Array(
['дворец','palace'],['замок','castle'],['картинная галерея','picture-gallery'],
['выставка','exhibition'],['музей','museum'],
['памятник','monument'],['площадь','square'],['парк','park'],
['турист','tourist'],['собор','cathedral'],['церковь','church'],['экскурсия','excursion'],
['карта города','city plan']
)


var wordsMeals=new Array(

['мясо','meat'],['баранина','lamb'],['говядина','beef '],['телятина','veal'],
['свинина ','pork'],['кролик','rabbit'],['индейка','turkey'],['курица ','chicken'],
['утка','duck'],['корейка','loin'],['бекон','bacon'],['яичница с беконом ','bacon and eggs'],
['бифштекс','beefsteak'],['отбивная','chop'],['рубленая котлета','cutlet'],['отварное мясо','boiled meat'],
['бульон','clear soup'],['мясной суп','meat soup'],['ветчина ','ham'],['буженина','baked ham'],
['свиная отбивная','pork chop'],['ростбиф','roast beef'],['колбаса','sausage'],['сосиска','sausage, frankfurter'],
['хот дог','hot dog'],['варёная колбаса','cooked sausage'],['копченая колбаса ','smoked sausage'],['куриный бульон','chicken broth'],
['жареный цыплёнок','roast chicken'],['яйцо','egg'],['яичница','fried eggs'],['омлет','omelet'], 


['овощи','vegetables'],['бобы','beans'],['горох','peas'],['капуста','cabbage'],
['петрушка','parsley'],['морковь','carrots'],['салат','lettuce'],
['свёкла','beet'],['огурец','cucumber'],['помидор','tomato'],['редис','radish'],
['перец','pepper'],['картофель','potatoes'],['баклажан','egg-plant'],['отварной картофель','boiled potatoes'],
['жаренный картофель','fried potatoes'],['картофельное пюре','mashed potatoes'],['свекольник','beetroot soup'],
['щи','cabbage soup'],['овощной суп','vegetable soup'],['борщ','borsch, red-beet soup'], 


['фрукты','fruit'],['ягоды','berries'],['абрикос','apricot'],['ананас','pine-apple'],
['апельсин','orange'],['арбуз','water melon'],['банан','banana'],['виноград','grapes'],
['вишня','cherry'],['черешня','sweet cherry'],['груша','pear'],['дыня','melon'],
['клубника','strawberry'],['крыжовник','gooseberry'],['лимон','lemon'],['малина','raspberry'],
['мандарин','tangerine'],['персик','peach'],['слива','plum'],['смородина','black-currant'],
['чернослив','prune'],['яблоко','apple']

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


