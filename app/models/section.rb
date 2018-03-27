class Section < ApplicationRecord
  has_many :categories

  extend FriendlyId
  friendly_id :name, use: :slugged

end
