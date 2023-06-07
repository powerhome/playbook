# frozen_string_literal: true

require "markdown_helper"

ActionView::Template.register_template_handler(:md, PlaybookWebsite::Markdown::Helper)
