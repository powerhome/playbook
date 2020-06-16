# frozen_string_literal: true

module Playbook
    module PbLayout
      class Column
        include Playbook::Props
  
        partial "pb_layout/column"
  
        def classname
          generate_classname("pb_kanban_column_kit")
        end
      end
    end
  end
  