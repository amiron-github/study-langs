class UserMailer < ActionMailer::Base
  def signup_notification(user)
    setup_email(user)
    @subject    += 'Please activate your new account'
    str = if user.lang && user.to_lang then "#{user.lang}/#{user.to_lang}/" else "" end
 
    @body[:url]  = "http://study-languages-online.com/#{str}activate/#{user.activation_code}"
  
  end

  def activation(user)
    setup_email(user)

    @subject    += 'Your account has been activated!'
    @body[:url]  = "http://study-languages-online.com/"
  end
  
  protected
    def setup_email(user)
      @recipients  = "#{user.email}"
      @from        = APP_CONFIG[:support_email]
      @subject     = "[Study Languages Online] "
      @sent_on     = Time.now
      @body[:user] = user
    end
end
