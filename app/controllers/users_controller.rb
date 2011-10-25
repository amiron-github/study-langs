class UsersController < ApplicationController
  # Be sure to include AuthenticationSystem in Application Controller instead
  include AuthenticatedSystem
  include ActiveMerchant::Billing::Integrations
  
  layout :determine_layout
  
  
  # Protect these actions behind an admin login
  # before_filter :admin_required, :only => [:suspend, :unsuspend, :destroy, :purge]
  skip_before_filter :verify_authenticity_token, :only => [:success_pp]
  before_filter :find_user, :only => [:suspend, :unsuspend, :destroy, :purge]
	before_filter :find_current, :only => [:save_pass, :save_user, :update_user, :update_pass, :del, :del_stat, :set_stat, :get_trial]


  # render new.rhtml
  def new
	@lang = params[:lang]
	@to_lang = params[:to_lang]
    @user = User.new
		@user.lang = @lang
		@user.to_lang = @to_lang
  end
 
  def create
    logout_keeping_session!
    @user = User.new(params[:user])
		@user.lang = params[:lang]
		@user.to_lang = params[:to_lang]
	@lang = params[:lang]
	@to_lang = params[:to_lang]
    @user.register! if @user && @user.valid?
    success = @user && @user.valid?
    if success && @user.errors.empty?
	  @u_mail = @user.email
	  if @lang == 'ru'
		flash[:notice] = "Мы выслали Вам письмо с кодом для активации аккаунта"
	  else 
		flash[:notice] = "Thanks for signing up!  We're sending you an email with your activation code."
	  end
      setting = Setting.new()
	  @user.setting = setting
      render :action => 'create_success'
    else
      flash[:error]  = "We couldn't set up that account, sorry.  Please try again, or contact an admin."
      render :action => 'new'
    end
  end

  def activate
  
    logout_keeping_session!
    user = User.find_by_activation_code(params[:activation_code]) unless params[:activation_code].blank?
	
	user.lang = params[:lang]
	user.to_lang = params[:to_lang]
	
    case
    when (!params[:activation_code].blank?) && user && !user.active?
      user.activate!
      
	  if params[:lang] == 'ru'
	  flash[:notice] = "Регистрация окончена! Теперь Вы можете войти в свой аккаунт"
		if params[:to_lang] == 'en'
			redirect_to '/ru/en/login'
		end
	  else
		flash[:notice] = "Signup complete! Please sign in to continue."
		redirect_to '/login'
	  end
    when params[:activation_code].blank?
      flash[:error] = "The activation code was missing.  Please follow the URL from your email."
      redirect_back_or_default('/')
    else 
      flash[:error]  = "We couldn't find a user with that activation code -- check your email? Or maybe you've already activated -- try signing in."
      redirect_back_or_default('/')
    end
  end
  
   
  def save_pass
    if !current_user 
    redirect_back_or_default('/')
    else 
    if (current_user.authenticated?(params[:password]))
      case
      when (!params[:new_password].blank?)&&(!params[:confirm_password].blank?)&&(params[:confirm_password]==params[:new_password])
    	current_user.update_attribute(:password, params[:new_password])
		@success="success"
		@status =0
      when (params[:confirm_password]!=params[:new_password])
      @error_val="You entered incompatible passwords"
	  @status =2
      logger.warn("empty value")
      end
    else
      @error_pas = "You entered incorrect password"
	  @status =1	  
    end
		if request.xhr?
          render :js => 'userPassChanging("'+@status.to_s+'")'
        else
          render :action => 'update_pass'
		end
    end
  end

  def set_stat 
    if !current_user
		render :nothing => true
    else
      test = current_user.user_tests.find(:first, :conditions => 'test_id=\''+params[:test_id].to_s+'\'')
	  good_boy = false
	  average=0
	  category_id = Exercise.find(:first, :conditions=>['test_id=?', params[:test_id]], :select=>'category_id').category_id
	  completed = current_user.get_test_by_category(category_id)
	  category_words = Category.find(category_id).words
	  result = params[:correct].to_f/params[:total].to_f*100
	  completed.each do |done|
			average = done.correct.to_f/done.total.to_f*100
			if average > 90 && category_words.length > 0 && done.test_id !=params[:test_id] && result > 89
				good_boy = true
				current_user.record_words(category_words)
			end
	  end	  
	  
      if !test
		current_user.user_tests.create(:test_id=>params[:test_id].to_s,:total=>params[:total],:correct=>params[:correct])
      else
		if test.correct<params[:correct].to_i || test.total != params[:total].to_i
	     test.update_attributes(:correct => params[:correct], :total => params[:total])
		end 
	   end
	   if good_boy
			render :nothing => true
	   else 
			render :nothing => true
	   end
    end
  end
    
  def set_word  
    if !current_user
	  render :nothing => true
    else
		twords = params[:words]
		tword_id = twords.to_i
		t_word = Word.find(tword_id)
		new_cat = false
		if t_word
			category_id = t_word.category.id
			new_cat = current_user.check_new_category(category_id)
		end
		current_user.record_words(twords)
		if new_cat
			render :js => 'messageIt("'+new_cat.title.to_s+'")'
		else
			render :nothing => true
		end
    end
  end
  
  
  def delete_topic_words_and_tests
	category_id =  params[:topic]
	category_tag = Category.find(category_id).tag
	current_user.remove_words_by_topic(category_id)
	current_user.remove_tests_by_topic(category_id)
	render :js => ' $("#topic_'+category_tag.to_s+'").fadeOut(function(){ $(this).remove() }); updateUserResults() '
  end
  

	def buy
