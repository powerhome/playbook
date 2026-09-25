# frozen_string_literal: true

require "playbook_mcp"

# Fill kit schema / playground caches on the boot thread. SchemaStore is a
# process-wide singleton and Puma is multithreaded — request threads only read.
PlaybookMcp::SchemaStore.instance
