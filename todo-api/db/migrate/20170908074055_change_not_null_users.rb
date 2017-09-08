class ChangeNotNullUsers < ActiveRecord::Migration[5.1]
  def change
    change_column :users, :name, :string, limit: 20, unique: true
  end
end
