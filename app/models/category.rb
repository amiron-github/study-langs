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
[ "Japan" , "jp" ],
[ "German" , "de" ],
[ "Spanish" , "es" ],
[ "Italian" , "it" ],
[ "Chinese" , "ch" ],
[ "Portuguese" , "pt" ],
[ "Polish" , "pl" ],
[ "Greek" , "gr" ],
[ "Russian phrases", "ruf" ],
[ "English phrases", "enf" ],
[ "French phrases", "frf" ],
[ "Japan phrases", "jpf" ]
]

protected
def tag_must_reflect_lang
	if lang == 'en' || lang == 'fr' || lang == 'jp' || lang == 'ruf' || lang == 'enf' || lang == 'frf' || lang == 'jpf'
		t_lang = '_'+lang.to_s
		if tag.nil? || !tag.include?(t_lang)
			errors.add(:tag, 'should reflect lang') 
		end
	end
end

end
