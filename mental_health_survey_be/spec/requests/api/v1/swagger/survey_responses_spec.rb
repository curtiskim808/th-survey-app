# spec/requests/api/v1/swagger/survey_responses_spec.rb
require 'swagger_helper'

describe 'Survey Responses API', type: :request do
  path '/api/v1/survey_responses' do
    get 'Retrieves aggregated survey response data' do
      tags 'Survey Responses'
      produces 'application/json'

      response '200', 'survey data retrieved' do
        schema type: :object,
               properties: {
                 data: {
                   type: :object,
                   properties: {
                     total_responses: { type: :integer },
                     average_stress_level: { type: :number, format: :float },
                   }
                 }
               }
        run_test!
      end
    end

    post 'Creates a survey response' do
      tags 'Survey Responses'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :survey_response, in: :body, schema: {
        type: :object,
        properties: {
          survey_response: {
            type: :object,
            properties: {
              today_feeling: { type: :string },
              stress_level: { type: :integer },
              comments: { type: :string }
            },
            required: ['today_feeling', 'stress_level']
          }
        }
      }

      response '201', 'survey response created' do
        let(:survey_response) { { survey_response: { today_feeling: 'Happy', stress_level: 2, comments: 'Great day!' } } }
        run_test!
      end

      response '422', 'invalid request' do
        let(:survey_response) { { survey_response: { today_feeling: nil, stress_level: nil } } }
        run_test!
      end
    end
  end
end