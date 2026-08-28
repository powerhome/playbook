# frozen_string_literal: true

# LOCAL POC: Nitro ID auth via Cittadella (gates /playground only).
# Requires NITRO_ID_CLIENT_ID + NITRO_ID_CLIENT_SECRET (same local client as dummy app is fine
# if redirect URIs point at http://localhost:3000/sessions/nitro_id/callback).

Cittadella.configure do |config|
  config.omniauth.provider_name = :nitro_id
  config.omniauth.scope = %i[openid email profile groups offline_access]
  config.omniauth.client_options = {
    identifier: ENV.fetch("NITRO_ID_CLIENT_ID", nil),
    secret: ENV.fetch("NITRO_ID_CLIENT_SECRET", nil),
  }
  config.omniauth.post_logout_redirect_uri =
    ENV.fetch("NITRO_ID_POST_LOGOUT_REDIRECT_URI", "http://localhost:3000/")
  config.omniauth.issuer = ENV.fetch("NITRO_ID_ISSUER", "https://id.powerhrg.com")
  config.omniauth.provider_secret =
    ENV.fetch("NITRO_ID_PROVIDER_SECRET", ENV.fetch("NITRO_ID_API_KEY", nil))

  config.enable_scim_provisioning = false

  config.sessions.controller_name = "sessions"

  # On login, create a local User from the Nitro ID email if one doesn't exist yet.
  config.sessions.identity_finder = ->(auth_info) {
    email = auth_info.extra&.raw_info&.email
    return if email.blank?

    User.find_or_create_by!(email: email)
  }

  config.sessions.unauthorized_handler = -> {
    redirect_to entrypoint_path(:user)
  }

  config.identities.identity(:user)
end
