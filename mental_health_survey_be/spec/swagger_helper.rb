require 'rails_helper'

RSpec.configure do |config|
  config.swagger_root = Rails.root.join('swagger').to_s

  config.swagger_docs = {
    'v1/swagger.json' => {
      openapi: '3.0.1',
      info: {
        title: 'Survey API Documentation',
        version: 'v1',
        description: 'API documentation for Survey Responses'
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server'
        }
      ],
      components: {
        schemas: {
          SurveyResponse: {
            type: :object,
            properties: {
              id: { type: :integer },
              today_feeling: { type: :string },
              stress_level: { type: :integer },
              comments: { type: :string, nullable: true },
              created_at: { type: :string, format: 'date-time' },
              updated_at: { type: :string, format: 'date-time' }
            },
            required: ['id', 'today_feeling', 'stress_level']
          }
        }
      },
      paths: {}
    }
  }
end