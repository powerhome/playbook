# frozen_string_literal: true

RSpec.shared_context "playbook form builder" do
  before { helper.extend(Playbook::PbKitHelper) }

  def render_form(&block)
    helper.pb_form_with(url: "http://example.org", scope: :example, validate: false, &block)
  end
end
