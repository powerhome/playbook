# frozen_string_literal: true

# spec/controllers/guides_controller_spec.rb
require "rails_helper"

RSpec.describe GuidesController, type: :controller do
  describe "GET #md_doc" do
    it "renders 'child' guide" do
      get :md_doc, params: { parent: "getting_started", page: "rails_&_react_setup" }
      expect(response).to be_successful
      expect(response).to render_template("guides/getting_started/rails_&_react_setup")
    end

    it "renders 'parent' guide" do
      get :md_doc, params: { parent: "design_guidelines" }
      expect(response).to be_successful
      expect(response).to render_template("guides/design_guidelines")
    end

    it "redirects to 'parent' guide if 'child' guide does not exist" do
      get :md_doc, params: { parent: "getting_started", page: "johncena" }
      expect(response).to redirect_to("/guides/getting_started")
    end

    it "redirects to home if 'parent' guide does not exist" do
      get :md_doc, params: { parent: "johncena" }
      expect(response).to redirect_to(root_path)
    end
  end
end
