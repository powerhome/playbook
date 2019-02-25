require "sassc-rails"
require "playbook/engine"

module Playbook
  ROOT_PATH = Pathname.new(File.join(__dir__, ".."))

  # @return [Boolean] indication of whether the request is a web view within Nitro Mobile
  def self.web_page_within_mobile_app?(request)
    request.user_agent.try(:downcase) =~ /^nitro/
  end

  # @return [String] the digest value for assets managed by the asset pipeline
  def self.assets_digest
    @assets_digest ||= begin
      if ActionView::Base.respond_to?(:asset_manifest) # Rails 4
        Digest::MD5.hexdigest(ActionView::Base.assets_manifest.assets.values.sort.join)
      elsif Rails.configuration.assets.digests.present? # Rails 3
        Digest::MD5.hexdigest(Rails.configuration.assets.digests.try(:values).sort.join)
      end
    end
  end

  class << self
    def webpacker
      @webpacker ||= ::Webpacker::Instance.new(
        root_path: ROOT_PATH,
        config_path: ROOT_PATH.join("config/webpacker.yml")
      )
    end
  end
end
