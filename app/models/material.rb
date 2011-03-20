class Material < ActiveRecord::Base


LANG = [
[ "English-Russian","ru-en" ],
[ "Russian-English","en-ru" ],
[ "Russian-Japanese","ru-jp" ],
[ "French-Russian" , "fr-ru" ]
]

STATUS = [
[ "html","html element",1],
[ "page","page",2 ],
[ "draft","page",3 ],
[ "published" , "page published ",4],
[ "none","zero",0]
]


SECTION = [
["home"], ["course"], ["words"], ["phonetic"], ["reading"],["contact"],["login"],["grammar"],["kids"]
]

TEMPLATE = [
["none"],
["general", ""]
]

LAYOUT = [
["EN-RU", "application"],
["RU-EN", "ru_en_application.rhtml"],
["RU-JP", "ru_jp_application.rhtml"],
["RU-FR", "ru_fr_application.rhtml"],

]



end
