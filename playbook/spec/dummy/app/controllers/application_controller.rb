# frozen_string_literal: true

class ApplicationController < ActionController::Base
  helper Webpacker::Helper
  helper Playbook::PbDocHelper
  helper Playbook::Markdown::Helper
  helper ApplicationHelper
  helper SampleHelper

  def delete_dark_mode_cookie
    cookies.delete :dark_mode
  end
end
