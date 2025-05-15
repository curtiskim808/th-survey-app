module Api
  module V1
    class SurveyResponsesController < ApplicationController

      # GET /api/v1/survey_responses
      def index
        # Only return aggregated data, not individual responses for privacy
        render json: {
          data: {
            total_responses: SurveyResponse.count,
            average_stress_level: SurveyResponse.average_stress_level
          }
        }, status: :ok
      rescue StandardError => e
        render json: { error: "Failed to retrieve survey data: #{e.message}" }, status: :internal_server_error
      end

      # POST /api/v1/survey_responses
      def create
        @survey_response = SurveyResponse.new(survey_response_params)

        if @survey_response.save
          render json: { data: {
            id: @survey_response.id,
            created_at: @survey_response.created_at,
          } }, status: :created
        else
          render json: { errors: @survey_response.errors }, status: :unprocessable_entity
        end
      rescue ActionController::ParameterMissing => e
        render json: { error: e.message }, status: :bad_request
      rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
      rescue StandardError => e
        render json: { error: "Failed to create survey response: #{e.message}" },
               status: :internal_server_error
      end

      private

      def survey_response_params
        params.require(:survey_response).permit(:today_feeling, :stress_level, :comments)
      end

      def record_not_found
        render json: { error: "Survey response not found" }, status: :not_found
      end

      def parameter_missing(e)
        render json: { error: e.message }, status: :bad_request
      end

      def record_invalid(e)
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
end
