class CreateOrders < ActiveRecord::Migration
  def self.up
    create_table :orders do |t|
      t.integer :user_id, :null => false
      t.decimal :amount,  :precision => 3, :scale => 2
      t.integer :item_id
      t.integer :status,  :default => 0  # status 0 - send, 1-return (if return has been earlier ipn verification ) 2 - competed, -1 - failed
      t.string :txn_id,   :limit => 100
      t.string :ord_id,   :limit => 100
      t.integer :type_id, :null => false # 0 - Trial, 1 - PayPal, 2 - G Checout, 
      t.datetime :expired_at, :null => false	
      t.timestamps
    end
    add_index :orders, :user_id
#    add_index :orders, :ord_id, :unique => true

end

  def self.down
    drop_table :orders
  end
end
