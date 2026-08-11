# frozen_string_literal: true

require "securerandom"

module PlaybookMcp
  # Short-lived HTML store so MCP-UI can use external_url instead of inlining
  # large htmlString payloads (LibreChat and other hosts truncate tool results).
  class RenderStore
    Entry = Struct.new(:html, :expires_at, keyword_init: true)

    def self.instance
      @instance ||= new(
        ttl_seconds: Integer(ENV.fetch("PLAYBOOK_MCP_RENDER_TTL_SECONDS", "900")),
        max_entries: Integer(ENV.fetch("PLAYBOOK_MCP_RENDER_MAX_ENTRIES", "256"))
      )
    end

    def self.reset_instance!
      @instance = nil
    end

    def initialize(ttl_seconds: 900, max_entries: 256)
      @ttl_seconds = ttl_seconds
      @max_entries = max_entries
      @mutex = Mutex.new
      @entries = {}
    end

    def put(html)
      id = SecureRandom.urlsafe_base64(18)
      @mutex.synchronize do
        evict_expired_unlocked!
        evict_oldest_unlocked! while @entries.size >= @max_entries
        @entries[id] = Entry.new(html: html.to_s, expires_at: Process.clock_gettime(Process::CLOCK_MONOTONIC) + @ttl_seconds)
      end
      id
    end

    def get(id)
      @mutex.synchronize do
        entry = @entries[id.to_s]
        return nil unless entry

        if entry.expires_at <= Process.clock_gettime(Process::CLOCK_MONOTONIC)
          @entries.delete(id.to_s)
          return nil
        end

        entry.html
      end
    end

    def size
      @mutex.synchronize { @entries.size }
    end

  private

    def evict_expired_unlocked!
      now = Process.clock_gettime(Process::CLOCK_MONOTONIC)
      @entries.delete_if { |_id, entry| entry.expires_at <= now }
    end

    def evict_oldest_unlocked!
      oldest_id = @entries.min_by { |_id, entry| entry.expires_at }&.first
      @entries.delete(oldest_id) if oldest_id
    end
  end
end
