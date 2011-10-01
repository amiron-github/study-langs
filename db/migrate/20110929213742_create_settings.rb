class CreateSettings < ActiveRecord::Migration
  def self.up
    create_table :settings do |t|
      t.string :picture
      t.string :first_name
      t.string :last_name
      t.integer :f_status
      t.string :country
      t.integer :save_words
      t.integer :save_ex

      t.timestamps
    end
  end

  def self.down
    drop_table :settings
  end
end
