class SurveyResponseSerializer < ActiveModel::Serializer
  attributes :id, :today_feeling, :stress_level, :comments, :created_at
end
