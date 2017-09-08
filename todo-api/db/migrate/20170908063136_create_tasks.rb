class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :title, limit: 120, null: false
      t.boolean :is_complete
      t.boolean :is_favorite
      t.datetime :expire_date
      t.integer :user_id, null: false
      t.integer :category_id

      t.timestamps
    end
  end
end
