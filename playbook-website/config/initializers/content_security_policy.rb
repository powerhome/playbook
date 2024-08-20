# frozen_string_literal: true

# Be sure to restart your server when you modify this file.

# Define an application-wide content security policy.
# See the Securing Rails Applications Guide for more information:
# https://guides.rubyonrails.org/security.html#content-security-policy-header

Rails.application.config.content_security_policy do |p|
  p.default_src :self, :https, :unsafe_inline
  p.font_src    :self, :https, :data, :unsafe_inline
  p.img_src     :self, :https, :data, :unsafe_inline
  p.object_src  :none
  p.style_src   :self, :https, :unsafe_inline
  p.script_src  :self, :https, :unsafe_inline, :unsafe_eval
  p.worker_src  :self, "blob:"

  # To allow connections to the webpack-dev-server running in a separate docker container
  if Rails.env.development?
    p.style_src   :self, :https, :unsafe_inline
    p.script_src  :self, :https, :unsafe_inline, :unsafe_eval
    p.connect_src :self, :https, "http://localhost:3036", "ws://localhost:3036", "http://0.0.0.0:3036", "ws://0.0.0.0:3036"
  end
end

# Specify URI for violation reports
# p.report_uri "/csp-violation-report-endpoint"
#
#   # Generate session nonces for permitted importmap and inline scripts
#   config.content_security_policy_nonce_generator = ->(request) { request.session.id.to_s }
#   config.content_security_policy_nonce_directives = %w(script-src)
#
#   # Report violations without enforcing the policy.
#   # config.content_security_policy_report_only = true
