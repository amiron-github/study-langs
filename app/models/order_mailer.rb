class OrderMailer < ActionMailer::Base

        def purchase_notification(order)
        setup_email(order.user)
        @subject        += 'Subscription purchase!'

        @body[:url]  = "http://study-languages-online.com/"

        end
	
	def trial_notification(order)
        setup_email(order.user)
        @subject        += 'Subscription to the Course of Russian'

        @body[:url]  = "http://study-languages-online.com/"

	end
  
  def admin_notification(order)
      setup_admin_email
      @subject        += 'WOW!!! +20$'
      

      @body[:user_email] = order.user.email
  end



  protected
    def setup_email(user)
      @recipients  = "#{user.email}"
      @from        = APP_CONFIG[:support_email]
      @subject     = "[#{APP_CONFIG[:site_name]}] "
      @sent_on     = Time.now
      @body[:user] = user
    end

    def setup_admin_email
      @recipients  = "#{APP_CONFIG[:admin_email]},#{APP_CONFIG[:support_email]}"
      @from        = APP_CONFIG[:support_email]
      @subject     = "[#{APP_CONFIG[:site_name]}] "
      @sent_on     = Time.now
    end
end

