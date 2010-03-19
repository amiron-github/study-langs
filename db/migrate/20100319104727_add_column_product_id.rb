class AddColumnProductId < ActiveRecord::Migration
  def self.up
  add_column :orders, :product_id, :int

  end

  def self.down
  end
end
