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
  
end

