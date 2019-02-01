class Exercises < ActiveRecord::Migration[5.2]
  def change
    create_table :exercises do |t|
      t.string :name
      t.integer :reps
      t.integer :duration
      t.float :calories_burnt
      t.timestamps
    end
  end
end
