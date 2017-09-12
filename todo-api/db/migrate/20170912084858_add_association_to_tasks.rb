class AddAssociationToTasks < ActiveRecord::Migration[5.1]
  def change
    add_reference :tasks, :user, index: true, foreign_key: true
    add_reference :tasks, :category, index: true, foreign_key: true
  end
end
