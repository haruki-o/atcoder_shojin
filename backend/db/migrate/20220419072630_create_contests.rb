class CreateContests < ActiveRecord::Migration[6.1]
  def change
    create_table :contests do |t|
      t.string :contest_name
      t.string :user_name
      t.string :password
      t.integer :perf_system

      t.timestamps
    end
  end
end
