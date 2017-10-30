class CreatePageTags < ActiveRecord::Migration[5.1]
  def change
    create_table :page_tags do |t|

      t.timestamps
    end
  end
end
