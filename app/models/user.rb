require 'digest/sha1'
require 'digest/md5'
class User < ActiveRecord::Base
has_and_belongs_to_many :roles
has_many :user_words, :dependent => :destroy
has_many :posts  
has_many :topics
has_one :setting, :dependent => :destroy
has_many :favorites, :dependent => :destroy
has_many :words, :through=> :user_words
has_many :user_tests,
	 :dependent => :destroy
	 has_many :orders

# has_role? simply needs to return true or false whether a user has a role or not.  
# It may be a good idea to have "admin" roles return true always
	def has_role?(role_in_question)
@_list ||= self.roles.collect(&:name)
	return true if @_list.include?("admin")
(@_list.include?(role_in_question.to_s) )
	end

	include Authentication
	include Authentication::ByPassword
	include Authentication::ByCookieToken
	include Authorization::AasmRoles

#  validates_presence_of     :login
  #validates_length_of       :login,    :within => 3..40
  #validates_uniqueness_of   :login
  #validates_format_of       :login,    :with => Authentication.login_regex, :message => Authentication.bad_login_message

	#validates_uniqueness_of   :name
	#validates_length_of       :name,     :within => 2..80
	#validates_format_of       :name,     :with => Authentication.name_regex,  :message => Authentication.bad_name_message


	validates_presence_of     :email 
	validates_length_of       :email,    :within => 6..100 #r@a.wk
	validates_uniqueness_of   :email
	validates_format_of       :email,    :with => Authentication.email_regex, :message => :invalid



# HACK HACK HACK -- how to do attr_accessible from here?
# prevents a user from submitting a crafted form that bypasses activation
# anything else you want your user to change should be added here.
# attr_accessible :login, :email, :name, :password, :password_confirmation
	attr_accessible :email, :name, :password, :password_confirmation, :status, :lang, :to_lang
  attr_accessor :lang, :to_lang



# Authenticates a user by their login name and unencrypted password.  Returns the user or nil.
#
# uff.  this is really an authorization, not authentication routine.  
# We really need a Dispatch Chain here or something.
# This will also let us return a human error message.
#
def self.authenticate(email, password)
	return nil if email.blank? || password.blank?
	u = find_in_state :first, :active, :conditions => {:email => email.downcase} # need to get the salt
	u && u.authenticated?(password) ? u : nil
	end

#  def login=(value)
#    write_attribute :login, (value ? value.downcase : nil)
#  end

	def email=(value)
