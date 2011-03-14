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
  {:name=> "Lesson 10. Internet and Telephone", :exercises=> ["c0110013.I.c)", "c0110022.II.b)", "c0110032.III.b)", "c0110041.IV.a)", "c0110051.V.1", "c0110052.V.2","c0110053.V.3","c0110061.VI.a)","c0110071.VII.a)","c0110072.VII.b)"]}
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
:name => 'Reading Training Exercises', 
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

#when changing the order of lessons, the order of test data should be changed in /ru/en/kids-lesson.html
KIDS_EN = {
:name => 'Уроки английского для детей', 
:parts => [
  {:name=> "Числительные от 1 до 10", :exercises=> 	["k1101210.2", "k1101310.3","k1101410.4","k1101510.5"]}, 
  {:name=> "Цвета", :exercises=> ["k1107210.2", "k1107310.3","k1106410.4","k1107510.5"]},
  {:name=> "Фрукты", :exercises=> ["k1102210.2", "k1102310.3","k1102410.4","k1102510.5"]},
  {:name=> "Овощи", :exercises=> ["k1103210.2", "k1103310.3","k1103410.4","k1103510.5"]},
  {:name=> "Домашние животные", :exercises=> ["k1104210.2", "k1104310.3","k1104410.4","k1104510.5"]},
  {:name=> "Дикие животные", :exercises=> ["k1105210.2", "k1105310.3","k1105410.4","k1105510.5"]},
  {:name=> "В зоопарке", :exercises=> ["k1106210.2", "k1106310.3","k1106410.4","k1106510.5"]},
  {:name=> "Мебель", :exercises=> ["k1108210.2", "k1108310.3","k1108410.4","k1108510.5"]},
  {:name=> "Профессии", :exercises=> ["k1109210.2", "k1109310.3","k1109410.4","k1109510.5"]},
  {:name=> "Молочные продукты", :exercises=> ["k1110210.2", "k1110310.3","k1110410.4","k1110510.5"]},
  {:name=> "Мясо и рыба", :exercises=> ["k1111210.2", "k1111310.3","k1111410.4","k1111510.5"]},
  {:name=> "Десерт", :exercises=> ["k1112210.2", "k1112310.3","k1112410.4","k1112510.5"]},
  {:name=> "Напитки", :exercises=> ["k1113210.2", "k1113310.3","k1113410.4","k1113510.5"]},
  {:name=> "Одежда", :exercises=> ["k1114210.2", "k1114310.3","k1114410.4","k1114510.5"]},
  {:name=> "Числа от 10 до 20", :exercises=> ["k1115210.2", "k1115310.3","k1115410.4","k1115510.5"]},
  {:name=> "Числа от 10 до 100", :exercises=> ["k1163210.2", "k1116310.3","k1116410.4","k1116510.5"]}
]
}


LESSONS_EN = {
:name => 'Уроки английского для начинающих', 
:parts => [
  {:name=> "Урок 1", :exercises=> ["c1101012.1.2","c1101022.2.2","c1101041.4.1","c1101051.5.1","c1101052.5.2"]}, 
  {:name=> "Урок 2", :exercises=> ["c1102012.1.2","c1102022.2.2","c1102041.4.1","c1102051.5.1","c1102052.5.2"]},
  {:name=> "Урок 3", :exercises=> ["c1103012.1.2","c1103021.2.1","c1103022.2.2","c1103041.4.1","c1103051.5.1","c1103052.5.2"]},
  {:name=> "Урок 4", :exercises=> ["c1104012.1.2","c1104022.2.2","c1104041.4.1","c1104051.5.1","c1104052.5.2"]},
  {:name=> "Урок 5", :exercises=> ["c1105012.1.2","c1105022.2.2","c1105041.4.1","c1105051.5.1","c1105052.5.2"]},
  {:name=> "Урок 6", :exercises=> ["c1106012.1.2","c1106022.2.2","c1106041.4.1","c1106051.5.1","c1106052.5.2"]},
  {:name=> "Урок 7", :exercises=> ["c1107012.1.2","c1107022.2.2","c1107041.4.1","c1107051.5.1","c1107052.5.2"]},
  {:name=> "Урок 8", :exercises=> ["c1108012.1.2","c1108022.2.2","c1108041.4.1","c1108051.5.1","c1108052.5.2"]},
  {:name=> "Урок 9", :exercises=> ["c1109012.1.2","c1109022.2.2","c1109041.4.1","c1109051.5.1","c1109052.5.2"]},
  {:name=> "Урок 10", :exercises=>["c1110012.1.2","c1110022.2.2","c1110041.4.1","c1110051.5.1","c1110052.5.2"]}
]
}


GRAMMAR_EN = {
:name => 'Грамматические упражнения', 
:parts => [
  {:name=> "Множественное число", :exercises=> ["g1101010.I", "g1101020.II"]},
  {:name=> "Указательные местоимения", :exercises=> ["g1102010.I", "g1102020.II"]},
  {:name=> "Сравнительная степень прилагательных", :exercises=> ["g1103010.I", "g1103020.II"]},
  {:name=> "To be в настоящем времени", :exercises=> ["g1104010.I", "g1104020.II"]},
  {:name=> "Глаголы в Present Indefinite", :exercises=> ["g1105010.I", "g1105020.II"]},
  {:name=> "Глаголы в Present Continuous", :exercises=> ["g1106010.I", "g1106020.II"]},
  {:name=> "Правильные глаголы в Past Indefinite", :exercises=> ["g1107010.I", "g1107020.II"]},
  {:name=> "Основные формы неправильных глаголов", :exercises=> ["g1108010.I", "g1108020.II", "g1108030.III", "g1108040.IV"]},
  {:name=> "Неправильные глаголы в Past Indefinite", :exercises=> ["g1109010.I", "g1109020.II"]},
  {:name=> "Правильные глаголы в Present Perfect", :exercises=> ["g1110010.I", "g1110020.II"]},
  {:name=> "Неправильные глаголы в Present Perfect", :exercises=> ["g1111010.I", "g1111020.II"]},
  {:name=> "Глаголы в Future Indefinite", :exercises=> ["g1112010.I", "g1112020.II"]},
  {:name=> "Притяжательный падеж", :exercises=> ["g1113010.I"]},
  {:name=> "Личные местоимения", :exercises=> ["g1114010.I","g1114020.II"]},
  {:name=> "Притяжательные местоимения", :exercises=> ["g1115010.I","g1115020.II"]},
  {:name=> "Возвратные местоимения", :exercises=> ["g1116010.I","g1116020.II"]},
  {:name=> "Вопросительные местоимения", :exercises=> ["g1117010.I","g1117020.II"]}
]
}

end













