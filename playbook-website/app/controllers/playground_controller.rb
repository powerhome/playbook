# frozen_string_literal: true

class PlaygroundController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:preview]

  def preview
    kit_name = params[:name].to_s
    payload = preview_params

    result = Playground::RailsRenderer.new(
      view_context: view_context,
      kit_name: kit_name,
      props: payload[:props],
      global_props: payload[:global_props],
      children: payload[:children],
      structure_mode: payload[:structure_mode]
    ).render

    if result[:error].present?
      render json: { html: nil, error: result[:error] }, status: :unprocessable_entity
    else
      render json: { html: result[:html], error: nil }
    end
  rescue => e
    Rails.logger.error("Rails Playground preview error: #{e.message}")
    render json: { html: nil, error: e.message }, status: :unprocessable_entity
  end

private

  def preview_params
    body = request.request_parameters
    {
      props: body.fetch("props", {}),
      global_props: body.fetch("global_props", {}),
      children: body["children"],
      structure_mode: body["structure_mode"],
    }
  end
end
