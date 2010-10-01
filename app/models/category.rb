class Category < ActiveRecord::Base
has_many :words
has_many :exercises
LANG = [
# Displayed stored in db
[ "Russian" , "ru" ],
[ "English", "en" ],
[ "French", "fr" ],
[ "Japan" , "jp" ]
]
end
