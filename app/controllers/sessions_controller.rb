# This controller handles the login/logout function of the site.  
class SessionsController < ApplicationController
  # Be sure to include AuthenticationSystem in Application Controller instead
  include AuthenticatedSystem
layout :layout_by_lang
  # render new.rhtml
  def new
	@lang = params[:lang]
	@to_lang = params[:to_lang]
  end

  def create
	layout_lang= params[:lang]
	to_lang = params[:to_lang]
    logout_keeping_session!
    user = User.authenticate(params[:email], params[:password])
    if user
      # Protects against session fixation attacks, causes request forgery
      # protection if user resubmits an earlier form using back
      # button. Uncomment if you understand the tradeoffs.
      # reset_session
      self.current_user = user
      new_cookie_flag = (params[:remember_me] == "1")
      handle_remember_cookie! new_cookie_flag
	  if layout_lang == 'ru'
		if to_lang=='jp'
			redirect_back_or_default('/ru/jp/user_profile')
		elsif to_lang=='en'
			redirect_back_or_default('/ru/en/user_profile.html')
		elsif to_lang=='fr'
			redirect_back_or_default('/ru/fr/user_profile')
		end
	  elsif layout_lang == 'fr'
		if to_lang=='ru'
			redirect_back_or_default('/fr/ru/user_profile')
		elsif to_lang=='en'
			redirect_back_or_default('/fr/en/user_profile')
		end
	  else
		redirect_back_or_default('/user_profile.html')
	  end
    else
      note_failed_signin
      @email       = params[:email]
      @remember_me = params[:remember_me]
      @error_pas   = "PW/email incorrect"
	  @lang = params[:lang]
	  @to_lang = params[:to_lang]
      render :action => 'new'
    end
  end

  def destroy
	layout_lang = params[:lang]
	to_lang = params[:to_lang]
    logout_killing_session!
    #flash[:notice] = "You have been logged out."
	if layout_lang == 'fr'
		if to_lang == 'ru'
			redirect_back_or_default('/fr/ru/')
		elsif to_lang == 'en'
			redirect_back_or_default('/fr/en/')
		else
			redirect_back_or_default('/fr/')
		end
	elsif layout_lang == 'ru'
		if to_lang == 'jp'
				redirect_back_or_default('/ru/jp/')
		elsif to_lang == 'fr'
				redirect_back_or_default('/ru/fr/')
		else 
				redirect_back_or_default('/ru/en/')
		end
	else
			redirect_back_or_default('/')
	end
  end
  
private
	def determine_layout
		layout_lang = params[:lang]
		to_lang = params[:to_lang]
		if layout_lang == 'fr'
			'fr_application.rhtml'
		elsif layout_lang == 'ru'
			if to_lang == 'jp'
				'ru_jp_application'
			else 
				'ru_en_application'
			end
		else
			'application'
		end
	end

protected
  # Track failed login attempts
  def note_failed_signin
    flash[:error] = "Couldn't log you in as '#{params[:login]}'"
    logger.warn "Failed login for '#{params[:login]}' from #{request.remote_ip} at #{Time.now.utc}"
  end
  
  
  
end
