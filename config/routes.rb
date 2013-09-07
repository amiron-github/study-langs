ActionController::Routing::Routes.draw do |map|
  map.resources :settings
  map.resources :fcategories
  map.connect '/:lang/:to_lang/posts/change_post/:id', :controller => 'posts', :action => 'change_post'
  map.connect '/posts/change_post/:id', :controller => 'posts', :action => 'change_post'
  map.connect '/:lang/:to_lang/posts', :controller => 'posts', :action => 'create'
  map.connect '/:lang/:to_lang/posts/:id', :controller => 'posts', :action => 'update'
  map.resources :posts
  map.connect '/topics/remove_all_favorites', :controller => 'topics', :action => 'remove_all_favorites'
  map.connect '/:lang/topics/no_favorite', :controller => 'topics', :action => 'remove_favorite'
  map.connect '/topics/no_favorite', :controller => 'topics', :action => 'remove_favorite'
  map.connect '/:lang/topics/to_favorite', :controller => 'topics', :action => 'add_to_favorite'
  map.connect '/topics/to_favorite', :controller => 'topics', :action => 'add_to_favorite'
  map.connect '/:lang/:to_lang/topics/update_post/:id', :controller => 'topics', :action => 'update_post'
  map.connect '/topics/update_post/:id', :controller => 'topics', :action => 'update_post'
  map.connect '/:lang/:to_lang/topics/:id/update_topic', :controller => 'topics', :action => 'update_topic'
  map.connect '/topics/:id/update_topic', :controller => 'topics', :action => 'update_topic'
  map.connect '/:lang/:to_lang/forum/new_topic', :controller => 'topics', :action => 'new', :forum=>1
  map.connect '/forum/new_topic', :controller => 'topics', :action => 'new', :forum=>1
  map.connect '/:lang/:to_lang/topics/new', :controller => 'topics', :action => 'new'
  map.connect '/:lang/:to_lang/topics', :controller => 'topics', :action => 'create'
  map.connect '/:lang/:to_lang/forum/topic/:id', :controller => 'topics', :action => 'show'
  map.connect '/forum/topic/:id', :controller => 'topics', :action => 'show'
  map.connect '/:lang/:to_lang/topics/:id', :controller => 'topics', :action => 'show'
  map.resources :topics
  map.connect '/:lang/:to_lang/forum/member/:user_id', :controller => 'forums', :action => 'show_user_posts', :id=>1
  map.connect '/forum/member/:user_id', :controller => 'forums', :action => 'show_user_posts', :id=>1
  map.connect '/:lang/:to_lang/forum/my_page', :controller => 'forums', :action => 'show_my_posts', :id=>1
  map.connect '/forum/my_page', :controller => 'forums', :action => 'show_my_posts', :id=>1
  map.connect '/:lang/:to_lang/forum/favorites', :controller => 'forums', :action => 'show_favorites', :id=>1
  map.connect '/forum/favorites', :controller => 'forums', :action => 'show_favorites', :id=>1
  map.connect '/:lang/:to_lang/forum/category/:cat_id', :controller => 'forums', :action => 'show_cat', :forum_id=>1
  map.connect '/forum/category/:cat_id', :controller => 'forums', :action => 'show_cat', :forum_id=>1
  map.connect '/:lang/:to_lang/forum/categories', :controller => 'forums', :action => 'show_by_cat', :id=>1
  map.connect '/forum/categories', :controller => 'forums', :action => 'show_by_cat', :id=>1
  map.connect '/:lang/:to_lang/forum/', :controller => 'forums', :action => 'show', :id=>1
  map.connect '/forum/', :controller => 'forums', :action => 'show', :id=>1
  map.connect '/:lang/:to_lang/forums/:forum_id/show_cat/:cat_id', :controller => 'forums', :action => 'show_cat'
  map.connect '/forums/:forum_id/show_cat/:cat_id', :controller => 'forums', :action => 'show_cat'
  map.connect '/:lang/:to_lang/forums/:id/show_by_cat', :controller => 'forums', :action => 'show_by_cat'
  map.connect '/forums/:id/show_by_cat', :controller => 'forums', :action => 'show_by_cat'
  map.connect '/:lang/:to_lang/forums/:id/show_favorites', :controller => 'forums', :action => 'show_favorites'
  map.connect '/forums/:id/show_favorites', :controller => 'forums', :action => 'show_favorites'
  map.connect '/forums/:id/show_user_posts/:user_id', :controller => 'forums', :action => 'show_user_posts'
  map.connect '/:lang/:to_lang/forums/:id/show_my_posts', :controller => 'forums', :action => 'show_my_posts'
  map.connect '/forums/:id/show_my_posts', :controller => 'forums', :action => 'show_my_posts'
  map.connect '/:lang/:to_lang/forums/:id', :controller => 'forums', :action => 'show'
  map.resources :forums
  
  map.mobile '/m/:lang/:to_lang/:subpage/:page', :controller => 'materials', :action=>'publish', :special_layout => 'm'
  map.mobile '/m/:lang/:to_lang/:page', :controller => 'materials', :action=>'publish', :special_layout => 'm'
  map.mobile '/m/:page', :controller => 'materials', :action=>'publish', :special_layout => 'm'
  map.mobile '/mobile/:lang/:to_lang/course/:page', :controller => 'materials', :action=>'publish', :special_layout => 'mobile'
  map.mobile '/mobile/:lang/:to_lang/vocabulary/:page', :controller => 'materials', :action=>'publish', :special_layout => 'mobile'
  map.mobile '/mobile/:lang/:to_lang/grammar/:page', :controller => 'materials', :action=>'publish', :special_layout => 'mobile'  
  map.mobile '/mobile/:lang/:to_lang/phonetics/:page', :controller => 'materials', :action=>'publish', :special_layout => 'mobile' 
  map.mobile '/mobile/:lang/:to_lang/reading/:page', :controller => 'materials', :action=>'publish', :special_layout => 'mobile'  
  map.mobile '/mobile/:lang/:to_lang/:page', :controller => 'materials', :action=>'publish', :special_layout => 'mobile'
  map.mobile '/mobile/:page', :controller => 'materials', :action=>'publish', :special_layout => 'mobile'

  map.page '/ru/fr/vocabulary', :controller => 'materials', :action=>'publish', :lang=>'ru', :to_lang=>'fr'
  map.page '/:lang/:to_lang/vocabulary', :controller => 'materials', :action=>'publish'
  
 
  map.courses_page '/:lang/:to_lang/courses', :controller => 'materials', :action=>'publish'
  map.vocab_page '/:lang/:to_lang/vocab', :controller => 'materials', :action=>'publish'
  map.vocab_page '/:lang/:to_lang/user_profile', :controller => 'materials', :action=>'publish'
  map.phonetics_page '/:lang/:to_lang/phonetics', :controller => 'materials', :action=>'publish'
  map.reading_page '/:lang/:to_lang/reading', :controller => 'materials', :action=>'publish'
  map.contacts_page '/:lang/:to_lang/contacts', :controller => 'materials', :action=>'publish'
  map.grammar_page '/:lang/:to_lang/grammar', :controller => 'materials', :action=>'publish'
  map.kids_page '/:lang/:to_lang/kids', :controller => 'materials', :action=>'publish'
  map.texts_page '/:lang/:to_lang/texts', :controller => 'materials', :action=>'publish'
  map.translation_page '/:lang/:to_lang/translation', :controller => 'materials', :action=>'publish'

  map.kids '/:lang/:to_lang/kids/:subcategory/:page', :controller => 'materials', :action=>'publish'
  map.kids '/:lang/:to_lang/kids/:page', :controller => 'materials', :action=>'publish'
  map.kids '/kids/:page', :controller => 'materials', :action=>'publish'
  map.translation '/:lang/:to_lang/translation/:page', :controller => 'materials', :action=>'publish'
  map.translation '/translation/:page', :controller => 'materials', :action=>'publish' 
  map.texts '/:lang/:to_lang/texts/:page', :controller => 'materials', :action=>'publish'
  map.texts '/texts/:page', :controller => 'materials', :action=>'publish' 
  map.vocab '/:lang/:to_lang/vocab/:subcategory/:page', :controller => 'materials', :action=>'publish'
  map.vocab '/:lang/:to_lang/vocab/:page', :controller => 'materials', :action=>'publish'
  map.vocab '/vocab/:subcategory/:page', :controller => 'materials', :action=>'publish'
  map.vocab '/vocab/:page', :controller => 'materials', :action=>'publish'  
  map.courses '/:lang/:to_lang/courses/:subcategory/:page', :controller => 'materials', :action=>'publish'
  map.courses '/:lang/:to_lang/courses/:page', :controller => 'materials', :action=>'publish'
  map.courses '/courses/:subcategory/:page', :controller => 'materials', :action=>'publish'
  map.courses '/courses/:page', :controller => 'materials', :action=>'publish'
  map.developer '/developer/:page', :controller => 'materials', :action=>'publish_developer', :special_layout => 'developer'
  map.reading '/:lang/:to_lang/reading/:page', :controller => 'materials', :action=>'publish'
  map.reading '/reading/:page', :controller => 'materials', :action=>'publish'
  map.phonetics '/:lang/:to_lang/phonetics/:page', :controller => 'materials', :action=>'publish'
  map.phonetics '/phonetics/:page', :controller => 'materials', :action=>'publish'
  map.grammar '/:lang/:to_lang/grammar/:subcategory/:page', :controller => 'materials', :action=>'publish'
  map.grammar '/:lang/:to_lang/grammar/:page', :controller => 'materials', :action=>'publish'
  map.grammar '/grammar/:subcategory/:page', :controller => 'materials', :action=>'publish'
  map.grammar '/grammar/:page', :controller => 'materials', :action=>'publish'
  map.faq '/:lang/:to_lang/faq/:page', :controller => 'materials', :action=>'publish'
  map.faq '/faq/:page', :controller => 'materials', :action=>'publish'
  map.page '/:lang/:to_lang/page/:page', :controller => 'materials', :action=>'publish'
  map.page '/page/:page', :controller => 'materials', :action=>'publish'
  map.info '/:lang/:to_lang/info/:page', :controller => 'materials', :action=>'publish'
  map.info '/info/:page', :controller => 'materials', :action=>'publish'

  map.connect '/fr/ru/rss.xml', :controller => 'materials', :action=>'rss', :material=>428 
  map.connect '/ru/en/rss.xml', :controller => 'materials', :action=>'rss', :material=>427   
  map.connect '/rss.xml', :controller => 'materials', :action=>'rss', :material=>426  
  map.connect '/materials/preview_ajax/:id', :controller => 'materials', :action=>'preview_ajax'
  map.resources :materials
  
  map.lexictest '/:lang/:to_lang/lexical-test/:category/', :controller => 'vocabulary', :action => 'build_test'
  map.flashcard '/:lang/:to_lang/flashcards/:category/', :controller => 'vocabulary', :action => 'build_flashcard'
  map.vocabulary '/:lang/:to_lang/vocabulary/:category/', :controller => 'vocabulary', :action => 'build_vocabulary'
  map.vocabulary '/vocabulary/:category/', :controller => 'vocabulary', :action => 'build_vocabulary'
  map.vocabulary '/:lang/:to_lang/:category/lesson/:lesson', :controller => 'vocabulary', :action => 'build_lesson'
  map.connect 'clusters/words_to_add', :controller => 'clusters', :action => 'words_to_add'
  map.connect 'clusters/remove_from_cluster', :controller => 'clusters', :action => 'remove_from_cluster'
  map.connect 'clusters/add_to_cluster', :controller => 'clusters', :action => 'add_to_cluster'
  map.connect 'clusters/save_cluster_order', :controller => 'clusters', :action => 'save_cluster_order'
  map.connect 'clusters/select_to_remove', :controller => 'clusters', :action => 'select_to_remove'
  map.resources :clusters
  map.connect '/exercises/search', :controller => 'exercises', :action => 'search'
  map.connect '/exercises/new_list', :controller => 'exercises', :action => 'new_list'
  map.connect '/exercises/create_list', :controller => 'exercises', :action => 'create_list'
  map.connect '/exercises/list_edit', :controller => 'exercises', :action => 'list_edit'
  map.connect '/exercises/save_exercise_changes', :controller => 'exercises', :action => 'save_exercise_changes'
  map.resources :exercises
  map.connect 'words/words_index', :controller => 'words', :action => 'words_index'
  map.connect 'words/new_list', :controller => 'words', :action => 'new_list'
  map.connect 'words/create_list', :controller => 'words', :action => 'create_list'
  map.connect 'words/save_enword_attributes', :controller => 'words', :action => 'save_enword_attributes'
  map.connect 'words/save_enword_changes', :controller => 'words', :action => 'save_enword_changes'
  map.connect 'words/quick_edit', :controller => 'words', :action => 'quick_edit'
  map.connect 'words/quick_create', :controller => 'words', :action => 'quick_create'
  map.connect 'words/quick_show', :controller => 'words', :action => 'quick_show'
  map.connect 'words/cat_edit', :controller => 'words', :action => 'cat_edit'
  map.connect 'words/cat_edit_fr', :controller => 'words', :action => 'cat_edit_fr'
  map.connect 'words/cat_data', :controller => 'words', :action => 'cat_data'
  map.connect 'words/list_attributes', :controller => 'words', :action => 'list_attributes'
  map.connect 'words/cat_index', :controller => 'words', :action => 'cat_index' 
  map.connect 'words/index_lang', :controller => 'words', :action => 'index_lang'    
  map.connect 'update_cat_order', :controller => 'words', :action => 'update_cat_order' 
  map.resources :words
  map.resources :categories

  map.forgot_password '/:lang/:to_lang/forgot_password',             :controller => 'passwords', :action => 'new'
  map.change_password '/:lang/:to_lang/change_password/:reset_code', :controller => 'passwords', :action => 'reset'
  map.change_password '/:lang/:to_lang/update_password/', :controller => 'passwords', :action => 'update_after_forgetting' 
  map.forgot_password '/forgot_password',             :controller => 'passwords', :action => 'new'
  map.change_password '/change_password/:reset_code', :controller => 'passwords', :action => 'reset'
  map.change_password '/update_password/', :controller => 'passwords', :action => 'update_after_forgetting'

  map.resources :passwords
  map.order '/order', :controller => 'users', :action => 'new_order'
  map.success '/success', :controller => 'users', :action => 'success_pp'
  map.buy '/buy', :controller => 'users', :action => 'buy'
  map.ppipn '/gettrial', :controller => 'users', :action => 'gettrial'
  map.ppipn '/ppipn', :controller => 'orders', :action => 'paypal_ipn'
  map.login '/:lang/:to_lang/logout', :controller => 'sessions', :action => 'destroy'
  map.logout '/logout', :controller => 'sessions', :action => 'destroy'
