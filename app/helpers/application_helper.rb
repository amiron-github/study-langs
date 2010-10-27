# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper

	def short_tag(tag)
		tag.gsub(/_en/,'').gsub(/_fr/,'').gsub(/_jp/,'')
	end

end
