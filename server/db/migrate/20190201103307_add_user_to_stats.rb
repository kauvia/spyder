class AddUserToStats < ActiveRecord::Migration[5.2]
  def change
    add_reference :stats, :user, foreign_key: true
  end
end
