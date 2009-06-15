class SiteController < ApplicationController
  def page
    @file = request.path
    @file = '/index.html' if @file == '/'
    layout = @file.match(/\/comments\//) ? 'comments.html.erb' : 'application'
    layout = 'comment_audios.html.erb' if @file.match(/\/comments_audio\//)

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

    render :file => "pages#{@file}.erb", :layout => layout
  rescue StandardError => e
    logger.warn e
    render :file => "#{RAILS_ROOT}/public/404.html", :status => '404 Not Found'
  end
end
