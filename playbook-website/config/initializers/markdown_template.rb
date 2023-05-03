# frozen_string_literal: true

ActionView::Template.register_template_handler(:md, Playbook::Markdown::Helper)
