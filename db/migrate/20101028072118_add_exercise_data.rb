class AddExerciseData < ActiveRecord::Migration
  def self.up
	add_column :exercises, :quest_num, :integer
	add_column :exercises, :variants_num, :integer
	add_column :exercises, :quest_type, :string
  end

  def self.down
  end
end
