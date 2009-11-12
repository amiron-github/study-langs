class UserTest < ActiveRecord::Base
   belongs_to :user
  
  attr_accessible :test_id, :user_id, :total, :correct


end
