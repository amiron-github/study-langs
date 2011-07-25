module SiteHelper
  
  def mark_learned(words) #should be a hash of :text + :occured
	new_s = []
	words.each do |w|
		if w[:occurred].to_f > 0 && w[:occurred].to_f < 4
			s = '<span style="color: #7F6C17; font-weight: bold" title="Пройдено">'+w[:text]+'</span>'
			new_s << s
		elsif w[:occurred].to_f >=4  && w[:occurred].to_f < 7
			s = '<span style="color: #0AAF30;  font-weight: bold" title="Изучено">'+w[:text]+'</span>'
			new_s << s
		elsif w[:occurred].to_f >=7
			s = '<span style="color: #DF0048;  font-weight: bold" title="Усвоено">'+w[:text]+'</span>'
			new_s << s
		else
			s = '<span>'+w[:text]+'</span>'
			new_s << s	
		end
	end
	return new_s
  end
  
  def html_by_id(id)
	material=Material.find(id).body
	return material
  end
  
  def material_by_id(id)
	material=Material.find(id)
	return material
  end
  
  def material(id)
	ad_horizont = render :partial => '/site/ad_horizont'
	ad_btm = render :partial => '/site/ad_btm'
	material=Material.find(id)
	material.body = ERB.new(material.body).result(binding)
	material.js_css = ERB.new(material.js_css).result(binding)
	return material
  end
  
  def hidden_content()
	inserted_content = render :partial => '/site/hidden_block'
	return inserted_content
  end  
  
end

