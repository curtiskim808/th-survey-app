class AddRespondentIdToSurveyResponses < ActiveRecord::Migration[8.0]
  def change
    # Add respondent_id column as a bigint (for future user reference)
    # that can be null since it's optional
    add_column :survey_responses, :respondent_id, :text, null: true
    add_column :survey_responses, :respondent_id_bidx, :string
    # Add an index for faster lookups when we do implement user relationships
    add_index :survey_responses, :respondent_id_bidx, unique: false
  end
end