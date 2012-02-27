class Topic < ActiveRecord::Base
  belongs_to :forum  
  has_many :posts, :dependent => :destroy
  has_many :favorites, :dependent => :destroy  
  belongs_to :user
  belongs_to :fcategory
  
  validates_presence_of    :name 
  
LANG = [
{'name'=>'Russian','name_ru'=>'русский','name_fr'=>'russe','id'=>1,'short_en'=>'ru'},
{'name'=>'English','name_ru'=>'английский','name_fr'=>'anglais','id'=>2,'short_en'=>'en'},
{'name'=>'French','name_ru'=>'французский','name_fr'=>'français','id'=>3,'short_en'=>'fr'},
{'name'=>'Other','name_ru'=>'другой','name_fr'=>'autre','id'=>0,'short_en'=>'other'}
]

  
end
