require 'test_helper'

class EncategoriesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:encategories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create encategory" do
    assert_difference('Encategory.count') do
      post :create, :encategory => { }
    end

    assert_redirected_to encategory_path(assigns(:encategory))
  end

  test "should show encategory" do
    get :show, :id => encategories(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => encategories(:one).to_param
    assert_response :success
  end

  test "should update encategory" do
    put :update, :id => encategories(:one).to_param, :encategory => { }
    assert_redirected_to encategory_path(assigns(:encategory))
  end

  test "should destroy encategory" do
    assert_difference('Encategory.count', -1) do
      delete :destroy, :id => encategories(:one).to_param
    end

    assert_redirected_to encategories_path
  end
end
