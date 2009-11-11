class CreateUserTests < ActiveRecord::Migration
  def self.up
    create_table :user_tests do |t|
	t.integer :user_id,   :null => false
	t.string :test_id,   :null => false
	t.integer :total
	t.integer  :correct
        t.timestamps
    end
    add_index :user_tests, :user_id
    add_index :user_tests, :test_id


  end

  def self.down
    drop_table :user_tests
  end
end
