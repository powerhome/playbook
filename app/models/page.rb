class Page < ApplicationRecord
  default_scope { order(order: :asc) }

  belongs_to :user
  belongs_to :type
  belongs_to :category

  has_one :page_tag, :dependent => :destroy
end
