module VocabularyHelper

  def voc_spaces 
	list_spaces = []
	case @category_tag 
		when 'politeness'
			list_spaces = [6,14,20,24,26]
		when 'acquaintance'
			list_spaces = [5,9,11]
		when 'bus'
			list_spaces = [14]
		when 'subway'
			list_spaces = [12]
		when 'taxi'
			list_spaces = [9]
		when 'hotel'
			list_spaces = [24]
		when 'services'
			list_spaces = [23]
		when 'city'
			list_spaces = [34]
		when 'sightseeing'
			list_spaces = [23]
		when 'clothing'
			list_spaces = [23]	
		when 'perfumery'
			list_spaces = [23]
		when 'jewelry'
			list_spaces = [14, 26, 34]
		when 'language-skills'
			list_spaces = [6,11,18,26,30]
		when 'bank'
			list_spaces = [10,17,21,28]
		when 'telephone'
			list_spaces = [18]	
		when 'greetings_en'
			list_spaces = [6, 13]
		when 'politeness_en'
			list_spaces = [8,11];
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









