# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :set_app_js

  include PlaybookWebsite::Markdown::Helper

  helper ApplicationHelper

  def set_app_js
    @application_js = %w[application]
  end

private

  def rails_playground_enabled?
    Rails.application.config.x.rails_playground_enabled
  end
end
