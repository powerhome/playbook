# frozen_string_literal: true

require "rails_helper"

RSpec.describe "messages/edit", type: :view do
  before(:each) do
    @message = assign(:message, Message.create!(
                                  :project => nil,
                                  :code => "MyText",
                                  :user_input => "MyText",
                                  :ai_response => "MyText"
                                ))
  end

  it "renders the edit message form" do
    render

    assert_select "form[action=?][method=?]", message_path(@message), "post" do
      assert_select "input[name=?]", "message[project_id]"

      assert_select "textarea[name=?]", "message[code]"

      assert_select "textarea[name=?]", "message[user_input]"

      assert_select "textarea[name=?]", "message[ai_response]"
    end
  end
end
