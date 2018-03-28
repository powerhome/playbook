class RemoveTypeIdFromPages < ActiveRecord::Migration[5.1]
  def change
    remove_column :pages, :type_id
  end
end
