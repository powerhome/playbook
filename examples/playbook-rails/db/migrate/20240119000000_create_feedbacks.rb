# frozen_string_literal: true

class CreateFeedbacks < ActiveRecord::Migration[7.0]
  def change
    create_table :feedbacks do |t|
      t.string :name, null: false
      t.text :comments, null: false
      t.timestamps
    end
  end
end
