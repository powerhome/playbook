# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_skeleton_loading/skeleton_loading"

RSpec.describe Playbook::PbSkeleton_loading::Skeleton_loading do
  subject { Playbook::PbSkeleton_loading::Skeleton_loading }

  it { is_expected.to define_partial }

  # Do not leave this file blank. Use other spec files for example tests.
end
