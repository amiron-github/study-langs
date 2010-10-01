class RemoveEnwordTable < ActiveRecord::Migration
  def self.up
	add_column :categories, :supercategory, :string
	add_column :categories, :title_fr, :string
	add_column :categories, :lang, :string
	drop_table :enwords
	drop_table :encategories
  end
  def self.down
	raise ActiveRecord::IrreversibleMigration
  end
end
