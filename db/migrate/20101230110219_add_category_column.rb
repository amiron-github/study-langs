class AddCategoryColumn < ActiveRecord::Migration
  def self.up
	add_column :categories, :sound_status, :integer
  end

  def self.down
	remove_column :categories, :sound_status
  end
end
