class Material < ActiveRecord::Base



LANG = [
[ "English-Russian","en-ru" ],
[ "Russian-English","ru-en" ],
[ "Russian-Japanese","ru-jp" ],
[ "French-Russian" , "fr-ru" ],
[ "Russian-French" , "ru-fr" ],
[ "none" , '' ]
]

STATUS = [
[ "html","html element",1, "/images/icons/fugue/blue-document-code.png"],
[ "html el published","html element published",2,"/images/icons/fugue/blue-document-xaml.png" ],
[ "html page","html for page",3,"/images/icons/fugue/blue-document-attribute-h.png" ],
[ "html page published","html page published",4,"/images/icons/fugue/blue-document-globe.png" ],
[ "page","page",5,"/images/icons/fugue/document-text.png" ],
[ "draft","page draft",6,"/images/icons/fugue/document-exclamation.png" ],
[ "page published" , "page published ",7,"/images/icons/fugue/document-globe.png"],
[ "html to check" , "html to check",8,"/images/icons/fugue/document-exclamation.png"],
[ "html page to check" , "html page to check",9,"/images/icons/fugue/document-exclamation.png"],
[ "none","zero",0,"/images/icons/fugue/blue-document-small.png"]
]


SECTION = [
["home"], ["course"], ["words"], ["phonetic"], ["reading"],["contact"],["login"],["grammar"],["kids"],["texts"],["translation"]
]

TEMPLATE = [
["general", 0],
["exercise", 1],
["popup", 2]
]

LAYOUT = [
["EN-RU", "application"],
["RU-EN", "ru_en_application.rhtml"],
["RU-JP", "ru_jp_application.rhtml"],
["RU-FR", "ru_fr_application.rhtml"],

]



end
