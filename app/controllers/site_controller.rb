class SiteController < ApplicationController
  def page
    @file = request.path
    @file = '/index.html' if @file == '/'
    layout = @file.match(/\/comments\//) ? 'comments.html.erb' : 'application'
    layout = 'comment_audios.html.erb' if @file.match(/\/comments_audio\//)
    render :file => "pages#{@file}.erb", :layout => layout
  rescue StandardError => e
    logger.warn e
    render :file => "#{RAILS_ROOT}/public/404.html", :status => '404 Not Found'
  end
end
