require 'digest/sha1'

class User < ActiveRecord::Base
has_and_belongs_to_many :roles
has_many :user_words
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
#  validates_length_of       :login,    :within => 3..40
#  validates_uniqueness_of   :login
#  validates_format_of       :login,    :with => Authentication.login_regex, :message => Authentication.bad_login_message

	validates_format_of       :name,     :with => Authentication.name_regex,  :message => Authentication.bad_name_message, :allow_nil => true
	validates_length_of       :name,     :maximum => 100

	validates_presence_of     :email 
	validates_length_of       :email,    :within => 6..100 #r@a.wk
	validates_uniqueness_of   :email
	validates_format_of       :email,    :with => Authentication.email_regex, :message => Authentication.bad_email_message



# HACK HACK HACK -- how to do attr_accessible from here?
# prevents a user from submitting a crafted form that bypasses activation
# anything else you want your user to change should be added here.
# attr_accessible :login, :email, :name, :password, :password_confirmation
	attr_accessible :email, :name, :password, :password_confirmation, :status



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
				cat_words = words.find(:all, :conditions => ['category_id=?', category_id], :order=> 'order_num');
				cat_tests = user_tests.all(:joins => 'left outer join exercises ON `exercises`.test_id = `user_tests`.test_id', :conditions => {'exercises.category_id' => category_id})
				user_cat << {:category => category, :words => cat_words, :user_tests => cat_tests}
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
	
	def get_categories_and_exercises
		cat_and_ex  = []
		user_tests.each do |ut|
			test = Exercise.find(:first, :conditions => ['test_id=?', ut.test_id])
			if test
				category_name = test.category.title
				test_name = test.title
				results = (ut.correct.to_f/ut.total.to_f*100).to_i
				result = results.to_s+'%'
				cat_and_ex << {:category => category_name, :category_id => test.category.id, :title => test_name, :result=> result}
			end 
		end
		return cat_and_ex
	end
	
	def get_cat_ex
	 test_categories =  user_tests.all(:joins => 'left outer join exercises ON `exercises`.test_id = `user_tests`.test_id', :select => 'distinct exercises.category_id')
	 list = []
	 test_categories.each do |tc|
		category_id = tc.category_id
		if category_id != nil
			category = Category.find(category_id)
			unless category.tag == 'everyday_course' || category.tag =='beginner_course'
				cat_tests = get_test_by_category(category_id)
				total = 0
				cat_tests.each do |test|
					total += test.result_percent
				end
				average = total / cat_tests.length
				list << {:category => category, :exercises => cat_tests, :total => average}
			end
		end
	 end
	return list
	end
	
	def get_test_by_category(category_id)
		tests = user_tests.all(:joins => 'left outer join exercises ON `exercises`.test_id = `user_tests`.test_id', :conditions => {'exercises.category_id' => category_id})
		return tests
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
						lesson[:exercises].delete(exercise)
						empty_lesson = false
						user_exercises << test
						total += test.result_percent
					end
				end		
			end
			if !empty_lesson
				average = total/user_exercises.length
				list << {:category => lesson[:name], :exercises => user_exercises, :total => average}
			end
		end
		course_data = {:name=> course_name, :results=> list}
		return course_data
	end
	
	
	
	
	
	def get_tests 
	res='var userProgress=new Array('
			first = true
			self.user_tests.each do |t|

			res = res +((first)?'':',')+'["' +t.test_id+'",'+t.total.to_s+','+t.correct.to_s+']'
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
