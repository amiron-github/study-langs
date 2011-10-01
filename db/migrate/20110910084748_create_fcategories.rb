class CreateFcategories < ActiveRecord::Migration
  def self.up
    create_table :fcategories do |t|
      t.string :name
      t.text :desc
      t.string :name_ru
      t.text :desc_ru
      t.string :name_fr
      t.text :desc_fr
      t.integer :status
      t.integer :order_num

      t.timestamps
    end
  end

  def self.down
    drop_table :fcategories
  end
end
