class DropFriendlyIdSlugs < ActiveRecord::Migration[5.1]
  def change

    drop_table :friendly_id_slugs, force: :cascade
  end
end
