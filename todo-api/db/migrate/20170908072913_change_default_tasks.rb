class ChangeDefaultTasks < ActiveRecord::Migration[5.1]
  def change
    change_column :tasks, :is_favorite, :boolean, default: false
    change_column :tasks, :is_complete, :boolean, default: false
  end
end