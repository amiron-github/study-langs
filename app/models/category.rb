class Category < ActiveRecord::Base
has_many :words

LANG = [
# Displayed stored in db
[ "English", "en" ],
[ "Russian" , "ru" ],
[ "French", "fr" ],
[ "Japan" , "jp" ]
]
end
