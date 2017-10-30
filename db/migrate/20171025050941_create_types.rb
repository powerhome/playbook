class CreateTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :types do |t|
      t.string :name
      t.text :body_markdown

      t.timestamps
    end
  end
end
