class RenameCategoryColumn < ActiveRecord::Migration
  def self.up
	rename_column :topics, :category, :fcategory_id
  end

  def self.down
	rename_column :topics, :fcategory_id, :category
  end
end
