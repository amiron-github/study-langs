class OrderObserver < ActiveRecord::Observer
        def before_create(order)
	if order.type_id>0
		 print("BEFORE!!!!")
 				d = DateTime.now >> order.product.period
        order.expired_at= d

	else
	       order.expired_at=DateTime.now+365	
        end
	end
        
  def after_save(order)
    if order.status===2 
      	if order.type_id>0
          OrderMailer.deliver_purchase_notification(order)
          OrderMailer.deliver_admin_notification(order)
        else 
          OrderMailer.deliver_trial_notification(order)
      	end
    end
  end

end