#		ord_id = rand(36**20).to_s(36)
#    logger.warn("param " + params[:product_id])

#current_user.orders.create(:status=>0, :type_id =>1, :ord_id => ord_id, :product_id => params[:product_id])

#		logger.warn("not rendering!!!!!!!!!")

#		params[:ord_id] = ord_id		

#		render :text =>ord_id, :layout =>false

		logger.warn "BUY"

							 
		redirect_to("https://www.paypal.com/cgi-bin/webscr",params)
	end
  
  def get_stat1 
    if !current_user
    redirect_back_or_default('/')
    else
     res='var userProgress=new Array('
     current_user.user_tests.each do |t|
     res = res +'["' +t.test_id+'",'+t.total.to_s+','+t.correct.to_s+'],'  
#var userProgress=new Array( 
#["v0201030.3",8,5], ["v0203030.3",8,5], ["v0203030.3",8,7],["v0103030.3",8,8],["v0101010.1",8,6],["p010202a.II.a)",8,6],["p010303a.I.a)",8,6],["p010403a.II.a)",8,6], ["p010102a.II.a)",8,6],["p010104b.IV.b)",8,8]
#);
     
     end
    res+=");"
    render :text => '', :layout =>false
    end
   return res
  end


  def save_user
    if !current_user 
    redirect_back_or_default('/')
    else

    if (current_user.authenticated?(params[:password]))
      case
      when (!params[:email].blank?)
        logger.warn("Change email")
        current_user.update_attribute(:email, params[:email])
      	@success = "success"
      	@email= params[:email] 
      else 
      @error_val="You can't use empty value"
      logger.warn("empty value")
      end
    else
      @error_pas = "You entered incorrect password"      
    end
    render :action => 'update_user'
    end
  end
  
  def del
    if !current_user
    redirect_back_or_default('/')
    else
      if (params[:password]) 
	      if (current_user.authenticated?(params[:password]))
	      current_user.delete!
	      logout_keeping_session!
			if request.xhr?
				render :js => 'window.location.href="/";'
			else
				redirect_back_or_default('/') 
			end
	      else 
			if request.xhr?
				render :js => 'userDelEr()'
			else
				@error_pas = "You entered incorrect password"	
			end
      	  end
      end	
    end
  end

  def del_stat
    if !current_user
		redirect_back_or_default('/')
    else
	@status = -1
      if (params[:password])
		if (current_user.authenticated?(params[:password]))
			current_user.user_tests.delete_all
			@success="succes"
			@status = 0
        else
			@error_pas = "You entered incorrect password"
			@status = 1
        end
      end
	  if request.xhr?
          render :js => 'userStatDeleting('+@status.to_s+')'
      else
		render :action => 'del_stat'
	  end
	  
    end
  end

  def show_cart
   @ord_id = rand(36**20).to_s(36)
  end

  def new_order
		ord_id = rand(36**20).to_s(36)
    current_user.orders.create(:status=>0, :type_id =>1, :ord_id => ord_id, :product_id => params[:product_id] || 4)
		logger.warn("not rendering!!!!!!!!!")
	  render :text =>ord_id, :layout =>false
		return ord_id
  end

  def note_failed
    flash[:error] = "You entered incorrect password"
  end

  def suspend
    @user.suspend! 
    redirect_to users_path
  end

  def unsuspend
    @user.unsuspend! 
    redirect_to users_path
  end

  def destroy
    @user.delete!
    redirect_to users_path
  end

  def purge
    @user.destroy
    redirect_to users_path
  end

	def paypal_ipn
		notify = Paypal::Notification.new(request.raw_post)
		order = current_user.orders.find(:first, :conditions => 'ord_id=\''+params[:ord_id]+ '\'')
		if notify.acknowledge
		begin
			logger.warn("WOW acknowledge!!!!!")

			if notify.complete? && (order.ord_id == params[:ord_id])
				order.update_attribute(:status, 2)				
				logger.warn("Payment complete from "+current_user.email)
