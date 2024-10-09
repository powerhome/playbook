# frozen_string_literal: true

class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.references :project, null: false, foreign_key: true
      t.text :code
      t.text :user_input
      t.text :open_ai_api_response

      t.timestamps
    end
  end
end
