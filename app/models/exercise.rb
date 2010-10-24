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
  {:name=> "Lesson 2. Transport", :exercises=> ["c0102013.I.c)","c0102022.II.b)", "c0102052.V.b)","c0102062.VI.b)", "c0102072.VII.b)","c0102074.VII.d)"]},
  {:name=> "Lesson 3. At the hotel", :exercises=> ["c0103013.I.c)","c0103022.II.b)","c0103033.III.c)","c0103044.IV.d)", "c0103073.VII.c)"]},
  {:name=> "Lesson 4. In the street", :exercises=> ["c0104013.I.c)","c0104022.II.b)", "c0104032.III.b)", "c0104035.III.e)", "c0104050.V", "c0102063.VI.c)", "c0104083.VIII.c)"]},
  {:name=> "Lesson 5. Sightseeings", :exercises=> ["c0105013.I.c)", "c0105043.IV.c)", "c0105053.V.c)", "c0105073.VII.c)"]},
  {:name=> "Lesson 6. Shopping", :exercises=> ["c0106013.I.c)", "c0106022.II.b)", "c0106042.IV.b)", "c010602063.VI.c)", "c0106082.VIII.b)"]},
  {:name=> "Lesson 7. At the restaurant", :exercises=> ["c0107013.I.c)", "c0107022.II.b)", "c0107032.III.b)", "c0107042.IV.b)", "c0107051.V.a)","c0107052.V.b)", "c0107053.V.c)"]},
  {:name=> "Lesson 8. At the drugstore", :exercises=> ["c0108013.I.c)", "c0108022.II.b)", "c0108032.III.b)", "c0108042.IV.b)", "c0108043.IV.c)", "c0108062.VI.b)", "c0108063.VI.c)", "c0108072.VII.b)"]},
  {:name=> "Lesson 9. Currency exchange", :exercises=> ["c0109013.I.c)", "c0109022.II.b)", "c0109032.III.b)", "c0109052.V.b)", "c0109063.VI.c)"]},
  {:name=> "Lesson 10. Internet & Telephone", :exercises=> ["c0110013.I.c)", "c0110022.II.b)", "c0110032.III.b)", "c0110041.IV.a)", "c0110051.V.1", "c0110052.V.2","c0110053.V.3","c0110061.VI.a)","c0110071.VII.a)","c0110072.VII.b)"]}
]
}

BEGINNER_RU = {
:name => 'Course for beginners', 
:parts => [
  {:name=> "Lesson 1. Greetings and Farewells", :exercises=> ["c0201022.II.b)","c0201042.IV.b)","c0201050.V"]},
  {:name=> "Lesson 2. Introducing yourself", :exercises=> ["c0202011.I.1)","c0202012.I.2)","c0202022.II.b)","c0202050.V"]},
  {:name=> "Lesson 3. Where are you from?", :exercises=> ["c0203011.I.1)","c0203012.I.2)","c0203022.II.b)","c0203032.III.b)","c0203050.V"]},
  {:name=> "Lesson 4. Professions and Occupations", :exercises=> ["c0204011.I.1)","c0204012.I.2)","c0204013.I.3)","c0204022.II.b)","c0204042.IV.b)","c0204050.V"]},
  {:name=> "Lesson 5. Languages skills", :exercises=> ["c0205011.I.1)","c0205012.I.2)","c0205022.II.b)","c0205032.III.b)","c0205050.V"]}
]
}

PHONETICS_RU = {
:name => 'Phonetics course', 
:parts => [
  {:name=> "Lesson 2. Hard consonants", :exercises=> ["p0102040.4"]},
  {:name=> "Lesson 3. Soft consonants", :exercises=> ["p0103040.4"]},
  {:name=> "Lesson 4. The most difficult sounds", :exercises=> ["p0104030.3","p0104040.4"]}
]
}

READING_RU = {
:name => 'Training Exercises', 
:parts => [
  {:name=> "Part 1", :exercises=> ["r0101030.3", "r0101050.5"]},
  {:name=> "Part 2", :exercises=> ["r0102020.2","r0102040.4"]},
  {:name=> "Part 3", :exercises=> ["r0103020.2","r0103040.4"]},
  {:name=> "Part 4", :exercises=> ["r0104020.2","r0104040.4"]}
]
}

GRAMMAR_RU = {
:name => 'Grammar Exercises', 
:parts => [
  {:name=> "Nouns gender", :exercises=> ["g0101010.I", "g0101020.II"]},
  {:name=> "Nouns number", :exercises=> ["g0102010.I","g0102020.II"]},
  {:name=> "Nouns cases", :exercises=> ["g0103010.I","g0103020.II"]},
  {:name=> "Genitive singular", :exercises=> ["g0104010.I","g0104020.II","g0104030.III","g0104040.IV"]},
  {:name=> "Genitive plural", :exercises=> ["g0105010.I","g0105020.II","g0105030.III","g0105040.IV"]},
  {:name=> "Dative case", :exercises=> ["g0106010.I","g0106020.II","g0106030.III","g0106040.IV"]},
  {:name=> "Accusative case", :exercises=> ["g0107010.I","g0107020.II","g0107030.III","g0107040.IV","g0107050.V"]},
  {:name=> "Instrumental case", :exercises=> ["g0108010.I","g0108020.II","g0108030.III"]},
  {:name=> "Prepositional case", :exercises=> ["g0109010.I","g0109020.II","g0109030.III","g0109040.IV"]},
  {:name=> "Declension of adjectives", :exercises=> ["g0111010.I","g0111020.II","g0111030.III","g0111040.IV"]},
  {:name=> "Short forms of adjectives", :exercises=> ["g0113010.I","g0113020.II"]},
  {:name=> "Personal pronouns", :exercises=> ["g0114010.I","g0114020.II"]},
  {:name=> "Possessive pronouns", :exercises=> ["g0115010.I","g0115020.II","g0115030.III"]},
  {:name=> "Demonstrative pronouns", :exercises=> ["g0116010.I","g0116020.II"]},
  {:name=> "Interrogative pronouns", :exercises=> ["g0117010.I","g0117020.II"]},
  {:name=> "Verbs: Present Tense forms", :exercises=> ["g0124010.I","g0124020.II"]},
  {:name=> "Verbs: Past Tense forms", :exercises=> ["g0125010.I","g0125020.II"]}
]
}


end













