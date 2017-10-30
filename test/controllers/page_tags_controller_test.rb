require 'test_helper'

class PageTagsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @page_tag = page_tags(:one)
  end

  test "should get index" do
    get page_tags_url
    assert_response :success
  end

  test "should get new" do
    get new_page_tag_url
    assert_response :success
  end

  test "should create page_tag" do
    assert_difference('PageTag.count') do
      post page_tags_url, params: { page_tag: {  } }
    end

    assert_redirected_to page_tag_url(PageTag.last)
  end

  test "should show page_tag" do
    get page_tag_url(@page_tag)
    assert_response :success
  end

  test "should get edit" do
    get edit_page_tag_url(@page_tag)
    assert_response :success
  end

  test "should update page_tag" do
    patch page_tag_url(@page_tag), params: { page_tag: {  } }
    assert_redirected_to page_tag_url(@page_tag)
  end

  test "should destroy page_tag" do
    assert_difference('PageTag.count', -1) do
      delete page_tag_url(@page_tag)
    end

    assert_redirected_to page_tags_url
  end
end
