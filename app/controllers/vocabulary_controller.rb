class VocabularyController < ApplicationController
layout :determine_layout

  def build_flashcard
	@javascripts = []
	@stylesheets = []
	@javascripts << 'jquery.jplayer.min.js'
    @javascripts << 'flashcard-k'
    @stylesheets << 'flashcard'
	@javascripts << 'virtual-keyboard'
	@stylesheets << 'keyboard'
	@lang = params[:lang]
	
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
  
    def build_vocabulary
	@lang = params[:lang]
	@category = Category.find(:first, :conditions => ['tag=?', params[:category]])
	@words = @category.words.find(:all, :order => 'order_num')
	if @lang == 'fr'
		@category_title = @category.title_fr
		render(:action => 'fr_vocabulary')
	else 
		@category_title = @category.title
		render(:action => 'vocabulary' )
	end
	 
  end


private
	def determine_layout
		layout_lang = params[:lang]
		if layout_lang == 'fr'
			'fr_application.rhtml'
		else
			'application'
		end
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

end
















