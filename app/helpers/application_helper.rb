# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
require 'digest/md5'

	def short_tag(tag)
		tag.gsub(/_en/,'').gsub(/_fr/,'').gsub(/_jp/,'')
	end
	
	def owner?(id)  
		if current_user.id == id  
			return true  
		else  
			return false  
		end  
	end
	
	def admin_or_owner?(id)  
	 if logged_in?  
		if owner?(id) || current_user.has_role?('admin')
			return true 
		else
			return false
		end
	 else
		return false
	 end
	end
	
	def has_nickname?(user) 
		if user.name == '' || user.name == nil
			return false
		else
			return true
		end
	end
	
	def is_favorite?(topic_id)
		favorite = current_user.favorites.find(:first, :conditions => ['topic_id=?', topic_id ])
		if !favorite 
			return false
		else
			return true
		end
	end
	
	def has_my_post?(topic_id)
		has_post = false
		if logged_in?
			posts = Topic.find(topic_id).posts
			posts.each do |post|
				if post.user.id == current_user.id
					has_post = true
				end
			end
		end
		return has_post
	end
	def is_my_topic?(topic_id)
		is_my = false
		if logged_in?
			topic = Topic.find(topic_id)
			if topic.user.id == current_user.id
				is_my = true
			end
		end
		return is_my
	end
	
	def show_lang(id)
		langs_info = Topic::LANG
		@lang = 'Other'
		langs_info.each do |lang|
			if lang['id']== id
				@lang = lang['short_en']
			end
		end
		return @lang
	end
	
	def show_post_time(time)
		#return time.strftime("%H:%M %m/%d/%Y")
		return l time, :format=>:short_f
	end
	
  def gravatar_for(user) 
		email_address = user.email.downcase
		hash = Digest::MD5.hexdigest(email_address)
		image_src = "http://www.gravatar.com/avatar/#{hash}"
		return image_src
  end
  
  def userpic_for(user) 
		image_src = gravatar_for(user)+'?d=identicon&f=y'
		if user.setting
			unless !user.setting.picture || user.setting.picture.strip == ''
				image_src = user.setting.picture
			end
		end
		return image_src
  end

  
  def gravatar_url_for(user,width) 
		image_src = "http://www.gravatar.com/avatar/?d=mm"
		if user.setting
			image_src = user.setting.picture
		end 
		if !image_src || image_src.strip == ''
			email_address = user.email.downcase
			hash = Digest::MD5.hexdigest(email_address)
			image_src = "http://www.gravatar.com/avatar/#{hash}?s=#{width.to_s}&d=mm"
		end
		return image_src
  end	
	

	
end
