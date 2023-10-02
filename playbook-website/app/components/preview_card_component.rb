# frozen_string_literal: true

class PreviewCardComponent < Playbook::KitBase
  def initialize(post:, index:)
    super()
    @post = post
    @index = index
  end
end
