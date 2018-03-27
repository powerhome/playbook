class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create

    success, user = User.sign_in_or_create_user(sign_in_params)
    if success
      sign_in(:user, user)
      redirect_to :root, flash: { success: "Welcome #{user.goes_by}" }
    else
      redirect_to :back, flash: { error: user["error"] }
    end

  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  end

end
