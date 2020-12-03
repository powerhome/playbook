require "playbook_docs/markdown_view_handler"

ActionView::Template.register_template_handler(:md, PlaybookDocs::MarkdownViewHandler)
