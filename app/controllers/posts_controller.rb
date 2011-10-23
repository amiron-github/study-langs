class PostsController < ApplicationController

layout :layout_by_lang
before_filter :login_required 
require_role "admin", :only => [:index,:show,:new]

  # GET /posts
  # GET /posts.xml
  def index
    @posts = Post.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @posts }
    end
  end

  # GET /posts/1
  # GET /posts/1.xml
  def show
    @post = Post.find(params[:id])
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @post }
    end
  end

  # GET /posts/new
  # GET /posts/new.xml
  def new
    @post = Post.new
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @post }
    end
  end

  # GET /posts/1/edit
  def edit
    @post = Post.find(params[:id])
	unless admin_or_owner_required?(@post.user_id)
		back_rescued
	end
  end

  # POST /posts
  # POST /posts.xml
  def create
    @post = Post.new(params[:post])
	if has_nickname?(current_user) 
		respond_to do |format|
		@verify = check_topic_content('1', params[:post][:content])
		if @verify < 1
		  if @post.save
			@topic = Topic.find(@post.topic_id)
			@topic.update_attribute(:last_post_at, Time.now)
			flash[:notice] = 'Post was successfully created.'
			format.html { redirect_to :controller=> 'topics', :action=>'show', :id=>@post.topic_id }
			format.xml  { render :xml => @post, :status => :created, :location => @post }
		  else
			format.html { back_rescued }
			format.xml  { render :xml => @post.errors, :status => :unprocessable_entity }
		  end
		else 
			format.html { back_rescued }
			format.xml  { render :xml => @post.errors, :status => :unprocessable_entity }
		end
		end
	else
	  back_rescued
	end
  end
  
  def change_post
  	@post = Post.find(params[:id])
	if admin_or_owner_required?(@post.user_id)
		respond_to do |format|
		  if @post.update_attributes(params[:post])
			flash[:notice] = 'Post was successfully updated.'
			format.html { redirect_to :controller=> 'topics', :action=>'show', :id=>@post.topic_id }
			format.xml  { head :ok }
		  else
			flash[:notice] = 'Post not updated.'
			format.html { redirect_to :controller=> 'topics', :action=>'show', :id=>@post.topic_id }
			format.xml  { render :xml => @post.errors, :status => :unprocessable_entity }
		  end
		end
	else
		back_rescued
	end
  end

  # PUT /posts/1
  # PUT /posts/1.xml
  def update
  	@post = Post.find(params[:id])
	params[:post][:content] = sanitize_content(params[:post][:content])
	if admin_or_owner_required?(@post.user_id)
		respond_to do |format|
		  if @post.update_attributes(params[:post])
			flash[:notice] = 'Post was successfully updated.'
			format.html { redirect_to :controller=> 'topics', :action=>'show', :id=>@post.topic_id }
			format.xml  { head :ok }
		  else
			format.html { redirect_to :controller=> 'topics', :action=>'show', :id=>@post.topic_id }
			format.xml  { render :xml => @post.errors, :status => :unprocessable_entity }
		  end
		end
	else
		back_rescued
	end
  end

  # DELETE /posts/1
  # DELETE /posts/1.xml
  def destroy
    @post = Post.find(params[:id])
	if admin_or_owner_required?(@post.user_id)
		topic = @post.topic_id
		if !first_post_in_topic(@post,topic.id) || current_user.has_role?('admin')
			@post.destroy
		else
		
		end
		respond_to do |format|
		  format.html { redirect_to :controller=> 'topics', :action=>'show', :id=>@post.topic_id }
		  format.xml  { head :ok }
		end
	else
		back_rescued
	end
  end
  
private

	def first_post_in_topic(post,topic_id)
		topic = post.topic
		if topic.posts.first.id == post.id && topic.forum_id==1
			return true
		else 
			return false
		end	

	end
  
  
  
end





