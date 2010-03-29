# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20100319104727) do

  create_table "orders", :force => true do |t|
    t.integer  "user_id",                                                                :null => false
    t.decimal  "amount",                    :precision => 3, :scale => 2
    t.integer  "item_id"
    t.integer  "status",                                                  :default => 0
    t.string   "txn_id",     :limit => 100
    t.string   "ord_id",     :limit => 100
    t.integer  "type_id",                                                                :null => false
    t.datetime "expired_at",                                                             :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "product_id"
  end

  add_index "orders", ["ord_id"], :name => "index_orders_on_ord_id", :unique => true
  add_index "orders", ["user_id"], :name => "index_orders_on_user_id"

  create_table "passwords", :force => true do |t|
    t.integer  "user_id"
    t.string   "reset_code"
    t.datetime "expiration_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "products", :force => true do |t|
    t.integer  "period",     :null => false
    t.integer  "price",      :null => false
    t.string   "code",       :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "roles", :force => true do |t|
    t.string "name"
  end

  create_table "roles_users", :id => false, :force => true do |t|
    t.integer "role_id"
    t.integer "user_id"
  end

  create_table "sessions", :force => true do |t|
    t.string   "session_id", :null => false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_id"], :name => "index_sessions_on_session_id"
  add_index "sessions", ["updated_at"], :name => "index_sessions_on_updated_at"

  create_table "user_tests", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.string   "test_id",    :null => false
    t.integer  "total"
    t.integer  "correct"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_tests", ["test_id"], :name => "index_user_tests_on_test_id"
  add_index "user_tests", ["user_id"], :name => "index_user_tests_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "name",                      :limit => 100, :default => ""
    t.string   "email",                     :limit => 100
    t.string   "crypted_password",          :limit => 40
    t.string   "salt",                      :limit => 40
    t.string   "remember_token",            :limit => 40
    t.string   "activation_code",           :limit => 40
    t.string   "state",                                    :default => "passive"
    t.datetime "remember_token_expires_at"
    t.datetime "activated_at"
    t.datetime "deleted_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true

end
