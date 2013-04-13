class UserdataController < ApplicationController
before_filter :is_admin
layout "admin"

  def index
    @users = User.find(:all, :order=> 'id DESC')
	unless params[:all]
		@users = @users.paginate :page => params[:page], :order => 'id DESC', :per_page=> 100
	end
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @users }
    end
  end
  
  def show_subscr
    all = User.find(:all, :order=> 'id DESC')
	@users = []
	
	all.each do |user|
		if user.payment
			user[:expire] =  user.expiration_time
			@users<<user
		end
	end
	
	@users = @users.sort_by{ |user| user[:expire] }
	
	@users_2 = []
	all.each do |user|
		if user.paid
			user[:expired_date] = user.expired_date
			@users_2<<user
		end
	end
	@users_2 = @users_2.sort_by{ |user| user[:expired_date] }.reverse
	
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
  
   def add_setting
	user=User.find(params[:id])
	if !user.setting
		setting = Setting.new()
		user.setting = setting
		render :js =>'$("#s_'+params[:id]+'").fadeOut(50)'
	else
		render :js =>'alert("Already exists")'
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
	order[:send_email] = 0
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
  
  def see_user_words
	user = User.find(params[:user])
	words = user.words
	uw = []
	words.each do |word|
		uw << ERB::Util.html_escape(word.text)
	end
		uw = uw.join("<br>")
	render :js => '$("<div style=\"text-align: left; padding-left: 30px;\"></div>").html("'+uw+'").dialog({height: 400, modal: true, title: "User words", buttons: { "Ok": function() { $(this).dialog("close"); } } })'
	
  end
  
  
private 

  def is_admin
	unless logged_in? && current_user.email == "mirumir.sasha@gmail.com"
		redirect_to root_url
	end
  end

end
