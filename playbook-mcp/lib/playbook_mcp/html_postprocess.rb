# frozen_string_literal: true

module PlaybookMcp
  module HtmlPostprocess
  module_function

    # Playbook Icon kit historically serialized Nokogiri::XML documents, which
    # injects <?xml version="1.0"?> before each <svg>. Strip any leftovers so
    # HTML/srcdoc hosts see well-formed markup.
    def clean(html)
      html.to_s.gsub(/<\?xml\b[^?]*\?>\s*/i, "")
    end
  end
end
