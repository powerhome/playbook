class AddPageRefToPages < ActiveRecord::Migration[5.1]
  def change
    add_reference :pages, :page, foreign_key: true
  end
end
