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

var wordsProfessions=new Array(
["actor","актер"],
["actress","актриса"],
["architect","архитектор"],
["artist","художник"],
["barman","бармен"],
["biologist","биолог"],
["businessman","бизнесмен"],
["chemist","химик"],
["composer","композитор"],
["designer","дизайнер"],
["diplomat","дипломат"],
["doctor","врач"],
["economist","экономист"],
["farmer","фермер"],
["journalist","журналист"],
["lawyer","адвокат"],
["librarian","библиотекарь"],
["manager","менеджер"],
["mechanic","механик"],
["military man","военный"],
["musician","музыкант"],
["physicist","физик"],
["pilot","лётчик"],
["poet","поэт"],
["politician","политик"],
["professor","профессор"],
["programmer","программист"],
["sailor","моряк"],
["shop assistant","продавец"],
["schoolboy","школьник"],
["secretary","секретарь"],
["singer","певец"],
["sportsman","спортсмен"],
["student","студент"],
["teacher","учитель"],
["translator","переводчик"],
["waiter","официант"],
["waitress","официантка"],
["worker","рабочий"],
["writer","писатель"]
)

var wordsHouse=new Array(
["house","дом"],
["flat","квартира"],
["balcony","балкон"],
["bedroom","спальня"],
["ceiling","потолок"],
["corridor","коридор"],
["dining room","столовая"],
["door","дверь"],
["elevator","лифт (амер.)"],
["floor","1) пол, 2) этаж"],
["ground floor","первый этаж"],
["first floor","второй этаж"],
["garage","гараж"],
["garden","сад"],
["garret","чердак"],
["hall","холл"],
["key","ключ"],
["kitchen","кухня"],
["lavatory","туалет"],
["lift","лифт (брит.)"],
["living room","гостиная"],
["mailbox","почтовый ящик"],
["roof","крыша"],
["room","комната"],
["stairs","лестница"],
["study","кабинет"],
["terrace","терраса"],
["villa","вилла"],
["wall","стена"],
["window","окно"]
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
case 3:
	tasks=wordsProfessions;
	break;
case 4:
	tasks=wordsHouse;
	break;
}

}


