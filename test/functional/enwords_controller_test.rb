require 'test_helper'

class EnwordsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:enwords)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create enword" do
    assert_difference('Enword.count') do
      post :create, :enword => { }
    end

    assert_redirected_to enword_path(assigns(:enword))
  end

  test "should show enword" do
    get :show, :id => enwords(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => enwords(:one).to_param
    assert_response :success
  end

  test "should update enword" do
    put :update, :id => enwords(:one).to_param, :enword => { }
    assert_redirected_to enword_path(assigns(:enword))
  end

  test "should destroy enword" do
    assert_difference('Enword.count', -1) do
      delete :destroy, :id => enwords(:one).to_param
    end

    assert_redirected_to enwords_path
  end
end