write_attribute :email, (value ? value.downcase : nil)
	end

	def tests_number 
	self.user_tests.size
	end
	
	def word_status(word_id)
		learned = self.words.find(:first, :conditions=> ['word_id=?',word_id])
		if !learned
			status ='0'
		else 
			status = '1'
		end
		return status
	end
	
	def words_by_language(lang)
		words = self.words.find(:all)
		words_by_lang = []
		words.each do |word|
			if word.word_lang == lang
				words_by_lang << word
			end
		end
		return 	words_by_lang	
	end
	
	def categories_by_language(lang)
		user_categories = words.find(:all, :select=> "distinct category_id", :order => 'category_id');
		user_cat = []
		user_categories.each do |t|
			category_id = t[:category_id]
			category = Category.find(category_id)
			if category.lang == lang
				if category.lang == 'jp'
					unless category_id == 95 || category_id == 96 || category_id == 36 || category_id == 37
						cat_words = words.find(:all, :conditions => ['category_id=?', category_id], :order=> 'order_num');
						cat_tests = user_tests.all(:joins => 'left outer join exercises ON `exercises`.test_id = `user_tests`.test_id', :conditions => {'exercises.category_id' => category_id})
						user_cat << {:category => category, :words => cat_words, :user_tests => cat_tests}
					end
				else
				cat_words = words.find(:all, :conditions => ['category_id=?', category_id], :order=> 'order_num');
				cat_tests = user_tests.all(:joins => 'left outer join exercises ON `exercises`.test_id = `user_tests`.test_id', :conditions => {'exercises.category_id' => category_id})
				user_cat << {:category => category, :words => cat_words, :user_tests => cat_tests}
				end
			end
		end
	return user_cat
	end
	
	def categories_hkk(lang)
		user_categories = words.find(:all, :select=> "distinct category_id", :order => 'category_id');
		user_cat = []
		user_categories.each do |t|
			category_id = t[:category_id]
			category = Category.find(category_id)
			if category.lang == lang
				if category.lang == 'jp'
					if category_id == 95 || category_id == 96 || category_id == 36 || category_id == 37
						cat_words = words.find(:all, :conditions => ['category_id=?', category_id], :order=> 'order_num');
						cat_tests = user_tests.all(:joins => 'left outer join exercises ON `exercises`.test_id = `user_tests`.test_id', :conditions => {'exercises.category_id' => category_id})
						user_cat << {:category => category, :words => cat_words, :user_tests => cat_tests}
					end
				end
			end
		end
	return user_cat
	end
	
	def remove_words_by_topic(category_id)
		words_to_delete = words.find(:all, :conditions=> ['category_id=?', category_id])
		words.delete(words_to_delete)
	end
	
	def remove_tests_by_topic(category_id)
		tests_to_delete = get_test_by_category(category_id)
		user_tests.delete(tests_to_delete)
	end
	
	
	def get_cat_ex(lang)
	 test_categories =  user_tests.all(:joins => 'left outer join exercises ON `exercises`.test_id = `user_tests`.test_id', :select => 'distinct exercises.category_id')
	 list = []
	 test_categories.each do |tc|
		category_id = tc.category_id
		if category_id != nil
			category = Category.find(category_id)
			if category.lang == lang
			unless category.tag == 'everyday_course' || category.tag =='beginner_course' || category.tag =='phonetics_course'||category.tag =='grammar_course'||category.tag =='reading_course' || category.tag =='kids_lessons_en' || category.tag =='lessons_en' || category.tag =='grammar_en'
				cat_tests = get_test_by_category(category_id)
				total = 0
				category_title = category.title
				category_title_ru = category.title_ru
				cat_tests.each do |test|
					total += test.result_percent
				end
				average = total/cat_tests.length
				list << {:category => category_title,:category_ru =>category_title_ru,:exercises =>cat_tests, :total => average}
			end
			end
		end
	 end
	 course_data = {:name=> 'Vocabulary topics', :results=> list}
	return course_data
	end
	
	def get_course_results(map, tag)
		course = Category.find(:first, :conditions=> ['tag=?', tag])
		user_tests = get_test_by_category(course.id)
		course_map = map
		course_name = course_map[:name]
		list =[]
		course_map[:parts].each do |lesson|
			empty_lesson = true
			user_exercises = []
			total = 0
			lesson[:exercises].each do |exercise|
				user_tests.each do |test|
					if test.test_id == exercise               #if test found
						#lesson[:exercises].delete(exercise)
						empty_lesson = false
						user_exercises << test
						total += test.result_percent
					end
				end		
			end
			if !empty_lesson
				average = total/user_exercises.length
				list << {:category => lesson[:name], :category_ru => lesson[:name], :exercises => user_exercises, :total => average}
			end
		end
		course_data = {:name=> course_name, :results=> list}
		return course_data
	end
	
	def get_course_json(map, tag)
		course = Category.find(:first, :conditions=> ['tag=?', tag])
		user_tests = get_test_by_category(course.id)
		course_map = map
		course_name = course_map['name']
		list =[]
		course_map['parts'].each do |lesson|
			empty_lesson = true
			user_exercises = []
			total = 0
			lesson['exercises'].each do |exercise|
				user_tests.each do |test|
					if test.test_id == exercise               #if test found
						#lesson[:exercises].delete(exercise)
						empty_lesson = false
						user_exercises << test
						total += test.result_percent
					end
				end		
			end
			if !empty_lesson
				average = total/user_exercises.length
				list << {:category => lesson['name'], :category_ru => lesson['name'], :exercises => user_exercises, :total => average}
			end
		end
		course_data = {:name=> course_name, :results=> list}
		return course_data
	end	
	
	
	def get_detailed_results(map, tag)
		course = Category.find(:first, :conditions=> ['tag=?', tag])
		user_tests = get_test_by_category(course.id)
		course_map = map
		course_name = course_map[:name]
		list =[]
		course_map[:parts].each do |lesson|
			empty_lesson = true
			total = 0
			ex_len = 0
			lesson_parts = []  # create array of lesson that will include 4 parts 
			lesson[:exercises].each_with_index do |part,index|
				part_exercises = [] # create array of parts exercises
				part.each do |exercise| # go through each part, looking for completed exercise
					found=false
					t_test = 0
					user_tests.each do |test| # going through tests completed by user
						if test.test_id == exercise[0]               #if user's test is found by id in the exercises of the course
							found=true
							t_test = test
						end
					end
					if found 
						empty_lesson = false
						part_exercises << [ exercise[1].to_s, t_test.result_percent ] # the exercise is added to part, with its name and result
						total += t_test.result_percent
						ex_len = ex_len+1
					end
				end
				lesson_parts << part_exercises # the part is added to the lesson
			end
			if !empty_lesson
				average = total/ex_len
				list << {:name=> lesson[:name], :exercises=> lesson_parts, :total => average}
			end
		end
		course_data = {:name=> course_name, :results=> list}
		return course_data
	end
	
	def record_words(words_to_record)
		words_to_record.each do |word_id|
			learned = words.find(:first, :conditions => ['word_id=?', word_id])
			if learned
				entry = user_words.find(:first, :conditions => ['word_id=?', word_id])
				entry.update_attribute(:occurred, entry.occurred+=1 )
			else
				word = Word.find(word_id)
				words << word
			end
		end
	end
	
	def add_favorite(topic)
		favorites << topic
	end
	
	def check_new_category(category_id)
		lang = Category.find(category_id).lang
		unless  lang == '' || lang == nil
			started = words.find(:first, :conditions=>['category_id=?',category_id])
			if !started 
				return Category.find(category_id)
			else
				return false
			end
		else 
			return false
		end
	end
	
	def get_test_by_category(category_id)
		tests = user_tests.all(:joins => 'left outer join exercises ON `exercises`.test_id = `user_tests`.test_id', :conditions => {'exercises.category_id' => category_id})
		return tests
	end	
	
	def get_words_occured(cat_words)
		new_words = []
		cat_words.each do |w|
			occurred = user_words.find(:first, :conditions => ['word_id=?', w.id])
			if occurred
				new_words <<  {:text => w.text, :occurred => occurred.occurred}
			else
				new_words <<  {:text => w.text, :occurred =>0}
			end
		end
		return new_words
	end
	
	def get_tests 
	  res='var userProgress=new Array('
	  first = true
	  tests = self.user_tests
	  tests.each_with_index do |t,index|
			res = res+'["' +t.test_id+'",'+t.total.to_s+','+t.correct.to_s+']'
				unless index+1 == tests.length
					 res+=','
				end
			first=false
	  end

	  res+=");"    
	  return res 
	end

	def payment
			order = self.orders.find(:first, :conditions => 'status >0 and expired_at >= now()')
			if order	
			return true 
			else return false 
			end
	end
			
	def paid
		order = self.orders.find(:first, :conditions => 'status >0 and expired_at < now()')
		if order	
			return true 
		else 
			return false 
		end
	end

	def expired
		order = self.orders.find(:first, :conditions => 'status>0 and expired_at >= now()')
		#		self.orders.each do |t|
		#		logger.warn(t.expired_at)
		#		end                	
			 if order
				logger.warn(order.expired_at.strftime("%m-%d-%Y"))
				return order.expired_at.strftime("%m-%d-%Y")
			  else
				return '1'
			  end
	end
	
	def expired_date
		order = self.orders.find(:first, :conditions => 'status>0 and expired_at < now()')
		#		self.orders.each do |t|
		#		logger.warn(t.expired_at)
		#		end                	
		if order
				logger.warn(order.expired_at.strftime("%m-%d-%Y"))
				return order.expired_at.strftime("%Y/%m/%d")
		else
				return '1'
		end
	end
			
	def expiration_time
				order = self.orders.find(:first, :conditions => 'status>0 and expired_at >= now()')
		#		self.orders.each do |t|
		#		logger.warn(t.expired_at)
		#		end                	
			 if order
				logger.warn(order.expired_at.strftime("%d/%m/%Y"))
				return order.expired_at
			  else
				return '1'
			  end
	end

	protected

	def make_activation_code
	self.deleted_at = nil
	self.activation_code = self.class.make_token
	end


	end
