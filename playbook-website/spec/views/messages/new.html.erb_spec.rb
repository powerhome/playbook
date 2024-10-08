# frozen_string_literal: true

require "rails_helper"

RSpec.describe "messages/new", type: :view do
  before(:each) do
    assign(:message, Message.new(
                       :project => nil,
                       :code => "MyText",
                       :user_input => "MyText",
                       :open_ai_api_response => "MyText"
                     ))
  end

  it "renders new message form" do
    render

    assert_select "form[action=?][method=?]", messages_path, "post" do
      assert_select "input[name=?]", "message[project_id]"

      assert_select "textarea[name=?]", "message[code]"

      assert_select "textarea[name=?]", "message[user_input]"

      assert_select "textarea[name=?]", "message[open_ai_api_response]"
    end
  end
end
