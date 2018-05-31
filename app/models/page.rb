class Page < ApplicationRecord
  default_scope { order(order: :asc) }

  belongs_to :user
  belongs_to :category

  has_many :pages
  has_many :page_tag, :dependent => :destroy

end
