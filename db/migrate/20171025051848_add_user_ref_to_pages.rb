class AddUserRefToPages < ActiveRecord::Migration[5.1]
  def change
    add_reference :pages, :user, foreign_key: true
  end
end
