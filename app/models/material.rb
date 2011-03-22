class Material < ActiveRecord::Base



LANG = [
[ "English-Russian","en-ru" ],
[ "Russian-English","ru-en" ],
[ "Russian-Japanese","ru-jp" ],
[ "French-Russian" , "fr-ru" ],
[ "Russian-French" , "fr-ru" ],
[ "none" , '' ]
]

STATUS = [
[ "html","html element",1],
[ "html page","html for page",2 ],
[ "page","page",3 ],
[ "draft","page draft",4 ],
[ "published" , "page published ",5],
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
