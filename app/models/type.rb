class Type < ApplicationRecord
  has_many :pages

  extend FriendlyId
  friendly_id :name, use: :slugged
  
end
