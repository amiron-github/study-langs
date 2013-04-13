class ForumsController < ApplicationController

layout :layout_by_lang
before_filter :login_required, :only => [:show_favorites, :show_my_posts]
require_role "admin", :except => [:show, :show_by_cat, :show_cat, :show_favorites,:show_my_posts,:show_user_posts]


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
	@view_type = list_view
	paging = pages_by_view(@view_type)
	if langs
		@topics = @forum.topics.find(:all, :conditions => ['lang=? and to_lang=?', langs[0],langs[1]], :order=>'last_post_at DESC').paginate :page => params[:page], :per_page=> paging
	else 
		@topics = @forum.topics.find(:all, :order => 'last_post_at DESC').paginate :page => params[:page], :per_page=> paging
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
	
#	if params[:lang]&&params[:to_lang]
#		@find_status=fcategories_status(params[:lang],params[:to_lang])
#	else
#		@find_status=fcategories_status('en','ru')
#	end
#	if params[:lo]
#		@find_status = params[:lo]
#		cookies[:f_cat_lopt] = params[:lo]
#		#if params[:lo]=='0'			#why is it commented?
#		#	cookies.delete :f_cat_lopt
#		#end
#	elsif cookies[:f_cat_lopt]
#		@find_status = cookies[:f_cat_lopt]
#	end
	
	if @find_status == '0'
		@fcategories = Fcategory.find(:all, :conditions => ['status > ?', -1])
	else
		search_status = @find_status
		if @find_status == '3' 
			search_status = '1' 
		end
		@spec_lang = sort_by_lang(@find_status)[0]
		@fcategories = Fcategory.find(:all, :conditions => ['status=? or status=?', search_status,0])
	end
	
	@fcategories.each do |cat|
		len = 0
		cat.topics.each do |topic|
			len = len + topic.posts.length
		end
		cat[:posts_len] = len
	end
	add_forum_css_js 
    respond_to do |format|
      format.html { render :action => 'show_by_cat' }
      format.xml  { render :xml => @forum }
    end
  end
  
  def show_favorites
    @forum = Forum.find(params[:id])
	#@topics = @forum.topics.find(:all, :order => 'last_post_at DESC').paginate :page => params[:page], :per_page=> 10
	@find_status = '0'
	if params[:lo]
		@find_status = params[:lo]
	end
	langs = sort_by_lang(@find_status)
	@favorites = current_user.favorites
	@topics = []
	@favorites.each do |favorite|
		if favorite.topic
			@topics << favorite.topic
		end
	end
	@view_type = list_view
	paging = pages_by_view(@view_type)
	if langs
		@topics = @topics.select{|topic| topic[:lang] == langs[0] || topic[:to_lang] == langs[1]}
	end
	@topics = @topics.sort_by{ |topic| topic[:last_post_at] }.reverse
	@topics = @topics.paginate :page => params[:page], :per_page=> paging
	add_forum_css_js 
    respond_to do |format|
      format.html { render :action => 'show_favorites' }
      format.xml  { render :xml => @forum }
    end
	
  end
  
  def show_user_posts
    @forum = Forum.find(params[:id])
	@user = User.find(:first, :conditions=>['id=?',params[:user_id]])
	if @user && @user.setting.url && @user.setting.url != ''
		@user = nil
	end
	unless @user
	@user = User.find(:first, :include=>:setting, :conditions => ['settings.url=?', params[:user_id]])
	end
	if @user && current_user && current_user.id == @user.id
			redirect_to :action => :show_my_posts
	else
		activity=users_topics_and_posts(@user)
		@topics = activity[0]
		@comments = activity[1]
		@comments_size = activity[2]
		add_forum_css_js 
		render :action => 'show_user'
	end
	rescue StandardError => e
		logger.warn e
		render :file => "pages/404.html", :status => '404 Not Found', :layout => layout_by_lang
  end

  def show_my_posts
    @forum = Forum.find(params[:id])
	@user=current_user
	activity=users_topics_and_posts(@user)
	@topics = activity[0]
	@comments = activity[1]
	@comments_size = activity[2]
	add_forum_css_js 
    render :action => 'show_my_posts'
	rescue StandardError => e
		logger.warn e
		render :file => "pages/404.html", :status => '404 Not Found', :layout => layout_by_lang	
  end
  
  def show_cat
    @forum = Forum.find(params[:forum_id])
	@cat = Fcategory.find(params[:cat_id])
	@find_status = @cat.status.to_s
	@view_type = list_view
	paging = pages_by_view(@view_type)
	if params[:l]
	  if params[:l] == '3' then @find_status = '3' end
	  @topics = @cat.topics.find(:all, :conditions=> ['lang=?', params[:l]], :order => 'last_post_at DESC').paginate :page => params[:page], :per_page=> paging
	else
	  @topics = @cat.topics.find(:all, :order => 'last_post_at DESC').paginate :page => params[:page], :per_page=> paging
	end
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
  def users_topics_and_posts(user)
	my_posts = user.posts
	topics = []
	comments= []
	my_posts.each do |post|
		if post.topic && post.topic.user
			if post.topic.user.id == user.id
				topics << post.topic
			else
				 comments << post.topic
			end
		end
	end
	comments_size = comments.length
	topics = topics.uniq.sort_by{ |topic| topic[:last_post_at] }.reverse
	comments = comments.uniq.sort_by{ |topic| topic[:last_post_at] }.reverse  
	result = [topics,comments,comments_size]
	return result
  end
  
  def sort_by_lang(option)
	langs = [0,0]
	if option == '1'
		langs = [2,1]
	elsif option == '2'
		langs = [1,2]
	elsif option == '3'
		langs = [3,1]
	elsif option == '4'
		langs = [1,3]
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
	elsif lang == 'fr'&& to_lang == 'ru' 
		status = '3'
	elsif lang == 'ru'&& to_lang == 'fr' 
		status = '4'
	end
	return status
  end	
  
  def list_view
	view_type = '0'
	if params[:view]
		view_type=params[:view]
		cookies[:f_view] = params[:view]
	elsif cookies[:f_view]
		view_type=cookies[:f_view]
	end
	return  view_type
  end
  
  def pages_by_view(view)
	paging = 20
  	if view == '2'
		paging = 30
	end
	return paging
  end
  
end
