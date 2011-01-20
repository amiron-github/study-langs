class UserMailer < ActionMailer::Base
  def signup_notification(user)
    setup_email(user)
    
	@body[:text_created] = 'Your account has been created.'
	@body[:text_visit] = 'Visit this url to activate your account:'
    str = if user.lang && user.to_lang then "#{user.lang}/#{user.to_lang}/" else "" end
	
	if user.lang == 'ru'
		@subject    += 'Активируйте свой аккунт'
		@body[:text_created] = 'Ваш аккунт успешно создан'
		@body[:text_visit] = 'Перейдите по следующей ссылке, чтобы активировать свой аккаунт:'
	else 
		@subject    += 'Please activate your new account'
	end
 
 
    @body[:url]  = "http://study-languages-online.com/#{str}activate/#{user.activation_code}"
  
  end

  def activation(user)
    setup_email(user)
	str = if user.lang && user.to_lang then "#{user.lang}/#{user.to_lang}/" else "" end

	@body[:text_welcome] = 'your account has been activated.  Welcome aboard!'
	@body[:text_info1] = 'Now you can save and review the results of lessons exercises and vocabulary tests that you have completed on our website.'
	@body[:text_info2] = 'In your account, you can find the results of each exercise and test, as well as overall results of all exercises and tests for a lesson or a topic.'
	
	if user.lang == 'ru'
		@subject    += 'Активируйте свой аккунт'
		@body[:text_welcome] = 'Ваш аккаунт успешно активирован. Добро пожалаловать на наш сайт!'
		@body[:text_info1] = 'Теперь в своем аккаунте Вы сможете просматривать пройденные слова и результаты выполненных упражнений и тестов'
	@body[:text_info2]
	else 
		@subject    += 'Please activate your new account'
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
