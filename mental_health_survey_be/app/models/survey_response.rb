class SurveyResponse < ApplicationRecord
  attribute :stress_level, :integer

  # Encrypt sensitive data
  encrypts :today_feeling
  encrypts :stress_level
  encrypts :comments
  encrypts :respondent_id

  # Add blind indexes for searchable encrypted fields
  blind_index :today_feeling
  blind_index :stress_level
  blind_index :comments
  blind_index :respondent_id

  # Validations
  validates :today_feeling, presence: true
  validates :stress_level, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
  # comments is optional

  # Class method for calculating average scores

  def self.average_stress_level
    responses = self.all
    return 0 if responses.empty?
    average = responses.sum(&:stress_level).to_f / responses.count

    # Ensure the result is between 1-5
    [ 1, [ 5, average ].min ].max
  end
end
