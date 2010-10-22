class Exercise < ActiveRecord::Base
has_many :user_tests,
		 :foreign_key =>'test_id',
		 :primary_key => 'test_id'
belongs_to :category

validates_presence_of :test_id
validates_uniqueness_of :test_id


EVERYDAY_RU = {
:name => 'Everyday Russian course', 
:parts => [
  {:name=> "Lesson 1. In the airport", :exercises=> ["c0101013.I.c)", "c0101024.II.d)","c0101032.III.b)","c0101050.V"]}, 
  {:name=> "Lesson 2", :exercises=> ["c0102013.I.c)","c0102022.II.b)", "c0102052.V.b)","c0102062.VI.b)", "c0102072.VII.b)","c0102074.VII.d)"]},
  {:name=> "Lesson 3", :exercises=> ["c0103013.I.c)","c0103022.II.b)","c0103033.III.c)","c0103044.IV.d)", "c0103073.VII.c)"]},
  {:name=> "Lesson 4", :exercises=> ["c0104013.I.c)","c0104022.II.b)", "c0104032.III.b)", "c0104035.III.e)", "c0104050.V", "c0102063.VI.c)", "c0104083.VIII.c)"]},
  {:name=> "Lesson 5", :exercises=> ["c0105013.I.c)", "c0105043.IV.c)", "c0105053.V.c)", "c0105073.VII.c)"]},
  {:name=> "Lesson 6", :exercises=> ["c0106013.I.c)", "c0106022.II.b)", "c0106042.IV.b)", "c010602063.VI.c)", "c0106082.VIII.b)"]},
  {:name=> "Lesson 7", :exercises=> ["c0107013.I.c)", "c0107022.II.b)", "c0107032.III.b)", "c0107042.IV.b)", "c0107051.V.a)","c0107052.V.b)", "c0107053.V.c)"]},
  {:name=> "Lesson 8", :exercises=> ["c0108013.I.c)", "c0108022.II.b)", "c0108032.III.b)", "c0108042.IV.b)", "c0108043.IV.c)", "c0108062.VI.b)", "c0108063.VI.c)", "c0108072.VII.b)"]},
  {:name=> "Lesson 9", :exercises=> ["c0109013.I.c)", "c0109022.II.b)", "c0109032.III.b)", "c0109052.V.b)", "c0109063.VI.c)"]},
  {:name=> "Lesson 10", :exercises=> ["c0110013.I.c)", "c0110022.II.b)", "c0110032.III.b)", "c0110041.IV.a)", "c0110051.V.1", "c0110052.V.2","c0110053.V.3","c0110061.VI.a)","c0110071.VII.a)","c0110072.VII.b)"]}
]
}

BEGINNER_RU = {
:name => 'Course for beginners', 
:parts => [
  {:name=> "Lesson 1", :exercises=> ["c0201022.II.b)"]}
]
}


end
