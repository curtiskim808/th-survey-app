class RemoveUniqueConstraintFromSurveyResponses < ActiveRecord::Migration[8.0]
  def change
    remove_index :survey_responses, :today_feeling_bidx
    remove_index :survey_responses, :stress_level_bidx
    remove_index :survey_responses, :comments_bidx

    add_index :survey_responses, :today_feeling_bidx, unique: false
    add_index :survey_responses, :stress_level_bidx, unique: false
    add_index :survey_responses, :comments_bidx, unique: false
  end
end