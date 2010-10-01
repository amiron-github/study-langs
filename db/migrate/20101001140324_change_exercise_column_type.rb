class ChangeExerciseColumnType < ActiveRecord::Migration
  def self.up
	change_column :exercises, :test_id, :string
  end

  def self.down
	raise ActiveRecord::IrreversibleMigration
  end
end
