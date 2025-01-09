# frozen_string_literal: true

class Feedback < ApplicationRecord
  # Validations
  validates :name, presence: true,
                   length: { minimum: 2, maximum: 100 }

  validates :comments, presence: true,
                       length: { minimum: 10, maximum: 1000 }

  # Sanitization
  before_validation :sanitize_fields

private

  def sanitize_fields
    self.name = name.to_s.strip
    self.comments = comments.to_s.strip
  end
end
