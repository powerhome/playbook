# frozen_string_literal: true

class ChangeColumnNameInMessages < ActiveRecord::Migration[7.0]
  def change
    rename_column :messages, :open_ai_api_response, :ai_response
  end
end
