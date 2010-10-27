class SiteController < ApplicationController

  def page
    @file = request.path
    @file = '/index.html' if @file == '/'
    logger.warn(@file)
    layout = @file.match(/\/comments\//) ? 'comments.html.erb' : 'application'
	layout = 'ajax.rhtml' if @file.match(/\/ajax\//)
    layout = 'comment_audios.html.erb' if @file.match(/\/comments_audio\//)
	layout = 'grammar_comments.html.erb' if @file.match(/\/grammar_comments\//)
	
	if @file.match(/\/fr\//)
		@file = '/fr/index.html' if @file == '/fr/'
		layout = 'fr_application.rhtml'
	end
	
	if @file.match(/\/ru\//)  
		@file = '/ru/jp/index.html' if @file == '/ru/jp/'
		@file = '/ru/fr/index.html' if @file == '/ru/fr/'
		@file = '/ru/en/index.html' if @file == '/ru/en/'
		
		if @file.match(/\/ru\/fr\//) 
			layout = 'ru_fr_application.rhtml'
		elsif @file.match(/\/ru\/jp\//) 
			layout = 'ru_jp_application.rhtml'
		elsif @file.match(/\/ru\/en\//) 
			layout = 'ru_en_application.rhtml'
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
	  @javascripts << 'jquery.jplayer.min.js'
	  @javascripts << 'lexical-test'
      @stylesheets << 'lexical-test'
    when /unit\d\d\.html$/
      @javascripts << 'ev-test'
    when /reading-practice\d\.html$/
      @javascripts << 'test'
      @javascripts << 'test-text'
      @stylesheets << 'test-style'
      @stylesheets << 'stylesounds'
	when /-flashcards\.html$/
      @javascripts << 'jquery.jplayer.min.js'
      @javascripts << 'flashcard-k'
      @stylesheets << 'flashcard'
	  @javascripts << 'virtual-keyboard'
	  @stylesheets << 'keyboard'
    when /phonetics\d\d\.html$/
      @javascripts << 'test-text'
      @stylesheets << 'test-style'
      @stylesheets << 'stylesounds'
    when /(memory|balloon-game)\.html$/
      @javascripts << 'vocabulary'
	when /(ru_words)\.html$/
		@vocabulary_exercises = current_user.get_cat_ex
		@words_statistics = current_user.categories_by_language('ru')
	when /(en_words)\.html$/
		@vocabulary_exercises = current_user.get_cat_ex
		@words_statistics = current_user.categories_by_language('en')
	when /(ru_results)\.html$/
		@vocabulary_exercises = current_user.get_cat_ex
		@course_exercises = current_user.get_course_results(Exercise::EVERYDAY_RU, 'everyday_course')
		@beginner_exercises = current_user.get_course_results(Exercise::BEGINNER_RU, 'beginner_course')
		@phonetics_exercises = current_user.get_course_results(Exercise::PHONETICS_RU, 'phonetics_course')
		@reading_exercises = current_user.get_course_results(Exercise::READING_RU, 'reading_course')
		@grammar_exercises = current_user.get_course_results(Exercise::GRAMMAR_RU, 'grammar_course')
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