#  map.login '/:lang/login', :controller => 'sessions', :action => 'new'
  map.login '/:lang/:to_lang/login', :controller => 'sessions', :action => 'new'
  map.login '/login', :controller => 'sessions', :action => 'new'
  map.register '/register', :controller => 'users', :action => 'create'
  map.signup '/:lang/:to_lang/signup', :controller => 'users', :action => 'new'
  map.signup '/signup', :controller => 'users', :action => 'new'
  map.activate '/:lang/:to_lang/activate/:activation_code', :controller => 'users', :action => 'activate', :activation_code => nil
  map.activate '/:lang/activate/:activation_code', :controller => 'users', :action => 'activate', :activation_code => nil
  map.activate '/activate/:activation_code', :controller => 'users', :action => 'activate', :activation_code => nil
  
  map.user_topic '/get_user_topic', :controller =>'vocabulary', :action=>'get_user_topic'
  map.vocab_lis '/get_flash_list', :controller =>'vocabulary', :action=>'get_flash_list'
  map.connect '/users/change_userpic', :controller => 'users', :action => 'change_userpic'
  map.cart '/cart', :controller => 'users', :action => 'show_cart'
  map.user '/user', :controller => 'users', :action => 'update_user'
  map.delete_topic '/delete_topic_words_and_tests', :controller => 'users', :action => 'delete_topic_words_and_tests'
  map.delete_topic '/delete_tests', :controller => 'users', :action => 'delete_tests'
  map.userp '/userp', :controller => 'users', :action => 'update_pass'
  map.userd '/userd', :controller => 'users', :action => 'del'
  map.del_stat '/del_stat', :controller => 'users', :action => 'del_stat'
  map.get_stat '/set_stat', :controller => 'users', :action => 'set_stat'
  map.set_word '/set_word', :controller => 'users', :action => 'set_word'
  map.edit '/edit', :controller => 'users', :action => 'save_user'
  map.psedit '/psedit', :controller => 'users', :action => 'save_pass'
  map.user_name '/:lang/update_desc', :controller => 'users', :action => 'update_desc'
  map.user_name '/update_desc', :controller => 'users', :action => 'update_desc'
  map.user_name '/update_nick', :controller => 'users', :action => 'update_nick'
  
  map.userdata '/userdata' , :controller => 'userdata', :action => 'index'
  map.userdata '/userdata/see_user_words' , :controller => 'userdata', :action => 'see_user_words'
  map.userdata '/userdata/add_setting/:id' , :controller => 'userdata', :action => 'add_setting'
  map.userdata '/userdata/make_admin', :controller => 'userdata', :action => 'make_admin'
  map.userdata '/userdata/edit_state/:id', :controller => 'userdata', :action => 'edit_state'
  map.userdata '/userdata/edit_payment/:id', :controller => 'userdata', :action => 'edit_payment'
  map.userdata '/userdata/disadmin/:id', :controller => 'userdata', :action => 'disadmin'
  map.userdata '/userdata/edit_expiration_date/:id', :controller => 'userdata', :action => 'edit_expiration_date'
  map.userdata "/userdata/:action/:id" , :controller => 'userdata'
  map.userdata "/userdata/:action" , :controller => 'userdata'
  
  map.pages '/fr/', :controller => 'site', :action=>'page', :lang=>'fr'
  map.pages '/en/page/:page', :controller => 'materials', :action=>'publish', :lang=>'en', :to_lang=>'none'
  map.pages '/fr/page/:page', :controller => 'materials', :action=>'publish', :lang=>'fr', :to_lang=>'none'
  map.pages '/ru/page/:page', :controller => 'materials', :action=>'publish', :lang=>'ru', :to_lang=>'none'

  map.resources :users, :member => { :suspend => :put, :unsuspend => :put, :purge => :delete }
  map.resource :session

  # The priority is based upon order of creation: first created -> highest priority.

  # Sample of regular route:
  #   map.connect 'products/:id', :controller => 'catalog', :action => 'view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   map.purchase 'products/:id/purchase', :controller => 'catalog', :action => 'purchase'
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   map.resources :products

  # Sample resource route with options:
  #   map.resources :products, :member => { :short => :get, :toggle => :post }, :collection => { :sold => :get }

  # Sample resource route with sub-resources:
  #   map.resources :products, :has_many => [ :comments, :sales ], :has_one => :seller
  
  # Sample resource route with more complex sub-resources
  #   map.resources :products do |products|
  #     products.resources :comments
  #     products.resources :sales, :collection => { :recent => :get }
  #   end

  # Sample resource route within a namespace:
  #   map.namespace :admin do |admin|
  #     # Directs /admin/products/* to Admin::ProductsController (app/controllers/admin/products_controller.rb)
  #     admin.resources :products
  #   end

  # You can have the root of your site routed with map.root -- just remember to delete public/index.html.
  # map.root :controller => "welcome"
  
  
  map.root :controller => 'site', :action => 'page', :page => 'index.html'

  # See how all your routes lay out with "rake routes"

  # Install the default routes as the lowest priority.
  # Note: These default routes make all actions in every controller accessible via GET requests. You should
  # consider removing the them or commenting them out if you're using named routes and resources.
#  map.connect ':controller/:action/:id'
#  map.connect ':controller/:action/:id.:format'
  map.with_options(:controller => 'site') do |site|
	site.connect '/:lang/:to_lang/*url', :controller => 'site', :action => 'page'
    site.connect '*url', :action => 'page'
  end
end
