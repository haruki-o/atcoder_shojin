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

ActiveRecord::Schema.define(version: 2022_05_02_065648) do

  create_table "contests", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "contest_name"
    t.string "user_name"
    t.string "password"
    t.integer "perf_system"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "time"
  end

  create_table "histories", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "constest_name"
    t.integer "time"
    t.time "date"
    t.string "user_name"
    t.string "user_rating"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "problemA"
    t.string "problemB"
    t.string "problemC"
    t.string "problemD"
    t.string "problemE"
    t.string "problemF"
    t.string "problemG"
    t.string "problemH"
    t.string "problemI"
    t.string "problemJ"
    t.integer "contest_time"
  end

end
