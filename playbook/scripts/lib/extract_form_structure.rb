# frozen_string_literal: true

# Parse source only: no Rails boot, evaluation, or application dependencies.
require "json"
require "ripper"

class FormStructure
  BUILDER = "lib/playbook/forms/builder.rb"
  GENERIC = "lib/playbook/forms/builder/form_field_builder.rb"
  ACTIONS = "lib/playbook/forms/builder/action_area.rb"

  def initialize(root)
    @root = root
    @tokens = {}
  end

  def nodes(tree, kind)
    return [] unless tree.is_a?(Array)

    matches = tree[0] == kind ? [tree] : []
    matches + tree.flat_map { |child| nodes(child, kind) }
  end

  def parse(file)
    source = File.read(File.join(@root, file))
    @tokens[file] = Ripper.lex(source)
    Ripper.sexp(source) || raise("Cannot parse Ruby form source: #{file}")
  end

  def literal(node, kind)
    token = kind == :string_literal ? :@tstring_content : :@ident
    content = node&.dig(1)
    raise "Expected literal #{kind}, got #{node.inspect}" unless node&.first == kind && content&.length == 2 && content[1][0] == token

    content[1][1]
  end

  def arguments(node)
    node = node[1] if node&.first == :arg_paren
    raise "Unsupported form call arguments" unless node&.first == :args_add_block

    node[1]
  end

  # Private helpers are implementation detail; only public methods belong to the form API.
  def public_defs(tree)
    private_line = nodes(tree, :vcall).find { |node| node[1][1] == "private" }&.dig(1, 2, 0)
    definitions = nodes(tree, :def)
    return definitions unless private_line

    definitions.reject { |definition| definition[1][2][0] > private_line }
  end

  def signature(file, definition)
    name = definition[1][1]
    return name if definition[2][0] == :params && definition[2].drop(1).all?(&:nil?)

    raise "Use parenthesized form method parameters: #{file}:#{name}" unless definition[2][0] == :paren

    tokens = @tokens.fetch(file)
    start = tokens.index { |position, _event, text| position == definition[1][2] && text == name }
    depth = 0
    parts = []
    tokens.drop(start + 1).each do |_position, event, text|
      next if %i[on_comment on_sp on_ignored_nl].include?(event) && parts.empty?
      next if event == :on_comment

      depth += 1 if event == :on_lparen
      depth -= 1 if event == :on_rparen
      parts << (%i[on_nl on_ignored_nl].include?(event) ? " " : text)
      return "#{name}#{parts.join.strip}" if event == :on_rparen && depth.zero?
    end
    raise "Unclosed form signature: #{file}:#{name}"
  end

  def kit_for(tree)
    kits = nodes(tree, :method_add_arg).filter_map do |call|
      next unless call[1][0] == :call && call[1][3][1] == "pb_rails"

      args = arguments(call[2])
      forwards_props = nodes(args, :assoc_new).any? do |entry|
        entry[1][0] == :@label && entry[1][1] == "props:" && entry[2][0] == :var_ref && entry[2][1][1] == "props"
      end
      literal(args[0], :string_literal) if forwards_props
    end.uniq
    raise "Expected one literal pb_rails kit receiving props, found #{kits.inspect}" unless kits.length == 1

    kits.first
  end

  def extract
    builder = parse(BUILDER)
    generic = parse(GENERIC)
    dynamic = nodes(generic, :method_add_block).select do |node|
      node[1][0] == :command && node[1][1][1] == "define_method"
    end
    raise "Expected one generic define_method" unless dynamic.length == 1

    position = dynamic.first[1][1][2]
    tokens = @tokens.fetch(GENERIC)
    start = tokens.index { |pos, _event, text| pos == position && text == "define_method" }
    pipes = tokens.drop(start).each_index.select { |i| tokens[start + i][1] == :on_op && tokens[start + i][2] == "|" }.first(2)
    raise "Missing generic form parameters" unless pipes.length == 2

    generic_params = tokens[(start + pipes[0] + 1)...(start + pipes[1])].map { |token| token[2] }.join.strip
    methods = nodes(builder, :method_add_arg).filter_map do |call|
      next unless call[1][0] == :call && call[1][3][1] == "new"

      receiver = call[1][1]
      next unless receiver[0] == :var_ref && receiver[1][0] == :@const && receiver[1][1] == "FormFieldBuilder"

      args = arguments(call[2])
      name = literal(args[0], :symbol_literal)
      kit = nodes(args, :assoc_new).find { |entry| entry[1][1] == "kit_name:" }
      raise "Missing kit_name for #{name}" unless kit

      { name: name, kit: literal(kit[2], :string_literal), signature: "#{name}(#{generic_params})", sources: [BUILDER, GENERIC] }
    end
    required = nodes(builder, :command).filter_map do |node|
      literal(arguments(node[2])[0], :string_literal) if node[1][1] == "require_relative"
    end
    required.each do |relative|
      file = "lib/playbook/forms/#{relative}.rb"
      next if [GENERIC, ACTIONS].include?(file)
      raise "Unsupported builder require: #{relative}" unless relative.start_with?("builder/") && !relative.include?("..")

      public_defs(parse(file)).each do |definition|
        methods << { name: definition[1][1], kit: kit_for(definition), signature: signature(file, definition), sources: [BUILDER, file] }
      end
    end
    builder_defs = public_defs(builder)
    raise "Expected only actions directly on Builder; update the extractor for new definitions" unless builder_defs.map { |node| node[1][1] } == ["actions"]

    actions = parse(ACTIONS)
    action_defs = public_defs(actions).reject { |node| node[1][1] == "initialize" }
    {
      methods: methods,
      actions: { name: "actions", signature: signature(BUILDER, builder_defs.first), kit: kit_for(actions), methods: action_defs.map { |definition| signature(ACTIONS, definition) }, sources: [BUILDER, ACTIONS] },
    }
  end
end

puts JSON.generate(FormStructure.new(ARGV.fetch(0)).extract)
