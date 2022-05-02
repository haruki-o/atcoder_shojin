class AddColumnContestTimeAndDeleteIntegerInHistory < ActiveRecord::Migration[6.1]
  def change
    add_column :histories, :contest_time, :integer
    remove_column :histories, :integer, :string
  end
end
