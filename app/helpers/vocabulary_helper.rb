module VocabularyHelper

  def voc_spaces 
	list_spaces = []
	case @category_tag 
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
	end
	return exceptions.include?(index)
  end
  
  def except_from_test(index)
	exceptions = []
	case @category_tag 
		when 'greetings_en'
	end
	return exceptions.include?(index)
  end

end
