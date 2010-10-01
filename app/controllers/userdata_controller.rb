class UserdataController < ApplicationController
before_filter :is_admin
layout "admin"

  def index
    @users = User.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @users }
    end
  end
  
  def show
    @user = User.find(params[:id])
	category = 2
	@cat_exercises = @user.user_tests.all(:joins => 'left outer join exercises ON `exercises`.test_id = `user_tests`.test_id', :conditions => {'exercises.category_id' => 2})
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @user }
    end
  end
  

  def make_admin
	user = User.find(params[:user_id])
	if !user.has_role?("admin")
		user.roles << Role.find_by_name("admin")
	end
	if request.xhr?
		render :update do |page|
			page << '$("#user_'+ params[:user_id]+'").find("td:eq(0)").css({border: "1px solid yellow"});'
		end
	else
		redirect_to(:back)
	end
  end
  
 def disadmin
	user = User.find(params[:id])
	if user.has_role?("admin")
		user.roles.delete( Role.find_by_name("admin") )
	end
	if request.xhr?
		render :update do |page|
			page << '$(".role_admin").remove()'
		end
	else
		redirect_to(:back)
	end
  end
  
  def edit_expiration_date
	user = User.find(params[:id])
	order = user.orders.find(:first, :conditions => 'status>0 and expired_at >= now()')
	
	if order.update_attribute(:expired_at, params[:expiration_date])
		info = order.expired_at.to_s(:long)
		
		render :js => '$(".exp_time").text("'+info+'").css({backgroundColor: "#FDFF00"}).animate({backgroundColor: "#fff"}, 1000)'
	else 
		render :js => 'alert("Update fails")'
	end 
  end
  
  def edit_state
	user = User.find(params[:id])
	user.update_attribute(:state, params[:status])
	if user.activated_at == nil 
		user.update_attribute(:activated_at, params[:time])
	end
	redirect_to(:back) 
  end
  
  def edit_payment
	user = User.find(params[:id])
	user.orders.create(:type_id =>0, :status => 2)
	redirect_to(:back)
  end
  
 
private 

  def is_admin
	unless logged_in? && current_user.email == "mirumir.sasha@gmail.com"
		redirect_to root_url
	end
  end

end
