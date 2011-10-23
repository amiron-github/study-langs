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
				@lang = t('langs.short.'+lang['short_en'])
			end
		end
		return @lang
	end
	
	def show_post_time(time)
		#return time.strftime("%H:%M %m/%d/%Y")
		return l(time, :format=>:short_f)
	end
	
  def userpage_for(user) 
		url = user.id
		if user.setting
			unless !user.setting.url || user.setting.url.strip == ''
				url = user.setting.url
			end
		end
		url= url_for(:controller => 'forums', :action => 'show_user_posts', :id=>1, :user_id=>url)
		return url
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
  
  def category_name(category)
	name = category.name
	if I18n.locale == 'ru'
		name = category.name_ru
	end
	return name
  end
  
  def category_desc(category)
	desc = category.desc
	if I18n.locale == 'ru'
		name = category.desc_ru
	end
	return name
  end
  
  def comment_word(number)
	comment = t('comment.other')
	if number%10 == 1 && number%100!= 11
		comment = t('comment.one')
	elsif number%10 > 1 && number%10 <5 && number%100!= 12&& number%100!= 13&& number%100!= 14
		comment = t('comment.few')
	end
	return comment
  end
  
  def in_topics(number)
	topic = t('in_topic.other')
	if number%10 == 1 && number%100!= 11
		topic = t('in_topic.one')
	end
	return topic
  end
	
end
