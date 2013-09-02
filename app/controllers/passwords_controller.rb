class PasswordsController < ApplicationController
layout :layout_by_lang

  def new
    @password = Password.new
    @lang = params[:lang]
	@to_lang = params[:to_lang]
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @password }
    end
  end

  def create
	@lang = params[:lang]
	@to_lang = params[:to_lang]
    @password = Password.new(params[:password])
    @password.user = User.find_by_email(@password.email)

    respond_to do |format|
      if @password.save
	    @password.user.lang = @lang
		@password.user.to_lang = @to_lang
        PasswordMailer.deliver_forgot_password(@password)
		if @lang == 'ru'
			flash[:notice] = "Ссылка для смены пароля выслана на адрес <span style=\"color: #000\"> #{@password.email} </span>."
		else 
			flash[:notice] = "A link to change your password has been sent to #{@password.email}."
		end
		if @lang == 'ru'
			#if @to_lang == 'en'
				format.html { redirect_to(:action => 'new', :lang => @lang, :to_lang => @to_lang)}
			#end
		else
			format.html { redirect_to(:action => 'new') }
		end
        format.xml  { render :xml => @password, :status => :created, :location => @password }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @password.errors, :status => :unprocessable_entity, :lang => @lang, :to_lang => @to_lang }
      end
    end
  end

  def reset
    begin
      @user = Password.find(:first, :conditions => ['reset_code = ? and expiration_date > ?', params[:reset_code], Time.now]).user
	  @lang = params[:lang]
	  @to_lang = params[:to_lang]
    rescue
      flash[:notice] = 'The change password URL you visited is either invalid or expired.'
      redirect_to(new_password_path)
    end    
  end

  def update_after_forgetting
    @user = Password.find_by_reset_code(params[:reset_code]).user
	@lang = params[:lang]
	@to_lang = params[:to_lang]
    respond_to do |format|
      if @user.update_attributes(params[:user])
#        flash[:notice] = 'Password was successfully updated.'
	@success="ok"
        format.html { render(:action => :reset, :reset_code => params[:reset_code]) }
      else
#        flash[:notice] = 'EPIC FAIL!'
        format.html { redirect_to(:action => :reset, :reset_code => params[:reset_code]) }
      end
    end
  end
  
  def update
    @password = Password.find(params[:id])
	@lang = params[:lang]
	@to_lang = params[:to_lang]
    respond_to do |format|
      if @password.update_attributes(params[:password])
        flash[:notice] = 'Password was successfully updated.'
        format.html { redirect_to(@password) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @password.errors, :status => :unprocessable_entity }
      end
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

end
