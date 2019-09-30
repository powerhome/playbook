# frozen_string_literal: true

module Playbook
  module Props
    describe Base do
      describe "#validate!" do
        it "returns true when child class passes validation" do
          class TruthyValidationClass < Playbook::Props::Base
            def validate(_value); true; end
          end

          expect(TruthyValidationClass.new.validate!(nil)).to eq true
        end

        it "returns true when child class does not contain custom validation" do
          class NoValidationClass < Playbook::Props::Base; end

          expect(NoValidationClass.new.validate!(nil)).to eq true
        end

        it "raises error when child class fails validation" do
          class FalsyValidationClass < Playbook::Props::Base
            def validate(_value); false; end
          end

          expect { FalsyValidationClass.new.validate!(nil) }.to(
            raise_error(Playbook::Props::Error)
          )
        end
      end
    end
  end
end
