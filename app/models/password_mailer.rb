class PasswordMailer < ActionMailer::Base


  def forgot_password(password)
    str = if password.user.lang && password.user.to_lang then "#{password.user.lang}/#{password.user.to_lang}/" else "" end
    setup_email(password.user)
	
	@body[:lang] == 'en'
	if password.user.lang == 'ru'
		@body[:lang] = 'ru'
	end
	
    @subject    += 'You have requested to change your password'
    @body[:url]  = "#{APP_CONFIG[:site_url]}/#{str}change_password/#{password.reset_code}"

  end

  def reset_password(user)
    setup_email(user)
    @subject    += 'Your password has been reset.'
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
