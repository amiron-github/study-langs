class UserMailer < ActionMailer::Base
  def signup_notification(user)
    setup_email(user)
    @subject    += 'Please activate your new account'
	@body[:text_created] = 'Your account has been created.'
	@body[:text_visit] = 'Visit this url to activate your account:'
    str = if user.lang && user.to_lang then "#{user.lang}/#{user.to_lang}/" else "" end
	
	if user.lang == 'ru'
		@subject    += 'Активируйте свой аккунт'
		@body[:text_created] = 'Ваш аккунт успешно создан'
		@body[:text_visit] = 'Перейдите по следующей ссылке, чтобы активировать свой аккаунт:'
	end
 
 
    @body[:url]  = "http://study-languages-online.com/#{str}activate/#{user.activation_code}"
  
  end

  def activation(user)
    setup_email(user)
	str = if user.lang && user.to_lang then "#{user.lang}/#{user.to_lang}/" else "" end
	if user.lang
		@body[:lang] == user.lang
	end
	
    @subject    += 'Your account has been activated!'
    @body[:url]  = "http://study-languages-online.com/#{str}"
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
