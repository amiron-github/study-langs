class UserTest < ActiveRecord::Base
belongs_to :user
belongs_to :exercise,
			 :foreign_key =>'test_id',
			 :primary_key => 'test_id'  
attr_accessible :test_id, :user_id, :total, :correct

 def result_percent 
	correct = self.correct
	total = self.total
	results = (correct.to_f/total.to_f*100).to_i
	result = results.to_s+'%'
	return result
 end


end
