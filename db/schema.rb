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

ActiveRecord::Schema.define(:version => 20111015185422) do

  create_table "categories", :force => true do |t|
    t.string   "title"
    t.string   "title_ru"
    t.integer  "order_num"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "supercategory"
    t.string   "title_fr"
    t.string   "lang"
    t.string   "tag"
    t.integer  "sound_status"
  end

  create_table "cluster_words", :force => true do |t|
    t.integer  "cluster_id"
    t.integer  "word_id"
    t.integer  "order_num"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "clusters", :force => true do |t|
    t.string   "title"
    t.string   "tag"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "exercises", :force => true do |t|
    t.string   "test_id"
    t.integer  "category_id"
    t.string   "title"
    t.string   "title_ru"
    t.string   "title_fr"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "quest_num"
    t.integer  "variants_num"
    t.string   "quest_type"
  end

  create_table "favorites", :force => true do |t|
    t.integer  "topic_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "fcategories", :force => true do |t|
    t.string   "name"
    t.text     "desc"
    t.string   "name_ru"
    t.text     "desc_ru"
    t.string   "name_fr"
    t.text     "desc_fr"
    t.integer  "status"
    t.integer  "order_num"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "to_lang"
  end

  create_table "forums", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "materials", :force => true do |t|
    t.text     "body"
    t.integer  "status"
    t.string   "tag"
    t.text     "js_css"
    t.string   "section"
    t.string   "html_on_page"
    t.string   "langs"
    t.string   "page_url"
    t.text     "page_title"
    t.text     "page_desc"
    t.text     "page_keywords"
    t.integer  "page_template"
    t.integer  "page_layout"
    t.integer  "author"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "orders", :force => true do |t|
    t.integer  "user_id",                                                 :default => 0, :null => false
    t.decimal  "amount",                    :precision => 3, :scale => 2
    t.integer  "item_id"
    t.integer  "status",                                                  :default => 0
    t.string   "txn_id",     :limit => 100
    t.string   "ord_id",     :limit => 100
    t.integer  "type_id",                                                 :default => 0, :null => false
    t.datetime "expired_at",                                                             :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "product_id"
  end

  add_index "orders", ["user_id"], :name => "index_orders_on_user_id"

  create_table "passwords", :force => true do |t|
    t.integer  "user_id"
    t.string   "reset_code"
    t.datetime "expiration_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "posts", :force => true do |t|
    t.text     "content"
    t.integer  "topic_id"
    t.integer  "user_id"
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
    t.string   "session_id", :default => "", :null => false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_id"], :name => "index_sessions_on_session_id"
  add_index "sessions", ["updated_at"], :name => "index_sessions_on_updated_at"

  create_table "settings", :force => true do |t|
    t.string   "picture"
    t.string   "first_name"
    t.string   "last_name"
    t.integer  "f_status"
    t.string   "country"
    t.integer  "save_words"
    t.integer  "save_ex"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.text     "desc"
    t.integer  "f_avatars"
    t.integer  "f_opt1"
    t.integer  "f_opt2"
    t.integer  "des_opt1"
    t.integer  "des_opt2"
    t.string   "url"
    t.integer  "gender"
  end

  create_table "topics", :force => true do |t|
    t.string   "name"
    t.integer  "last_poster_id"
    t.datetime "last_post_at"
    t.integer  "fcategory_id"
    t.integer  "views"
    t.integer  "user_id"
    t.integer  "forum_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "lang"
    t.integer  "to_lang"
  end

  create_table "user_tests", :force => true do |t|
    t.integer  "user_id",    :default => 0,  :null => false
    t.string   "test_id",    :default => "", :null => false
    t.integer  "total"
    t.integer  "correct"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_tests", ["test_id"], :name => "index_user_tests_on_test_id"
  add_index "user_tests", ["user_id"], :name => "index_user_tests_on_user_id"

  create_table "user_words", :force => true do |t|
    t.integer  "user_id"
    t.integer  "word_id"
    t.integer  "occurred",   :default => 1
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "login",                     :limit => 40
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
    t.integer  "status",                                   :default => 0,         :null => false
  end

  add_index "users", ["login"], :name => "index_users_on_login", :unique => true

  create_table "words", :force => true do |t|
    t.text     "text"
    t.text     "html"
    t.text     "translate"
    t.text     "transcribe"
    t.string   "sound_url"
    t.string   "image_url"
    t.integer  "category_id"
    t.integer  "order_num"
    t.text     "grammar"
    t.text     "forms"
    t.text     "translate_fr"
    t.text     "transcribe_fr"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
