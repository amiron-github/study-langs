class UsersController < ApplicationController
  # Be sure to include AuthenticationSystem in Application Controller instead
  include AuthenticatedSystem
  include ActiveMerchant::Billing::Integrations
  require 'crypto42'  

  # Protect these actions behind an admin login
  # before_filter :admin_required, :only => [:suspend, :unsuspend, :destroy, :purge]
  skip_before_filter :verify_authenticity_token, :only => [:success_pp]
  before_filter :find_user, :only => [:suspend, :unsuspend, :destroy, :purge]
	before_filter :find_current, :only => [:save_pass, :save_user, :update_user, :update_pass, :del, :del_stat, :set_stat, :get_trial]


  # render new.rhtml
  def new
    @user = User.new
  end
 


  def create
    logout_keeping_session!
    @user = User.new(params[:user])
    @user.register! if @user && @user.valid?
    success = @user && @user.valid?
    if success && @user.errors.empty?
      flash[:notice] = "Thanks for signing up!  We're sending you an email with your activation code."
      render :action => 'create_success'
    else
      flash[:error]  = "We couldn't set up that account, sorry.  Please try again, or contact an admin (link is above)."
      render :action => 'new'
    end
  end

  def activate
    logout_keeping_session!
    user = User.find_by_activation_code(params[:activation_code]) unless params[:activation_code].blank?
    case
    when (!params[:activation_code].blank?) && user && !user.active?
      user.activate!
      flash[:notice] = "Signup complete! Please sign in to continue."
      redirect_to '/login'
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
      when (params[:confirm_password]!=params[:new_password])
      @error_val="You entered incompatible passwords"
      logger.warn("empty value")
      end
    else
      @error_pas = "You entered incorrect password" 
    end
    render :action => 'update_pass'

    end
  end

  def set_stat 
    if !current_user
    redirect_back_or_default('/')
    else
      test = current_user.user_tests.find(:first, :conditions => 'test_id=\''+params[:test_id].to_s+'\'')
      if !test
      current_user.user_tests.create(:test_id=>params[:test_id].to_s,:total=>params[:total],:correct=>params[:correct])
      else
       if test.correct<params[:correct].to_i
	     test.update_attribute(:correct,params[:correct])
       end 
      end  
    render :text => '', :layout =>false
    end
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
	current_user.update_attributes(params)
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
	      redirect_back_or_default('/') 
	      else 
	      @error_pas = "You entered incorrect password"		
      	      end
      end	
    end
  end

  def del_stat
    if !current_user
    redirect_back_or_default('/')
    else
      if (params[:password])
              if (current_user.authenticated?(params[:password]))
              current_user.user_tests.delete_all
              @success="succes"
              else
              @error_pas = "You entered incorrect password"
              end
      end
    end
  end

  def show_cart
   @ord_id = rand(36**20).to_s(36)
  end

  def new_order
		ord_id = rand(36**20).to_s(36)
    current_user.orders.create(:status=>0, :type_id =>1, :ord_id => ord_id)
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
