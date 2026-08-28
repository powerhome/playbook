# frozen_string_literal: true

class AddScopes < ActiveRecord::Migration[7.2]
  def change
    change_table :sessions, bulk: true do |t|
      t.remove :access_token, type: :string
      t.remove :refresh_token, type: :string
      t.string :scope
    end
  end
end
