ActionController::Routing::Routes.draw do |map|
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
  map.register '/register', :controller => 'users', :action => 'create'
  map.signup '/signup', :controller => 'users', :action => 'new'
  map.activate '/activate/:activation_code', :controller => 'users', :action => 'activate', :activation_code => nil

  map.cart '/cart', :controller => 'users', :action => 'show_cart'

  map.user '/user', :controller => 'users', :action => 'update_user'
  map.userp '/userp', :controller => 'users', :action => 'update_pass'
  map.userd '/userd', :controller => 'users', :action => 'del'
  map.del_stat '/del_stat', :controller => 'users', :action => 'del_stat'

  map.get_stat '/set_stat', :controller => 'users', :action => 'set_stat'

  map.edit '/edit', :controller => 'users', :action => 'save_user'
  map.psedit '/psedit', :controller => 'users', :action => 'save_pass'
  
  map.userdata '/userdata', :controller => 'userdata', :action => 'index'
  map.userdata '/userdata/:id', :controller => 'userdata', :action => 'show'
  map.userdata '/userdata/edit_state/:id', :controller => 'userdata', :action => 'edit_state'
  map.userdata '/userdata/edit_payment/:id', :controller => 'userdata', :action => 'edit_payment'
  
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
