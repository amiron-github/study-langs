class VocabularyController < ApplicationController
layout :determine_layout

  def build_flashcard
	@javascripts = []
	@stylesheets = []
	@javascripts << 'jquery.jplayer.min.js'
    @javascripts << 'flashcard-u'
    @stylesheets << 'flashcard'
	@javascripts << 'virtual-keyboard'
	@stylesheets << 'keyboard'
	@lang = params[:lang]
	@add_lang = params[:to_lang]
	
	@category = Category.find(:first, :conditions=> ['tag=?', params[:category]])
	@words = words_for_flash(params[:category], @lang)
	
	if @lang == 'fr'
		@category_title = @category.title_fr
		render(:action => 'fr_flashcard' )
			
	else 
		@category_title = @category.title
		render(:action => 'flashcard' )
	end
  end
  
  def build_test
	@javascripts = []
	@stylesheets = []
	 @javascripts << 'test'
     @javascripts << 'test-text'
     @stylesheets << 'test-style'
	 @javascripts << 'jquery.jplayer.min.js'
	 @javascripts << 'lexical-test'
     @stylesheets << 'lexical-test'
	@lang = params[:lang]
	@add_lang = params[:to_lang]

	@category = Category.find(:first, :conditions=> ['tag=?', params[:category]])
	@words = words_for_test(params[:category], @lang)
	@test_ids = ids_for_test(@category)
	
	if @lang == 'fr'
		@category_title = @category.title_fr
		render(:action => 'fr_test' )
			
	else 
		@category_title = @category.title
		render(:action => 'test' )
	end
  end
  
    def build_vocabulary
	@lang = params[:lang]
	@add_lang = params[:to_lang]
	@category_tag = params[:category]
	@category_title == ''
	if @add_lang == 'en'
		@category_tag =  @category_tag+'_en'
	elsif @add_lang == 'jp'
		@category_tag =  @category_tag+'_jp'
	end 
	@category = Category.find(:first, :conditions => ['tag=?', @category_tag ])
	@words = @category.words.find(:all, :order => 'order_num')
	if @lang == 'fr'
		@category_title = @category.title_fr
		render(:action => 'fr_vocabulary')
	elsif @lang == 'ru'
		if @add_lang == 'en'
			@category_title =  @category.title_ru
			render(:action => 'ru_en_vocabulary')

		else 
			render(:action => 'vocabulary' )
		end
	else 
		@category_title = @category.title
		render(:action => 'vocabulary' )
	end
	 
  end


private
	def determine_layout
		layout_lang = params[:lang]
		add_lang = params[:to_lang]
		layout = 'application'
		case layout_lang 
			when 'fr'
			 layout =  'fr_application.rhtml'
			when 'ru'
				if add_lang == 'en'
					layout =  'ru_en_application.rhtml'
				elsif add_lang == 'jp'
					layout =  'ru_jp_application.rhtml'
				end
		end
		return layout
	end
	
	def ids_for_test(category)
	
		tests = category.exercises.find(:all)
		return tests
	end
	
	def words_for_flash(url_name, lang)
		fr_attr = []; ru_attr = []; en_attr = []
		attr = []
		fr_attr << {:url=> 'politieness', :tag => 'politeness_ru_fr'}
		case lang 
			when 'ru'
				attr = ru_attr
			when 'fr'
				attr = fr_attr
		end
		words = false
		attr.each do |a|
			if url_name == a[:url]
				cat = Cluster.find(:first, :conditions => ['tag=?', a[:tag]])
				words = cat.words.find(:all, :include => :cluster_words, :order => 'cluster_words.order_num')
			end
		end
		if !words 
			cat = Category.find(:first, :conditions=> ['tag=?', url_name])
			words = cat.words.find(:all, :order => 'order_num')
		end
		return words
	end
	
	def words_for_test(url_name, lang)
		fr_attr = []; ru_attr = []; en_attr = []
		attr = []
		fr_attr << {:url=> 'politieness', :tag => 'politeness_ru_fr'}
		case lang 
			when 'ru'
				attr = ru_attr
			when 'fr'
				attr = fr_attr
		end
		words = false
		attr.each do |a|
			if url_name == a[:url]
				cat = Cluster.find(:first, :conditions => ['tag=?', a[:tag]])
				words = cat.words.find(:all, :include => :cluster_words, :order => 'cluster_words.order_num')
			end
		end
		if !words 
			cat = Category.find(:first, :conditions=> ['tag=?', url_name])
			words = cat.words.find(:all, :order => 'order_num')
		end
		return words
	end

end
















