# frozen_string_literal: true

require "rails_helper"

RSpec.describe "projects/index", type: :view do
  before(:each) do
    assign(:projects, [
             Project.create!(
               :summary => "MyText"
             ),
             Project.create!(
               :summary => "MyText"
             ),
           ])
  end

  it "renders a list of projects" do
    render
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
