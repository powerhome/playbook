# frozen_string_literal: true

class ViewLookupContextCacheClear
  def initialize(app)
      self.app = app
  end

  def call(env)
      app.call(env).tap { clear_view_cache }
  end

private

  attr_accessor :app

  def clear_view_cache
      ActionView::LookupContext::DetailsKey.clear
  end
end