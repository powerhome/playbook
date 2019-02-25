module Playbook
  class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    helper Webpacker::Helper
    helper Playbook::PbKitHelper
    helper Playbook::PbDocHelper
    append_view_path Playbook::Engine.root + "app/pb_kits"
  end
end
