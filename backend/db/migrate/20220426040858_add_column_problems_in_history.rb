class AddColumnProblemsInHistory < ActiveRecord::Migration[6.1]
  def change
    add_column :histories, :problemA, :string
    add_column :histories, :problemB, :string
    add_column :histories, :problemC, :string
    add_column :histories, :problemD, :string
    add_column :histories, :problemE, :string
    add_column :histories, :problemF, :string
    add_column :histories, :problemG, :string
    add_column :histories, :problemH, :string
    add_column :histories, :problemI, :string
    add_column :histories, :problemJ, :string
  end
end
