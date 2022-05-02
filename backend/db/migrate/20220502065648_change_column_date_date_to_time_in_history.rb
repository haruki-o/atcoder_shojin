class ChangeColumnDateDateToTimeInHistory < ActiveRecord::Migration[6.1]
  def change
    change_column :histories, :date, :time
  end
end
