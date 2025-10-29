# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :set_app_js

  include PlaybookWebsite::Markdown::Helper

  helper ApplicationHelper
  helper BuildingBlocksHelper

  def delete_dark_mode_cookie
    cookies.delete :dark_mode
  end

  def set_app_js
    @application_js = %w[application site]
  end
end
