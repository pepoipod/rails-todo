class RemoveAssociationFromTasks < ActiveRecord::Migration[5.1]
  def change
    remove_column :tasks, :user_id, :integer
    remove_column :tasks, :category_id, :integer
  end
end
