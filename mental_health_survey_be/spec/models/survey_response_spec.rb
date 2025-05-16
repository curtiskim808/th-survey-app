require 'rails_helper'

RSpec.describe SurveyResponse, type: :model do
  describe 'encryption' do
    it 'encrypts and decrypts attributes correctly' do
      # Create a record
      survey = SurveyResponse.create!(today_feeling: 'Happy', stress_level: 3.0, comments: 'Test comment')

      # Verify we can retrieve it with decrypted values
      found = SurveyResponse.find(survey.id)
      expect(found.today_feeling).to eq('Happy')
      expect(found.stress_level).to eq(3)
      expect(found.comments).to eq('Test comment')

      # Check that the values in the database are encrypted
      # (they should be different from the original values)
      raw_data = ActiveRecord::Base.connection.execute(
        "SELECT today_feeling, stress_level, comments FROM survey_responses WHERE id = #{survey.id}"
      ).first

      expect(raw_data['today_feeling']).not_to eq('Happy')
      expect(raw_data['stress_level'].to_s).not_to eq('3')
      expect(raw_data['comments']).not_to eq('Test comment')
    end

    it 'validates presence of today_feeling and stress_level' do
      # Create a record without required fields
      survey = SurveyResponse.new(stress_level: nil, comments: 'Test comment')

      # Validate that it doesn't save
      expect(survey.valid?).to be_falsey
      expect(survey.errors[:today_feeling]).to include("can't be blank")
      expect(survey.errors[:stress_level]).to include("can't be blank")
    end

    it 'validates numericality of stress_level' do
      # Create a record with invalid stress_level
      survey = SurveyResponse.new(today_feeling: 'Happy', stress_level: 10.0, comments: 'Test comment')

      # Validate that it doesn't save
      expect(survey.valid?).to be_falsey
      expect(survey.errors[:stress_level]).to include('must be less than or equal to 5')
    end

    it 'calculates average stress level correctly' do
      # Create multiple records
      SurveyResponse.create!(today_feeling: 'Happy', stress_level: 1.0, comments: 'Test comment')
      SurveyResponse.create!(today_feeling: 'Sad', stress_level: 5.0, comments: 'Test comment')
      SurveyResponse.create!(today_feeling: 'Neutral', stress_level: 3.0, comments: 'Test comment')

      # Calculate average
      average = SurveyResponse.average_stress_level

      # Verify the average is correct
      expect(average).to eq(3)
    end

    it 'calculates average stress level with decimal values' do
      # Create multiple records with decimal stress levels
      SurveyResponse.create!(today_feeling: 'Happy', stress_level: 3.8, comments: 'Test comment')
      SurveyResponse.create!(today_feeling: 'Sad', stress_level: 2.6, comments: 'Test comment')
      SurveyResponse.create!(today_feeling: 'Neutral', stress_level: 4.8, comments: 'Test comment')

      # Calculate average
      average = SurveyResponse.average_stress_level

      # Verify the average is correct
      expect(average).to eq(3.7)
    end

    it 'calculate total number of responses' do
      # Create multiple records
      SurveyResponse.create!(today_feeling: 'Happy', stress_level: 1.0, comments: 'Test comment')
      SurveyResponse.create!(today_feeling: 'Sad', stress_level: 5.0, comments: 'Test comment')
      SurveyResponse.create!(today_feeling: 'Neutral', stress_level: 3.0, comments: 'Test comment')
      SurveyResponse.create!(today_feeling: 'Good', stress_level: 1.0, comments: 'Test comment')
      SurveyResponse.create!(today_feeling: 'Neutral', stress_level: 2.0, comments: 'Test comment')

      # Calculate total number of responses
      total_responses = SurveyResponse.count

      # Verify the total number of responses is correct
      expect(total_responses).to eq(5)
    end
  end
end
