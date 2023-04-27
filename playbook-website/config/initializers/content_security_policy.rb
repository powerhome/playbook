# frozen_string_literal: true

Rails.application.config.content_security_policy do |p|
  p.default_src :self, :https, :unsafe_inline
  p.font_src    :self, :https, :data, :unsafe_inline
  p.img_src     :self, :https, :data, :unsafe_inline
  p.object_src  :none
  p.style_src   :self, :https, :unsafe_inline
  p.script_src  :self, :https, :unsafe_inline, :unsafe_eval
  p.worker_src  :self, "blob:"

  # To allow connections to the webpack-dev-server running in a separate docker container
  p.connect_src :self, :https, "http://localhost:3035", "ws://localhost:3035", "http://0.0.0.0:3035", "ws://0.0.0.0:3035" if Rails.env.development?

  # Specify URI for violation reports
  # p.report_uri "/csp-violation-report-endpoint"
end
