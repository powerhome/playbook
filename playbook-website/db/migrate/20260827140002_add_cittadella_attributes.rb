# frozen_string_literal: true

class AddCittadellaAttributes < ActiveRecord::Migration[7.2]
  def change
    change_table :sessions, bulk: true do |t|
      t.string :provider_session_id
      t.string :access_token
      t.string :refresh_token
      t.datetime :expires_at
    end
    add_reference :sessions, :identity, polymorphic: true, index: true
  end
end
