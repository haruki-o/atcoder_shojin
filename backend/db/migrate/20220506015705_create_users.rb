class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :contest_name
      t.integer :time
      t.string :user_name
      t.integer :performance
      t.integer :WA
      t.datetime :ProblemA
      t.datetime :ProblemB
      t.datetime :ProblemC
      t.datetime :ProblemD
      t.datetime :ProblemE
      t.datetime :ProblemF
      t.datetime :ProblemG
      t.datetime :ProblemH
      t.datetime :ProblemI
      t.datetime :ProblemJ

      t.timestamps
    end
  end
end
