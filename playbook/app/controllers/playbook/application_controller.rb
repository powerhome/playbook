# frozen_string_literal: true

module Playbook
  class ApplicationController < ActionController::Base
    helper Playbook::ApplicationHelper
    helper Playbook::PbDocHelper
    helper Playbook::PbSampleHelper
    append_view_path Playbook::Engine.root + "app/pb_kits"
  end
end
