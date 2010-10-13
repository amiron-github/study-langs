class VocabularyController < ApplicationController
layout :determine_layout

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
			@category_short_tag = params[:category]
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

  def build_flashcard
	@javascripts = []
	@stylesheets = []
	@javascripts << 'jquery.jplayer.min.js'
    @javascripts << 'flashcard-u'
    @stylesheets << 'flashcard'
	@lang = params[:lang]
	@add_lang = params[:to_lang]
	@category_tag = params[:category]
	@category_title == ''
	if @lang != 'ru'
		@javascripts << 'virtual-keyboard'
		@stylesheets << 'keyboard'
	end
	
	if @add_lang == 'en'
		@category_tag =  @category_tag+'_en'
	elsif @add_lang == 'jp'
		@category_tag =  @category_tag+'_jp'
	end 	
	
	@category = Category.find(:first, :conditions => ['tag=?', @category_tag ])
	@words = words_for_flash(@category_tag, @lang)
	
	if @lang == 'fr'
		@category_title = @category.title_fr
		render(:action => 'fr_flashcard' )
	elsif @lang == 'ru'
		if @add_lang == 'en'
			@category_short_tag = params[:category]
			@category_title =  @category.title_ru
			render(:action => 'ru_en_flashcard')
		else 
			render(:action => 'flashcard' )
		end
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
	@category_tag = params[:category]
	@category_title == ''
	if @add_lang == 'en'
		@category_tag =  @category_tag+'_en'
	elsif @add_lang == 'jp'
		@category_tag =  @category_tag+'_jp'
	end 
	@category = Category.find(:first, :conditions=> ['tag=?', @category_tag])
	@words = words_for_test(@category, @add_lang, @lang)
	@test_ids = ids_for_test(@category)
	
	if @lang == 'fr'
		@category_title = @category.title_fr
		render(:action => 'fr_test' )
	elsif @lang == 'ru'
		if @add_lang == 'en'
			@category_short_tag = params[:category]
			@category_title =  @category.title_ru
			render(:action => 'ru_en_test')
		else 
			render(:action => 'test' )
		end
	else 
		@category_title = @category.title
		render(:action => 'test' )
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
	
	def words_for_flash(category_tag, lang)
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
			if category_tag == a[:url]
				cat = Cluster.find(:first, :conditions => ['tag=?', a[:tag]])
				words = cat.words.find(:all, :include => :cluster_words, :order => 'cluster_words.order_num')
			end
		end
		if !words 
			cat = Category.find(:first, :conditions=> ['tag=?', category_tag])
			words = cat.words.find(:all, :order => 'order_num')
		end
		return words
	end
	
	def words_for_test(category, original, translate_to)
		words = category.words.find(:all, :order => 'order_num')
		exceptions = []
		category_tag = category.tag
		case translate_to
			when 'ru'
		      exceptions << {:tag => 'politeness_en', :except=> [5,12] }
		end
		exceptions.each do |t|
			if category_tag == t[:tag]
				new_words = []
				to_exclude = t[:except]
				words.each_with_index do |word, ind|
				
					unless to_exclude.include?(ind)
						new_words << word
					end
				end
				
				words = new_words
			end
		end
		
		return words
	end

end
















