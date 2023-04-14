# frozen_string_literal: true

require_relative "application_controller"

class GuidesController < ApplicationController
  def create_kit; end

  def create_kit_md
    @name = params[:name]
    render template: "guides/create_kit/#{@name}", layout: "grid"
  end

  def use_nitro; end
end
