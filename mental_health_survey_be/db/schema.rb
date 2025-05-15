# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_05_15_013001) do
  create_table "survey_responses", force: :cascade do |t|
    t.text "today_feeling"
    t.text "stress_level"
    t.text "comments"
    t.string "today_feeling_bidx"
    t.string "stress_level_bidx"
    t.string "comments_bidx"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "respondent_id"
    t.string "respondent_id_bidx"
    t.index ["comments_bidx"], name: "index_survey_responses_on_comments_bidx"
    t.index ["respondent_id_bidx"], name: "index_survey_responses_on_respondent_id_bidx"
    t.index ["stress_level_bidx"], name: "index_survey_responses_on_stress_level_bidx"
    t.index ["today_feeling_bidx"], name: "index_survey_responses_on_today_feeling_bidx"
  end
end
