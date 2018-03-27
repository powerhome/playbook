class Category < ApplicationRecord
  default_scope { order(order: :asc) }

  belongs_to :section
  has_many :pages

  extend FriendlyId
  friendly_id :name, use: :slugged
  
end
