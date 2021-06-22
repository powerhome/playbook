Rails.application.config.content_security_policy do |p|
  p.default_src :self, :https, :unsafe_inline
  p.font_src    :self, :https, :data, :unsafe_inline
  p.img_src     :self, :https, :data, :unsafe_inline
  p.object_src  :none
  p.script_src  :self, :https, :unsafe_inline
  p.style_src   :self, :https, :unsafe_inline

  # To allow connections to the webpack-dev-server running in
  # a separate docker container
  if Rails.env.development?
    p.connect_src :self, :https, 'http://localhost:3040', 'ws://localhost:3040', 'http://0.0.0.0:3040', 'ws://0.0.0.0:3040'
  end

  # Specify URI for violation reports
  # p.report_uri "/csp-violation-report-endpoint"
end
