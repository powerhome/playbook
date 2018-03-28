class DropTypes < ActiveRecord::Migration[5.1]
  def change
    drop_table :types
  end
end
