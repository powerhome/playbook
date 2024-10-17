# frozen_string_literal: true

class AddMediaSizeToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :media_size, :string
  end
end
