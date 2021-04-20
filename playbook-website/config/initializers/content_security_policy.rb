Rails.application.config.content_security_policy do |p|
  p.default_src :self, :https, :unsafe_inline
  p.font_src    :self, :https, :data, :unsafe_inline
  p.img_src     :self, :https, :data, :unsafe_inline
  p.object_src  :none
  p.style_src   :self, :https, :unsafe_inline

  # To allow connections to the webpack-dev-server running in
  # a separate docker container
  if Rails.env.development?
    p.script_src  :self, :https, :unsafe_eval
    p.connect_src :self, :https, 'http://localhost:3035', 'ws://localhost:3035', 'http://0.0.0.0:3035', 'ws://0.0.0.0:3035'
  else
    p.script_src  :self, :https, :unsafe_inline
  end

  # Specify URI for violation reports
  # p.report_uri "/csp-violation-report-endpoint"
end
