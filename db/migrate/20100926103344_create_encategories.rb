class CreateEncategories < ActiveRecord::Migration
  def self.up
    create_table :encategories do |t|
      t.string :title
      t.string :title_ru
      t.integer :order_num

      t.timestamps
    end
  end

  def self.down
    drop_table :encategories
  end
end
