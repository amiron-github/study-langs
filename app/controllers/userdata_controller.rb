class UserdataController < ApplicationController
before_filter :is_admin


  def index
    @users = User.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @users }
    end
  end
  
  
  
  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @user }
    end
  end
  
  
 
private 

  def is_admin
	unless logged_in? && current_user.email == "mirumir.sasha@gmail.com"
		redirect_to root_url
	end
  end

end
