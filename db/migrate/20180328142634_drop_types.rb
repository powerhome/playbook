class DropTypes < ActiveRecord::Migration[5.1]
  def change
    drop_table :types, force: :cascade
  end
end
