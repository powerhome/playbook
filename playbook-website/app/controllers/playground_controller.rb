# frozen_string_literal: true

class PlaygroundController < ApplicationController
  def preview
    return if reject_oversized_request!
    return if reject_rate_limited_request!

    payload = preview_params
    Playground::PreviewLimits.validate_payload!(
      props: payload[:props],
      global_props: payload[:global_props],
      children: payload[:children]
    )

    result = Playground::RailsRenderer.new(
      view_context: view_context,
      kit_name: params[:name].to_s,
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
  rescue Playground::PreviewLimits::LimitExceeded => e
    log_preview_error(e)
    render json: {
      html: nil,
      error: Playground::PreviewLimits::CLIENT_LIMIT_ERROR,
    }, status: :unprocessable_entity
  rescue StandardError, SystemStackError => e
    log_preview_error(e)
    render json: {
      html: nil,
      error: Playground::PreviewLimits::CLIENT_ERROR,
    }, status: :unprocessable_entity
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

  def reject_oversized_request!
    size = request.content_length.to_i
    size = request.raw_post.bytesize if size <= 0 && request.raw_post.present?
    return false if size <= Playground::PreviewLimits::MAX_REQUEST_BYTES

    render json: {
      html: nil,
      error: Playground::PreviewLimits::CLIENT_LIMIT_ERROR,
    }, status: :payload_too_large
    true
  end

  def reject_rate_limited_request!
    return false unless preview_rate_limit_exceeded?

    render json: {
      html: nil,
      error: Playground::PreviewLimits::CLIENT_RATE_LIMIT_ERROR,
    }, status: :too_many_requests
    true
  end

  def preview_rate_limit_exceeded?
    key = "playground/preview/#{request.remote_ip}"
    count = Rails.cache.read(key).to_i
    if count >= Playground::PreviewLimits::MAX_PREVIEW_PER_MINUTE
      true
    else
      Rails.cache.write(key, count + 1, expires_in: 1.minute)
      false
    end
  end

  def log_preview_error(error)
    Rails.logger.error("Rails Playground preview error: #{error.class}: #{error.message}")
  end
end
