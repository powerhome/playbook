class CreatePages < ActiveRecord::Migration[5.1]
  def change
    create_table :pages do |t|
      t.string :title
      t.text :body_markdown
      t.text :body_html
      t.integer :order

      t.timestamps
    end
  end
end
