class AddNitroIdToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :nitro_id, :integer
    add_column :users, :avatar_url, :string
    add_column :users, :avatar_thumb_url, :string
    add_column :users, :first_name, :string
    add_column :users, :middle_name, :string
    add_column :users, :last_name, :string
    add_column :users, :nick_name, :string
    add_column :users, :preferred_name, :string
    add_column :users, :goes_by, :string
    add_column :users, :title, :string
  end
end
