class Category < ActiveRecord::Base
has_many :words
has_many :exercises

validates_presence_of :tag
validates_uniqueness_of :tag
validate :tag_must_reflect_lang

LANG = [
# Displayed stored in db
[ "Russian" , "ru" ],
[ "English", "en" ],
[ "French", "fr" ],
[ "Japan" , "jp" ]
]

protected
def tag_must_reflect_lang
	if lang == 'en' || lang == 'fr' || lang == 'jp'
		t_lang = '_'+lang.to_s
		if tag.nil? || !tag.include?(t_lang)
			errors.add(:tag, 'should reflect lang') 
		end
	end
end

end
