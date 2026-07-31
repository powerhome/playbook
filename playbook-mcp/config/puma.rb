# frozen_string_literal: true

max_threads_count = ENV.fetch("RAILS_MAX_THREADS", 5)
min_threads_count = ENV.fetch("RAILS_MIN_THREADS") { max_threads_count }
threads min_threads_count, max_threads_count

worker_timeout 3600 if ENV.fetch("RAILS_ENV", "development") == "development"

port ENV.fetch("PORT", 3099)
environment ENV.fetch("RAILS_ENV", "development")
pidfile ENV.fetch("PIDFILE", "tmp/pids/server.pid")

# Streamable HTTP transport keeps session state in memory — single process only.
workers 0

plugin :tmp_restart
