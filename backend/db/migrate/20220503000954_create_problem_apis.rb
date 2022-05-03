class CreateProblemApis < ActiveRecord::Migration[6.1]
  def change
    create_table :problem_apis do |t|
      t.string :contestId
      t.integer :diff

      t.timestamps
    end
  end
end
