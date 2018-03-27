class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :set_variables

  def set_variables
    @navigation = Section.all
  end
end
