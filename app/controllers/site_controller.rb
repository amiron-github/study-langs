class SiteController < ApplicationController
  def page
    @file = request.path
    @file = '/index.html' if @file == '/'
    logger.warn(@file)
    layout = @file.match(/\/comments\//) ? 'comments.html.erb' : 'application'
    layout = 'comment_audios.html.erb' if @file.match(/\/comments_audio\//)
	layout = 'grammar_comments.html.erb' if @file.match(/\/grammar_comments\//)
	layout = 'fr_application.rhtml' if @file.match(/\/fr\//)
	 
	 
	if @file.match(/\/ru\//)  
		if @file.match(/\/ru\/fr\//) 
			layout = 'ru_fr_application.rhtml'
		elsif @file.match(/\/ru\/jp\//) 
			layout = 'ru_jp_application.rhtml'
		else 
			layout = 'ru_application.rhtml'
		end
	end

    # configure javascripts and stylesheets based on page name
    @javascripts = []
    @stylesheets = []
    case @file
    when /-exercise\.html$/
      @javascripts << 'exercises'
      @stylesheets << 'exercises'
    when /-test\.html$/
      @javascripts << 'test'
      @javascripts << 'test-text'
      @stylesheets << 'test-style'
    when /unit\d\d\.html$/
      @javascripts << 'test'
      @javascripts << 'test-text'
      @stylesheets << 'test-style'
	  @stylesheets << 'grammar-exercises'
    when /reading-practice\d\.html$/
      @javascripts << 'test'
      @javascripts << 'test-text'
      @stylesheets << 'test-style'
      @stylesheets << 'stylesounds'
    when /phonetics\d\d\.html$/
      @javascripts << 'test-text'
      @stylesheets << 'test-style'
      @stylesheets << 'stylesounds'
    when /(memory|balloon-game)\.html$/
      @javascripts << 'vocabulary'
    end
	
	@hide_html = '<div class="hidden_content">Available for subscribed users</div>'
	@hide_title= '<div class="hidden_content" style="font-size: 18px;">The full version of the lesson is available for subscribed users<br/><span style="font-size: 10pt;">See details on the page <a href="/everyday-course.html">Everyday Russian Course</a></span></div>'	
    if (((@file=='/user_profile.html')||(@file=='/user_profile1.html') )&& (!current_user ))
    redirect_back_or_default('/')
    else
    logger.warn("pages#{@file}.erb")
    render :file => "pages#{@file}.erb", :layout => layout	
    end

  rescue StandardError => e
    logger.warn e
    render :file => "pages/404.html", :status => '404 Not Found', :layout => layout	
  end
end
