# frozen_string_literal: true

require "spec_helper"

RSpec.describe "UiController", type: :request do
  around do |example|
    PlaybookMcp::RenderStore.reset_instance!
    example.run
    PlaybookMcp::RenderStore.reset_instance!
  end

  it "serves stored HTML and allows framing" do
    id = PlaybookMcp::RenderStore.instance.put("<!DOCTYPE html><html><body>kpi</body></html>")
    get "/ui/#{id}"
    expect(response).to have_http_status(:ok)
    expect(response.body).to include("kpi")
    expect(response.headers["Content-Security-Policy"]).to include("frame-ancestors")
    expect(response.headers["X-Frame-Options"]).to be_nil
    expect(response.headers["Referrer-Policy"]).to eq("no-referrer")
  end

  it "keeps the render id out of request logs" do
    id = PlaybookMcp::RenderStore.instance.put("<!DOCTYPE html><html><body>kpi</body></html>")
    log = StringIO.new
    logger = ActiveSupport::Logger.new(log)
    allow(Rails).to receive(:logger).and_return(logger)
    allow(ActionController::Base).to receive(:logger).and_return(logger)

    get "/ui/#{id}"

    expect(log.string).to include('"/ui/[FILTERED]"')
    expect(log.string).not_to include(id)
  end

  it "returns 404 for unknown ids" do
    get "/ui/does-not-exist"
    expect(response).to have_http_status(:not_found)
  end
end
