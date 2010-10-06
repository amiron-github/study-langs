class CreateClusterWords < ActiveRecord::Migration
  def self.up
    create_table :cluster_words do |t|
      t.integer :cluster_id
      t.integer :word_id
      t.integer :order_num

      t.timestamps
    end
	
	drop_table :words_clusters
	
  end

  def self.down
    drop_table :cluster_words
  end
end
