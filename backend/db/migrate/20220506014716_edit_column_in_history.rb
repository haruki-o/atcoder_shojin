class EditColumnInHistory < ActiveRecord::Migration[6.1]
  def change
    add_column :histories, :start_date, :datetime
    add_column :histories, :end_date, :datetime
    remove_column :histories, :user_rating, :string
    remove_column :histories, :date, :time
    remove_column :histories, :contest_time, :integer
    remove_column :histories, :user_name, :string
  end
end
