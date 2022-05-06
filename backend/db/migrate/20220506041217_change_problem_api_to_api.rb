class ChangeProblemApiToApi < ActiveRecord::Migration[6.1]
  def change
    rename_table :problem_apis, :apis
  end
end
