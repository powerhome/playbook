# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased


## [4.14.0] 2020-5-14
- Upgrade react-popper lib to latest ([#778](https://github.com/powerhome/playbook/pull/778) @thestephenmarshall)
- Update React version to 16.8.6 ([#777](https://github.com/powerhome/playbook/pull/777) @thestephenmarshall)
- Added Circle Chart for Rails ([#771](https://github.com/powerhome/playbook/pull/771) @jasperfurniss)
- Spread props over inputs ([#772](https://github.com/powerhome/playbook/pull/772) @gmfvpereira)

## [4.13.1] 2020-4-28

### Fixed
- Added weekday_stacked scss import back in playbook.scss

## [4.13.0] 2020-4-24

### Added
- Added card header prop to Card Kit and added category colors ([#746](https://github.com/powerhome/playbook/pull/746)@christinaatai)
- New Kits - Time Stacked & Date Time Stacked ([#745](https://github.com/powerhome/playbook/pull/745) @haydenrou)
- Added table row side highlight prop ([#753](https://github.com/powerhome/playbook/pull/753) @christinaatai)

### Fixed
- Limit webpacker CPU & memory on local dev ([#749](https://github.com/powerhome/playbook/pull/749) @thestephenmarshall)
- Milano branded deployment config ([#748](https://github.com/powerhome/playbook/pull/748) @benlangfeld)

## [4.12.0] 2020-4-17
- New Kit - File Upload Kit ([#730](https://github.com/powerhome/playbook/pull/730) @thestephenmarshall)
  - Make doc tabs intelligently sense whether an example is available for either Rails or React versions of a kit and show accordingly
- Added vertical section separator variants & dark version ([#729](https://github.com/powerhome/playbook/pull/729)@christinaatai)
- Weekday Stacked playbook Kit ([#728](https://github.com/powerhome/playbook/pull/728) @leilaweiss)
- Made color changes to products ([#725](https://github.com/powerhome/playbook/pull/725) @rruiz85)
- Pinned dependencies ([#697](https://github.com/powerhome/playbook/pull/697) @thestephenmarshall)

## [4.11.0] 2020-4-10
- Added Filter only & Sort only templates to filter kit + React Version ([#702](https://github.com/powerhome/playbook/pull/702)@kre8sions)
- Add onClick prop to kits in need ([#694](https://github.com/powerhome/playbook/pull/694) @thestephenmarshall)
- Add Renovate bot ([#492](https://github.com/powerhome/playbook/pull/492) @viniciusgama)
- Raise Rubocop version from 0.72.0 to 0.81.0 ([#699](https://github.com/powerhome/playbook/pull/699) @garettarrowood)
- Fixed flexbox docs, autofill form color, typeahead loading position + dark mode, fixed react navigation Playbook ([#696](https://github.com/powerhome/playbook/pull/696) @jasoncypret)
- New Kit - Time Range Inline ([#680](https://github.com/powerhome/playbook/pull/680) @evertoncunha)
- New Kit - Weekday Stacked ([#705](https://github.com/powerhome/playbook/pull/705) @thestephenmarshall)
- Remove `method_source` `0.9.2` dependency ([#723](https://github.com/powerhome/playbook/pull/723) @wadewinningham)
- Deploy staging/production via Milano rather than Jenkins ([#731](https://github.com/powerhome/playbook/pull/731) @benlangfeld)

## [4.10.0] 2020-4-2
- Added react and dark version for Label Value Kit ([#688](https://github.com/powerhome/playbook/pull/688) @christinaatai)

## [4.9.0] 2020-3-27
- Update webpacker to version 4.2.2 ([#679](https://github.com/powerhome/playbook/pull/679) @viniciusgama)
- Prevent empty pattern attribute on Text Input kit ([#681](https://github.com/powerhome/playbook/pull/681) @thestephenmarshall)
- Rename roofs to roofing ([#685](https://github.com/powerhome/playbook/pull/685) @stephenagreer)
- Fixed mobile scaling in PB UI + Table responsive setting improvements + Avatar cropping issues ([686](https://github.com/powerhome/playbook/pull/686) @jasoncypret)

## [4.8.2] 2020-3-24
- Table js responsive helpers + Added responsive menu + slim cleanup ([#682](https://github.com/powerhome/playbook/pull/682) @jasoncypret)
- Prevent empty pattern attribute on Text Input kit ([#681](https://github.com/powerhome/playbook/pull/681) @thestephenmarshall)

### Added
- Added Project kit ([#667](https://github.com/powerhome/playbook/pull/667) @KatherineMuedas)

## [4.8.0] 2020-3-19

### Added
- New props for bar & line graph ([#669](https://github.com/powerhome/playbook/pull/669) @kre8sions)
- Table header alignment changed to left align ([#670](https://github.com/powerhome/playbook/pull/670) @megantrimble)
- Created ProgressSimple React Playbook Kit ([#665](https://github.com/powerhome/playbook/pull/665) @jasperfurniss)
- Filter Kit Updates ([#664](https://github.com/powerhome/playbook/pull/664) @kre8sions)
- Currency sizing + dark mode updates ([#673](https://github.com/powerhome/playbook/pull/673) @rruiz85)
- Added resize option to textarea ([#674](https://github.com/powerhome/playbook/pull/674) @jasoncypret)

### Fixed
- Allow form field placeholder + select field id ([👹 #666 🤘🐐](https://github.com/powerhome/playbook/pull/666) @thestephenmarshall)
- Fix line height on currency large ([#668](https://github.com/powerhome/playbook/pull/668) @jasoncypret)
- Run CI Builds on any available cluster ([#671](https://github.com/powerhome/playbook/pull/671) @benlangfeld)


## [4.7.0] 2020-3-12

### Added
- Created Form Pills for rails and react [#625](https://github.com/powerhome/playbook/pull/625)

### Changed
- Enable popover close on click outside/inside ([#666 👹](https://nitro.powerhrg.com/runway/backlog_items/NUX-666) @thestephenmarshall)

## [4.6.1] 2020-3-09

### Fixed
- Fix Filter variants to look for link prop in sort_menu ([#656](https://github.com/powerhome/playbook/pull/656) @kre8sions)

## [4.6.0] 2020-3-05

### Added
- Added Filter Rails Kit / Add TitleCount JS ([#638](https://github.com/powerhome/playbook/pull/638) @kre8sions)

### Changed
- Move popover and typeahead initialize to vendor.js ([#651](https://github.com/powerhome/playbook/pull/651) @thestephenmarshall)
- Updated FontAwesome to 5.12.1 ([#654](https://github.com/powerhome/playbook/pull/654) @kre8sions)


### Fixed
- Fix Full Page Samples code display ([#650](https://github.com/powerhome/playbook/pull/650) @jasperfurniss)
- Update Kit Generator ([#652](https://github.com/powerhome/playbook/pull/652) @thestephenmarshall)
- Removed Stale Editor Kit ([#646](https://github.com/powerhome/playbook/pull/646) @jasperfurniss)
- Corrected Typeahead Loading position + Cuttoff from filter kit docs popover ([#653](https://github.com/powerhome/playbook/pull/653) @jasoncypret)

## [4.5.2] 2020-3-03

### Changed
- Fix Layout Kit SCSS ([#648](https://github.com/powerhome/playbook/pull/648) @thestephenmarshall)

## [4.5.1] 2020-2-28

### Changed
- Add PbPopover init back to vendor.js ([#641](https://github.com/powerhome/playbook/pull/641) @thestephenmarshall)

## [4.5.0] 2020-2-27

### Changed
- Added loading indicator to Typeahead kit ([#635](https://github.com/powerhome/playbook/pull/635) @web-kat)
- Add React support to User Badge kit ([#632](https://github.com/powerhome/playbook/pull/632) @eabousaif)
- Bump nokogiri from 1.10.7 to 1.10.8 ([#636](https://github.com/powerhome/playbook/pull/636) @dependabot)

## [4.4.1] 2020-2-21

### Fixed
- Fixed the `pb_kits` call to always remove code from view (@jasoncypret)

## [4.4.0] 2020-2-20

### Added
- Date range stacked Kit [#559](https://github.com/powerhome/playbook/pull/559)

### Changed
- Adds ability to give context to the Typeahead kit ([#621](https://github.com/powerhome/playbook/pull/621) @terryfinn @web-kat)

### Fixed
- Correct Popover offset docs [#611](https://github.com/powerhome/playbook/pull/611)
- Fixed typo of stat change kit in yml file [#629] (https://github.com/powerhome/playbook/pull/629)

- PbPopover behavior works after turbolinks navigation events. This behavior is now applied with a [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) via the [`PbEnhancedElement` class](https://github.com/powerhome/playbook/blob/v4.4.0/app/pb_kits/playbook/pb_enhanced_element/index.js).>>>>>>> Use mutation observer to bind behavior of PbPopover

## [4.3.0] 2020-2-14


### Fixed
- Fixed timezone issue on DateStacked ([#592][] @gmfvpereira)

### Added
- Highlight Kit ([#586](https://github.com/powerhome/playbook/pull/586) @kre8sions)
- Full Page Examples V1 ([#609](https://github.com/powerhome/playbook/pull/609) @jasperfurniss)
- Add Appointment type to Hashtag kit ([#599](https://github.com/powerhome/nitro-web/pull/14015) @garettarrowood)
- React Popover kit ([#607](https://github.com/powerhome/playbook/pull/607) @thestephenmarshall)
- Dev Docs Reformatting ([#605](https://github.com/powerhome/playbook/pull/605) @kre8sions)

### Changed
- Update rouge gem to latest for JSX support [#602](https://github.com/powerhome/playbook/pull/602)
- Renamed vanilla JS version of `Popover` to `PbPopover` to help prevent collision [#607](https://github.com/powerhome/playbook/pull/607)



## [4.2.0] 2020-2-6

### Added
- Flex Kit ([#493][] @markiearnold @kre8sions)

[#493]:https://github.com/powerhome/playbook/pull/493

### Changed

- Undo Revert for DevDoc Fix [#588](https://github.com/powerhome/playbook/pull/588)
- Removed popover from examples.js and used MENU constant in doc helper [#591](https://github.com/powerhome/playbook/pull/591)
- Fix Form kit data prop merge [#587](https://github.com/powerhome/playbook/pull/587)
- Fixed WebpackerReact registration [#589](https://github.com/powerhome/playbook/pull/589)
- New navigation options [#582](https://github.com/powerhome/playbook/pull/582)
- Added z-index fix to popover [#583](https://github.com/powerhome/playbook/pull/593)
- Add a type prop to the circle icon button kit to allow users to set a button type.[#579](ttps://github.com/powerhome/playbook/pull/579)

## [4.1.2] 2020-1-30

### Changed
- Call update method on Popover library to allow block show/hide [577](https://github.com/powerhome/playbook/pull/577/files?file-filters%5B%5D=.erb&file-filters%5B%5D=.js&file-filters%5B%5D=.scss)

## [4.1.1] 2020-1-29

### Changed
- Add value prop to Typeahead kit

## [4.1.0] 2020-1-29

### Changed
- Update Form kit to allow Typeahead kit with label and name [#574](https://github.com/powerhome/playbook/pull/574)

## [4.0.1] 2020-1-28

### Changed
- Remove JSX Popover references [#571](https://github.com/powerhome/playbook/pull/571)
- Add using prop to be optional in the Currency kit [#572](https://github.com/powerhome/playbook/pull/572) @jasoncypret

## [4.0.0] 2020-1-25

### Changed
- Modernize and update API of the Currency kit [#565](https://github.com/powerhome/playbook/pull/565) @drborges
- Shadow Shallow, Default and Dark Deprecated, shadow_light changed to shadow, all affected files updated. [#568](https://github.com/powerhome/playbook/pull/568) @megantrimble
- Renamed `pb_chart_plugin.js` to `pb_chart.js`
- Added `validate` prop to Form kit for enabling JS form constraint validation (listed above)
- Added `validation` prop and enabled `required` attribute for Text Input kit

### Added
- Form kit field constraint validation [#567](https://github.com/powerhome/playbook/pull/567) @thestephenmarshall
- Popover Kit (New Kit - Rails only) [#569](https://github.com/powerhome/playbook/pull/569) @jasperfurniss

## [3.5.0] 2020-1-16

### Changed
- Added error state to Text Input, Textarea, Select, Radio & Checkbox kits [#554](https://github.com/powerhome/playbook/pull/554)

### Added
- Rails/JS kit `HomeAddressStreet`: added home_url prop. Defaults to `"#"` ([#557][https://github.com/powerhome/playbook/pull/557] @stephenagreer)
- Typeahead kit - new kit added [#547](https://github.com/powerhome/playbook/pull/547)

## [3.4.0] 2020-1-9

### Added
- Legend Kit (Complete) [#549](https://github.com/powerhome/playbook/pull/549)

### Fixed
- Rails/JS Kit `Select`: fixed caret to trigger select menu removed black border on select options ([#548][] @kre8sions)
- Fixed radio bug in docs ([#546][] @kre8sions)

### Changed
- Shadow colors and sizes updated. Deprecation notice added. ([#551][] @megantrimble)


[#546]: https://github.com/powerhome/playbook/pull/546
[#548]: https://github.com/powerhome/playbook/pull/548
[#551]: https://github.com/powerhome/playbook/pull/551

## [3.3.0] 2020-1-2

### Added
- Radio Button Kit ([#516][] @evalouderback)
- Add className support to React version of icon circle kit ([#537][] @drborges)
- Rails/JS kit `Checkbox` : can take optional block ([#538][] @kre8sions)
- Rails/JS kit `TextInput`: added optional blocks to accept custom inputs ([#539][] @kre8sions)

### Fixed
- JS kit `Caption`: swapped the position of classname in classnames to stop style bleed in other components ([#539][] @kre8sions)
- Fixed broken eslint ref + removed unused file ([#540][] @jasoncypret)

### Changed
- Swap implementation of highlight position values for Card Kit ([#536][] @drborges)


[#516]: https://github.com/powerhome/playbook/pull/516
[#540]: https://github.com/powerhome/playbook/pull/540
[#536]: https://github.com/powerhome/playbook/pull/536
[#537]: https://github.com/powerhome/playbook/pull/537
[#538]: https://github.com/powerhome/playbook/pull/538
[#539]: https://github.com/powerhome/playbook/pull/539

## [3.2.0] 2019-12-19

### Added

- Extend Form Kit to use Select Kit for select form fields ([#511][] @web-kat)
- Text Input padding override was removed for input child ([#526][] @megantrimble)
- Added exports for border-radius, line-height, opacity, z-index, breakpoints, shadows, and spacing  + updated the correct gradient colors ([#527][] @jasoncypret)
- Increased contrast for captions + Corrected table docs and fixed broken border-radius + Added data-table option for cases where we want to display lots of data with very tight spacing ([#528][] @jasoncypret)
- Added territory back to user kit ([#529][] @jasoncypret)
- JS kit `MultipleUsers`: added prop `maxDisplayedUsers` defaults to `4` ([#518][] @rafbgarcia)
- JS kit `List`: added default and dark docs ([#518][] @rafbgarcia)
- JS kit `Layout`: added default docs ([#518][] @rafbgarcia)
- JS kit `DateStacked`: added `left` as `align` option ([#518][] @rafbgarcia)
- JS kit `Table`: add props `disableHover` and `singleLine` to replace their respective snake case versions ([#518][] @rafbgarcia)
- JS Kit `IconValue`: Implement React version of Icon Value kit ([#521][] @drborges)
- [Technical]: Run yarn autofix on pre commit hook ([#533][] @rafbgarcia)
- Added Gradient & Multi Line to Fixed Confirmation Toast ([#534][] @megantrimble)
- New Multiple User Stacked Kit ([#517][] @evalouderback)

[#511]: https://github.com/powerhome/playbook/pull/511
[#518]: https://github.com/powerhome/playbook/pull/518
[#526]: https://github.com/powerhome/playbook/pull/526
[#527]: https://github.com/powerhome/playbook/pull/527
[#528]: https://github.com/powerhome/playbook/pull/528
[#529]: https://github.com/powerhome/playbook/pull/529
[#521]: https://github.com/powerhome/playbook/pull/521
[#533]: https://github.com/powerhome/playbook/pull/533
[#534]: https://github.com/powerhome/playbook/pull/534
[#517]: https://github.com/powerhome/playbook/pull/517

### Fixed

- JS kit `MultipleUsers` docs: displays avatar image by renaming `image_url` to `imageUrl` ([#518][] @rafbgarcia)
- JS kit `User`: displays avatar image by renaming `image_url` to `imageUrl` ([#518][] @rafbgarcia)
- JS kit `Avatar`: fixed OR condition in `if (avatar == true | avatarUrl != null)` ([#518][] @rafbgarcia)
- JS kit `List`: fixed class name: `list_borderless` to `_borderless` ([#518][] @rafbgarcia)
- JS kit `List`: fixed class name: `pb_list` to `pb_list_kit` ([#518][] @rafbgarcia)
- JS kit `Layout`: fixed error `position_class is not defined` ([#518][] @rafbgarcia)
- JS kit `HomeAddressStreet`: fixed Hashtag style by using `Hashtag` kit ([#518][] @rafbgarcia)
- JS kit `HomeAddressStreet`: fixed address and city not appearing beucase `titleize` function inside `utilities/text.js` wasn't returning anything ([#518][] @rafbgarcia)
- JS kit `HomeAddressStreet`: passed `dark` prop to Title's ([#518][] @rafbgarcia)
- JS kit `Hashtag`: use `span` instead of `div` to match rails' style ([#518][] @rafbgarcia)

[#518]: https://github.com/powerhome/playbook/pull/518

### Deprecated

- JS kit `Table`: deprecate props `disable_hover` and `single_line`, please use their camelcase versions ([#518][] @rafbgarcia)

[#518]: https://github.com/powerhome/playbook/pull/518

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
