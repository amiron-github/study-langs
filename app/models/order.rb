class Order < ActiveRecord::Base
   belongs_to :user
   belongs_to :product


#	def before_create 
#	self.expired_at=DateTime.now+365
#	end
	
=begin	def after_save
	if self.status=2 
	UserMailer.deliver_purchase_notification(self.user)
	logger.warn('EMAIL PURCHASe ___ '+self.user.email)
	end
	end
=end
end
