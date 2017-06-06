class SiteController < ApplicationController

  def page
    @file = request.path
    @file = '/index.html' if @file == '/'
    logger.warn(@file)
    layout = @file.match(/\/comments\//) ? 'comments.html.erb' : 'application'
	layout = 'ajax.rhtml' if @file.match(/\/ajax\//)
    layout = 'comment_audios.html.erb' if @file.match(/\/comments_audio\//)
	layout = 'grammar_comments.html.erb' if @file.match(/\/grammar_comments\//)
	
	if @file.match(/\/ru\//)  
		@file = '/ru/jp/index.html' if @file == '/ru/jp/' || @file == '/ru/jp'
		@file = '/ru/fr/index.html' if @file == '/ru/fr/' || @file == '/ru/fr'
		@file = '/ru/en/index.html' if @file == '/ru/en/' || @file == '/ru/en'
		@file = '/ru/de/index.html' if @file == '/ru/de/' || @file == '/ru/de'
		@file = '/ru/es/index.html' if @file == '/ru/es/' || @file == '/ru/es'
		@file = '/ru/it/index.html' if @file == '/ru/it/' || @file == '/ru/it'
		@file = '/ru/pt/index.html' if @file == '/ru/pt/' || @file == '/ru/pt'
		@file = '/ru/ch/index.html' if @file == '/ru/ch/' || @file == '/ru/ch'
		@file = '/ru/gr/index.html' if @file == '/ru/gr/' || @file == '/ru/gr'
		@file = '/ru/pl/index.html' if @file == '/ru/pl/' || @file == '/ru/pl'
		@file = '/ru/ru/index.html' if @file == '/ru/ru/' || @file == '/ru/ru'
		@file = '/ru/pl/index.html' if @file == '/ru/pl/' || @file == '/ru/pl'
		@file = '/ru/index.html' if @file == '/ru/' || @file == '/ru'
		
		if @file.match(/\/ru\/fr\//) 
			layout = 'ru_fr_application.rhtml'
		elsif @file.match(/\/ru\/jp\//) 
			layout = 'ru_jp_application.rhtml'
		elsif @file.match(/\/ru\/en\//) 
			layout = 'ru_en_application.rhtml'
		elsif @file.match(/\/ru\/de\//) 
			layout = 'ru_de_application.rhtml'
		elsif @file.match(/\/ru\/es\//) 
			layout = 'ru_es_application.rhtml'
		elsif @file.match(/\/ru\/it\//) 
			layout = 'ru_it_application.rhtml'
		elsif @file.match(/\/ru\/pt\//) 
			layout = 'ru_pt_application.rhtml'
		elsif @file.match(/\/ru\/ch\//) 
			layout = 'ru_ch_application.rhtml'
		elsif @file.match(/\/ru\/gr\//) 
			layout = 'ru_gr_application.rhtml'
		elsif @file.match(/\/ru\/pl\//) 
			layout = 'ru_pl_application.rhtml'
		elsif @file.match(/\/ru\/ru\//) 
			layout = 'ru_ru_application.rhtml'
		else 
			layout = 'ru_application.rhtml'
		end
	end
	if @file == '/en/'	
		@file = '/en/index.html'
		layout = 'en_application.rhtml'
	end	
	if @file == '/en/fr/' ||@file == '/en/fr'
		@file = '/en/fr/index.html'
		layout = 'en_fr_application.rhtml'
	end
	if @file == '/en/es/' ||@file == '/en/es'
		@file = '/en/es/index.html'
		layout = 'en_es_application.rhtml'
	end
	if @file == '/en/de/' ||@file == '/en/de'	
		@file = '/en/de/index.html'
		layout = 'en_de_application.rhtml'
	end
	if @file == '/en/jp/'	
		@file = '/en/jp/index.html'
		layout = 'en_jp_application.rhtml'
	end
	if @file == '/fr/'	|| @file == '/fr'
		@file = '/fr/index.html'
		layout = 'fr_application.rhtml'
	end
		@file = '/fr/ru/index.html' if @file == '/fr/ru/' || @file == '/fr/ru'
		@file = '/fr/en/index.html' if @file == '/fr/en/' || @file == '/fr/en'  
		
		if @file.match(/\/fr\/ru\//) 
			layout = 'fr_ru_application.rhtml'
		elsif @file.match(/\/fr\/en\//) 
			layout = 'fr_en_application.rhtml'
		end


	if @file.match(/\/newd\//)
		layout = 'new.rhtml'
	end
	
	@no_ad = true
	
	if logged_in?
		@no_ad = true
	end
    # configure javascripts and stylesheets based on page name
    @javascripts = []
    @stylesheets = []
    case @file
    when /-exercise\.html$/
      @javascripts << 'exercises'
      @stylesheets << 'exercises'
    when /-test\.html$/

    when /unit\d\d\.html$/
      @javascripts << 'ev-test'
	when /-flashcards\.html$/
      @javascripts << 'jquery.jplayer.min.js'
      @javascripts << 'flashcard-k'
      @stylesheets << 'flashcard'
	  @javascripts << 'virtual-keyboard'
	  @stylesheets << 'keyboard'
    when /(memory|balloon-game)\.html$/
      @javascripts << 'vocabulary'
	when /(ru_words)\.html$/
		@words_statistics = current_user.categories_by_language('ru')
	when /(en_words)\.html$/
		@words_statistics = current_user.categories_by_language('en')
	when /(ru_jp_words)\.html$/
		@words_statistics = current_user.categories_by_language('jp')
	when /(ru_jp_hkk)\.html$/
		@words_statistics = current_user.categories_hkk('jp')
	when /(ru_results)\.html$/
		@vocabulary_exercises = current_user.get_cat_ex('ru')

		@course_exercises = current_user.get_course_results(Exercise::EVERYDAY_RU, 'everyday_course')
		
		@every_exercises = current_user.get_detailed_results(Exercise::EVERYDAY_RU_NEW, 'everyday_course')
		@beginner_exercises = current_user.get_course_results(Exercise::BEGINNER_RU, 'beginner_course')
		@phonetics_exercises = current_user.get_course_results(Exercise::PHONETICS_RU, 'phonetics_course')
		@reading_exercises = current_user.get_course_results(Exercise::READING_RU, 'reading_course')
		@gr_data = Material.find(262).body
		@gr_ex_data = ActiveSupport::JSON.decode(@gr_data)
		
		@grammar_exercises = current_user.get_course_json(@gr_ex_data, 'grammar_course')
		
	when /(en_results)\.html$/
		@vocabulary_exercises = current_user.get_cat_ex('en')
		@vocabulary_exercises[:name] = 'Словарь'
		@kids_ex_data = ActiveSupport::JSON.decode(Material.find(363).body)
		@kids_exercises = current_user.get_course_json(@kids_ex_data, 'kids_lessons_en')
		
		@grammar_ex_data = ActiveSupport::JSON.decode(Material.find(380).body)
		@grammar_exercises = current_user.get_course_json(@grammar_ex_data, 'grammar_en')
	
		@lessons_ex_data = ActiveSupport::JSON.decode(Material.find(379).body)
		@lessons = current_user.get_course_json(@lessons_ex_data, 'lessons_en')
		
	when '/ru/jp/kanji.html'
		kanji1 = Category.find(95).words.find(:all, :order => 'order_num')
		kanji2 = Category.find(96).words.find(:all, :order => 'order_num')
		@kanji_01 = u_words_stat(kanji1)
		@kanji_02 = u_words_stat(kanji2)
	when '/ru/jp/writing.html'
		words1 = Category.find(36).words.find(:all, :order => 'order_num')
		words2 = Category.find(37).words.find(:all, :order => 'order_num')
		@hiragana = u_words_stat(words1)
		@katakana = u_words_stat(words2)
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
  
  def u_words_stat(cat_words)
	new_words = []
  	if !current_user
		cat_words.each do |w|
			new_words << {:text => w.text, :occured => 0}
		end
	else
		new_words = current_user.get_words_occured(cat_words)
	end
	return new_words
  end
  
  
end










