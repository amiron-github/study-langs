class CreateEnwords < ActiveRecord::Migration
  def self.up
    create_table :enwords do |t|
      t.text :text
      t.text :html
      t.text :translate
      t.text :transcribe
      t.string :sound_url
      t.string :image_url
      t.integer :encategory_id
      t.integer :order_num
      t.text :grammar
      t.text :forms
      t.text :translate_fr
      t.text :transcribe_fr

      t.timestamps
    end
  end

  def self.down
    drop_table :enwords
  end
end
