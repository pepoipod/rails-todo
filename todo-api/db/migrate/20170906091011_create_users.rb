class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name, limit: 20
      t.string :profile, limit: 140
      t.string :password_digest, null: false

      t.timestamps
    end
  end
end
