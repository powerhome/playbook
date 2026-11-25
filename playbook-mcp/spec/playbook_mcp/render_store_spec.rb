# frozen_string_literal: true

require "spec_helper"

RSpec.describe PlaybookMcp::RenderStore do
  around do |example|
    described_class.reset_instance!
    example.run
    described_class.reset_instance!
  end

  it "builds a single store when threads make the first call together" do
    # Slow construction so every thread passes the `@instance` check before any finishes.
    allow(described_class).to receive(:new).and_wrap_original do |original, *args, **kwargs|
      sleep 0.05
      original.call(*args, **kwargs)
    end

    stores = Array.new(10) { Thread.new { described_class.instance } }.map(&:value)

    expect(stores.uniq.size).to eq(1)
    expect(described_class).to have_received(:new).once
  end

  it "reads back what another thread stored" do
    id = Thread.new { described_class.instance.put("<p>kpi</p>") }.value
    expect(Thread.new { described_class.instance.get(id) }.value).to eq("<p>kpi</p>")
  end

  it "expires entries after the TTL" do
    store = described_class.new(ttl_seconds: 0)
    id = store.put("<p>gone</p>")
    expect(store.get(id)).to be_nil
  end

  it "evicts the oldest entry at capacity" do
    store = described_class.new(max_entries: 2)
    first = store.put("a")
    store.put("b")
    store.put("c")
    expect(store.size).to eq(2)
    expect(store.get(first)).to be_nil
  end
end
