# frozen_string_literal: true

require "spec_helper"

RSpec.describe PlaybookMcp::Middleware::RateLimiter do
  let(:app) { ->(_env) { [200, {}, ["ok"]] } }

  before do
    allow(Rails.application.config.playbook_mcp).to receive(:rate_limit_max).and_return(2)
    allow(Rails.application.config.playbook_mcp).to receive(:rate_limit_window).and_return(60)
  end

  def mcp_env(consumer)
    { "PATH_INFO" => "/mcp", PlaybookMcp::Middleware::SharedSecret::CONSUMER_ENV => consumer, "rack.input" => StringIO.new }
  end

  it "returns 429 when over limit" do
    mw = described_class.new(app)
    env = mcp_env("librechat")
    expect(mw.call(env).first).to eq(200)
    expect(mw.call(env).first).to eq(200)
    expect(mw.call(env).first).to eq(429)
  end

  it "limits each consumer separately" do
    mw = described_class.new(app)
    2.times { mw.call(mcp_env("librechat")) }
    expect(mw.call(mcp_env("librechat")).first).to eq(429)
    expect(mw.call(mcp_env("dw_agent")).first).to eq(200)
  end
end

RSpec.describe PlaybookMcp::Middleware::SharedSecret do
  let(:app) { ->(env) { [200, {}, [env[described_class::CONSUMER_ENV].to_s]] } }
  let(:keys) { { "librechat" => "lc-s3cret", "dw_agent" => "dw-s3cret" } }

  before { allow(Rails.application.config.playbook_mcp).to receive(:consumer_keys).and_return(keys) }

  def call_mcp(key = nil)
    env = { "PATH_INFO" => "/mcp", "rack.input" => StringIO.new }
    env["HTTP_X_PLAYBOOK_MCP_KEY"] = key if key
    described_class.new(app).call(env)
  end

  it "is a no-op when no keys are configured" do
    allow(Rails.application.config.playbook_mcp).to receive(:consumer_keys).and_return({})
    expect(call_mcp.first).to eq(200)
  end

  it "rejects a missing key" do
    expect(call_mcp.first).to eq(401)
  end

  it "rejects an unknown key" do
    expect(call_mcp("nope").first).to eq(401)
  end

  it "accepts each consumer's key and records the consumer name" do
    status, _, body = call_mcp("lc-s3cret")
    expect([status, body.join]).to eq([200, "librechat"])

    status, _, body = call_mcp("dw-s3cret")
    expect([status, body.join]).to eq([200, "dw_agent"])
  end

  it "allows /ui without key so browser iframes can load external_url" do
    status, = described_class.new(app).call("PATH_INFO" => "/ui/abc", "rack.input" => StringIO.new)
    expect(status).to eq(200)
  end
end
