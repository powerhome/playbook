class AddTypeRefToPages < ActiveRecord::Migration[5.1]
  def change
    add_reference :pages, :type, foreign_key: true
  end
end
