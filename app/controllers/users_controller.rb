class UsersController < ApplicationController
  # Be sure to include AuthenticationSystem in Application Controller instead
  include AuthenticatedSystem
  
  # Protect these actions behind an admin login
  # before_filter :admin_required, :only => [:suspend, :unsuspend, :destroy, :purge]
  before_filter :find_user, :only => [:suspend, :unsuspend, :destroy, :purge]
  

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
      redirect_back_or_default('/')
      flash[:notice] = "Thanks for signing up!  We're sending you an email with your activation code."
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
      test = current_user.user_tests.find(:first, :conditions => 'test_id='+params[:test_id])
      if !test
      current_user.user_tests.create(:test_id=>params[:test_id],:total=>params[:total],:correct=>params[:correct])
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
    current_user.delete!
    logout_keeping_session!
    redirect_back_or_default('/')
    end
  end

  def clear_tests
    if !current_user
    redirect_back_or_default('/')
    else
    current_user.user_tests.delete_all
    render :text => '', :layout =>false
    end

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
  
  # There's no page here to update or destroy a user.  If you add those, be
  # smart -- make sure you check that the visitor is authorized to do so, that they
  # supply their old password along with a new one to update it, etc.

protected
  def find_user
    @user = User.find(params[:id])
  end
end
