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


  protected
    def setup_email(user)
      @recipients  = "#{user.email}"
      @from        = APP_CONFIG[:support_email]
      @subject     = "[#{APP_CONFIG[:site_name]}] "
      @sent_on     = Time.now
      @body[:user] = user
    end
end

