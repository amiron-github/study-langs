class CreateExercises < ActiveRecord::Migration
  def self.up
    create_table :exercises do |t|
      t.integer :test_id
      t.integer :category_id
      t.string :title
      t.string :title_ru
      t.string :title_fr

      t.timestamps
    end
  end

  def self.down
    drop_table :exercises
  end
end
