class HomeController < ApplicationController
  skip_before_action :authenticate_user!, raise: false

  def all
    @all_docs = Page.all

  end

end
