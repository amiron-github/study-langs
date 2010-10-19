class Word < ActiveRecord::Base
belongs_to :category
has_many :user_words
has_many :cluster_words
has_many :clusters, :through=> :cluster_words
has_many :users, :through=> :user_words

cattr_reader :per_page
@@per_page = 100

  def  word_lang
	self.category.lang
  end

end
