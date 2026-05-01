# frozen_string_literal: true

module Playbook
  class IconsController < ActionController::Base
    protect_from_forgery with: :exception

    def show
      icon_path = Playbook::PbIcon::Icon.resolved_icon_path(icon_name)
      return head :not_found unless icon_path

      expires_in 1.hour, public: true
      send_file icon_path, type: "image/svg+xml", disposition: "inline"
    end

  private

    def icon_name
      params[:icon_name].to_s.delete_suffix(".svg")
    end
  end
end
