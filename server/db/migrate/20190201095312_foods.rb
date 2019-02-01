class Foods < ActiveRecord::Migration[5.2]
  def change
    create_table :foods do |t|
      t.string :name
      t.float :calories
      t.float :carbs
      t.float :proteins
      t.float :fats
      t.timestamps
    end
  end
end
