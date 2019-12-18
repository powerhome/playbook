# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

- Extend Form Kit to use Select Kit for select form fields ([#511][] @web-kat)
- Text Input padding override was removed for input child ([#526][] @megantrimble)
- Added exports for border-radius, line-height, opacity, z-index, breakpoints, shadows, and spacing  + updated the correct gradient colors ([#527][] @jasoncypret)
- Increased contrast for captions + Corrected table docs and fixed broken border-radius + Added data-table option for cases where we want to display lots of data with very tight spacing ([#528][] @jasoncypret)
- Added territory back to user kit ([#529][] @jasoncypret)

[#511]: https://github.com/powerhome/playbook/pull/511
[#526]: https://github.com/powerhome/playbook/pull/526
[#527]: https://github.com/powerhome/playbook/pull/527
[#529]: https://github.com/powerhome/playbook/pull/529

## [3.1.0] 2019-12-12

### Added

- Introduce CHANGELOG file ([#498][] @rafbgarcia)
- Include Card Separator example in Card kit docs ([#439][] @rruiz85)
- Text Input Dark mode added, Text Input updated to use Textarea mixins and Textarea mixin fix to remove number field arrows ([#494][] @megantrimble)
- Introduce Pull Request Template ([#508][] @rafbgarcia)
- Extend Form Kit to use Textarea Kit for textarea form fields ([#506][] @roxannecojocariu)
- Nav React Kit ([#513][] @christinaatai)

[#498]: https://github.com/powerhome/playbook/pull/498
[#439]: https://github.com/powerhome/playbook/pull/439
[#494]: https://github.com/powerhome/playbook/pull/494
[#508]: https://github.com/powerhome/playbook/pull/508
[#506]: https://github.com/powerhome/playbook/pull/506
[#513]: https://github.com/powerhome/playbook/pull/513

### Changed

- Added an OnChange event handler for the TextArea React Kit ([#505][] @jasperfurniss)
- Update `pb_release:version` task to include confirmation and versioning info

[#505]: https://github.com/powerhome/playbook/pull/505
[#509]: https://github.com/powerhome/playbook/pull/509

### Fixed

- Fixes master branch (regression introduced by myself on #498) ([#500][] @rafbgarcia)
- Display wrong numbers in Person Contact Kit. The Kit will now display a caption "wrong number" and have the wrong numbers listed beneath the caption ([#499][] @KFad11)
- Bug Fix - Null class concatenation on Card Kit ([#497][] @jasperfurniss)
- New React Style with the separator inside of Cards - Card Kit ([#496][] @jasperfurniss)
- Fixes code example bug in Selectable Card kit ([#495][] @christinaatai)
- Card kit null class fix

[#500]: https://github.com/powerhome/playbook/pull/500
[#499]: https://github.com/powerhome/playbook/pull/499
[#497]: https://github.com/powerhome/playbook/pull/497
[#496]: https://github.com/powerhome/playbook/pull/496
[#495]: https://github.com/powerhome/playbook/pull/495
[#501]: https://github.com/powerhome/playbook/pull/501


## [3.0.1] - 2019-12-06

### Fixed

- Move `eslint` to devDependencies ([#489][] @gmfvpereira)

[#489]: https://github.com/powerhome/playbook/pull/489

## [3.0.0] - 2019-12-05

### Added

- New Form Kit - Select Kit ([#478][] @jasoncypret)
- New Form Kit - Selectable Card Kit ([#474][] @christinaatai)
- New React Kit - Section Separator Kit: Added variant & react version ([#480][] @kre8sions)
- New React Kit - Date kit ([#473][] @Annihilous)
- New Form Kit - Add rails form kit with text inputs and buttons ([#376][] @terryfinn)
- New React Kit - Message Kit ([#471][] @christinaatai)
- New React Kit - Icon Circle ([#466][] @Annihilous)
- New Form Kit - Textarea kit ([#467][] @christinaatai)
- New Kit - Circle Icon Button Kit ([#469][] @christinaatai)
- New React Kit - User Kit ([#456][] @christinaatai)

[#498]: https://github.com/powerhome/playbook/pull/498
[#478]: https://github.com/powerhome/playbook/pull/478
[#474]: https://github.com/powerhome/playbook/pull/474
[#480]: https://github.com/powerhome/playbook/pull/480
[#473]: https://github.com/powerhome/playbook/pull/473
[#376]: https://github.com/powerhome/playbook/pull/376
[#471]: https://github.com/powerhome/playbook/pull/471
[#466]: https://github.com/powerhome/playbook/pull/466
[#467]: https://github.com/powerhome/playbook/pull/467
[#469]: https://github.com/powerhome/playbook/pull/469
[#456]: https://github.com/powerhome/playbook/pull/456

### Changed

- Dark mode for User Kit ([#436][] @evalouderback)
- Use number with delimiter for stat_value.value ([#479][] @thestephenmarshall)
- Text Input: Added classname support ([#476][] @kre8sions)
- Layout sidebar colors ([#454][] @markiearnold)
- Add formatted_stat_value ([#477][] @thestephenmarshall)
- Add onChange prop to TextInput jsx ([#464][] @thestephenmarshall)
- User kit, Territory Prop Added ([#463][] @christinaatai)
- Sets image build status for Milano compatibility ([#472][] @viniciusgama)
- Add node binding for node-sass ([#465][] @thestephenmarshall)
- Enable ESLint in overcommit ([#462][] @thestephenmarshall)

[#436]: https://github.com/powerhome/playbook/pull/436
[#479]: https://github.com/powerhome/playbook/pull/479
[#476]: https://github.com/powerhome/playbook/pull/476
[#454]: https://github.com/powerhome/playbook/pull/454
[#477]: https://github.com/powerhome/playbook/pull/477
[#464]: https://github.com/powerhome/playbook/pull/464
[#463]: https://github.com/powerhome/playbook/pull/463
[#472]: https://github.com/powerhome/playbook/pull/472
[#465]: https://github.com/powerhome/playbook/pull/465
[#462]: https://github.com/powerhome/playbook/pull/462

### Fixed

- Bug Fix - Form kit dependencies ([#481][] @terryfinn)

[#481]: https://github.com/powerhome/playbook/pull/481

### Removed (breaking changes)

- React PbLayout prop `children` dropped support for single Node (https://github.com/powerhome/playbook/commit/b16da50914e110c75c6d96c985fa02781c9e2040#diff-c3ce2c91288ca3e730d3c56e7f73475cL11-L14)
- Rails PbLayout prop `dark` dropped (https://github.com/powerhome/playbook/commit/b16da50914e110c75c6d96c985fa02781c9e2040#diff-377fda563d148f7b3ad33f904b7b0cdbL13)
