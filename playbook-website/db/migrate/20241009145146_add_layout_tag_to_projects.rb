# frozen_string_literal: true

class AddLayoutTagToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :layout_tag, :string
  end
end
