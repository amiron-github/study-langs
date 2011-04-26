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
		render(:action => 'fr_ru_vocabulary')
	elsif @lang == 'ru'
		if @add_lang == 'en'
			@category_short_tag = params[:category]
			@category_title =  @category.title_ru
			render(:action => 'ru_en_vocabulary')
		elsif @add_lang == 'jp'
			@category_short_tag = params[:category]
			@category_title =  @category.title_ru
			render(:action => 'ru_jp_vocabulary')
		else 
			@category_title = @category.title
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
		render(:action => 'fr_ru_flashcard' )
	elsif @lang == 'ru'
		@category_short_tag = params[:category]
		@category_title =  @category.title_ru
		if @add_lang == 'en'
			render(:action => 'ru_en_flashcard')
		elsif @add_lang == 'jp'
			render(:action => 'ru_jp_flashcard')
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
	@test_data = data_for_test(@category)
	
	if @lang == 'fr'
		@category_title = @category.title_fr
		render(:action => 'fr_ru_test' )
	elsif @lang == 'ru'
		@category_short_tag = params[:category]
		@category_title =  @category.title_ru
		if @add_lang == 'en'
			render(:action => 'ru_en_test')
		elsif @add_lang == 'jp'
			render(:action => 'ru_jp_test')
		else 
			render(:action => 'test' )
		end
	else 
		@category_title = @category.title
		render(:action => 'test' )
	end
  end
  
  def build_lesson
	@lang = params[:lang]
	@add_lang = params[:to_lang]
	@category_tag = params[:category]
	@lesson = params[:lesson]
	@category_title == ''
	if @add_lang == 'en'
		@category_tag =  @category_tag+'_en'
	elsif @add_lang == 'jp'
		@category_tag =  @category_tag+'_jp'
	end 
	@category = Category.find(:first, :conditions => ['tag=?', @category_tag ])	
	@all_words = @category.words.find(:all, :order => 'order_num')
	
	len = 10
	first = @lesson.to_f*len - len
	
	@words = @all_words.slice(first, len)
	@learnt = @all_words.slice(0, @lesson.to_f*len)

	if (@lesson.to_f == 4 && @category_tag == 'hiragana_jp') || (@lesson.to_f == 4 && @category_tag == 'katakana_jp')
		@words = @all_words.slice(first, 8)
		@learnt = @all_words.slice(0, @lesson.to_f*len -2)
	end
	
	if (@lesson.to_f == 5 && @category_tag == 'hiragana_jp') || (@lesson.to_f == 5 && @category_tag == 'katakana_jp')
		@words = @all_words.slice(first-2, len)
	end
	
	if @learnt.length > 40 
		@learnt = @learnt.slice(@learnt.length-40, 40)
	end
	
	@category_title = @category.title_ru
	if @category_tag == 'hiragana_jp' || @category_tag == 'katakana_jp'
		render(:action => 'kana_lesson' )
	else
		render(:action => 'kanji_lesson' )
	end
  end
  
private
	def determine_layout
		layout_lang = params[:lang]
		add_lang = params[:to_lang]
		layout = 'application'
		case layout_lang 
			when 'fr'
				if add_lang == 'en'
					layout =  'fr_en_application.rhtml'
				elsif add_lang == 'ru'
					layout =  'fr_ru_application.rhtml'
				end
			when 'ru'
				if add_lang == 'en'
					layout =  'ru_en_application.rhtml'
				elsif add_lang == 'jp'
					layout =  'ru_jp_application.rhtml'
				end
		end
		return layout
	end
	
	def data_for_test(category)
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
		case original
			when 'en'
		      exceptions << {:tag => 'politeness_en', :except=> [787,775] }
			when 'fr'
		      exceptions << {:tag => 'politeness', :except=> [] }
			when 'ru'
		      exceptions << {:tag => 'politeness', :except=> [2,5,28,21,24,29]}
			  exceptions << {:tag => 'acquaintance', :except=> [44,45,40,39,42]}
			  exceptions << {:tag => 'airport', :except=> [57,61,73]}
			  exceptions << {:tag => 'bus', :except=> [87,89,82,83]}
			  exceptions << {:tag => 'subway', :except=> [101,102]}
			  exceptions << {:tag => 'taxi', :except=> [117,119]}
			  exceptions << {:tag => 'hotel', :except=> [147,150,153,135,146]}
			  exceptions << {:tag => 'services', :except=> [160,167,165,168,173,176]}
			  exceptions << {:tag => 'city', :except=> [220,224,228,240,239] }
			  exceptions << {:tag => 'sightseeing', :except=> [188,191,194,197,199] }
		end
		exceptions.each do |t|
			if category_tag == t[:tag]
				new_words = []
				to_exclude = t[:except]
				words.each_with_index do |word, ind|
					unless to_exclude.include?(word.id)
						new_words << word
					end
				end
				words = new_words
			end
		end
		
		return words
	end

end
















