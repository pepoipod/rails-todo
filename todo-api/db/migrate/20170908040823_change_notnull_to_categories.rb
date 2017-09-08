class ChangeNotnullToCategories < ActiveRecord::Migration[5.1]
  def change
    change_column :categories, :name, :string, limit: 20, null: false
    change_column :categories, :user_id, :integer, null: false
  end
end
