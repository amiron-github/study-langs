class CreateMaterials < ActiveRecord::Migration
  def self.up
    create_table :materials do |t|
      t.text :body
      t.integer :status
      t.string :tag
      t.text :js_css
      t.string :section
      t.string :html_on_page
      t.string :langs
      t.string :page_url
      t.text :page_title
      t.text :page_desc
      t.text :page_keywords
      t.integer :page_template
      t.integer :page_layout
      t.integer :author

      t.timestamps
    end
  end

  def self.down
    drop_table :materials
  end
end
