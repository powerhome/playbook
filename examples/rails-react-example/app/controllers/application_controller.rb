# frozen_string_literal: true

class ApplicationController < ActionController::Base
  helper Playbook::PbKitHelper

  def index; end
end
