class CreateSurveyResponses < ActiveRecord::Migration[8.0]
  def change
    create_table :survey_responses do |t|
      t.text :today_feeling
      t.text :stress_level
      t.text :comments
      t.string :today_feeling_bidx
      t.string :stress_level_bidx
      t.string :comments_bidx

      t.timestamps
    end
    add_index :survey_responses, :today_feeling_bidx, unique: false
    add_index :survey_responses, :stress_level_bidx, unique: false
    add_index :survey_responses, :comments_bidx, unique: false
  end
end
