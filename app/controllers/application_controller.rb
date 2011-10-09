# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  include ExceptionNotifiable
  include AuthenticatedSystem
  include RoleRequirementSystem

  helper :all # include all helpers, all the time

  # See ActionController::RequestForgeryProtection for details
  # Uncomment the :secret if you're not using the cookie session store
  protect_from_forgery :secret => '8071ad691d608fbd4a3a2aef84e41355'
  
  # See ActionController::Base for details 
  # Uncomment this to filter the contents of submitted sensitive data parameters
  # from your application log (in this case, all fields with names like "password"). 
  # filter_parameter_logging :password
 
	before_filter :set_locale
 
	def set_locale
		I18n.locale = params[:lang] || I18n.default_locale
	end

  	def layout_by_lang
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
	

	def admin_or_owner_required?(id)  
		if current_user.id == id || current_user.has_role?('admin')  
			return true
		else
			return false
		end  
	end	
	
  def back_rescued
		redirect_to :back
	rescue ActionController::RedirectBackError
		redirect_to root_path
  end

  def add_forum_css_js
  	@javascripts = []
	@stylesheets = []
	@stylesheets  << 'custom-theme/jquery-ui-1.8.5.custom.css'
	@stylesheets  << 'forum'
	@javascripts  << 'forum'
	@javascripts  << 'jquery-ui-1.8.16.dial.min.js'
  end
  
  	def has_nickname?(user) 
		if user.name == '' || user.name == nil || user.name.empty? || user.name.blank?
			return false
		else
			return true
		end
	end
	
	def check_user?(user)
		if user.valid?
			return true
		else
			false
		end
	end
	
	def sanitize_string (content)
		content = ActionController::Base.helpers.sanitize( content.to_s, :tags=>%w()).strip
		return content
	end
	
	def no_js(content)
		content = ActionController::Base.helpers.escape_javascript( content.to_s).strip
		return content
	end
	
	def sanitize_content(content)
		new_content = ActionController::Base.helpers.sanitize(content, :tags => %w(b i em strong u s strike))
		new_content = content.to_s.gsub('&', '&amp;').gsub('<', '&lt;').gsub('>', '&gt;')
		%w(b i em strong u s strike p).each { |x|
         new_content.gsub!(Regexp.new('&lt;(' + x + ')&gt;(.+?)&lt;/('+x+')&gt;',
                 Regexp::MULTILINE|Regexp::IGNORECASE), 
                 "<\\1>\\2</\\1>") 
        }
		return new_content.to_s.strip
	end
	
  def check_topic_content(title, content)
	title_len = title.strip.length
	cont_len = content.strip.length
	if title_len < 1 || title_len > 250
		return 1
	elsif cont_len < 1 || cont_len  > 10000
		return 2
	else
		return 0
	end
  end	
 

  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  protected

  # Automatically respond with 404 for ActiveRecord::RecordNotFound
  def record_not_found
    render :file => File.join(RAILS_ROOT, 'public', '404.html'), :status => 404
  end
end
