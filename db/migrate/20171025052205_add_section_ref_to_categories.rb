class AddSectionRefToCategories < ActiveRecord::Migration[5.1]
  def change
    add_reference :categories, :section, foreign_key: true
  end
end
