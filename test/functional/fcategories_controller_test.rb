require 'test_helper'

class FcategoriesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:fcategories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create fcategory" do
    assert_difference('Fcategory.count') do
      post :create, :fcategory => { }
    end

    assert_redirected_to fcategory_path(assigns(:fcategory))
  end

  test "should show fcategory" do
    get :show, :id => fcategories(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => fcategories(:one).to_param
    assert_response :success
  end

  test "should update fcategory" do
    put :update, :id => fcategories(:one).to_param, :fcategory => { }
    assert_redirected_to fcategory_path(assigns(:fcategory))
  end

  test "should destroy fcategory" do
    assert_difference('Fcategory.count', -1) do
      delete :destroy, :id => fcategories(:one).to_param
    end

    assert_redirected_to fcategories_path
  end
end
