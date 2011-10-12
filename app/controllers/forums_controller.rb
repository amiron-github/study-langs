class ForumsController < ApplicationController

layout :layout_by_lang
before_filter :login_required, :only => [:show_favorites, :show_my_posts]
require_role "admin", :except => [:show, :show_by_cat, :show_cat, :show_favorites,:show_my_posts]


  # GET /forums/1
  # GET /forums/1.xml
  def show
    @forum = Forum.find(params[:id])
	langs = sort_by_lang(params[:lo])
	@find_status = '0'
	if params[:lo]
		@find_status = params[:lo]
		cookies[:f_lopt] = params[:lo]
	elsif cookies[:f_lopt]
		@find_status = cookies[:f_lopt]
		langs = sort_by_lang(@find_status)
	end
	@view_type = '0'
	if params[:view]
		@view_type=params[:view]
	end
	if langs
		@topics = @forum.topics.find(:all, :conditions => ['lang=? and to_lang=?', langs[0],langs[1]], :order=>'last_post_at DESC').paginate :page => params[:page], :per_page=> 15
	else 
		@topics = @forum.topics.find(:all, :order => 'last_post_at DESC').paginate :page => params[:page], :per_page=> 15
	end
	add_forum_css_js 
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @forum }
    end
  end

   def show_by_cat
    @forum = Forum.find(params[:id])
	@find_status = '0'
	if params[:lang]&&params[:to_lang]
		@find_status=fcategories_status(params[:lang],params[:to_lang])
	else
		@find_status=fcategories_status('en','ru')
	end
	if params[:lo]
		@find_status = params[:lo]
		cookies[:f_cat_lopt] = params[:lo]
		#if params[:lo]=='0'
		#	cookies.delete :f_cat_lopt
		#end
	elsif cookies[:f_cat_lopt]
		@find_status = cookies[:f_cat_lopt]
	end
	
	if @find_status == '0'
		@fcategories = Fcategory.find(:all)
	else
		@fcategories = Fcategory.find(:all, :conditions => ['status=? or status=?', @find_status,0])
	end
	@fcategories.each do |cat|
		len = 0
		cat.topics.each do |topic|
			len = len + topic.posts.length
		end
		cat[:posts_len] = len
	end
	@posts_length = Topic
	add_forum_css_js 
    respond_to do |format|
      format.html { render :action => 'show_by_cat' }
      format.xml  { render :xml => @forum }
    end
  end
  
  def show_favorites
    @forum = Forum.find(params[:id])
	#@topics = @forum.topics.find(:all, :order => 'last_post_at DESC').paginate :page => params[:page], :per_page=> 10
	
	@topics = []
	current_user.favorites.each do |favorite|
		if favorite.topic
			@topics << favorite.topic
		end
	end
	
	@topics = @topics.paginate :page => params[:page], :per_page=> 15
	
	add_forum_css_js 
    respond_to do |format|
      format.html { render :action => 'show_favorites' }
      format.xml  { render :xml => @forum }
    end
  end

  def show_my_posts
    @forum = Forum.find(params[:id])
	@my_posts = current_user.posts
	@topics = []
	
	current_user.posts.each do |post|
		if post.topic
			@topics << post.topic
		end
	end
	@topics = @topics.uniq.sort_by{ |topic| topic[:last_post_at] }.reverse
	@topics = @topics.paginate :page => params[:page], :per_page=> 15
	add_forum_css_js 
    respond_to do |format|
      format.html { render :action => 'show_my_posts' }
      format.xml  { render :xml => @forum }
    end
  end  
  
  def show_cat
    @forum = Forum.find(params[:forum_id])
	@cat = Fcategory.find(params[:cat_id])
	@topics = @cat.topics.find(:all, :order => 'last_post_at DESC').paginate :page => params[:page], :per_page=> 15
	add_forum_css_js
    respond_to do |format|
      format.html { render :action => 'show_cat' }
      format.xml  { render :xml => @forum }
    end
  end

  # GET /forums
  # GET /forums.xml
  def index
    @forums = Forum.all
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @forums }
    end
  end

  # GET /forums/new
  # GET /forums/new.xml
  def new
    @forum = Forum.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @forum }
    end
  end

  # GET /forums/1/edit
  def edit
    @forum = Forum.find(params[:id])
  end

  # POST /forums
  # POST /forums.xml
  def create
    @forum = Forum.new(params[:forum])

    respond_to do |format|
      if @forum.save
        flash[:notice] = 'Forum was successfully created.'
        format.html { redirect_to(@forum) }
        format.xml  { render :xml => @forum, :status => :created, :location => @forum }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @forum.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /forums/1
  # PUT /forums/1.xml
  def update
    @forum = Forum.find(params[:id])

    respond_to do |format|
      if @forum.update_attributes(params[:forum])
        flash[:notice] = 'Forum was successfully updated.'
        format.html { redirect_to(@forum) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @forum.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /forums/1
  # DELETE /forums/1.xml
  def destroy
    @forum = Forum.find(params[:id])
    @forum.destroy

    respond_to do |format|
      format.html { redirect_to(forums_url) }
      format.xml  { head :ok }
    end
  end

private  
  def sort_by_lang(option)
	langs = [0,0]
	if option == '1'
		langs = [2,1]
	elsif option == '2'
		langs = [1,2]
	else 
		langs = false
	end
	return langs
  end
  
  def fcategories_status(lang,to_lang)
	status= '0'
	if lang == 'en'&& to_lang == 'ru' 
		status = '1'
	elsif lang == 'ru'&& to_lang == 'en' 
		status = '2'
	end
	return status
  end	
  
end
