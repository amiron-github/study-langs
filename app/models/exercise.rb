class Exercise < ActiveRecord::Base
has_many :user_tests,
		 :foreign_key =>'test_id',
		 :primary_key => 'test_id'
belongs_to :category
end
