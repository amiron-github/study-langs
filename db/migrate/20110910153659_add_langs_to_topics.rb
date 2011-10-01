class AddLangsToTopics < ActiveRecord::Migration
  def self.up
	  add_column :topics, :lang, :integer
	  add_column :topics, :to_lang, :integer
	  add_column :fcategories, :to_lang, :integer
  end
  def self.down
	  remove_column :topics, :lang
	  remove_column :topics, :to_lang
	  remove_column :fcategories, :to_lang
  end
end
