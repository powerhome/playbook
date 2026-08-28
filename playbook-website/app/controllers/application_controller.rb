# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :set_app_js

  include PlaybookWebsite::Markdown::Helper

  helper ApplicationHelper

  def set_app_js
    @application_js = %w[application]
  end

  # LOCAL POC: used by layout bootstrap + playground gate
  def playground_authenticated?
    return false unless respond_to?(:current_identity, true)

    current_identity(scope: :user).present?
  rescue
    false
  end
  helper_method :playground_authenticated?
end
