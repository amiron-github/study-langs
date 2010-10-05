class CreateClusters < ActiveRecord::Migration
  def self.up
    create_table :clusters do |t|
      t.string :title
      t.string :tag
      t.text :description
      t.timestamps
    end
	create_table :words_clusters, :id => false do |t|
      t.belongs_to :cluster
      t.belongs_to :word
    end
	add_column :categories, :tag, :string
  end

  def self.down
    drop_table :clusters
	drop_table :words_clusters
	remove_column :categories, :tag
  end
end
