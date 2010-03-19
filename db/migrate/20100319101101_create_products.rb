class CreateProducts < ActiveRecord::Migration
  def self.up
    create_table :products do |t|
    t.integer :period, :null => false
    t.integer :price, :null => false
    t.string :code, :null => false
      t.timestamps
    end

  end

  def self.down
    drop_table :products
  end
end
