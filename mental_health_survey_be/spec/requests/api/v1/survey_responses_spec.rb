require 'rails_helper'

RSpec.describe "Api::V1::SurveyResponses", type: :request do
  include FactoryBot::Syntax::Methods

  describe "error handling" do
    describe "GET /api/v1/survey_responses" do
      it "returns a 500 status with error message when retrieving data fails" do
        allow(SurveyResponse).to receive(:all).and_raise(StandardError, "Database connection error")

        get "/api/v1/survey_responses"

        expect(response).to have_http_status(:internal_server_error)
        expect(JSON.parse(response.body)).to include(
                                               "error" => "Failed to retrieve survey data: Database connection error"
                                             )
      end
    end

    describe "GET /api/v1/survey_responses" do
      it "returns a 500 status with error message when retrieving data fails" do
        allow(SurveyResponse).to receive(:count).and_raise(StandardError, "Database connection error")

        get "/api/v1/survey_responses"

        expect(response).to have_http_status(:internal_server_error)
        expect(JSON.parse(response.body)).to include(
                                               "error" => "Failed to retrieve survey data: Database connection error"
                                             )
      end
    end

    describe "POST /api/v1/survey_responses" do
      it "returns a 400 status when parameters are missing" do
        post "/api/v1/survey_responses", params: {}

        expect(response).to have_http_status(:bad_request)
        expect(JSON.parse(response.body)).to have_key("error")
      end

      it "returns a 422 status with validation errors when record is invalid" do
        post "/api/v1/survey_responses", params: { survey_response: { today_feeling: nil, stress_level: nil } }

        expect(response).to have_http_status(:unprocessable_entity)

        response_body = JSON.parse(response.body)
        expect(response_body).to have_key("errors")
        expect(response_body["errors"]).to include("today_feeling" => ["can't be blank"], "stress_level" => ["can't be blank", "is not a number"])
      end

      it "returns a 500 status with error message when creating a survey response fails" do
        allow_any_instance_of(SurveyResponse).to receive(:save).and_raise(StandardError, "Database connection error")

        post "/api/v1/survey_responses", params: { survey_response: { today_feeling: "Happy", stress_level: 2 } }

        expect(response).to have_http_status(:internal_server_error)
        expect(JSON.parse(response.body)).to include(
                                               "error" => "Failed to create survey response: Database connection error"
                                             )
      end
    end

  end

  describe "GET /index" do
    it "returns aggregated survey response data" do
      # Create some test data
      create(:survey_response, today_feeling: "Happy", stress_level: 2, comments: "Feeling good")
      create(:survey_response, today_feeling: "Stressed", stress_level: 4, comments: "A bit overwhelmed")
      create(:survey_response, today_feeling: "Neutral", stress_level: 3, comments: "Just okay")

      get "/api/v1/survey_responses"

      expect(response).to have_http_status(:success)

      body = JSON.parse(response.body)
      expect(body["data"]).to include("total_responses", "average_stress_level")
      expect(body["data"]["total_responses"]).to eq(3)
      expect(body["data"]["average_stress_level"]).to eq(3)
    end
  end

  describe "POST /create" do
    it "return 201 status and creates a survey response" do
      post "/api/v1/survey_responses", params: { survey_response: { today_feeling: "Happy", stress_level: 2, comments: "Great day!" } }

      expect(response).to have_http_status(:created)

      body = JSON.parse(response.body)
      expect(body["data"]).to include("id", "created_at")
      expect(body["data"]["id"]).to be_a(Integer)
      expect(body["data"]["created_at"]).to be_a(String)
    end
  end
end
