# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :set_app_js

  include PlaybookWebsite::Markdown::Helper

  helper ApplicationHelper
  helper BuildingBlocksHelper

  def set_app_js
    @application_js = %w[application]
  end
end
