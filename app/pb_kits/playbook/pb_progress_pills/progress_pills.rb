# frozen_string_literal: true

module Playbook
  module PbProgressPills
    class ProgressPills
      include Playbook::Props

      partial "pb_progress_pills/progress_pills"

      prop :active, type: Playbook::Props::Number,
                    default: 0
      prop :value
      prop :steps, type: Playbook::Props::Number,
                   default: 3
      prop :title

      def classname
        generate_classname("pb_progress_pills_kit")
      end

      def with_status
        yield title if title.present?
      end

      def each_step(&block)
        1.upto(steps, &block)
      end

      def active_step(step)
         step <= active ? "_active" : "_inactive"
      end

      def dark_pill
        dark ? " dark" : nil
      end
    end
  end
end
