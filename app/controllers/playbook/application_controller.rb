# frozen_string_literal: true

module Playbook
  class ApplicationController < ActionController::Base
    rescue_from Exception, with: :log_exception
    protect_from_forgery with: :exception

    helper Webpacker::Helper
    helper Playbook::PbKitHelper
    helper Playbook::PbDocHelper
    append_view_path Playbook::Engine.root + "app/pb_kits"

  private

    def log_exception(exception)
      logger.log(exception.stacktrace)
    end
  end
end
