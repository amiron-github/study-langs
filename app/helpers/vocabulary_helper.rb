module VocabularyHelper

  def voc_spaces 
	list_spaces = []
	case @category_tag 
		when 'politeness'
			list_spaces = [2,12,28,10,15]
		when 'acquaintance'
			list_spaces = [49,40,35]
		when 'bus'
			list_spaces = [82]
		when 'subway'
			list_spaces = [97]
		when 'taxi'
			list_spaces = [118]
		when 'hotel'
			list_spaces = [135]
		when 'services'
			list_spaces = [162]
		when 'city'
			list_spaces = [220]
		when 'sightseeing'
			list_spaces = [191]
		when 'clothing'
			list_spaces = [421]	
		when 'perfumery'
			list_spaces = [514]
		when 'jewelry'
			list_spaces = [549, 553, 543]
		when 'language-skills'
			list_spaces = [1247,602,630,618,608]
		when 'bank'
			list_spaces = [700,689,701,1260]
		when 'telephone'
			list_spaces = [745]
		when 'greetings_en'
			list_spaces = [753, 758]
		when 'politeness_en'
			list_spaces = [778,775];
	end
	return list_spaces
  end
  
  def except_from_flash(index)
	exceptions = []
	case @category_tag 
		when 'greetings_en'
			#exceptions = [1,2]
	end
	return exceptions.include?(index)
  end
  
  def quest_num_from(item)
		quest_num =15
		unless item == nil || item == ''
			unless item.quest_num == nil || item.quest_num == ''
				quest_num = item.quest_num
			end
		end
		
		return quest_num
  end
  
end









