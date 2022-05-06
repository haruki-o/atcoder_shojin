class RenameConstestNameToContestNameInHistory < ActiveRecord::Migration[6.1]
  def change
    rename_column :histories, :constest_name, :contest_name
  end
end
