class AddColumnsToSettings < ActiveRecord::Migration
  def self.up
	add_column :settings, :desc, :text
	add_column :settings, :f_avatars, :integer
	add_column :settings, :f_opt1, :integer
	add_column :settings, :f_opt2, :integer
	add_column :settings, :des_opt1, :integer
	add_column :settings, :des_opt2, :integer
  end

  def self.down 
	remove_column :settings, :desc
	remove_column :settings, :f_avatars
	remove_column :settings, :f_opt1
	remove_column :settings, :f_opt2
	remove_column :settings, :des_opt1
	remove_column :settings, :des_opt2
  end
end