#            shop.ship(order)
			else
				logger.error("Failed to verify Paypal's notification, please investigate")
			end

			rescue => e
			order.update_attribute(:status, -1)
			logger.warn("RESCUE")          
    	end
		end
    end

	def gettrial  	
	current_user.orders.create(:type_id =>0, :ord_id => "free_purchase", :status => 2)
  redirect_back_or_default("/user_profile.html")
	end

	def success_pp
			

	end
  
  # There's no page here to update or destroy a user.  If you add those, be
  # smart -- make sure you check that the visitor is authorized to do so, that they
  # supply their old password along with a new one to update it, etc.
  
  def update_nick
  if !current_user
	  render :nothing => true
    else
		name = sanitize_string(params[:user_name])
		user = current_user
		@status =0
		taken_names = Material.find(347).body
		taken= ActiveSupport::JSON.decode(taken_names)
		if name.length >50
			@status = 3
		elsif name.length <2
			@status = 2
		elsif User.find(:first, :conditions=>["name=? and id!=?",name,user.id])
			@status = 1
		elsif taken['names'].include?(name.downcase)
			@status = 1
		end
		if @status == 0
			if user.update_attribute(:name, name)
				render :js => 'userNameChanging('+@status.to_s+',"'+no_js(name)+'")'
			else
				render :js => 'alert("Saving failed :(")'
			end
		else
			render :js => 'userNameChanging('+@status.to_s+',"'+no_js(name)+'")'
		end
	end
  end
  
  def update_desc
  if !current_user
	  render :nothing => true
    else
		desc = sanitize_string(params[:user_desc])
		setting = current_user.setting
		@status =0
		if desc.length >200
			@status = 3
		end
		if @status == 0
			if setting.update_attribute(:desc, desc)
				html_desc = ActionController::Base.helpers.simple_format(desc)
				if desc.length < 1
					html_desc = '<i>'+t('forum.string.not_available')+'</i>'
				end
				render :js => 'userDescChanging('+@status.to_s+',"'+no_js(html_desc)+'","'+no_js(desc)+'")'
			else
				render :js => 'alert("Saving failed :(")'
			end
		else
			render :js => 'userDescChanging('+@status.to_s+',"'+no_js(desc)+'","")'
		end
	end
  end
  
  def change_userpic  
    if !current_user
	  render :nothing => true
    else
		user = current_user
		picture = sanitize_string(params[:userpic])
		if user.setting.update_attribute(:picture, picture)
			render :js => 'userPicChanged("'+ no_js(picture)+'")'
		else
			render :js => 'alert("Saving failed!")'
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


protected
  def find_user
    if (params[:id])
    @user = User.find(params[:id]) 
		end
  end

	def find_current
	redirect_back_or_default("/") unless current_user	
	end


end
