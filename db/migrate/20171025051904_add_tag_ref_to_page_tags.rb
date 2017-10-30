class AddTagRefToPageTags < ActiveRecord::Migration[5.1]
  def change
    add_reference :page_tags, :tag, foreign_key: true
  end
end
