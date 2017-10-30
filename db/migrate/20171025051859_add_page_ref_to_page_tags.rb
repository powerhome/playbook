class AddPageRefToPageTags < ActiveRecord::Migration[5.1]
  def change
    add_reference :page_tags, :page, foreign_key: true
  end
end
