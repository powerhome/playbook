# frozen_string_literal: true

module Playbook
  module PbCard
    class CardBody < Playbook::KitBase
      def classname
        generate_classname("pb_card_body_kit", flex_direction, justify_content, flex_wrap, justify_self, align_items, align_content, align_self, flex, flex_grow, flex_shrink, order, separator: " ")
      end

      # def body_padding
      #   "" if padding.present?
      # end

      def body_flex_direction
        if flex_direction.present?
          "flex_direction_#{flex_direction}"
        else
          ""
        end
      end

      def body_flex_wrap
        if flex_wrap.present?
          "flex_wrap_#{flex_wrap}"
        else
          ""
        end
      end

      def body_justify_content
        if justify_content.present?
          "justify_content_#{justify_content}"
        else
          ""
        end
      end

      def body_justify_self
        if justify_self.present?
          "justify_self_#{justify_self}"
        else
          ""
        end
      end

      def body_align_items
        if align_items.present?
          "align_items_#{align_items}"
        else
          ""
        end
      end

      def body_align_content
        if align_content.present?
          "align_content_#{align_content}"
        else
          ""
        end
      end

      def body_align_self
        if align_self.present?
          "align_self_#{align_self}"
        else
          ""
        end
      end

      def body_flex
        if flex.present?
          "flex_#{flex}"
        else
          ""
        end
      end

      def body_flex_grow
        if flex_grow.present?
          "flex_grow_#{flex_grow}"
        else
          ""
        end
      end

      def body_flex_shrink
        if flex_shrink.present?
          "flex_shrink_#{flex_shrink}"
        else
          ""
        end
      end

      def body_order
        if order.present?
          "order_#{order}"
        else
          ""
        end
      end
    end
  end
end
