class AddFieldsToStats < ActiveRecord::Migration[5.2]
  def change
    add_column :stats, :birthday, :date
  end
end
