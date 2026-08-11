# frozen_string_literal: true

require "spec_helper"

RSpec.describe PlaybookMcp::Middleware::Allowlist do
  let(:app) { ->(_env) { [200, {}, ["ok"]] } }

  it "allows all when allowlist is empty" do
    allow(Rails.application.config.playbook_mcp).to receive(:allowlist).and_return([])
    status, = described_class.new(app).call("PATH_INFO" => "/mcp", "REMOTE_ADDR" => "1.2.3.4")
    expect(status).to eq(200)
  end

  it "forbids non-allowlisted IPs" do
    allow(Rails.application.config.playbook_mcp).to receive(:allowlist).and_return(["10.0.0.1"])
    status, _, body = described_class.new(app).call(
      "PATH_INFO" => "/mcp",
      "REMOTE_ADDR" => "1.2.3.4",
      "rack.input" => StringIO.new
    )
    expect(status).to eq(403)
    expect(body.join).not_to include("1.2.3.4")
  end

  it "does not trust spoofed leftmost X-Forwarded-For without trusted proxies" do
    allow(Rails.application.config.playbook_mcp).to receive(:allowlist).and_return(["10.0.0.1"])
    status, = described_class.new(app).call(
      "PATH_INFO" => "/mcp",
      "REMOTE_ADDR" => "1.2.3.4",
      "HTTP_X_FORWARDED_FOR" => "10.0.0.1",
      "rack.input" => StringIO.new
    )
    expect(status).to eq(403)
  end

  it "always allows health" do
    allow(Rails.application.config.playbook_mcp).to receive(:allowlist).and_return(["10.0.0.1"])
    status, = described_class.new(app).call("PATH_INFO" => "/health", "REMOTE_ADDR" => "1.2.3.4")
    expect(status).to eq(200)
  end
end

RSpec.describe PlaybookMcp::Middleware::RateLimiter do
  let(:app) { ->(_env) { [200, {}, ["ok"]] } }

  it "returns 429 when over limit" do
    allow(Rails.application.config.playbook_mcp).to receive(:rate_limit_max).and_return(2)
    allow(Rails.application.config.playbook_mcp).to receive(:rate_limit_window).and_return(60)
    mw = described_class.new(app)
    env = { "PATH_INFO" => "/mcp", "REMOTE_ADDR" => "9.9.9.9", "rack.input" => StringIO.new }
    expect(mw.call(env).first).to eq(200)
    expect(mw.call(env).first).to eq(200)
    expect(mw.call(env).first).to eq(429)
  end
end

RSpec.describe PlaybookMcp::Middleware::SharedSecret do
  let(:app) { ->(_env) { [200, {}, ["ok"]] } }

  it "is a no-op when secret unset" do
    allow(Rails.application.config.playbook_mcp).to receive(:shared_secret).and_return("")
    status, = described_class.new(app).call("PATH_INFO" => "/mcp", "rack.input" => StringIO.new)
    expect(status).to eq(200)
  end

  it "rejects missing key when secret set" do
    allow(Rails.application.config.playbook_mcp).to receive(:shared_secret).and_return("s3cret")
    status, = described_class.new(app).call("PATH_INFO" => "/mcp", "rack.input" => StringIO.new)
    expect(status).to eq(401)
  end

  it "allows matching X-Playbook-Mcp-Key" do
    allow(Rails.application.config.playbook_mcp).to receive(:shared_secret).and_return("s3cret")
    status, = described_class.new(app).call(
      "PATH_INFO" => "/mcp",
      "HTTP_X_PLAYBOOK_MCP_KEY" => "s3cret",
      "rack.input" => StringIO.new
    )
    expect(status).to eq(200)
  end

  it "allows /ui without key so browser iframes can load external_url" do
    allow(Rails.application.config.playbook_mcp).to receive(:shared_secret).and_return("s3cret")
    status, = described_class.new(app).call("PATH_INFO" => "/ui/abc", "rack.input" => StringIO.new)
    expect(status).to eq(200)
  end
end
