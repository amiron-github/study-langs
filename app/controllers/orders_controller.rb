class OrdersController < ApplicationController
include ActiveMerchant::Billing::Integrations
skip_before_filter :verify_authenticity_token, :only => [:paypal_ipn]
#before_filter :basic_authenticate, :only => [:g_]



  def paypal_ipn
    notify = Paypal::Notification.new(request.raw_post)
  	
    order = Order.find(:first, :conditions => 'ord_id=\''+params[:custom]+ '\'')

    if notify.acknowledge
    begin
      logger.warn("WOW acknowledge!!!!!")

      if notify.complete? && (order.ord_id == params[:custom])
        order.update_attribute(:status, 2)
        logger.warn("Payment complete from "+order.user.email)
      else
        logger.error("Failed to verify Paypal's notification, please investigate")
      end

      rescue => e
      order.update_attribute(:status, -1)
      logger.warn("RESCUE")
      end

    end
	render :text=> '', :layout => false

  end

  def basic_authenticate
  authenticate_or_request_with_http_basic do |username, password|
    username == APP_CONFIG[:gch_id].to_s && password == APP_CONFIG[:gch_key]
  end
end

end
