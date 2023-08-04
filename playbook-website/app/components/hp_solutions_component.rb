# frozen_string_literal: true

class HpSolutionsComponent < Playbook::KitBase
  def render_code(text, language)
    formatter = Rouge::Formatters::HTML.new(scope: ".highlight")
    lexer = Rouge::Lexer.find(language)
    formatter.format(lexer.lex(text))
  end
end
