# frozen_string_literal: true

class FeedbackController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @feedback = Feedback.new(feedback_params)

    if @feedback.save
      render json: { message: "Thank you for your feedback!" }, status: :ok
    else
      render json: {
        errors: @feedback.errors.messages.transform_values(&:first),
      }, status: :unprocessable_entity
    end
  rescue
    render json: { error: "An unexpected error occurred" }, status: :internal_server_error
  end

private

  def feedback_params
    params.require(:feedback).permit(:name, :comments)
  end
end
