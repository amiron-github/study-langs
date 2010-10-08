ActionController::Routing::Routes.draw do |map|
  map.vocabulary '/:lang/:to_lang/vocabulaire/:category/', :controller => 'vocabulary', :action => 'build_vocabulary'
  map.flashcard '/:lang/:to_lang/flashcards/:category/', :controller => 'vocabulary', :action => 'build_flashcard'
  map.vocabulary '/:lang/:to_lang/vocabulary/:category/', :controller => 'vocabulary', :action => 'build_vocabulary'
  map.connect 'clusters/words_to_add', :controller => 'clusters', :action => 'words_to_add'
  map.connect 'clusters/remove_from_cluster', :controller => 'clusters', :action => 'remove_from_cluster'
  map.connect 'clusters/add_to_cluster', :controller => 'clusters', :action => 'add_to_cluster'
  map.connect 'clusters/save_cluster_order', :controller => 'clusters', :action => 'save_cluster_order'
  map.connect 'clusters/select_to_remove', :controller => 'clusters', :action => 'select_to_remove'
  map.resources :clusters
  map.resources :exercises
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
  map.resources :words
  map.resources :categories

  map.forgot_password '/forgot_password',             :controller => 'passwords', :action => 'new'
  map.change_password '/change_password/:reset_code', :controller => 'passwords', :action => 'reset'
  map.change_password '/update_password/', :controller => 'passwords', :action => 'update_after_forgetting'
  map.resources :passwords
  map.order '/order', :controller => 'users', :action => 'new_order'
  map.success '/success', :controller => 'users', :action => 'success_pp'
  map.buy '/buy', :controller => 'users', :action => 'buy'
  map.ppipn '/gettrial', :controller => 'users', :action => 'gettrial'
  map.ppipn '/ppipn', :controller => 'orders', :action => 'paypal_ipn'
  map.logout '/logout', :controller => 'sessions', :action => 'destroy'
  map.login '/login', :controller => 'sessions', :action => 'new'
  map.login '/:lang/login', :controller => 'sessions', :action => 'new'
  map.register '/register', :controller => 'users', :action => 'create'
  map.signup '/signup', :controller => 'users', :action => 'new'
  map.signup ':lang/signup', :controller => 'users', :action => 'new'
  map.activate '/activate/:activation_code', :controller => 'users', :action => 'activate', :activation_code => nil
  map.cart '/cart', :controller => 'users', :action => 'show_cart'
  map.user '/user', :controller => 'users', :action => 'update_user'
  map.userp '/userp', :controller => 'users', :action => 'update_pass'
  map.userd '/userd', :controller => 'users', :action => 'del'
  map.del_stat '/del_stat', :controller => 'users', :action => 'del_stat'
  map.get_stat '/set_stat', :controller => 'users', :action => 'set_stat'
  map.set_word '/set_word', :controller => 'users', :action => 'set_word'
  map.edit '/edit', :controller => 'users', :action => 'save_user'
  map.psedit '/psedit', :controller => 'users', :action => 'save_pass'
  
  map.userdata "/userdata" , :controller => 'userdata', :action => 'index'
  map.userdata '/userdata/make_admin', :controller => 'userdata', :action => 'make_admin'
  map.userdata '/userdata/edit_state/:id', :controller => 'userdata', :action => 'edit_state'
  map.userdata '/userdata/edit_payment/:id', :controller => 'userdata', :action => 'edit_payment'
  map.userdata '/userdata/disadmin/:id', :controller => 'userdata', :action => 'disadmin'
  map.userdata '/userdata/edit_expiration_date/:id', :controller => 'userdata', :action => 'edit_expiration_date'
  map.userdata "/userdata/:action/:id" , :controller => 'userdata'
  map.userdata "/userdata/:action" , :controller => 'userdata'

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
    site.connect '*url', :action => 'page'
  end
end
