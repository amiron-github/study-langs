class Word < ActiveRecord::Base
belongs_to :category
has_many :user_words
has_many :cluster_words
has_many :clusters, :through=> :cluster_words
has_many :users, :through=> :user_words

  def  word_lang
	self.category.lang
  end

end
