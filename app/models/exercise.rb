class Exercise < ActiveRecord::Base
has_many :user_tests,
		 :foreign_key =>'test_id',
		 :primary_key => 'test_id'
belongs_to :category


EVERYDAY_RU = {
:name => 'Everyday Russian course', 
:parts => [
  {:name=> "Lesson 1", :exercises=> ["c0101013.I.c)", "c0101050.V"]}, 
  {:name=> "Lesson 2", :exercises=> ["c0102013.I.c)","c0102052.V.b)","c0102072.VII.b)","c0102074.VII.d)"]},
  {:name=> "Lesson 3", :exercises=> ["c0103013.I.c)","c0103022.II.b)","c0103033.III.c)","c0103073.VII.c)"]}
]
}

BEGINNER_RU = {
:name => 'Course for beginners', 
:parts => [
  {:name=> "Lesson 1", :exercises=> ["c0201022.II.b)"]}
]
}


end
