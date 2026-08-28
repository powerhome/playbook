# frozen_string_literal: true

# LOCAL POC: return users to /playground (or stored return_to) after Nitro ID login.
class SessionsController < ApplicationController
  include Cittadella::SessionConcern

  set_login_callback_redirect do
    session.delete(:return_to).presence || "/playground"
  end
end
