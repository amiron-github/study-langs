class TopicsController < ApplicationController

layout :layout_by_lang
before_filter :login_required, :except => [:show]
before_filter :check_banned, :only=>[:create, :update_topic, :update_post]
require_role "admin", :only => [:index, :destroy]

  # GET /topics
  # GET /topics.xml
  def index
    @topics = Topic.all
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @topics }
    end
  end
  
  def add_to_favorite
    if !current_user
		render :nothing => true
    else
      topic = current_user.favorites.find(:first, :conditions => ['topic_id=?', params[:id] ])	  
	  
      if !topic
		current_user.favorites.create(:topic_id=>params[:id])
		render :js => '$("#fav_'+params[:id].to_s+'").html("<a href=\"javascript:;\" onclick=\"removeFavorite(\''+params[:id].to_s+'\',\''+I18n.locale+'\')\" title=\"'+t("msg.forum.from_favor")+'\"> <span class=\"f-init\"><img src=\"/images/icons/fugue/tick.png\"/></span><span class=\"f-hover\" ><img src=\"/images/icons/fugue/tick.png\"/></span></a>"); messageIt("<b>'+no_js(t("msg.forum.is_favor"))+'</b>",2)'
      else
		render :nothing => true
	  end
    end 
  end

  def remove_favorite
    if !current_user
		render :nothing => true
    else
      topic = current_user.favorites.find(:first, :conditions => ['topic_id=?', params[:id] ])	  
      if topic
		current_user.favorites.delete(topic)
		render :js => '$("#fav_'+params[:id].to_s+'").html("<a href=\"javascript:;\" onclick=\"addFavorite(\''+params[:id].to_s+'\',\''+I18n.locale+'\')\" title=\"'+t("msg.forum.to_favor")+'\"> <span class=\"f-init\"><img src=\"/images/icons/fugue/tick-grey.png\"/></span><span class=\"f-hover\"><img src=\"/images/icons/fugue/tick.png\"/></span></a>"); messageIt("<b>'+no_js(t("msg.forum.not_favor"))+'</b>",2)'
      else
		render :nothing => true
	  end
    end 
  end
  
  def remove_all_favorites
    if !current_user
		render :nothing => true
    else	  
		current_user.favorites.each do |favorite|
			current_user.favorites.delete(favorite)
		end
		render :js => 'alert(2)'
    end 
  end
  

  # GET /topics/1
  # GET /topics/1.xml
  def show
    @topic = Topic.find(params[:id])
	@topic_posts = @topic.posts
	@topic_first = @topic.posts.first
	@topic.posts.shift
	@topics_size = @topic_posts.length
	@post = Post.new
	@fcategories1=Fcategory.find(:all, :conditions=>['status=? or status=? or status=?',1,3,0])
	@fcategories2=Fcategory.find(:all, :conditions=>['status=? or status=?',2,0])
	@fcategories3=Fcategory.find(:all, :conditions=>['status=? or status=? or status=?',3, 1,0])
	@fcategories4=Fcategory.find(:all, :conditions=>['status=? or status=?',4,0])
	@fcategories=Fcategory.all(:all, :conditions=>['status>?',-1])
	@langs_option = define_lang_option(@topic).to_s
	
	@canonical_url = "" 
	init_url = "/forum/topic/"+@topic.id.to_s
	if @topic.lang != 0
		langs_info = Topic::LANG
		if @topic.lang==2 && @topic.to_lang==1 then @canonical_url = init_url end
		if @topic.lang==1 && @topic.to_lang==2 then @canonical_url = "/ru/en"+init_url end
		if @topic.lang==1 && @topic.to_lang==3 then @canonical_url = "/ru/fr"+init_url end
		if @topic.lang==3 && @topic.to_lang==1 then @canonical_url = "/fr/ru"+init_url end
	end
	
	
	add_forum_css_js
	unless logged_in? && current_user.has_role?("admin")
		views_num=@topic.views+1
		@topic.update_attributes(:views => views_num)
	end
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @topic }
    end
  end

  # GET /topics/new
  # GET /topics/new.xml
  def new
	add_forum_css_js
	if params[:lang]
		@langs_option=fcategories_status(params[:lang],params[:to_lang])
	else
		@langs_option='1'
	end
    @topic = Topic.new
	@forum = Forum.find(params[:forum])
	@post = Post.new
	@fcategories1=Fcategory.find(:all, :conditions=>['status=? or status=? or status=?',1,3,0])
	@fcategories2=Fcategory.find(:all, :conditions=>['status=? or status=?',2,0])
	@fcategories3=Fcategory.find(:all, :conditions=>['status=? or status=? or status=?',3, 1,0])
	@fcategories4=Fcategory.find(:all, :conditions=>['status=? or status=?',4,0])
	@fcategories=Fcategory.all(:all, :conditions=>['status>?',-1])
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @topic }
    end
  end

  # GET /topics/1/edit
  def edit
    @topic = Topic.find(params[:id])
	@langs = Topic::LANG
	unless admin_or_owner_required?(@topic.user_id)
		back_rescued
	end
  end

  # POST /topics
  # POST /topics.xml
  def create
	 @langs = define_langs(params[:lang_option])
     @topic = Topic.new(
				:name => sanitize_content(params[:topic][:name]), 
				:last_post_at => Time.now, 
				:last_poster_id => current_user.id,
				:user_id => current_user.id,
				:fcategory_id => params[:topic][:fcategory_id],
				:forum_id => params[:topic][:forum_id],
				:lang=>@langs[0],
				:to_lang=>@langs[1],
				:views =>0)

	 if has_nickname?(current_user)
			@verify = check_topic_content(params[:topic][:name], params[:post][:content])
		 if @verify < 1
		  if @topic.save 
			@post = Post.new(:content => sanitize_content(params[:post][:content]), :topic_id => @topic.id, :user_id => current_user.id)
			@post.save
				current_user.favorites.create(:topic_id=>@topic.id)
				#flash[:notice] = "Successfully created topic."
				redirect_to :controller=> 'topics', :action=>'show', :id=>@topic.id 
		  else  
			error = '1'
			#flash[:notice] = "Topic not saved"
			redirect_to :action => 'new', :forum=>params[:topic][:forum_id], :er=>error
		  end
		 else
			redirect_to :action => 'new', :forum=>params[:topic][:forum_id], :er=>@verify.to_s
		 end
	 else
	   back_rescued
	 end
  end
  
  def update_topic
    @topic = Topic.find(params[:id])
	@post = @topic.posts.first
	@langs = define_langs(params[:lang_option])
	if admin_or_owner_required?(@topic.user_id)
		respond_to do |format|
		@topic.name = sanitize_content(params[:topic][:name])
		@topic.lang = @langs[0]
		@topic.to_lang = @langs[1]
		@topic.fcategory_id = params[:topic][:fcategory_id]
			@verify = check_topic_content(params[:topic][:name], params[:post][:content])
			if @verify < 1
			  if @topic.save && @post.update_attribute(:content, sanitize_content(params[:post][:content]))
				#flash[:notice] = 'Topic was successfully updated.'
				format.html { redirect_to :controller=> 'topics', :action=>'show', :id=>@topic.id }
				format.xml  { head :ok }
			  else
				format.html { redirect_to :controller=> 'topics', :action=>'show', :id=>@topic.id }
				format.xml  { render :xml => @topic.errors, :status => :unprocessable_entity }
			  end
			else 
			format.html { redirect_to :controller=> 'topics', :action=>'show', :id=>@topic.id,:er=>@verify.to_s }
			end
		end
	else
		back_rescued
	end	
  end  
  
  def update_post
  	@post = Post.find(params[:id])
	if admin_or_owner_required?(@post.user_id)
		respond_to do |format|
		@verify = check_topic_content('1', params[:post][:content])
		if @verify < 1
		  if @post.update_attribute(:content, sanitize_content(params[:post][:content]))
			flash[:notice] = 'Post was successfully updated.'
			format.html { redirect_to :controller=> 'topics', :action=>'show', :id=>@post.topic_id }
			format.xml  { head :ok }
		  else
			flash[:notice] = 'Post not updated.'
			format.html { redirect_to :controller=> 'topics', :action=>'show', :id=>@post.topic_id }
			format.xml  { render :xml => @post.errors, :status => :unprocessable_entity }
		  end
		else 
			format.html { redirect_to :controller=> 'topics', :action=>'show', :id=>@post.topic_id, :er=>@verify.to_s }
			format.xml  { render :xml => @post.errors, :status => :unprocessable_entity }
		  end
		end
	else
		back_rescued
	end
  end
  

  # PUT /topics/1
  # PUT /topics/1.xml
  def update
    @topic = Topic.find(params[:id])
	if admin_or_owner_required?(@topic.user_id)
		respond_to do |format|
		  if @topic.update_attributes(params[:topic])
			flash[:notice] = 'Topic was successfully updated.'
			format.html { redirect_to(@topic) }
			format.xml  { head :ok }
		  else
			format.html { redirect_to(@topic) }
			format.xml  { render :xml => @topic.errors, :status => :unprocessable_entity }
		  end
		end
	else
		back_rescued
	end	
  end

  # DELETE /topics/1
  # DELETE /topics/1.xml
  def destroy
    @topic = Topic.find(params[:id])
	forum = @topic.forum_id
	
	if admin_or_owner_required?(current_user.id)
		@topic.destroy
		redirect_to (forum_path(forum))
	else
		back_rescued
	end
  end
  
private
	def define_langs(option)
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
			langs = [0,0]
		end
	end
	
	def define_lang_option(topic)
		option = 0
		if topic.lang == 2 && topic.to_lang == 1
			option = 1
		elsif topic.lang == 1 && topic.to_lang == 2
			option = 2
		elsif topic.lang == 3 && topic.to_lang == 1
			option = 3
		elsif topic.lang == 1 && topic.to_lang == 3
			option = 4
		else
			option = 0
		end
		return option
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
	
	def check_banned
		if current_user.setting.f_status == 1
			back_rescued
		end
	end

end
