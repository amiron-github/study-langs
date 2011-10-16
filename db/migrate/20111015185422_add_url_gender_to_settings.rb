class AddUrlGenderToSettings < ActiveRecord::Migration
  def self.up
	add_column :settings, :url, :string
	add_column :settings, :gender, :integer
  end

  def self.down
	remove_column :settings, :url
	remove_column :settings, :gender
  end
end
