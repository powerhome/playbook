# frozen_string_literal: true

require "parser/current"

# Set the path to your component library's root directory
library_path = "../../"

# Define the list of allowed filenames
def allowed_filenames; end

def count_props_in_ruby(file_path)
  code = File.read(file_path)
  ast = Parser::CurrentRuby.parse(code)

  prop_count = 0
  traverse_ast(ast) do |node|
    prop_count += 1 if prop_node?(node)
  end

  prop_count
end

def traverse_ast(node, &block)
  yield node
  node.children.each do |child|
    traverse_ast(child, &block) if child.is_a?(Parser::AST::Node)
  end
end

def prop_node?(node)
  node.type == :send && node.children[1] == :prop
end

# Traverse the component library directory recursively
def traverse_directory(directory_path)
  total_components = 0
  total_props = 0

  Dir.foreach(directory_path) do |file|
    next if file.start_with?(".") # Skip hidden files

    file_path = File.join(directory_path, file)
    if File.directory?(file_path)
      component_stats = traverse_directory(file_path)
      total_components += component_stats[:total_components]
      total_props += component_stats[:total_props]
    elsif file.start_with?("_") && file.end_with?(".rb") && allowed_filenames.include?(file[1..-4])
      props_total = count_props_in_ruby(file_path)
      puts "File: #{file}, Props Total: #{props_total}"
      total_components += 1
      total_props += props_total
    end
  end

  { total_components: total_components, total_props: total_props }
end

# Start traversing the component library
component_stats = traverse_directory(library_path)

# Display the statistics
puts "Components Total:", component_stats[:total_components]
puts "Props Total on All Components:", component_stats[:total_props]
