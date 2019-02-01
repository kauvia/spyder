class Stats < ActiveRecord::Migration[5.2]
  def change
    create_table :stats do |t|
        t.float :height
        t.float :weight
        t.float :target_weight
        t.integer :age
        t.string :gender
        t.string :activity_level
        t.timestamps
    end
  end
end
