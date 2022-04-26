class CreateHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :histories do |t|
      t.string :constest_name
      t.integer :time
      t.date :date
      t.string :user_name
      t.string :user_rating
      t.string :integer

      t.timestamps
    end
  end
end
