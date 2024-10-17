# frozen_string_literal: true

class AddDefaultSizeToMediaSize < ActiveRecord::Migration[7.0]
  def change
    change_column :projects, :media_size, :string, default: "desktop"
  end
end
