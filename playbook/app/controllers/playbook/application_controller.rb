# frozen_string_literal: true

module Playbook
  class ApplicationController < ActionController::Base
    helper Webpacker::Helper
    helper Playbook::ApplicationHelper
    helper Playbook::Markdown::Helper
    helper Playbook::PbDocHelper
    helper Playbook::PbSampleHelper

    def delete_dark_mode_cookie
      cookies.delete :dark_mode
    end
  end
end
