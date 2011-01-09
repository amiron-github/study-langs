var wordsGreetings=new Array(
["Hello!","Здравствуйте!"],
["Hi!","Привет!"],
["Good morning!","Доброе утро!"],
["Good afternoon!","Добрый день!"],
["Good evening!","Добрый вечер!"],
["Welcome!","Добро пожаловать!"],
["Good bye!","До свидания!"],
["Bye!","Пока!"],
["See you soon!","До скорого!"],
["Good luck!","Счастливо!"],
["Have a good trip!","Счастливого пути!"],
["Good night!","Спокойной ночи!"],
["How are you?","Как дела?"],
["Great.","Отлично."],
["Excellent.","Прекрасно."],
["Fine, thanks.","Хорошо, спасибо."]
)

var wordsPoliteness=new Array(
["Thank you.","Спасибо."],
["Thanks.","Спасибо (разг)"],
["Thanks a lot.","Большое спасибо (разг)."],
["Don't mention it.","Не стоит."],
["No probem.","Нет проблем."],
["Please, ...","Пожалуйста, ..."],
["Will you please ...?","Будьте добры, ..."],
["Excuse me.","Простите."],
["I am sorry.","Прошу прощения."],
["That's OK.","Всё нормально."]
)


var wordsFamily=new Array(
["mother","мать"],
["father","отец"],
["wife","жена"],
["husband","муж"],
["daughter","дочь"],
["son","сын"],
["sister","сестра"],
["brother","брат"],
["grandmother","бабушка"],
["grandfather","дедушка"],
["granddaughter","внучка"],
["grandson","внук"],
["aunt","тётя"],
["uncle","дядя"],
["niece","племянница"],
["nephew","племянник"],
["cousin","двоюродный брат/сестра"],
["parents","родители"],
["children","дети"]
)


function getTopic(topic){

switch(topic){

case 0: 
	tasks=wordsGreetings;
	break;
case 1:
	tasks=wordsPoliteness;
	break;
case 2:
	tasks=wordsFamily;
	break;
}

}


