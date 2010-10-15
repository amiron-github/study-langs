class Cluster < ActiveRecord::Base
has_many :cluster_words
has_many :words, :through=> :cluster_words
validates_presence_of :tag
validates_uniqueness_of :tag

  def involves(word)
	if !words.find(:first, :conditions=> ['word_id=?', word.id])
		words << word
	end
  end 
  
  def removes(word)
	if words.find(:first, :conditions=> ['word_id=?', word.id])
		words.delete(word)
	end
  end
  
end
