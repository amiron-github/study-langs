class UserTest < ActiveRecord::Base
belongs_to :user
belongs_to :exercise,
			 :foreign_key =>'test_id',
			 :primary_key => 'test_id'  
attr_accessible :test_id, :user_id, :total, :correct
end
