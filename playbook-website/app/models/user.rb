# frozen_string_literal: true

class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
end
